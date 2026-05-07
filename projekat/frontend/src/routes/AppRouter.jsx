import React from "react";
import { useAppContext } from "../context/AppContext.jsx";
import LoginPage from "../pages/LoginPage.jsx";
import DashboardPage from "../pages/DashboardPage.jsx";
import UsersPage from "../pages/UsersPage.jsx";
import TeamsPage from "../pages/TeamsPage.jsx";

function AppRouter() {
  const { currentPage, isAuthenticated } = useAppContext();

  if (!isAuthenticated) {
    return <LoginPage />;
  }

  switch (currentPage) {
    case "users":
      return <UsersPage />;
    case "teams":
      return <TeamsPage />;
    case "dashboard":
    default:
      return <DashboardPage />;
  }
}

export default AppRouter;