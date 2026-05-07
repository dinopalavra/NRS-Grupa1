import React from "react";
import { useAppContext } from "../context/AppContext.jsx";
import { IconUsers, IconShield, IconClock, IconCalendar, IconTrophy } from "../components/Layout.jsx";

const IconCheckCircle = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 20, height: 20 }}>
    <circle cx="12" cy="12" r="10"/><polyline points="9 12 11 14 15 10"/>
  </svg>
);
const IconHourglass = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 20, height: 20 }}>
    <path d="M5 22h14"/><path d="M5 2h14"/>
    <path d="M17 22v-4.172a2 2 0 0 0-.586-1.414L12 12l-4.414 4.414A2 2 0 0 0 7 17.828V22"/>
    <path d="M7 2v4.172a2 2 0 0 0 .586 1.414L12 12l4.414-4.414A2 2 0 0 0 17 6.172V2"/>
  </svg>
);

const ALL_FEATURE_CARDS = [
  {
    key: "users",
    Icon: IconUsers,
    title: "Korisnici",
    desc: "Pregled i upravljanje svim korisničkim nalozima. Dodaj novog korisnika ili provjeri postojeće.",
    label: "Otvori korisnike",
    roles: ["ADMIN"],
    color: "card-blue",
  },
  {
    key: "teams",
    Icon: IconShield,
    title: "Timovi",
    desc: "Kreiraj i upravljaj fudbalskim timovima. Pregled registrovanih timova i njihovih članova.",
    label: "Otvori timove",
    roles: ["ADMIN", "CAPTAIN"],
    color: "card-purple",
  },
  {
    key: "timeslots",
    Icon: IconClock,
    title: "Termini",
    desc: "Pregled raspoloživih termina za rezervaciju. Administratori dodaju nove termine.",
    label: "Otvori termine",
    roles: null,
    color: "card-green",
  },
  {
    key: "reservations",
    Icon: IconCalendar,
    title: "Rezervacije",
    desc: "Kreiraj rezervacije i prati njihov status. Admin odobrava ili odbija zahtjeve.",
    label: "Otvori rezervacije",
    roles: null,
    color: "card-orange",
  },
  {
    key: "liga",
    Icon: IconTrophy,
    title: "Liga",
    desc: "Kreiranje liga, dodavanje timova, unos rezultata i automatska tabela. Dolazi u Sprintu 7.",
    label: "Otvori ligu",
    roles: null,
    color: "card-gold",
    soon: true,
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
    navigate,
  } = useAppContext();

  const availableSlots = timeSlots.filter(s => s.availabilityStatus === "AVAILABLE").length;
  const pendingRes     = reservations.filter(r => r.status === "PENDING").length;
  const approvedRes    = reservations.filter(r => r.status === "APPROVED").length;

  const visibleCards = ALL_FEATURE_CARDS.filter(
    c => c.roles === null || c.roles.includes(selectedRole)
  );

  const displayName = currentUser?.fullName || currentUser?.username || "korisnik";

  const ROLE_LABEL = {
    ADMIN:               "Administrator",
    CAPTAIN:             "Kapiten tima",
    PLAYER:              "Igrač",
    REFEREE_SCOREKEEPER: "Sudija / Zapisničar",
  };

  return (
    <div className="app-page">

      <div className="dashboard-welcome">
        <div className="dashboard-welcome-text">
          <h1 className="page-title">Dobrodošao, {displayName}</h1>
          <p className="page-subtitle">
            Prijavljen kao <strong>{ROLE_LABEL[selectedRole] || selectedRole}</strong> ·{" "}
            <span className={`inline-status ${backendStatus.ok ? "online" : "offline"}`}>
              {backendStatus.ok ? "● Backend online" : "● Backend offline"}
            </span>
          </p>
        </div>
      </div>

      <div className="dashboard-stats">
        {selectedRole === "ADMIN" && (
          <div className="dash-stat dash-stat-blue">
            <div className="dash-stat-icon"><IconUsers className="dash-stat-svg" /></div>
            <div className="dash-stat-body">
              <div className="dash-stat-val">{users.length}</div>
              <div className="dash-stat-label">Korisnici</div>
            </div>
          </div>
        )}
        {(selectedRole === "ADMIN" || selectedRole === "CAPTAIN") && (
          <div className="dash-stat dash-stat-purple">
            <div className="dash-stat-icon"><IconShield className="dash-stat-svg" /></div>
            <div className="dash-stat-body">
              <div className="dash-stat-val">{teams.length}</div>
              <div className="dash-stat-label">Timovi</div>
            </div>
          </div>
        )}
        <div className="dash-stat dash-stat-green">
          <div className="dash-stat-icon"><IconCheckCircle /></div>
          <div className="dash-stat-body">
            <div className="dash-stat-val">{availableSlots}</div>
            <div className="dash-stat-label">Slobodnih termina</div>
          </div>
        </div>
        <div className="dash-stat dash-stat-orange">
          <div className="dash-stat-icon"><IconHourglass /></div>
          <div className="dash-stat-body">
            <div className="dash-stat-val">{pendingRes}</div>
            <div className="dash-stat-label">Na čekanju</div>
          </div>
        </div>
        {approvedRes > 0 && (
          <div className="dash-stat dash-stat-teal">
            <div className="dash-stat-icon"><IconCalendar className="dash-stat-svg" /></div>
            <div className="dash-stat-body">
              <div className="dash-stat-val">{approvedRes}</div>
              <div className="dash-stat-label">Odobrenih</div>
            </div>
          </div>
        )}
      </div>

      <div className="dashboard-cards">
        {visibleCards.map(({ key, Icon, title, desc, label, color, soon }) => (
          <div key={key} className={`dash-card ${color} ${soon ? "dash-card-soon" : ""}`}>
            <div className="dash-card-icon">
              <Icon className="dash-card-svg" />
            </div>
            <div className="dash-card-body">
              <div className="dash-card-title-row">
                <h3 className="dash-card-title">{title}</h3>
                {soon && <span className="dash-card-badge">Uskoro</span>}
              </div>
              <p className="dash-card-desc">{desc}</p>
            </div>
            <button
              className={`dash-card-btn ${soon ? "btn-secondary" : "btn-primary"}`}
              onClick={() => navigate(key)}
            >
              {label}
            </button>
          </div>
        ))}
      </div>

    </div>
  );
}

export default DashboardPage;
