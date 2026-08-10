"use client"

import { createContext, useContext, useState } from "react"

type UiContextType = {
    collapsed: boolean
    toggleCollapsed: () => void
}

const UiContext = createContext<UiContextType | null>(null)

export function UiProvider({ children }: { children: React.ReactNode }) {
    const [collapsed, setCollapsed] = useState(false)

    return (
        <UiContext.Provider
            value={{
                collapsed,
                toggleCollapsed: () => setCollapsed((value) => !value)
            }}
        >
            {children}
        </UiContext.Provider>
    )
}

export function useUi() {
    const context = useContext(UiContext)

    if (!context) {
        throw new Error("useUi must be used within UiProvider")
    }

    return context
}