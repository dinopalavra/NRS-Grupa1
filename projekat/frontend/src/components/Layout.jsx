import React from "react";
import { useAppContext } from "../context/AppContext.jsx";

const navItems = [
  { key: "dashboard", label: "Dashboard" },
  { key: "users", label: "Korisnici" },
  { key: "teams", label: "Timovi" },
  { key: "timeslots", label: "Time slotovi" },
  { key: "reservations", label: "Rezervacije" }
];

function Layout({ children }) {
  const { currentPage, navigate, selectedRole, isAuthenticated, logout } = useAppContext();

  if (!isAuthenticated) {
    return children;
  }

  return (
    <div className="layout-shell">
      <aside className="layout-sidebar">
        <div className="layout-brand">
          <h1>Sports Manager</h1>
          <span className="badge">Uloga: {selectedRole}</span>
        </div>

        <nav className="layout-nav">
          {navItems.map((item) => (
            <button
              key={item.key}
              type="button"
              onClick={() => navigate(item.key)}
              className={`nav-item ${currentPage === item.key ? "is-active" : ""}`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        <button type="button" className="btn btn-secondary" onClick={logout}>
          Odjava
        </button>
      </aside>

      <main className="layout-content">{children}</main>
    </div>
  );
}

export default Layout;