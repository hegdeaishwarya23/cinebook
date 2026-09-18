import { Seat, SeatCategory, SeatStatus } from "@/types/seat";

const ROWS = ["A", "B", "C", "D", "E", "F", "G", "H"];
const SEATS_PER_ROW = 12;
const VIP_ROWS = ["A", "B"];
const STANDARD_PRICE = 250;
const VIP_PRICE = 450;
const SOLD_OUT_PROBABILITY = 0.08;

export function generateSeats(): Seat[] {
  const seats: Seat[] = [];

  for (const row of ROWS) {
    for (let number = 1; number <= SEATS_PER_ROW; number++) {
      const category: SeatCategory = VIP_ROWS.includes(row) ? "vip" : "standard";
      const price = category === "vip" ? VIP_PRICE : STANDARD_PRICE;

      const status: SeatStatus =
        Math.random() < SOLD_OUT_PROBABILITY ? "sold-out" : "available";

      seats.push({
        id: `${row}${number}`,
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