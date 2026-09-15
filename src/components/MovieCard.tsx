import { Movie } from "@/types/movie";
import Image from "next/image";

interface MovieCardProps {
  movie: Movie;
}

export default function MovieCard({ movie }: MovieCardProps) {
  return (
    <div className="cursor-pointer">
      <div className="relative h-56 rounded-card bg-gray-100 flex items-center justify-center mb-2 overflow-hidden">
          {movie.posterUrl ? (
          <Image
            src={movie.posterUrl}
            alt={movie.title}
            fill
            className="object-cover"
          />
        ) : (
          <span className="text-xs text-gray-400">{movie.genre}</span>
        )}
        <span className="absolute top-2 right-2 flex items-center gap-1 bg-black/60 text-white text-xs px-2 py-0.5 rounded-full">
          ★ {movie.rating}
        </span>
      </div>
      <h3 className="text-sm font-medium text-gray-900">{movie.title}</h3>
      <p className="text-xs text-gray-500 mt-0.5">
        {movie.genre} · {movie.duration}
      </p>
      <div className="flex gap-1.5 mt-1.5 flex-wrap">
        {movie.showtimes.map((time) => (
          <span
            key={time}
            className="text-xs border border-gray-200 rounded px-1.5 py-0.5 text-gray-600"
          >
            {time}
          </span>
        ))}
      </div>
    </div>
  );
}