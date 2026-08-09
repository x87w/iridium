"use client"

import { useEffect, useState } from "react"
import {
    ArrowLeft,
    ArrowRight,
    Search,
    Loader2,
    Music2
} from "lucide-react"

type Track = {
    id: number
    title: string
    artist: string
    album: string
    artwork: string
    genre: string
    duration: number
    preview: string
    explicit: boolean
    type: string
}

const formatTime = (seconds: number) => {
    if (!seconds) return "0:00"

    const minutes = Math.floor(seconds / 60)
    const remaining = Math.floor(seconds % 60)

    return `${minutes}:${remaining.toString().padStart(2, "0")}`
}

export default function Home() {
    const [query, setQuery] = useState("")
    const [results, setResults] = useState<Track[]>([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")

    const handleQueryChange = (value: string) => {
        setQuery(value)

        if (!value.trim()) {
            setResults([])
            setLoading(false)
            setError("")
        } else {
            setLoading(true)
            setError("")
        }
    }

    useEffect(() => {
        const trimmed = query.trim()

        if (!trimmed) return

        let active = true

        const timer = setTimeout(async () => {
            try {
                const response = await fetch(
                    `/api/search?q=${encodeURIComponent(trimmed)}&type=tracks`
                )

                if (!response.ok) {
                    throw new Error("Search failed")
                }

                const data = await response.json()

                if (active) {
                    setResults(data.results || [])
                }
            } catch {
                if (active) {
                    setError("Something went wrong. Please try again.")
                }
            } finally {
                if (active) {
                    setLoading(false)
                }
            }
        }, 400)

        return () => {
            active = false
            clearTimeout(timer)
        }
    }, [query])

    return (
        <div className="mt-3 flex justify-center">
            <div className="relative h-[750px] w-full max-w-[1400px] overflow-hidden rounded-[28px] border border-white/10 bg-[#0b0b0b]">
                <div className="relative p-6 md:p-8">
                    <div className="flex items-center gap-3">
                        <button className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white/70 transition hover:bg-white/10 hover:text-white">
                            <ArrowLeft size={21} />
                        </button>


                        <div className="group ml-1 flex h-12 min-w-0 flex-1 items-center gap-3 rounded-xl border border-white/10 bg-[#1c1c1c] px-4 transition focus-within:border-white/20 focus-within:bg-[#202020]">
                            <Search
                                size={22}
                                className="shrink-0 text-white/40 group-focus-within:text-white/70"
                            />

                            <input
                                type="text"
                                value={query}
                                onChange={(e) => handleQueryChange(e.target.value)}
                                placeholder="Search for tracks, artists, albums..."
                                className="w-full bg-transparent text-[16px] text-white outline-none placeholder:text-white/35"
                            />
                        </div>


                        <button className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white/70 transition hover:bg-white/10 hover:text-white">
                            <ArrowRight size={21} />
                        </button>
                    </div>

                    <div className="mt-8 h-[580px] overflow-y-auto">
                        {!query.trim() && (
                            <div className="flex h-full items-start justify-center pt-32 text-center">
                                <div className="max-w-2xl">
                                    <h1 className="text-3xl font-semibold tracking-tight text-white md:text-4xl">
                                        Welcome to Iridium
                                    </h1>

                                    <p className="mt-5 text-base leading-7 text-white/45 md:text-lg">
                                        You haven&apos;t listened to anything yet.
                                    </p>
                                </div>
                            </div>
                        )}

                        {loading && (
                            <div className="flex h-full items-center justify-center">
                                <Loader2
                                    size={28}
                                    className="animate-spin text-white/40"
                                />
                            </div>
                        )}

                        {error && !loading && (
                            <div className="flex h-full items-center justify-center text-center">
                                <p className="max-w-md text-base leading-7 text-white/45">
                                    {error}
                                </p>
                            </div>
                        )}

                        {!loading && !error && query.trim() && results.length === 0 && (
                            <div className="flex h-full items-center justify-center text-center">
                                <p className="max-w-md text-base leading-7 text-white/45">
                                    No results for &ldquo;{query.trim()}&rdquo;.
                                </p>
                            </div>
                        )}

                        {!loading && !error && results.length > 0 && (
                            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                                {results.map((track) => (
                                    <button
                                        key={track.id}
                                        className="group flex flex-col rounded-2xl border border-white/[0.06] bg-white/[0.03] p-3 text-left transition hover:bg-white/[0.06]"
                                    >
                                        <div className="relative aspect-square w-full overflow-hidden rounded-xl border border-white/10 bg-white/[0.04]">
                                            {track.artwork ? (
                                                <img
                                                    src={track.artwork}
                                                    alt={track.title}
                                                    className="h-full w-full object-cover"
                                                />
                                            ) : (
                                                <div className="flex h-full w-full items-center justify-center text-white/25">
                                                    <Music2 size={36} />
                                                </div>
                                            )}

                                            {track.explicit && (
                                                <span className="absolute right-2 top-2 rounded bg-black/70 px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-wide text-white/80">
                                                    E
                                                </span>
                                            )}
                                        </div>

                                        <div className="mt-3 flex min-w-0 flex-col gap-1">
                                            <p className="truncate text-sm font-medium text-white">
                                                {track.title}
                                            </p>

                                            <p className="truncate text-[13px] text-white/50">
                                                {track.artist}
                                            </p>

                                            <p className="truncate text-[12px] text-white/30">
                                                {track.album}
                                            </p>

                                            <div className="mt-1 flex items-center justify-between">
                                                <span className="text-[11px] uppercase tracking-wide text-white/25">
                                                    {track.genre}
                                                </span>

                                                <span className="text-[11px] text-white/30">
                                                    {formatTime(track.duration)}
                                                </span>
                                            </div>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
