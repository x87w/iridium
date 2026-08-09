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
    playTrack: (track: Track) => void
    togglePlay: () => void
    seek: (seconds: number) => void
    setVolume: (volume: number) => void
}

const PlayerContext = createContext<PlayerContextType | null>(null)

export function PlayerProvider({ children }: { children: React.ReactNode }) {
    const audioRef = useRef<HTMLAudioElement | null>(null)
    const [currentTrack, setCurrentTrack] = useState<Track | null>(null)
    const [isPlaying, setIsPlaying] = useState(false)
    const [progress, setProgress] = useState(0)
    const [duration, setDuration] = useState(0)
    const [volume, setVolumeState] = useState(70)

    useEffect(() => {
        const audio = new Audio()
        audio.preload = "auto"
        audioRef.current = audio

        const onTimeUpdate = () => setProgress(audio.currentTime)
        const onLoadedMetadata = () => setDuration(audio.duration || 0)
        const onEnded = () => setIsPlaying(false)
        const onPlay = () => setIsPlaying(true)
        const onPause = () => setIsPlaying(false)

        audio.addEventListener("timeupdate", onTimeUpdate)
        audio.addEventListener("loadedmetadata", onLoadedMetadata)
        audio.addEventListener("ended", onEnded)
        audio.addEventListener("play", onPlay)
        audio.addEventListener("pause", onPause)

        return () => {
            audio.pause()
            audio.removeEventListener("timeupdate", onTimeUpdate)
            audio.removeEventListener("loadedmetadata", onLoadedMetadata)
            audio.removeEventListener("ended", onEnded)
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
        const params = new URLSearchParams({ id: String(track.id) })
        if (track.isrc) params.set("isrc", track.isrc)
        params.set("source", "youtube")
        if (track.title) params.set("title", track.title)
        if (track.artist) params.set("artist", track.artist)
        return `/api/music/stream?${params.toString()}`
    }, [])

    const playTrack = useCallback(
        (track: Track) => {
            setCurrentTrack(track)
            setDuration(track.duration || 0)
            setProgress(0)
            if (audioRef.current) {
                audioRef.current.src = buildStreamUrl(track)
                audioRef.current.play().catch(() => setIsPlaying(false))
            }
        },
        [buildStreamUrl]
    )

    const togglePlay = useCallback(() => {
        const audio = audioRef.current
        if (!audio || !audio.src) return
        if (audio.paused) {
            audio.play().catch(() => setIsPlaying(false))
        } else {
            audio.pause()
        }
    }, [])

    const seek = useCallback((seconds: number) => {
        const audio = audioRef.current
        if (!audio) return
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
                playTrack,
                togglePlay,
                seek,
                setVolume
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
