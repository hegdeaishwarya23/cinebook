"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Movie } from "@/types/movie";
import { Seat } from "@/types/seat";
import { calculatePricing } from "@/lib/pricing";

interface MovieWithSeats extends Movie {
  seats: Seat[];
}

interface SeatSelectionProps {
  movie: MovieWithSeats;
}

export default function SeatSelection({ movie }: SeatSelectionProps) {
  const router = useRouter();
  const [selectedSeatIds, setSelectedSeatIds] = useState<Set<string>>(new Set());

  function toggleSeat(seat: Seat) {
    if (seat.status === "sold-out") return;

    setSelectedSeatIds((prev) => {
      const next = new Set(prev);
      if (next.has(seat.id)) {
        next.delete(seat.id);
      } else {
        next.add(seat.id);
      }
      return next;
    });
  }

  function handleContinue() {
    const seatIds = Array.from(selectedSeatIds).join(",");
    router.push(`/checkout?movieId=${movie.id}&seats=${seatIds}`);
  }

  const selectedSeats = movie.seats.filter((seat) => selectedSeatIds.has(seat.id));
  const pricing = calculatePricing(selectedSeats);

  const seatsByRow = movie.seats.reduce<Record<string, Seat[]>>((acc, seat) => {
    if (!acc[seat.row]) acc[seat.row] = [];
    acc[seat.row].push(seat);
    return acc;
  }, {});

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <Link href="/" className="text-gray-500 hover:text-gray-900 text-xl">
          ←
        </Link>
        <div>
          <h1 className="text-lg font-medium text-gray-900">{movie.title}</h1>
          <p className="text-sm text-gray-500">
            {movie.genre} · {movie.duration}
          </p>
        </div>
      </div>

      <div className="flex gap-4">
        <div className="flex-1 bg-gray-50 rounded-card p-4">
          <div className="text-center mb-4">
            <div className="h-2 bg-gray-200 rounded w-1/2 mx-auto mb-1" />
            <p className="text-xs text-gray-400">Screen</p>
          </div>

          <div className="flex flex-col items-center gap-1.5">
            {Object.entries(seatsByRow).map(([row, seats]) => (
              <div key={row} className="flex gap-1.5">
                {seats.map((seat) => {
                  const isSelected = selectedSeatIds.has(seat.id);
                  const isSoldOut = seat.status === "sold-out";

                  let bgColor = "bg-white border border-gray-300";
                  if (isSoldOut) bgColor = "bg-gray-200 opacity-40 cursor-not-allowed";
                  else if (isSelected) bgColor = "bg-primary text-white";
                  else if (seat.category === "vip") bgColor = "bg-amber-100 border border-amber-300";

                  return (
                    <button
                      key={seat.id}
                      onClick={() => toggleSeat(seat)}
                      disabled={isSoldOut}
                      className={`w-7 h-7 rounded text-[10px] flex items-center justify-center ${bgColor}`}
                    >
                      {seat.number}
                    </button>
                  );
                })}
              </div>
            ))}
          </div>
        </div>

        <div className="w-56 bg-gray-50 rounded-card p-4 h-fit">
          <p className="text-xs font-medium text-gray-400 tracking-wide mb-3">LEGEND</p>
          <div className="flex items-center justify-between text-sm mb-2">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-sm bg-white border border-gray-300" />
              <span className="text-gray-700">Standard</span>
            </div>
            <span className="text-gray-500">₹250</span>
          </div>
          <div className="flex items-center justify-between text-sm mb-2">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-sm bg-amber-100 border border-amber-300" />
              <span className="text-gray-700">VIP recliner</span>
            </div>
            <span className="text-gray-500">₹450</span>
          </div>
          <div className="flex items-center gap-2 text-sm mb-2">
            <span className="w-3 h-3 rounded-sm bg-primary" />
            <span className="text-gray-700">Selected</span>
          </div>
          <div className="flex items-center gap-2 text-sm mb-3">
            <span className="w-3 h-3 rounded-sm bg-gray-200" />
            <span className="text-gray-700">Sold out</span>
          </div>
          <div className="border-t border-gray-200 pt-3">
            <p className="text-xs text-gray-400">
              Seats are held for 10 minutes after selection.
            </p>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between bg-gray-50 rounded-card p-4 mt-4">
        <div className="text-sm text-gray-600">
          {selectedSeats.length} seats selected ·{" "}
          <span className="font-medium text-gray-900">₹{pricing.total}</span>
        </div>
        <button
          onClick={handleContinue}
          disabled={selectedSeats.length === 0}
          className="bg-primary text-white px-4 py-2 rounded-control text-sm font-medium disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Continue
        </button>
      </div>
    </div>
  );
}