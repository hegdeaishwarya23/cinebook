import { Movie } from "@/types/movie";
import MovieCard from "@/components/MovieCard";

async function getMovies(): Promise<Movie[]> {
  const res = await fetch("http://localhost:3000/api/movies");
  return res.json();
}

export default async function Home() {
  const movies = await getMovies();
  console.log("movies", movies);
  return (
    <main>
      <div>
        <h1>Now Showing</h1>
        <div>
          <p>DownTown Cinema</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      </div>
    </main>
  );
}
