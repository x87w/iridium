"use client"

import { Search, ChevronLeft, ChevronRight } from "lucide-react"
import { useState } from "react"

export default function SearchBar() {
    const [query, setQuery] = useState("")

    return (
        <div className="flex w-full items-center gap-3">
            <button
                className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full border border-white/[0.12] bg-[#171717] text-white/80 transition hover:bg-[#202020] hover:text-white"
            >
                <ChevronLeft size={38} strokeWidth={2} />
            </button>

            <div className="relative flex h-16 min-w-0 flex-1 items-center rounded-2xl border border-white/[0.1] bg-[#1c1c1c] px-6">
                <Search
                    size={38}
                    strokeWidth={1.8}
                    className="shrink-0 text-white/55"
                />

                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search for tracks, artists, albums..."
                    className="ml-5 min-w-0 flex-1 bg-transparent text-3xl text-white outline-none placeholder:text-white/40"
                />
            </div>

            <button
                className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full border border-white/[0.12] bg-[#171717] text-white/80 transition hover:bg-[#202020] hover:text-white"
            >
                <ChevronRight size={38} strokeWidth={2} />
            </button>
        </div>
    )
}