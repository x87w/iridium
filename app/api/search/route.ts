import { NextRequest, NextResponse } from "next/server"

type ItunesResult = {
    trackId?: number
    collectionId?: number
    trackName?: string
    collectionName?: string
    artistName?: string
    artworkUrl100?: string
    primaryGenreName?: string
    trackTimeMillis?: number
    previewUrl?: string
    trackExplicitness?: string
    wrapperType?: string
}

export async function GET(request: NextRequest) {
    const query = request.nextUrl.searchParams.get("q")
    const type = request.nextUrl.searchParams.get("type") || "tracks"

    if (!query?.trim()) {
        return NextResponse.json({ results: [] })
    }

    const entity = type === "albums" ? "album" : "song"

    const url = new URL("https://itunes.apple.com/search")
    url.searchParams.set("term", query)
    url.searchParams.set("media", "music")
    url.searchParams.set("entity", entity)
    url.searchParams.set("limit", "30")
    url.searchParams.set("country", "US")

    try {
        const response = await fetch(url.toString(), {
            next: {
                revalidate: 60
            }
        })

        if (!response.ok) {
            return NextResponse.json(
                { error: "iTunes request failed" },
                { status: response.status }
            )
        }

        const data = await response.json()

        const results = data.results.map((item: ItunesResult) => ({
            id: item.trackId || item.collectionId,
            title: item.trackName || item.collectionName,
            artist: item.artistName,
            album: item.collectionName,
            artwork: item.artworkUrl100?.replace(
                "100x100",
                "600x600"
            ),
            genre: item.primaryGenreName,
            duration: item.trackTimeMillis
                ? Math.floor(item.trackTimeMillis / 1000)
                : 0,
            preview: item.previewUrl || "",
            explicit: item.trackExplicitness === "explicit",
            type: item.wrapperType
        }))

        return NextResponse.json({
            results
        })
    } catch {
        return NextResponse.json(
            { error: "Unable to search iTunes" },
            { status: 500 }
        )
    }
}