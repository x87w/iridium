"use client"

import Link from "next/link"
import {
    Home,
    Library,
    Heart,
    ListMusic,
    Clock3,
    Disc3,
    Settings,
    User,
    ChevronLeft,
    ChevronRight
} from "lucide-react"
import { useUi } from "./ui-context"

type LucideIcon = typeof Home

const navigation: { label: string; icon: LucideIcon }[] = [
    {
        label: "Home",
        icon: Home
    },
    {
        label: "Your Library",
        icon: Library
    }
]

const music: { label: string; icon: LucideIcon }[] = [
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

function NavButton({
    label,
    icon: Icon,
    active,
    collapsed
}: {
    label: string
    icon: LucideIcon
    active?: boolean
    collapsed: boolean
}) {
    return (
        <button
            title={collapsed ? label : undefined}
            className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition duration-300 ${
                collapsed ? "justify-center px-0" : ""
            } ${
                active
                    ? "bg-white/[0.1] text-white"
                    : "text-white/55 hover:bg-white/[0.06] hover:text-white"
            }`}
        >
            <Icon size={19} className="shrink-0" />
            <span
                className={`overflow-hidden whitespace-nowrap transition-all duration-300 ${
                    collapsed ? "w-0 opacity-0" : "w-auto opacity-100"
                }`}
            >
                {label}
            </span>
        </button>
    )
}

export default function Sidebar() {
    const { collapsed, toggleCollapsed } = useUi()

    return (
        <aside
            className={`fixed left-4 top-3 z-40 mt-3 h-[750px] overflow-hidden rounded-[22px] border border-white/[0.1] bg-[#111111] transition-all duration-300 ease-in-out ${
                collapsed ? "w-[80px]" : "w-[264px]"
            }`}
        >
            <div className="flex h-full flex-col p-3">
                <div
                    className={`mb-4 flex items-center px-3 pt-2 ${
                        collapsed ? "justify-center px-0" : "justify-between"
                    }`}
                >
                    <img
                        src="/iridium.png"
                        alt="iridium"
                        className={`object-contain object-left transition-all duration-300 ${
                            collapsed ? "h-9 w-9" : "h-12 w-auto"
                        }`}
                    />
                    <button
                        onClick={toggleCollapsed}
                        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-white/60 transition hover:bg-white/10 hover:text-white"
                    >
                        {collapsed ? (
                            <ChevronRight size={16} />
                        ) : (
                            <ChevronLeft size={16} />
                        )}
                    </button>
                </div>

                <nav className="space-y-0.5">
                    {navigation.map((item) => (
                        <NavButton
                            key={item.label}
                            label={item.label}
                            icon={item.icon}
                            active={item.label === "Home"}
                            collapsed={collapsed}
                        />
                    ))}
                </nav>

                <div
                    className={`my-4 h-px bg-white/[0.08] transition-opacity duration-300 ${
                        collapsed ? "opacity-0" : "opacity-100"
                    }`}
                />

                <p
                    className={`px-3 pb-1.5 text-[11px] font-medium uppercase tracking-wider text-white/30 transition-all duration-300 ${
                        collapsed
                            ? "w-0 overflow-hidden opacity-0"
                            : "w-auto opacity-100"
                    }`}
                >
                    Your Music
                </p>

                <nav className="space-y-0.5">
                    {music.map((item) => (
                        <NavButton
                            key={item.label}
                            label={item.label}
                            icon={item.icon}
                            collapsed={collapsed}
                        />
                    ))}
                </nav>

                <div className="mt-auto border-t border-white/[0.08] pt-3">
                    <button
                        title={collapsed ? "Settings" : undefined}
                        className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-white/45 transition duration-300 hover:bg-white/[0.06] hover:text-white ${
                            collapsed ? "justify-center px-0" : ""
                        }`}
                    >
                        <Settings size={19} className="shrink-0" />
                        <span
                            className={`overflow-hidden whitespace-nowrap transition-all duration-300 ${
                                collapsed ? "w-0 opacity-0" : "w-auto opacity-100"
                            }`}
                        >
                            Settings
                        </span>
                    </button>

                    <Link
                        href="/auth"
                        title={collapsed ? "Profile" : undefined}
                        className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-white/45 transition duration-300 hover:bg-white/[0.06] hover:text-white ${
                            collapsed ? "justify-center px-0" : ""
                        }`}
                    >
                        <User size={19} className="shrink-0" />
                        <span
                            className={`overflow-hidden whitespace-nowrap transition-all duration-300 ${
                                collapsed ? "w-0 opacity-0" : "w-auto opacity-100"
                            }`}
                        >
                            Profile
                        </span>
                    </Link>
                </div>
            </div>
        </aside>
    )
}