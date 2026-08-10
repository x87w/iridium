"use client"

import { useUi } from "./ui"

export default function MainContent({
    children
}: {
    children: React.ReactNode
}) {
    const { collapsed } = useUi()

    return (
        <div
            className={`px-3 pt-3 transition-all duration-300 ease-in-out lg:px-8 ${
                collapsed ? "lg:ml-[96px]" : "lg:ml-[280px]"
            }`}
        >
            {children}
        </div>
    )
}