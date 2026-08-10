import { useSyncExternalStore } from "react"

type StoredUser = {
    username: string
    email: string
    password: string
}

export type SessionUser = {
    username: string
    email: string
}

const USERS_KEY = "iridium.users"
const SESSION_KEY = "iridium.session"
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function readUsers(): StoredUser[] {
    if (typeof window === "undefined") return []

    try {
        const raw = window.localStorage.getItem(USERS_KEY)
        return raw ? (JSON.parse(raw) as StoredUser[]) : []
    } catch {
        return []
    }
}

function readSession(): SessionUser | null {
    if (typeof window === "undefined") return null

    try {
        const raw = window.localStorage.getItem(SESSION_KEY)
        return raw ? (JSON.parse(raw) as SessionUser) : null
    } catch {
        return null
    }
}

let session = readSession()

const listeners = new Set<() => void>()

function subscribe(callback: () => void) {
    listeners.add(callback)
    return () => listeners.delete(callback)
}

function getSession() {
    return session
}

function persistSession(next: SessionUser | null) {
    session = next

    if (typeof window !== "undefined") {
        if (next) {
            window.localStorage.setItem(SESSION_KEY, JSON.stringify(next))
        } else {
            window.localStorage.removeItem(SESSION_KEY)
        }
    }

    listeners.forEach((callback) => callback())
}

export function useAuthSession() {
    return useSyncExternalStore(subscribe, getSession, () => null)
}

export type AuthResult = {
    ok: boolean
    error?: string
}

export function signup(
    username: string,
    email: string,
    password: string
): AuthResult {
    const trimmedUsername = username.trim()
    const normalizedEmail = email.trim().toLowerCase()

    if (trimmedUsername.length < 3) {
        return { ok: false, error: "Username must be at least 3 characters." }
    }

    if (!EMAIL_RE.test(normalizedEmail)) {
        return { ok: false, error: "Enter a valid email address." }
    }

    if (password.length < 6) {
        return { ok: false, error: "Password must be at least 6 characters." }
    }

    const users = readUsers()

    if (
        users.some(
            (user) => user.email.toLowerCase() === normalizedEmail
        )
    ) {
        return { ok: false, error: "An account with this email already exists." }
    }

    if (
        users.some(
            (user) =>
                user.username.toLowerCase() === trimmedUsername.toLowerCase()
        )
    ) {
        return { ok: false, error: "This username is already taken." }
    }

    users.push({
        username: trimmedUsername,
        email: normalizedEmail,
        password
    })

    window.localStorage.setItem(USERS_KEY, JSON.stringify(users))
    persistSession({ username: trimmedUsername, email: normalizedEmail })

    return { ok: true }
}

export function login(email: string, password: string): AuthResult {
    const normalizedEmail = email.trim().toLowerCase()
    const user = readUsers().find(
        (candidate) => candidate.email.toLowerCase() === normalizedEmail
    )

    if (!user || user.password !== password) {
        return { ok: false, error: "Invalid email or password." }
    }

    persistSession({ username: user.username, email: user.email })

    return { ok: true }
}

export function logout() {
    persistSession(null)
}