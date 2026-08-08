"use client"

import { useState } from "react"
import {
    Shuffle,
    SkipBack,
    Play,
    Pause,
    SkipForward,
    Repeat2,
    ListMusic,
    Download,
    Cast,
    List,
    Volume2,
    Clock3
} from "lucide-react"

const song = {
    title: "Select a song",
    artist: "",
    artwork: "",
    duration: 0
}

export default function MusicPlayer() {
    const [playing, setPlaying] = useState(false)
    const [progress, setProgress] = useState(0)
    const [volume, setVolume] = useState(70)
    const [shuffle, setShuffle] = useState(false)
    const [repeat, setRepeat] = useState(false)

    const formatTime = (seconds: number) => {
        const minutes = Math.floor(seconds / 60)
        const remaining = Math.floor(seconds % 60)

        return `${minutes}:${remaining.toString().padStart(2, "0")}`
    }

    const currentTime = (progress / 100) * song.duration

    return (
        <div className="fixed bottom-3 left-3 right-3 z-50 overflow-hidden rounded-[22px] border border-white/[0.14] bg-white/[0.055] px-4 py-3 shadow-[0_8px_40px_rgba(0,0,0,0.45),inset_0_1px_0_rgba(255,255,255,0.12)] backdrop-blur-2xl backdrop-saturate-150 md:bottom-4 md:left-4 md:right-4">
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
            <div className="pointer-events-none absolute -top-20 left-1/4 h-32 w-1/2 rounded-full bg-white/[0.035] blur-3xl" />

            <div className="relative flex h-20 items-center gap-4">
                <div className="flex min-w-0 items-center gap-4 md:w-[280px]">
                    <div className="h-16 w-16 shrink-0 overflow-hidden rounded-xl border border-white/10 bg-white/[0.04] shadow-inner">
                        {song.artwork && (
                            <img
                                src={song.artwork}
                                alt=""
                                className="h-full w-full object-cover"
                            />
                        )}
                    </div>

                    <div className="min-w-0">
                        <p className="truncate text-lg font-medium text-white">
                            {song.title}
                        </p>

                        {song.artist && (
                            <p className="truncate text-sm text-white/50">
                                {song.artist}
                            </p>
                        )}
                    </div>
                </div>

                <div className="absolute left-1/2 top-1/2 hidden w-[500px] -translate-x-1/2 -translate-y-1/2 flex-col gap-2 md:flex">
                    <div className="flex items-center gap-6 text-white/50">
                        <span className="w-10 text-right text-sm">
                            {formatTime(currentTime)}
                        </span>

                        <input
                            type="range"
                            min="0"
                            max="100"
                            value={progress}
                            onChange={(e) => setProgress(Number(e.target.value))}
                            className="h-1 w-full cursor-pointer appearance-none rounded-full bg-white/[0.08] accent-white"
                        />

                        <span className="w-10 text-sm">
                            {formatTime(song.duration)}
                        </span>
                    </div>

                    <div className="flex items-center justify-center gap-7">
                        <button
                            onClick={() => setShuffle(!shuffle)}
                            className={`transition-all hover:scale-105 hover:text-white ${
                                shuffle ? "text-white" : "text-white/50"
                            }`}
                        >
                            <Shuffle size={22} />
                        </button>

                        <button className="text-white/55 transition hover:scale-105 hover:text-white">
                            <SkipBack size={25} />
                        </button>

                        <button
                            onClick={() => setPlaying(!playing)}
                            className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white text-black shadow-[0_2px_15px_rgba(255,255,255,0.12)] transition hover:scale-105"
                        >
                            {playing ? (
                                <Pause size={21} fill="currentColor" />
                            ) : (
                                <Play
                                    size={21}
                                    fill="currentColor"
                                    className="ml-0.5"
                                />
                            )}
                        </button>

                        <button className="text-white/55 transition hover:scale-105 hover:text-white">
                            <SkipForward size={25} />
                        </button>

                        <button
                            onClick={() => setRepeat(!repeat)}
                            className={`transition-all hover:scale-105 hover:text-white ${
                                repeat ? "text-white" : "text-white/50"
                            }`}
                        >
                            <Repeat2 size={22} />
                        </button>
                    </div>
                </div>

                <div className="ml-auto flex items-center gap-5 text-white/50">
                    <button className="hidden transition hover:text-white lg:block">
                        <ListMusic size={23} />
                    </button>

                    <button className="hidden transition hover:text-white lg:block">
                        <Download size={23} />
                    </button>

                    <button className="hidden transition hover:text-white lg:block">
                        <Cast size={23} />
                    </button>

                    <button className="hidden transition hover:text-white lg:block">
                        <List size={23} />
                    </button>

                    <div className="hidden items-center gap-3 xl:flex">
                        <Volume2 size={23} />

                        <input
                            type="range"
                            min="0"
                            max="100"
                            value={volume}
                            onChange={(e) => setVolume(Number(e.target.value))}
                            className="h-1 w-32 cursor-pointer appearance-none rounded-full bg-white/[0.08] accent-white"
                        />
                    </div>

                    <button className="hidden transition hover:text-white xl:block">
                        <Clock3 size={23} />
                    </button>
                </div>
            </div>

            <div className="mt-2 flex items-center gap-3 md:hidden">
                <span className="w-8 text-xs text-white/45">
                    {formatTime(currentTime)}
                </span>

                <input
                    type="range"
                    min="0"
                    max="100"
                    value={progress}
                    onChange={(e) => setProgress(Number(e.target.value))}
                    className="h-1 flex-1 cursor-pointer appearance-none rounded-full bg-white/[0.08] accent-white"
                />

                <span className="w-8 text-right text-xs text-white/45">
                    {formatTime(song.duration)}
                </span>
            </div>

            <div className="mt-2 flex items-center justify-center gap-7 md:hidden">
                <button
                    onClick={() => setShuffle(!shuffle)}
                    className={shuffle ? "text-white" : "text-white/50"}
                >
                    <Shuffle size={20} />
                </button>

                <button className="text-white/55">
                    <SkipBack size={23} />
                </button>

                <button
                    onClick={() => setPlaying(!playing)}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white text-black shadow-lg"
                >
                    {playing ? (
                        <Pause size={19} fill="currentColor" />
                    ) : (
                        <Play size={19} fill="currentColor" />
                    )}
                </button>

                <button className="text-white/55">
                    <SkipForward size={23} />
                </button>

                <button
                    onClick={() => setRepeat(!repeat)}
                    className={repeat ? "text-white" : "text-white/50"}
                >
                    <Repeat2 size={20} />
                </button>
            </div>
        </div>
    )
}