"use client"

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
    Volume2
} from "lucide-react"
import { useState } from "react"
import { usePlayer } from "./context"

const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remaining = Math.floor(seconds % 60)

    return `${minutes}:${remaining.toString().padStart(2, "0")}`
}

export default function MusicPlayer() {
    const {
        currentTrack,
        isPlaying,
        progress,
        duration,
        volume,
        togglePlay,
        seek,
        setVolume
    } = usePlayer()
    const [shuffle, setShuffle] = useState(false)
    const [repeat, setRepeat] = useState(false)

    return (
        <div className="fixed bottom-3 left-3 right-3 z-50 overflow-hidden rounded-[22px] border border-white/[0.08] bg-[#111111] px-4 py-3 md:bottom-4 md:left-4 md:right-4">
            <div className="relative flex h-20 items-center gap-4">
                <div className="flex min-w-0 items-center gap-4 md:w-[280px]">
                    <div className="h-16 w-16 shrink-0 overflow-hidden rounded-xl border border-white/10 bg-white/[0.04]">
                        {currentTrack?.artwork && (
                            <img
                                src={currentTrack.artwork}
                                alt=""
                                className="h-full w-full object-cover"
                            />
                        )}
                    </div>

                    <div className="min-w-0">
                        <p className="truncate text-lg font-medium text-white">
                            {currentTrack?.title || "Nothing playing"}
                        </p>

                        {currentTrack?.artist && (
                            <p className="truncate text-sm text-white/50">
                                {currentTrack.artist}
                            </p>
                        )}
                    </div>
                </div>

                <div className="absolute left-1/2 top-1/2 hidden w-[500px] -translate-x-1/2 -translate-y-1/2 flex-col gap-2 md:flex">
                    <div className="flex items-center gap-6 text-white/50">
                        <span className="w-10 text-right text-sm">
                            {formatTime(progress)}
                        </span>

                        <input
                            type="range"
                            min="0"
                            max={duration || 100}
                            step="1"
                            value={Math.min(progress, duration || 100)}
                            onChange={(e) => seek(Number(e.target.value))}
                            className="h-1 w-full cursor-pointer appearance-none rounded-full bg-white/[0.08] accent-white"
                        />

                        <span className="w-10 text-sm">
                            {formatTime(duration)}
                        </span>
                    </div>

                    <div className="flex items-center justify-center gap-7">
                        <button
                            onClick={() => setShuffle(!shuffle)}
                            className={`transition hover:text-white ${
                                shuffle ? "text-white" : "text-white/50"
                            }`}
                        >
                            <Shuffle size={22} />
                        </button>

                        <button className="text-white/55 transition hover:text-white">
                            <SkipBack size={25} />
                        </button>

                        <button
                            onClick={togglePlay}
                            className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-black transition hover:scale-105"
                        >
                            {isPlaying ? (
                                <Pause size={21} fill="currentColor" />
                            ) : (
                                <Play
                                    size={21}
                                    fill="currentColor"
                                    className="ml-0.5"
                                />
                            )}
                        </button>

                        <button className="text-white/55 transition hover:text-white">
                            <SkipForward size={25} />
                        </button>

                        <button
                            onClick={() => setRepeat(!repeat)}
                            className={`transition hover:text-white ${
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
                </div>
            </div>

            <div className="mt-2 flex items-center gap-3 md:hidden">
                <span className="w-8 text-xs text-white/45">
                    {formatTime(progress)}
                </span>

                <input
                    type="range"
                    min="0"
                    max={duration || 100}
                    step="1"
                    value={Math.min(progress, duration || 100)}
                    onChange={(e) => seek(Number(e.target.value))}
                    className="h-1 flex-1 cursor-pointer appearance-none rounded-full bg-white/[0.08] accent-white"
                />

                <span className="w-8 text-right text-xs text-white/45">
                    {formatTime(duration)}
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
                    onClick={togglePlay}
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-black"
                >
                    {isPlaying ? (
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
