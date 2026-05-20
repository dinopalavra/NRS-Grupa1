import React, { useEffect, useMemo, useState } from "react";
import { useAppContext } from "../context/AppContext.jsx";
import { IconUsers, IconShield, IconClock, IconCalendar, IconTrophy } from "../components/Layout.jsx";
import { formatDate, formatTime } from "../utils/format.js";
import { fetchAllMatches } from "../services/api.js";

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
  { key: "users",        Icon: IconUsers,    title: "Korisnici",   desc: "Pregled i upravljanje svim korisničkim nalozima.",             label: "Otvori korisnike",   roles: ["ADMIN"],            color: "card-blue"   },
  { key: "teams",        Icon: IconShield,   title: "Timovi",      desc: "Kreiraj i upravljaj sportskim timovima.",                       label: "Otvori timove",      roles: ["ADMIN", "CAPTAIN"], color: "card-purple" },
  { key: "timeslots",    Icon: IconClock,    title: "Termini",     desc: "Pregled raspoloživih termina za rezervaciju.",                  label: "Otvori termine",     roles: null,                 color: "card-green"  },
  { key: "reservations", Icon: IconCalendar, title: "Rezervacije", desc: "Kreiraj rezervacije i prati njihov status.",                    label: "Otvori rezervacije", roles: null,                 color: "card-orange" },
  { key: "liga",         Icon: IconTrophy,   title: "Liga",        desc: "Kreiranje liga, zakazivanje utakmica i tabela poretka.",        label: "Otvori ligu",        roles: null,                 color: "card-gold"   },
];

const ROLE_LABEL = {
  ADMIN:               "Administrator",
  CAPTAIN:             "Kapiten tima",
  PLAYER:              "Igrač",
  REFEREE_SCOREKEEPER: "Sudija / Zapisničar",
};

