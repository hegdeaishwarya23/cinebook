import Header from "@/components/Header";
import Link from "next/link";
import ConfirmBooking from "@/components/ConfirmBooking";
import { Movie } from "@/types/movie";
import { Seat } from "@/types/seat";
import { calculatePricing } from "@/lib/pricing";

interface MovieWithSeats extends Movie {
  seats: Seat[];
}

async function getMovie(id: string): Promise<MovieWithSeats> {
  const res = await fetch(`http://localhost:3000/api/movies/${id}`);
  return res.json();
}

interface CheckoutPageProps {
  searchParams: Promise<{ movieId?: string; seats?: string }>;
}

export default async function CheckoutPage({ searchParams }: CheckoutPageProps) {
  const { movieId, seats: seatsParam } = await searchParams;

  if (!movieId || !seatsParam) {
    return (
      <>
        <Header />
        <main className="p-6 max-w-2xl mx-auto">
          <p className="text-gray-500 mb-2">No seats selected.</p>
          <Link href="/" className="text-primary text-sm">
            Back to movies
          </Link>
        </main>
      </>
    );
  }

  const movie = await getMovie(movieId);
  const selectedSeatIds = seatsParam.split(",");
  const selectedSeats = movie.seats.filter((seat) =>
    selectedSeatIds.includes(seat.id)
  );
  const pricing = calculatePricing(selectedSeats);

  return (
    <>
      <Header />
      <main className="p-6 max-w-2xl mx-auto">
        <div className="flex items-center gap-3 mb-6">
          <Link
            href={`/movies/${movie.id}`}
            className="text-gray-500 hover:text-gray-900 text-xl"
          >
            ←
          </Link>
          <h1 className="text-lg font-medium text-gray-900">Checkout</h1>
        </div>

        <div className="bg-gray-50 rounded-card p-4 mb-4">
          <p className="text-xs font-medium text-gray-400 tracking-wide mb-3">
            ORDER SUMMARY
          </p>
          <div className="flex gap-3 pb-3 border-b border-gray-200 mb-3">
            <div className="w-14 h-14 rounded bg-gray-200 flex-shrink-0" />
            <div>
              <p className="text-sm font-medium text-gray-900">{movie.title}</p>
              <p className="text-xs text-gray-500">
                {movie.genre} · {movie.duration}
              </p>
            </div>
          </div>
          {selectedSeats.map((seat) => (
            <div key={seat.id} className="flex items-center justify-between text-sm py-1">
              <span className="text-gray-700">
                Seat {seat.id} · {seat.category === "vip" ? "VIP" : "Standard"}
              </span>
              <span className="text-gray-900">₹{seat.price}</span>
            </div>
          ))}
        </div>

        <div className="bg-gray-50 rounded-card p-4">
          <div className="flex justify-between text-sm mb-1">
            <span className="text-gray-600">Tickets ({selectedSeats.length})</span>
            <span className="text-gray-900">₹{pricing.subtotal}</span>
          </div>
          <div className="flex justify-between text-sm mb-3">
            <span className="text-gray-600">Booking fee</span>
            <span className="text-gray-900">₹{pricing.bookingFee}</span>
          </div>
          <div className="flex justify-between text-base font-medium border-t border-gray-200 pt-3">
            <span>Total</span>
            <span>₹{pricing.total}</span>
          </div>
          <ConfirmBooking
            movieTitle={movie.title}
            seatCount={selectedSeats.length}
            total={pricing.total}
          />
        </div>
      </main>
    </>
  );
}