import "@testing-library/jest-dom/vitest";
import React from "react";
import { render, screen } from "@testing-library/react";
import { vi } from "vitest";
import AppRouter from "../AppRouter.jsx";

let mockedContext = {
  currentPage: "dashboard",
  isAuthenticated: false
};

vi.mock("../../context/AppContext.jsx", () => ({
  useAppContext: () => mockedContext
}));

vi.mock("../../pages/LoginPage.jsx", () => ({
  default: () => <div>LoginPage</div>
}));

vi.mock("../../pages/DashboardPage.jsx", () => ({
  default: () => <div>DashboardPage</div>
}));

vi.mock("../../pages/UsersPage.jsx", () => ({
  default: () => <div>UsersPage</div>
}));

vi.mock("../../pages/TeamsPage.jsx", () => ({
  default: () => <div>TeamsPage</div>
}));

vi.mock("../../pages/ReservationsPage.jsx", () => ({
  default: () => <div>ReservationsPage</div>
}));

describe("AppRouter", () => {
  it("renders login page when user is not authenticated", () => {
    mockedContext = { currentPage: "dashboard", isAuthenticated: false };
    render(<AppRouter />);
    expect(screen.getByText("LoginPage")).toBeInTheDocument();
  });

  it("renders reservations page when current page is reservations", () => {
    mockedContext = { currentPage: "reservations", isAuthenticated: true };
    render(<AppRouter />);
    expect(screen.getByText("ReservationsPage")).toBeInTheDocument();
  });
});