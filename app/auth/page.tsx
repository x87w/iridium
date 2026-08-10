"use client"

import { useState } from "react"
import Link from "next/link"
import {
    ArrowLeft,
    LogOut,
    Mail,
    Lock,
    User,
    Music2
} from "lucide-react"
import {
    signup,
    login,
    logout,
    useAuthSession
} from "../../lib/auth-store"

export default function AuthPage() {
    const session = useAuthSession()
    const [mode, setMode] = useState<"login" | "signup">("login")
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault()
        setError("")

        const result =
            mode === "signup"
                ? signup(username, email, password)
                : login(email, password)

        if (!result.ok) {
            setError(result.error || "Something went wrong.")
        }
    }

    const switchMode = (next: "login" | "signup") => {
        setMode(next)
        setError("")
    }

    if (session) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-black p-4 text-white">
                <div className="w-full max-w-md rounded-[28px] border border-white/10 bg-[#111111] p-8">
                    <div className="flex items-center gap-3">
                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/5">
                            <Music2 size={22} className="text-white/70" />
                        </div>

                        <div>
                            <h1 className="text-lg font-medium">{session.username}</h1>
                            <p className="text-sm text-white/50">{session.email}</p>
                        </div>
                    </div>

                    <div className="my-6 h-px bg-white/[0.08]" />

                    <div className="flex flex-col gap-3">
                        <Link
                            href="/"
                            className="flex w-full items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-medium text-white/80 transition hover:bg-white/10 hover:text-white"
                        >
                            <ArrowLeft size={16} />
                            Back to Music
                        </Link>

                        <button
                            onClick={() => logout()}
                            className="flex w-full items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-medium text-white/80 transition hover:bg-white/10 hover:text-white"
                        >
                            <LogOut size={16} />
                            Sign out
                        </button>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-black p-4 text-white">
            <div className="w-full max-w-md rounded-[28px] border border-white/10 bg-[#111111] p-8">
                <div className="mb-6 flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/5">
                        <Music2 size={22} className="text-white/70" />
                    </div>

                    <h1 className="text-lg font-medium">
                        {mode === "login" ? "Welcome back" : "Create account"}
                    </h1>
                </div>

                <div className="mb-6 flex rounded-xl border border-white/10 bg-white/5 p-1">
                    {(["login", "signup"] as const).map((tab) => (
                        <button
                            key={tab}
                            onClick={() => switchMode(tab)}
                            className={`flex-1 rounded-lg px-4 py-2 text-sm font-medium transition duration-300 ${
                                mode === tab
                                    ? "bg-white/10 text-white"
                                    : "text-white/50 hover:text-white"
                            }`}
                        >
                            {tab === "login" ? "Sign in" : "Sign up"}
                        </button>
                    ))}
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    {mode === "signup" && (
                        <label className="flex items-center gap-3 rounded-xl border border-white/10 bg-[#1c1c1c] px-4 py-3 transition focus-within:border-white/20">
                            <User
                                size={18}
                                className="shrink-0 text-white/40"
                            />
                            <input
                                type="text"
                                value={username}
                                onChange={(event) =>
                                    setUsername(event.target.value)
                                }
                                placeholder="Username"
                                className="w-full bg-transparent text-sm text-white outline-none placeholder:text-white/35"
                            />
                        </label>
                    )}

                    <label className="flex items-center gap-3 rounded-xl border border-white/10 bg-[#1c1c1c] px-4 py-3 transition focus-within:border-white/20">
                        <Mail
                            size={18}
                            className="shrink-0 text-white/40"
                        />
                        <input
                            type="email"
                            value={email}
                            onChange={(event) =>
                                setEmail(event.target.value)
                            }
                            placeholder="Email"
                            className="w-full bg-transparent text-sm text-white outline-none placeholder:text-white/35"
                        />
                    </label>

                    <label className="flex items-center gap-3 rounded-xl border border-white/10 bg-[#1c1c1c] px-4 py-3 transition focus-within:border-white/20">
                        <Lock
                            size={18}
                            className="shrink-0 text-white/40"
                        />
                        <input
                            type="password"
                            value={password}
                            onChange={(event) =>
                                setPassword(event.target.value)
                            }
                            placeholder="Password"
                            className="w-full bg-transparent text-sm text-white outline-none placeholder:text-white/35"
                        />
                    </label>

                    {error && (
                        <p className="text-sm text-red-400">{error}</p>
                    )}

                    <button
                        type="submit"
                        className="rounded-xl bg-white px-4 py-3 text-sm font-medium text-black transition hover:bg-white/85"
                    >
                        {mode === "login" ? "Sign in" : "Create account"}
                    </button>
                </form>

                <p className="mt-6 text-center text-xs text-white/35">
                    Your music, your account.
                </p>
            </div>
        </div>
    )
}