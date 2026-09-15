import movieData from "@/lib/data/movie-data.json";
import { generateSeats } from "@/lib/data/generate-seats";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  // params is now a Promise — must await it
  const { id } = await params;
const movie = movieData.find((m) => m.id === id);
console.log(movie);
if(movie){
  return NextResponse.json({...movie , seats:generateSeats()})
}
else{
    return NextResponse.json({ error: "Movie not found" }, { status: 404 });
}
}
