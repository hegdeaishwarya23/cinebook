import Header from "@/components/Header";
import SeatSelection from "@/components/SeatSelection";
import { Movie } from "@/types/movie";
import { Seat } from "@/types/seat";

interface MovieWithSeats extends Movie {
  seats: Seat[];
}

async function getMovie(id: string): Promise<MovieWithSeats> {
  const res = await fetch(`http://localhost:3000/api/movies/${id}`);
  return res.json();
}

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function MovieDetailPage({ params }: PageProps) {
  const { id } = await params;
  const movie = await getMovie(id);

  return (
    <>
      <Header />
      <main className="p-6 max-w-3xl mx-auto">
        <SeatSelection movie={movie} />
      </main>
    </>
  );
}