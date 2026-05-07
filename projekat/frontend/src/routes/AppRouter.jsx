import React from "react";
import { useAppContext } from "../context/AppContext.jsx";
import LoginPage from "../pages/LoginPage.jsx";
import DashboardPage from "../pages/DashboardPage.jsx";
import UsersPage from "../pages/UsersPage.jsx";
import TeamsPage from "../pages/TeamsPage.jsx";
import ReservationsPage from "../pages/ReservationsPage.jsx";
import TimeSlotsPage from "../pages/TimeSlotsPage.jsx";
import LigaPage from "../pages/LigaPage.jsx";

function AppRouter() {
  const { currentPage, isAuthenticated } = useAppContext();

  if (!isAuthenticated) {
    return <LoginPage />;
  }

  switch (currentPage) {
    case "users":        return <UsersPage />;
    case "teams":        return <TeamsPage />;
    case "timeslots":    return <TimeSlotsPage />;
    case "reservations": return <ReservationsPage />;
    case "liga":         return <LigaPage />;
    case "dashboard":
    default:             return <DashboardPage />;
  }
}

export default AppRouter;