import path from "node:path"

export interface ClientTrack {
    id: number | string
    title: string
    artist: string
    album?: string
    artwork: string
    duration: number
    explicit?: boolean
    source?: "youtube"
    permalinkUrl?: string
}

interface YoutubeVideo {
    videoId: string
    title: string
    author?: { name?: string }
    duration?: { seconds?: number }
}

interface YoutubeSearchResponse {
    videos?: YoutubeVideo[]
}

export interface MusicSearchResult {
    items: ClientTrack[]
    albums: never[]
    artists: never[]
    source: string
}

const YOUTUBE_DL_PATH =
    process.env.YOUTUBE_DL_PATH ||
    path.join(
        process.cwd(),
        "node_modules",
        "youtube-dl-exec",
        "bin",
        "yt-dlp"
    )

let youtubeDl: ReturnType<typeof import("youtube-dl-exec").create> | null =
    null

async function getYoutubeDl() {
    if (youtubeDl) return youtubeDl
    const { create } = await import("youtube-dl-exec")
    youtubeDl = create(YOUTUBE_DL_PATH)
    return youtubeDl
}

export async function searchMusic(
    query: string,
    limit: number
): Promise<MusicSearchResult> {
    if (!query?.trim()) {
        return { items: [], albums: [], artists: [], source: "none" }
    }

    const { default: yts } = await import("yt-search")
    const ytResults = await (yts as (q: string) => Promise<YoutubeSearchResponse>)(
        query.trim()
    )
    const videos = (ytResults?.videos || []).slice(0, limit || 30)

    const items: ClientTrack[] = videos.map(
        (v): ClientTrack => ({
            id: v.videoId,
            title: v.title,
            artist: v.author?.name || "Unknown",
            artwork: `https://i.ytimg.com/vi/${v.videoId}/hqdefault.jpg`,
            duration: v.duration?.seconds || 0,
            source: "youtube",
            permalinkUrl: `https://youtube.com/watch?v=${v.videoId}`
        })
    )

    return { items, albums: [], artists: [], source: "youtube" }
}

export interface StreamResult {
    url: string
    mimeType: string
    source: string
}

interface StreamMeta {
    title?: string
    artist?: string
}

export async function resolveStream(
    id: string,
    meta?: StreamMeta
): Promise<StreamResult> {
    const videoId = await resolveYoutubeVideoId(id, meta)
    const url = await resolveYoutubeStreamUrl(videoId)
    return { url: url.url, mimeType: url.mimeType, source: "youtube" }
}

async function resolveYoutubeVideoId(
    id: string,
    meta?: StreamMeta
): Promise<string> {
    if (/^[a-zA-Z0-9_-]{11}$/.test(id)) return id

    if (meta?.artist && meta?.title) {
        const { default: yts } = await import("yt-search")
        const ytResults = await (yts as (
            q: string
        ) => Promise<YoutubeSearchResponse>)(
            `${meta.artist} ${meta.title} audio`
        )
        const video = ytResults?.videos?.[0]
        if (video?.videoId) return video.videoId
    }

    throw new Error("No YouTube results")
}

async function resolveYoutubeStreamUrl(
    videoId: string
): Promise<{ url: string; mimeType: string }> {
    const dl = await getYoutubeDl()
    const videoUrl = `https://www.youtube.com/watch?v=${videoId}`
    const info = String(
        await dl(videoUrl, {
            format: "bestaudio",
            getUrl: true
        })
    )
    return {
        url: info.trim(),
        mimeType: "audio/mp4"
    }
}
