import React from "react";
import { useAppContext } from "../context/AppContext.jsx";

function DashboardPage() {
  const {
    currentUser,
    selectedRole,
    users,
    teams,
    backendStatus,
    navigate,
    logout
  } = useAppContext();

  return (
    <div className="app-page">
      <div className="top-bar">
        <div>
          <h1>Dashboard</h1>
          <p className="muted">
            Prijavljeni korisnik: {currentUser?.fullName} ({currentUser?.username})
          </p>
        </div>

        <div className="top-bar-actions">
          <span className="badge">{selectedRole}</span>
          <span className={`badge ${backendStatus.ok ? "badge-success" : "badge-danger"}`}>
            {backendStatus.ok ? "Backend online" : "Backend offline"}
          </span>
          <button className="secondary-button" onClick={() => navigate("users")}>
            Korisnici
          </button>
          <button className="secondary-button" onClick={() => navigate("teams")}>
            Timovi
          </button>
          <button className="danger-button" onClick={logout}>
            Odjava
          </button>
        </div>
      </div>

      <div className="stat-grid">
        <div className="stat-card">
          <span className="muted">Broj korisnika</span>
          <strong>{users.length}</strong>
        </div>
        <div className="stat-card">
          <span className="muted">Broj timova</span>
          <strong>{teams.length}</strong>
        </div>
        <div className="stat-card">
          <span className="muted">Aktivna uloga</span>
          <strong>{selectedRole}</strong>
        </div>
      </div>

      <div className="card-grid">
        <div className="card">
          <h3>Sprint 5 status</h3>
          <p className="muted">
            Prijava, registracija, korisnici i timovi rade kao prvi funkcionalni inkrement.
          </p>
        </div>

        <div className="card">
          <h3>Korisnici</h3>
          <p className="muted">
            Admin može pregledati korisnike iz baze i dodavati nove korisnike.
          </p>
          <button className="button" onClick={() => navigate("users")}>
            Otvori korisnike
          </button>
        </div>

        <div className="card">
          <h3>Timovi</h3>
          <p className="muted">
            Timovi se sada učitavaju i kreiraju preko backend endpointa.
          </p>
          <button className="button" onClick={() => navigate("teams")}>
            Otvori timove
          </button>
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;