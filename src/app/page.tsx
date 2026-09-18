import Header from "@/components/Header";
import MovieGrid from "@/components/MovieGrid";
import { Movie } from "@/types/movie";

async function getMovies(): Promise<Movie[]> {
  const res = await fetch("http://localhost:3000/api/movies");
  return res.json();
}

export default async function Home() {
  const movies = await getMovies();

  return (
    <>
      <Header />
      <MovieGrid movies={movies} />
    </>
  );
}