import React from "react";
import { useAppContext } from "../context/AppContext.jsx";
import DashboardPage from "../pages/DashboardPage.jsx";
import UsersPage from "../pages/UsersPage.jsx";
import TeamsPage from "../pages/TeamsPage.jsx";
import ReservationsPage from "../pages/ReservationsPage.jsx";
import LeaguesPage from "../pages/LeaguesPage.jsx";
import ResultsPage from "../pages/ResultsPage.jsx";

function AppRouter() {
  const { currentPage } = useAppContext();

  switch (currentPage) {
    case "users":
      return <UsersPage />;
    case "teams":
      return <TeamsPage />;
    case "reservations":
      return <ReservationsPage />;
    case "leagues":
      return <LeaguesPage />;
    case "results":
      return <ResultsPage />;
    default:
      return <DashboardPage />;
  }
}

export default AppRouter;