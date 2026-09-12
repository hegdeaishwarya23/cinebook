import { Seat } from "./seat";

export type PaymentMethod = "card" | "wallet" | "credits";

export interface CartState {
  movieId: string;
  showtime: string;
  selectedSeats: Seat[];
}

export interface PriceBreakdown {
  subtotal: number;
  bookingFee: number;
  total: number;
}

export interface Booking {
  id: string;               // e.g. "CB-4471-QX"
  movieId: string;
  showtime: string;
  seats: Seat[];
  paymentMethod: PaymentMethod;
  pricing: PriceBreakdown;
  confirmedAt: string;      // ISO timestamp
}