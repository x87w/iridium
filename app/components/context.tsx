"use client"

import {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useRef,
    useState
} from "react"

export type Track = {
    id: number | string
    title: string
    artist: string
    album?: string
    artwork: string
    duration: number
    explicit?: boolean
    isrc?: string
    source?: string
    permalinkUrl?: string
}

type PlayerContextType = {
    currentTrack: Track | null
    isPlaying: boolean
    progress: number
    duration: number
    volume: number
    queue: Track[]
    queueIndex: number
    playTrack: (track: Track) => void
    playQueue: (tracks: Track[], index: number) => void
    togglePlay: () => void
    seek: (seconds: number) => void
    setVolume: (volume: number) => void
    nextTrack: () => void
    previousTrack: () => void
}

const PlayerContext = createContext<PlayerContextType | null>(null)

export function PlayerProvider({ children }: { children: React.ReactNode }) {
    const audioRef = useRef<HTMLAudioElement | null>(null)
    const queueRef = useRef<Track[]>([])
    const queueIndexRef = useRef(0)

    const [currentTrack, setCurrentTrack] = useState<Track | null>(null)
    const [isPlaying, setIsPlaying] = useState(false)
    const [progress, setProgress] = useState(0)
    const [duration, setDuration] = useState(0)
    const [volume, setVolumeState] = useState(70)
    const [queue, setQueue] = useState<Track[]>([])
    const [queueIndex, setQueueIndex] = useState(0)

    useEffect(() => {
        const audio = new Audio()

        audio.preload = "auto"
        audioRef.current = audio

        const onTimeUpdate = () => {
            setProgress(audio.currentTime)
        }

        const onLoadedMetadata = () => {
            setDuration(audio.duration || 0)
        }

        const onPlay = () => {
            setIsPlaying(true)
        }

        const onPause = () => {
            setIsPlaying(false)
        }

        audio.addEventListener("timeupdate", onTimeUpdate)
        audio.addEventListener("loadedmetadata", onLoadedMetadata)
        audio.addEventListener("play", onPlay)
        audio.addEventListener("pause", onPause)

        return () => {
            audio.pause()

            audio.removeEventListener("timeupdate", onTimeUpdate)
            audio.removeEventListener("loadedmetadata", onLoadedMetadata)
            audio.removeEventListener("play", onPlay)
            audio.removeEventListener("pause", onPause)

            audioRef.current = null
        }
    }, [])

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = volume / 100
        }
    }, [volume])

    const buildStreamUrl = useCallback((track: Track) => {
        const params = new URLSearchParams({
            id: String(track.id)
        })

        if (track.isrc) {
            params.set("isrc", track.isrc)
        }

        params.set("source", "youtube")

        if (track.title) {
            params.set("title", track.title)
        }

        if (track.artist) {
            params.set("artist", track.artist)
        }

        return `/api/music/stream?${params.toString()}`
    }, [])

    const loadTrack = useCallback(
        (track: Track, autoplay = true) => {
            setCurrentTrack(track)
            setDuration(track.duration || 0)
            setProgress(0)

            const audio = audioRef.current

            if (!audio) {
                return
            }

            audio.src = buildStreamUrl(track)
            audio.load()

            if (autoplay) {
                audio.play().catch(() => {
                    setIsPlaying(false)
                })
            }
        },
        [buildStreamUrl]
    )

    const playQueue = useCallback(
        (tracks: Track[], index: number) => {
            if (!tracks.length) {
                return
            }

            const safeIndex = Math.max(
                0,
                Math.min(index, tracks.length - 1)
            )

            queueRef.current = tracks
            queueIndexRef.current = safeIndex

            setQueue(tracks)
            setQueueIndex(safeIndex)

            loadTrack(tracks[safeIndex])
        },
        [loadTrack]
    )

    const playTrack = useCallback(
        (track: Track) => {
            playQueue([track], 0)
        },
        [playQueue]
    )

    const nextTrack = useCallback(() => {
        const tracks = queueRef.current
        const currentIndex = queueIndexRef.current
        const nextIndex = currentIndex + 1

        if (!tracks.length || nextIndex >= tracks.length) {
            setIsPlaying(false)
            return
        }

        queueIndexRef.current = nextIndex
        setQueueIndex(nextIndex)

        loadTrack(tracks[nextIndex])
    }, [loadTrack])

    const previousTrack = useCallback(() => {
        const audio = audioRef.current

        if (audio && audio.currentTime > 3) {
            audio.currentTime = 0
            setProgress(0)
            return
        }

        const tracks = queueRef.current
        const currentIndex = queueIndexRef.current

        if (!tracks.length || currentIndex <= 0) {
            if (audio) {
                audio.currentTime = 0
                setProgress(0)
            }

            return
        }

        const previousIndex = currentIndex - 1

        queueIndexRef.current = previousIndex
        setQueueIndex(previousIndex)

        loadTrack(tracks[previousIndex])
    }, [loadTrack])

    useEffect(() => {
        const audio = audioRef.current

        if (!audio) {
            return
        }

        const onEnded = () => {
            const tracks = queueRef.current
            const currentIndex = queueIndexRef.current
            const nextIndex = currentIndex + 1

            if (nextIndex >= tracks.length) {
                setIsPlaying(false)
                return
            }

            queueIndexRef.current = nextIndex
            setQueueIndex(nextIndex)

            loadTrack(tracks[nextIndex])
        }

        audio.addEventListener("ended", onEnded)

        return () => {
            audio.removeEventListener("ended", onEnded)
        }
    }, [loadTrack])

    const togglePlay = useCallback(() => {
        const audio = audioRef.current

        if (!audio || !audio.src) {
            return
        }

        if (audio.paused) {
            audio.play().catch(() => {
                setIsPlaying(false)
            })
        } else {
            audio.pause()
        }
    }, [])

    const seek = useCallback((seconds: number) => {
        const audio = audioRef.current

        if (!audio) {
            return
        }

        audio.currentTime = seconds
        setProgress(seconds)
    }, [])

    const setVolume = useCallback((value: number) => {
        setVolumeState(value)
    }, [])

    return (
        <PlayerContext.Provider
            value={{
                currentTrack,
                isPlaying,
                progress,
                duration,
                volume,
                queue,
                queueIndex,
                playTrack,
                playQueue,
                togglePlay,
                seek,
                setVolume,
                nextTrack,
                previousTrack
            }}
        >
            {children}
        </PlayerContext.Provider>
    )
}

export function usePlayer() {
    const context = useContext(PlayerContext)

    if (!context) {
        throw new Error("usePlayer must be used within PlayerProvider")
    }

    return context
}