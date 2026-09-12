import { NextResponse } from "next/server";
import movieData from "@/lib/data/movie-data.json"

export async function GET() {
    return NextResponse.json(movieData)
}