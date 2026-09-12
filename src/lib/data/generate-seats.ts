import { Seat, SeatCategory, SeatStatus } from "@/types/seat";

// Config describing the venue layout — change these values later
// to resize the venue without touching the generation logic below.
const ROWS = ["A", "B", "C", "D", "E", "F", "G", "H"];
const SEATS_PER_ROW = 12;
const VIP_ROWS = ["A", "B"];
const STANDARD_PRICE = 12;
const VIP_PRICE = 19;
const SOLD_OUT_PROBABILITY = 0.08;

export function generateSeats(): Seat[] {
  const seats: Seat[] = [];

  // Outer loop: walk through each row letter (A, B, C...)
  for (const row of ROWS) {
    // Inner loop: walk through each seat number in that row (1 to 12)
    for (let number = 1; number <= SEATS_PER_ROW; number++) {
      const category: SeatCategory = VIP_ROWS.includes(row) ? "vip" : "standard";
      const price = category === "vip" ? VIP_PRICE : STANDARD_PRICE;

      // Randomly mark some seats sold-out. Math.random() returns
      // a decimal between 0 and 1, so this fires ~8% of the time.
      const status: SeatStatus =
        Math.random() < SOLD_OUT_PROBABILITY ? "sold-out" : "available";

      seats.push({
        id: `${row}${number}`,      // e.g. "B9"
        row,
        number,
        category,
        status,
        price,
      });
    }
  }

  return seats;
}