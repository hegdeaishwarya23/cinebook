import { Seat } from "@/types/seat";
import { PriceBreakdown } from "@/types/booking";

const BOOKING_FEE = 30;

export function calculatePricing(selectedSeats: Seat[]): PriceBreakdown {
  const subtotal = selectedSeats.reduce((sum, seat) => sum + seat.price, 0);
  const bookingFee = selectedSeats.length > 0 ? BOOKING_FEE : 0;
  const total = subtotal + bookingFee;

  return { subtotal, bookingFee, total };
}