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

    try {
        const result = await resolveStream(id, { title, artist })
        return NextResponse.json(result)
    } catch (error) {
        return NextResponse.json(
            {
                error: "Failed to resolve stream",
                detail: error instanceof Error ? error.message : String(error)
            },
            { status: 502 }
        )
    }
}
