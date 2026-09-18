import Image from "next/image";
import { Movie } from "@/types/movie";

interface MovieCardProps {
  movie: Movie;
}

export default function MovieCard({ movie }: MovieCardProps) {
  return (
    <div className="cursor-pointer">
      <div className="relative aspect-[3/4] rounded-card bg-gray-100 flex items-center justify-center mb-3 overflow-hidden">
        {movie.posterUrl ? (
          <Image
            src={movie.posterUrl}
            alt={movie.title}
            fill
            sizes="(max-width: 768px) 50vw, 33vw"
            className="object-cover"
          />
        ) : (
          <span className="text-xs text-gray-400">{movie.genre}</span>
        )}
        <span className="absolute top-2 right-2 flex items-center gap-1 bg-black/60 text-white text-xs px-2 py-0.5 rounded-full z-10">
          ★ {movie.rating}
        </span>
      </div>
      <h3 className="text-base font-semibold text-gray-900">{movie.title}</h3>
      <p className="text-sm text-gray-500 mt-0.5">
        {movie.genre} · {movie.duration}
      </p>
      <div className="flex gap-1.5 mt-2 flex-wrap">
        {movie.showtimes.map((time) => (
          <span
            key={time}
            className="text-xs border border-gray-200 rounded px-2 py-1 text-gray-600 font-mono"
          >
            {time}
          </span>
        ))}
      </div>
    </div>
  );
}