import { NextRequest, NextResponse } from "next/server"
import { searchMusic } from "../lib/engine"

export const dynamic = "force-dynamic"

export async function GET(request: NextRequest) {
    const q = request.nextUrl.searchParams.get("q") || ""
    const limit = request.nextUrl.searchParams.get("limit") || "30"

    const result = await searchMusic(q, parseInt(limit))

    const response = NextResponse.json(result)
    response.headers.set("cache-control", "public, max-age=120")
    return response
}
