"use client";

import { useState } from "react";
import Link from "next/link";
import MovieCard from "@/components/MovieCard";
import { Movie } from "@/types/movie";

interface MovieGridProps {
  movies: Movie[];
}

export default function MovieGrid({ movies }: MovieGridProps) {
  const [activeGenre, setActiveGenre] = useState("All");

  const genres = ["All", ...Array.from(new Set(movies.map((m) => m.genre)))];

  const filteredMovies =
    activeGenre === "All"
      ? movies
      : movies.filter((m) => m.genre === activeGenre);

  return (
    <main className="p-6 max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Now showing</h1>
          <p className="text-sm text-gray-500">
            Downtown Cinema ·{" "}
            {new Date().toLocaleDateString("en-US", {
              weekday: "long",
              day: "numeric",
              month: "long",
            })}
          </p>
        </div>
        <div className="flex gap-2">
          {genres.map((genre) => (
            <button
              key={genre}
              onClick={() => setActiveGenre(genre)}
              className={`text-sm px-4 py-1.5 rounded-full border ${
                activeGenre === genre
                  ? "bg-primary text-white border-primary"
                  : "bg-white text-gray-600 border-gray-200"
              }`}
            >
              {genre}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {filteredMovies.map((movie) => (
          <Link key={movie.id} href={`/movies/${movie.id}`}>
            <MovieCard movie={movie} />
          </Link>
        ))}
      </div>
    </main>
  );
}