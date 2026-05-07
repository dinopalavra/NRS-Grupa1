import React from "react";
import { useAppContext } from "../context/AppContext.jsx";
import { IconUsers, IconShield, IconClock, IconCalendar } from "../components/Layout.jsx";

const IconCheckCircle = () => (
  <svg className="stat-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/>
    <polyline points="9 12 11 14 15 10"/>
  </svg>
);

const IconHourglass = () => (
  <svg className="stat-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 22h14"/>
    <path d="M5 2h14"/>
    <path d="M17 22v-4.172a2 2 0 0 0-.586-1.414L12 12l-4.414 4.414A2 2 0 0 0 7 17.828V22"/>
    <path d="M7 2v4.172a2 2 0 0 0 .586 1.414L12 12l4.414-4.414A2 2 0 0 0 17 6.172V2"/>
  </svg>
);

const FEATURE_CARDS = [
  {
    key: "users",
    Icon: IconUsers,
    title: "Korisnici",
    desc: "Pregled i upravljanje korisnicima. Dodaj nove naloge ili provjeri postojeće.",
    label: "Otvori korisnike",
    roles: ["ADMIN"],
  },
  {
    key: "teams",
    Icon: IconShield,
    title: "Timovi",
    desc: "Kreiraj i upravljaj fudbalskim timovima. Pregled svih registrovanih timova.",
    label: "Otvori timove",
    roles: ["ADMIN", "CAPTAIN"],
  },
  {
    key: "timeslots",
    Icon: IconClock,
    title: "Termini",
    desc: "Upravljaj raspoloživim terminima. Dodaj nove slobodne termine za teren.",
    label: "Otvori termine",
    roles: null,
  },
  {
    key: "reservations",
    Icon: IconCalendar,
    title: "Rezervacije",
    desc: "Kreiraj rezervacije i prati njihov status. Admin može odobriti ili odbiti zahtjeve.",
    label: "Otvori rezervacije",
    roles: null,
  },
];

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

  const visibleCards = FEATURE_CARDS.filter(
    (c) => c.roles === null || c.roles.includes(selectedRole)
  );

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
        {selectedRole === "ADMIN" && (
          <div className="stat-card">
            <span className="stat-icon"><IconUsers className="stat-svg" /></span>
            <strong>{users.length}</strong>
            <span className="stat-label">Korisnici</span>
          </div>
        )}
        {(selectedRole === "ADMIN" || selectedRole === "CAPTAIN") && (
          <div className="stat-card">
            <span className="stat-icon"><IconShield className="stat-svg" /></span>
            <strong>{teams.length}</strong>
            <span className="stat-label">Timovi</span>
          </div>
        )}
        <div className="stat-card">
          <span className="stat-icon"><IconCheckCircle /></span>
          <strong>{availableSlots}</strong>
          <span className="stat-label">Slobodni termini</span>
        </div>
        <div className="stat-card">
          <span className="stat-icon"><IconHourglass /></span>
          <strong>{pendingRes}</strong>
          <span className="stat-label">Čekaju odobrenje</span>
        </div>
      </div>

      <div className="card-grid">
        {visibleCards.map(({ key, Icon, title, desc, label }) => (
          <div key={key} className="feature-card">
            <div className="feature-card-icon">
              <Icon className="feature-svg" />
            </div>
            <h3>{title}</h3>
            <p>{desc}</p>
            <button className="button" onClick={() => navigate(key)}>
              {label}
            </button>
          </div>
        ))}
      </div>

    </div>
  );
}

export default DashboardPage;
