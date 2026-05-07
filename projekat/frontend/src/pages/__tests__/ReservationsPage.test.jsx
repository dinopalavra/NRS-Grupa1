import "@testing-library/jest-dom/vitest";
import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { vi } from "vitest";
import ReservationsPage from "../ReservationsPage.jsx";

const mockContext = {
  currentUser: { id: 1, role: "ADMIN", username: "amel" },
  selectedRole: "ADMIN",
  teams: [{ id: 1, name: "Tim A" }],
  availableTimeSlots: [
    {
      id: 10,
      slotDate: "2026-05-11",
      startTime: "18:00",
      endTime: "19:00",
      location: "Dvorana 1",
      resourceName: "Teren A",
      availabilityStatus: "AVAILABLE"
    }
  ],
  reservations: [
    {
      id: 100,
      teamId: 1,
      teamName: "Tim A",
      slotId: 10,
      location: "Dvorana 1",
      resourceName: "Teren A",
      slotDate: "2026-05-11",
      startTime: "18:00",
      endTime: "19:00",
      createdByUserId: 1,
      createdByUsername: "amel",
      status: "PENDING",
      note: "Napomena",
      createdAt: "2026-05-07T00:00:00"
    }
  ],
  loadingTeams: false,
  loadingAvailableTimeSlots: false,
  loadingReservations: false,
  createReservationEntry: vi.fn().mockResolvedValue({}),
  approveReservationEntry: vi.fn().mockResolvedValue({}),
  rejectReservationEntry: vi.fn().mockResolvedValue({}),
  cancelReservationEntry: vi.fn().mockResolvedValue({})
};

vi.mock("../../context/AppContext.jsx", () => ({
  useAppContext: () => mockContext
}));

describe("ReservationsPage", () => {
  it("renders available slots and reservations", () => {
    render(<ReservationsPage />);

    expect(screen.getByText("Dostupni termini")).toBeInTheDocument();
    expect(screen.getByText("Nova rezervacija")).toBeInTheDocument();
    expect(screen.getByText("Pregled rezervacija")).toBeInTheDocument();
    expect(screen.getAllByText("Tim A").length).toBeGreaterThan(0);
  });

  it("submits a new reservation", async () => {
    render(<ReservationsPage />);

    fireEvent.change(screen.getByLabelText("Tim"), { target: { value: "1" } });
    fireEvent.change(screen.getByLabelText("Termin"), { target: { value: "10" } });
    fireEvent.click(screen.getByRole("button", { name: "Kreiraj rezervaciju" }));

    expect(mockContext.createReservationEntry).toHaveBeenCalled();
  });
});