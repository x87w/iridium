import { NextRequest, NextResponse } from "next/server"
import { resolveStream } from "../lib/engine"

export const dynamic = "force-dynamic"

export async function GET(request: NextRequest) {
    const params = request.nextUrl.searchParams
    const id = params.get("id")
    const title = params.get("title") || undefined
    const artist = params.get("artist") || undefined

    if (!id) {
        return NextResponse.json(
            { error: "Missing required parameter: id" },
            { status: 400 }
        )
    }

    let streamUrl: string
    let streamMime: string

    try {
        const result = await resolveStream(id, { title, artist })
        streamUrl = result.url
        streamMime = result.mimeType
    } catch (error) {
        return NextResponse.json(
            {
                error: "Failed to resolve stream",
                detail: error instanceof Error ? error.message : String(error)
            },
            { status: 502 }
        )
    }

    const headers: Record<string, string> = {}
    const range = request.headers.get("range")
    if (typeof range === "string") headers["range"] = range

    let upstream: Response
    try {
        upstream = await fetch(streamUrl, { headers })
    } catch (e) {
        return NextResponse.json(
            {
                error: "Upstream fetch failed",
                detail: e instanceof Error ? e.message : String(e)
            },
            { status: 502 }
        )
    }

    const responseHeaders = new Headers()
    responseHeaders.set(
        "content-type",
        upstream.headers.get("content-type") || streamMime || "audio/mp4"
    )
    const contentLength = upstream.headers.get("content-length")
    if (contentLength) responseHeaders.set("content-length", contentLength)
    const contentRange = upstream.headers.get("content-range")
    if (contentRange) responseHeaders.set("content-range", contentRange)
    responseHeaders.set(
        "accept-ranges",
        upstream.headers.get("accept-ranges") || "bytes"
    )
    responseHeaders.set("cache-control", "no-store")

    if (!upstream.body) return new Response(null, { status: upstream.status })

    return new Response(upstream.body, {
        status: upstream.status,
        headers: responseHeaders
    })
}
