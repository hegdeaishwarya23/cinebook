import { describe, test, expect } from "@jest/globals";
import { calculatePricing } from "./pricing";
import { Seat } from "@/types/seat";

describe("calculatePricing", () => {
  test("calculates total for two standard seats", () => {
    const seats: Seat[] = [
      { id: "C4", row: "C", number: 4, category: "standard", status: "available", price: 250 },
      { id: "C5", row: "C", number: 5, category: "standard", status: "available", price: 250 },
    ];

    const result = calculatePricing(seats);

    expect(result.subtotal).toBe(500);
    expect(result.bookingFee).toBe(30);
    expect(result.total).toBe(530);
  });

  test("returns zero fee when no seats are selected", () => {
    const result = calculatePricing([]);

    expect(result.subtotal).toBe(0);
    expect(result.bookingFee).toBe(0);
    expect(result.total).toBe(0);
  });

  test("correctly mixes standard and VIP seat prices", () => {
    const seats: Seat[] = [
      { id: "A1", row: "A", number: 1, category: "vip", status: "available", price: 450 },
      { id: "C4", row: "C", number: 4, category: "standard", status: "available", price: 250 },
    ];

    const result = calculatePricing(seats);

    expect(result.subtotal).toBe(700);
    expect(result.total).toBe(730);
  });
});