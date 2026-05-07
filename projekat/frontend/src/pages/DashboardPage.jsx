import React from "react";
import { useAppContext } from "../context/AppContext.jsx";

function DashboardPage() {
  const {
    currentUser,
    selectedRole,
    users,
    teams,
    timeSlots,
    reservations,
    backendStatus,
    navigate
  } = useAppContext();

  const availableSlots = timeSlots.filter((s) => s.availabilityStatus === "AVAILABLE").length;
  const pendingRes = reservations.filter((r) => r.status === "PENDING").length;

  return (
    <div className="app-page">

      <div className="top-bar">
        <div>
          <h1 className="page-title">Dashboard</h1>
          <p className="page-subtitle">
            Dobrodošao, <strong>{currentUser?.fullName || currentUser?.username || "korisnik"}</strong>
          </p>
        </div>
        <div className="top-bar-actions">
          <span className="badge">{selectedRole}</span>
          <span className={`badge ${backendStatus.ok ? "badge-success" : "badge-danger"}`}>
            {backendStatus.ok ? "● Online" : "● Offline"}
          </span>
        </div>
      </div>

      <div className="stat-grid">
        <div className="stat-card">
          <span className="stat-icon">👥</span>
          <strong>{users.length}</strong>
          <span className="stat-label">Korisnici</span>
        </div>
        <div className="stat-card">
          <span className="stat-icon">🛡️</span>
          <strong>{teams.length}</strong>
          <span className="stat-label">Timovi</span>
        </div>
        <div className="stat-card">
          <span className="stat-icon">🟢</span>
          <strong>{availableSlots}</strong>
          <span className="stat-label">Slobodni termini</span>
        </div>
        <div className="stat-card">
          <span className="stat-icon">⏳</span>
          <strong>{pendingRes}</strong>
          <span className="stat-label">Čekaju odobrenje</span>
        </div>
      </div>

      <div className="card-grid">
        <div className="feature-card">
          <div className="feature-card-icon">👥</div>
          <h3>Korisnici</h3>
          <p>Pregled i upravljanje korisnicima. Dodaj nove naloge ili provjeri postojeće.</p>
          <button className="button" onClick={() => navigate("users")}>
            Otvori korisnike
          </button>
        </div>

        <div className="feature-card">
          <div className="feature-card-icon">🛡️</div>
          <h3>Timovi</h3>
          <p>Kreiraj i upravljaj fudbalskim timovima. Pregled svih registrovanih timova.</p>
          <button className="button" onClick={() => navigate("teams")}>
            Otvori timove
          </button>
        </div>

        <div className="feature-card">
          <div className="feature-card-icon">🕐</div>
          <h3>Termini</h3>
          <p>Upravljaj raspoloživim terminima. Dodaj nove slobodne termine za teren.</p>
          <button className="button" onClick={() => navigate("timeslots")}>
            Otvori termine
          </button>
        </div>

        <div className="feature-card">
          <div className="feature-card-icon">📅</div>
          <h3>Rezervacije</h3>
          <p>Kreiraj rezervacije i prati njihov status. Admin može odobriti ili odbiti zahtjeve.</p>
          <button className="button" onClick={() => navigate("reservations")}>
            Otvori rezervacije
          </button>
        </div>
      </div>

    </div>
  );
}

export default DashboardPage;