function DashboardPage() {
  const {
    auth,
    currentUser,
    selectedRole,
    users,
    teams,
    timeSlots,
    reservations,
    leagues,
    backendStatus,
    navigate,
    notifications,
    unreadCount,
  } = useAppContext();

  const [matches, setMatches] = useState([]);

  useEffect(() => {
    if (!auth?.token) return;
    fetchAllMatches(auth.token).then(d => setMatches(Array.isArray(d) ? d : []))
      .catch(() => setMatches([]));
  }, [auth?.token]);

  const availableSlots = timeSlots.filter(s => s.availabilityStatus === "AVAILABLE").length;
  const pendingRes     = reservations.filter(r => r.status === "PENDING").length;
  const approvedRes    = reservations.filter(r => r.status === "APPROVED").length;
  const visibleCards   = ALL_FEATURE_CARDS.filter(c => c.roles === null || c.roles.includes(selectedRole));
  const displayName    = currentUser?.fullName || currentUser?.username || "korisnik";
  const userId         = currentUser?.userId || currentUser?.id;

  const upcomingMatches = useMemo(() => {
    const today = new Date().toISOString().slice(0, 10);
    return matches
      .filter(m => m.status === "SCHEDULED" && m.matchDate >= today)
      .sort((a, b) => a.matchDate < b.matchDate ? -1 : 1)
      .slice(0, 5);
  }, [matches]);

  const myReservations = useMemo(() => {
    if (!userId) return [];
    return reservations
      .filter(r => r.createdByUserId === userId)
      .sort((a, b) => a.slotDate < b.slotDate ? 1 : -1)
      .slice(0, 5);
  }, [reservations, userId]);

  const recompletedMatches = useMemo(() => {
    return matches
      .filter(m => m.status === "COMPLETED")
      .slice(0, 5);
  }, [matches]);

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
            {unreadCount > 0 && (
              <>
                {" · "}
                <span style={{ color: "var(--gold-light, #c9a87c)" }}>
                  {unreadCount} {unreadCount === 1 ? "nova notifikacija" : "novih notifikacija"}
                </span>
              </>
            )}
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
        {selectedRole === "ADMIN" && (
          <div className="dash-stat dash-stat-gold">
            <div className="dash-stat-icon"><IconTrophy className="dash-stat-svg" /></div>
            <div className="dash-stat-body">
              <div className="dash-stat-val">{leagues.length}</div>
              <div className="dash-stat-label">Lige</div>
            </div>
          </div>
        )}
      </div>

      {/* Role-specific section */}
      <div className="dashboard-role-section">
        {selectedRole === "ADMIN" && (
          <div className="dashboard-two-col">
            <div className="content-card">
              <div className="content-card-header">
                <h2 className="content-card-title">Rezervacije na čekanju</h2>
                <p className="content-card-subtitle">{pendingRes} čeka vašu akciju</p>
              </div>
              {pendingRes === 0 ? (
                <div className="empty-state-mini">Nema rezervacija na čekanju.</div>
              ) : (
                <ul className="dash-list">
                  {reservations.filter(r => r.status === "PENDING").slice(0, 5).map(r => (
                    <li key={r.id} className="dash-list-item">
                      <div className="dash-list-main">{r.teamName} · {r.resourceName}</div>
                      <div className="dash-list-sub">{formatDate(r.slotDate)} {formatTime(r.startTime)}</div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <div className="content-card">
              <div className="content-card-header">
                <h2 className="content-card-title">Nedavna obavještenja</h2>
                <p className="content-card-subtitle">{unreadCount} nepročitanih</p>
              </div>
              {notifications.length === 0 ? (
                <div className="empty-state-mini">Nema obavještenja.</div>
              ) : (
                <ul className="dash-list">
                  {notifications.slice(0, 5).map(n => (
                    <li key={n.id} className="dash-list-item">
                      <div className="dash-list-main">{n.message}</div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        )}

        {selectedRole === "CAPTAIN" && (
          <div className="dashboard-two-col">
            <div className="content-card">
              <div className="content-card-header">
                <h2 className="content-card-title">Moje rezervacije</h2>
                <p className="content-card-subtitle">Posljednje rezervacije koje sam kreirao</p>
              </div>
              {myReservations.length === 0 ? (
                <div className="empty-state-mini">Još nemate rezervacija.</div>
              ) : (
                <ul className="dash-list">
                  {myReservations.map(r => (
                    <li key={r.id} className="dash-list-item">
                      <div className="dash-list-main">{r.teamName} · {r.resourceName}</div>
                      <div className="dash-list-sub">
                        {formatDate(r.slotDate)} {formatTime(r.startTime)} ·{" "}
                        <span className={`status-chip status-${String(r.status).toLowerCase()}`} style={{ marginLeft: 4 }}>
                          {r.status}
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <div className="content-card">
              <div className="content-card-header">
                <h2 className="content-card-title">Nadolazeće utakmice</h2>
                <p className="content-card-subtitle">Sljedećih 5 zakazanih</p>
              </div>
              {upcomingMatches.length === 0 ? (
                <div className="empty-state-mini">Nema nadolazećih utakmica.</div>
              ) : (
                <ul className="dash-list">
                  {upcomingMatches.map(m => (
                    <li key={m.id} className="dash-list-item">
                      <div className="dash-list-main">{m.homeTeamName} vs {m.awayTeamName}</div>
                      <div className="dash-list-sub">
                        {formatDate(m.matchDate)} {m.startTime ? formatTime(m.startTime) : ""} · {m.leagueName}
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        )}

        {selectedRole === "PLAYER" && (
          <div className="content-card">
            <div className="content-card-header">
              <h2 className="content-card-title">Nadolazeće utakmice</h2>
              <p className="content-card-subtitle">Predstojeće utakmice u sistemu</p>
            </div>
            {upcomingMatches.length === 0 ? (
              <div className="empty-state-mini">Nema nadolazećih utakmica.</div>
            ) : (
              <ul className="dash-list">
                {upcomingMatches.map(m => (
                  <li key={m.id} className="dash-list-item">
                    <div className="dash-list-main">{m.homeTeamName} vs {m.awayTeamName}</div>
                    <div className="dash-list-sub">
                      {formatDate(m.matchDate)} {m.startTime ? formatTime(m.startTime) : ""} · {m.leagueName}
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}

        {selectedRole === "REFEREE_SCOREKEEPER" && (
          <div className="dashboard-two-col">
            <div className="content-card">
              <div className="content-card-header">
                <h2 className="content-card-title">Utakmice bez rezultata</h2>
                <p className="content-card-subtitle">Zakazane utakmice koje čekaju rezultat</p>
              </div>
              {upcomingMatches.length === 0 ? (
                <div className="empty-state-mini">Nema utakmica.</div>
              ) : (
                <ul className="dash-list">
                  {upcomingMatches.map(m => (
                    <li key={m.id} className="dash-list-item">
                      <div className="dash-list-main">{m.homeTeamName} vs {m.awayTeamName}</div>
                      <div className="dash-list-sub">{formatDate(m.matchDate)} · {m.leagueName}</div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <div className="content-card">
              <div className="content-card-header">
                <h2 className="content-card-title">Nedavno odigrane</h2>
                <p className="content-card-subtitle">Rezultati koje ste možda zabilježili</p>
              </div>
              {recompletedMatches.length === 0 ? (
                <div className="empty-state-mini">Nema završenih utakmica.</div>
              ) : (
                <ul className="dash-list">
                  {recompletedMatches.map(m => (
                    <li key={m.id} className="dash-list-item">
                      <div className="dash-list-main">{m.homeTeamName} {m.homeScore} : {m.awayScore} {m.awayTeamName}</div>
                      <div className="dash-list-sub">{formatDate(m.matchDate)} · {m.leagueName}</div>
                    </li>
                  ))}
                </ul>
              )}
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
