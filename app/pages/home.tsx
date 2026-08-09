"use client"

import {
    ArrowLeft,
    ArrowRight,
    Search,
    UserRound
} from "lucide-react"

export default function Home() {
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
                                placeholder="Search for tracks, artists, albums..."
                                className="w-full bg-transparent text-[16px] text-white outline-none placeholder:text-white/35"
                            />
                        </div>


                        <button className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white/70 transition hover:bg-white/10 hover:text-white">
                            <ArrowRight size={21} />
                        </button>
                    </div>

                    <div className="flex h-[580px] items-start justify-center pt-32 text-center">
                        <div className="max-w-2xl">
                            <h1 className="text-3xl font-semibold tracking-tight text-white md:text-4xl">
                                Welcome to Iridium
                            </h1>

                            <p className="mt-5 text-base leading-7 text-white/45 md:text-lg">
                                You haven&apos;t listened to anything yet.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}