"use client";

import { useState } from "react";
import Link from "next/link";

interface ConfirmBookingProps {
  movieTitle: string;
  seatCount: number;
  total: number;
}

export default function ConfirmBooking({
  movieTitle,
  seatCount,
  total,
}: ConfirmBookingProps) {
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [bookingId] = useState(
    () => `CB-${Math.floor(1000 + Math.random() * 9000)}-${Math.random().toString(36).slice(2, 4).toUpperCase()}`
  );

  return (
    <>
      <button
        onClick={() => setIsConfirmed(true)}
        className="w-full bg-primary text-white py-2.5 rounded-control text-sm font-medium mt-4"
      >
        Confirm booking
      </button>

      {isConfirmed && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-card p-6 max-w-sm w-full text-center">
            <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto mb-4 text-2xl">
              ✓
            </div>
            <h2 className="text-lg font-semibold text-gray-900 mb-1">
              Booking confirmed!
            </h2>
            <p className="text-sm text-gray-500 mb-4">
              {seatCount} seats for {movieTitle}
            </p>

            <div className="bg-gray-50 rounded-control p-3 mb-4 text-sm">
              <div className="flex justify-between text-gray-600 mb-1">
                <span>Booking ID</span>
                <span className="font-mono text-gray-900">{bookingId}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Total paid</span>
                <span className="font-medium text-gray-900">₹{total}</span>
              </div>
            </div>

            <Link
              href="/"
              className="block w-full bg-primary text-white py-2.5 rounded-control text-sm font-medium"
            >
              Done
            </Link>
          </div>
        </div>
      )}
    </>
  );
}