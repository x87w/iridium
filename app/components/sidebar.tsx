"use client"

import {
    Home,
    Search,
    Library,
    Heart,
    ListMusic,
    Clock3,
    Disc3,
    Settings,
    User
} from "lucide-react"

const navigation = [
    {
        label: "Home",
        icon: Home
    },
    {
        label: "Search",
        icon: Search
    },
    {
        label: "Your Library",
        icon: Library
    }
]

const music = [
    {
        label: "Liked Songs",
        icon: Heart
    },
    {
        label: "Playlists",
        icon: ListMusic
    },
    {
        label: "Recently Played",
        icon: Clock3
    },
    {
        label: "Albums",
        icon: Disc3
    }
]

export default function Sidebar() {
    return (
        <aside className="fixed left-3 top-3 z-40 hidden h-[771px] w-64 overflow-hidden rounded-[22px] border border-white/[0.14] bg-white/[0.055] shadow-[0_8px_40px_rgba(0,0,0,0.35),inset_0_1px_0_rgba(255,255,255,0.12)] backdrop-blur-2xl backdrop-saturate-150 lg:block">
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />

            <div className="flex flex-col p-3">
                <div className="mb-4 px-3 pt-2">
                    <h1 className="text-xl font-bold tracking-tight text-white underline">
                        iridium
                    </h1>
                </div>

                <nav className="space-y-0.5">
                    {navigation.map((item) => {
                        const Icon = item.icon

                        return (
                            <button
                                key={item.label}
                                className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition ${
                                    item.label === "Home"
                                        ? "bg-white/[0.1] text-white"
                                        : "text-white/55 hover:bg-white/[0.06] hover:text-white"
                                }`}
                            >
                                <Icon size={19} />
                                <span>{item.label}</span>
                            </button>
                        )
                    })}
                </nav>

                <div className="my-4 h-px bg-white/[0.08]" />

                <p className="px-3 pb-1.5 text-[11px] font-medium uppercase tracking-wider text-white/30">
                    Your Music
                </p>

                <nav className="space-y-0.5">
                    {music.map((item) => {
                        const Icon = item.icon

                        return (
                            <button
                                key={item.label}
                                className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-white/55 transition hover:bg-white/[0.06] hover:text-white"
                            >
                                <Icon size={19} />
                                <span>{item.label}</span>
                            </button>
                        )
                    })}
                </nav>

                <div className="mt-3 border-t border-white/[0.08] pt-3">
                    <button className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-white/45 transition hover:bg-white/[0.06] hover:text-white">
                        <Settings size={19} />
                        <span>Settings</span>
                    </button>

                    <button className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-white/45 transition hover:bg-white/[0.06] hover:text-white">
                        <User size={19} />
                        <span>Profile</span>
                    </button>
                </div>
            </div>
        </aside>
    )
}