import React from "react";
import { useAppContext } from "../context/AppContext.jsx";
import NotificationBell from "./NotificationBell.jsx";

/* ── SVG Icons ─────────────────────────────────────────────── */

const IconGrid = ({ className = "nav-icon" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/>
    <rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>
  </svg>
);

const IconUsers = ({ className = "nav-icon" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
    <path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
  </svg>
);

const IconShield = ({ className = "nav-icon" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
  </svg>
);

const IconClock = ({ className = "nav-icon" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
  </svg>
);

const IconCalendar = ({ className = "nav-icon" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
    <line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
  </svg>
);

const IconTrophy = ({ className = "nav-icon" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/>
    <path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/>
    <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/>
    <path d="M18 2H6v7a6 6 0 0 0 12 0V2z"/>
  </svg>
);

const IconUser = ({ className = "nav-icon" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
  </svg>
);

const IconLogOut = () => (
  <svg style={{ width: 15, height: 15 }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
    <polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/>
  </svg>
);

const IconMenu = () => (
  <svg style={{ width: 18, height: 18 }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>
  </svg>
);

const IconClose = () => (
  <svg style={{ width: 18, height: 18 }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
  </svg>
);

const Logo = () => (
  <svg width="20" height="20" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="2" y="2" width="28" height="28" rx="3" stroke="#c9a87c" strokeWidth="1.6" fill="none"/>
    <line x1="16" y1="2" x2="16" y2="30" stroke="#c9a87c" strokeWidth="1" opacity="0.55"/>
    <circle cx="16" cy="16" r="5.5" stroke="#c9a87c" strokeWidth="1.2" fill="none"/>
    <circle cx="16" cy="16" r="1.6" fill="#c9a87c"/>
    <path d="M10 2 Q10 7 16 7 Q22 7 22 2" stroke="#c9a87c" strokeWidth="1" opacity="0.45" fill="none"/>
    <path d="M10 30 Q10 25 16 25 Q22 25 22 30" stroke="#c9a87c" strokeWidth="1" opacity="0.45" fill="none"/>
  </svg>
);

/* ── Nav config ─────────────────────────────────────────────── */

const ALL_NAV = [
  { key: "dashboard",    label: "Dashboard",   Icon: IconGrid,     roles: null },
  { key: "users",        label: "Korisnici",   Icon: IconUsers,    roles: ["ADMIN"] },
  { key: "teams",        label: "Timovi",      Icon: IconShield,   roles: ["ADMIN", "CAPTAIN"] },
  { key: "timeslots",    label: "Termini",     Icon: IconClock,    roles: null },
  { key: "reservations", label: "Rezervacije", Icon: IconCalendar, roles: null },
  { key: "liga",         label: "Liga",        Icon: IconTrophy,   roles: null },
  { key: "profile",      label: "Profil",      Icon: IconUser,     roles: null },
];

function getNavItems(role) {
  return ALL_NAV.filter(item => item.roles === null || item.roles.includes(role));
}

function getInitials(name) {
  if (!name) return "?";
  return name.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase();
}

/* ── Layout ─────────────────────────────────────────────────── */

function Layout({ children }) {
  const { currentPage, navigate, selectedRole, isAuthenticated, logout, currentUser } = useAppContext();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  if (!isAuthenticated) return children;

  const displayName = currentUser?.fullName || currentUser?.username || "Korisnik";
  const navItems = getNavItems(selectedRole);

  const handleNavigate = (key) => {
    navigate(key);
    setMobileOpen(false);
  };

  return (
    <div className="layout-shell">

      {/* ── Top navigation bar ────────────────────────── */}
      <header className="layout-topbar">

        {/* Brand */}
        <button className="topbar-brand" type="button" onClick={() => handleNavigate("dashboard")}>
          <div className="topbar-logo-icon"><Logo /></div>
          <span className="topbar-brand-name">Pitch Manager</span>
        </button>

        {/* Desktop nav items */}
        <nav className="topbar-nav">
          {navItems.map(({ key, label }) => (
            <button
              key={key}
              type="button"
              onClick={() => handleNavigate(key)}
              className={`topbar-nav-item ${currentPage === key ? "is-active" : ""}`}
            >
              {label}
            </button>
          ))}
        </nav>

        {/* Right actions */}
        <div className="topbar-actions">
          <NotificationBell />
          <div className="topbar-user">
            <div className="topbar-avatar">{getInitials(displayName)}</div>
            <div className="topbar-user-text">
              <span className="topbar-username">{displayName}</span>
              <span className="topbar-role">{selectedRole}</span>
            </div>
          </div>
          <button type="button" className="btn-logout-top" onClick={logout} title="Odjava">
            <IconLogOut />
          </button>
          {/* Mobile hamburger */}
          <button
            type="button"
            className="topbar-hamburger"
            onClick={() => setMobileOpen(v => !v)}
            aria-label="Meni"
          >
            {mobileOpen ? <IconClose /> : <IconMenu />}
          </button>
        </div>

      </header>

      {/* ── Mobile dropdown nav ───────────────────────── */}
      {mobileOpen && (
        <>
          <div className="topbar-mobile-backdrop" onClick={() => setMobileOpen(false)} />
          <nav className="topbar-mobile-nav">
            {navItems.map(({ key, label, Icon }) => (
              <button
                key={key}
                type="button"
                onClick={() => handleNavigate(key)}
                className={`topbar-mobile-item ${currentPage === key ? "is-active" : ""}`}
              >
                <Icon className="nav-icon" />
                <span>{label}</span>
              </button>
            ))}
          </nav>
        </>
      )}

      {/* ── Main content — full width ─────────────────── */}
      <main className={`layout-content layout-bg--${currentPage}`}>
        {children}
      </main>

    </div>
  );
}

export { IconUsers, IconShield, IconClock, IconCalendar, IconGrid, IconTrophy, IconUser };
export default Layout;
