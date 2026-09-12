export type SeatCategory = "standard" | "vip";
export type SeatStatus = "available" | "selected" | "sold-out";

export interface Seat {
  id: string;              // e.g. "B9"
  row: string;              // e.g. "B"
  number: number;           // e.g. 9
  category: SeatCategory;
  status: SeatStatus;
  price: number;
}

export interface Zone {
  id: string;
  category: SeatCategory;
  label: string;
  colorToken: string;       // maps to a Tailwind/design token, not a raw hex
}