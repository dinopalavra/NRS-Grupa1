import React from "react";
import { useAppContext } from "../context/AppContext.jsx";

/* ── SVG Icon components ───────────────────────────────────── */

const IconGrid = ({ className = "nav-icon" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="7" height="7" rx="1"/>
    <rect x="14" y="3" width="7" height="7" rx="1"/>
    <rect x="3" y="14" width="7" height="7" rx="1"/>
    <rect x="14" y="14" width="7" height="7" rx="1"/>
  </svg>
);

const IconUsers = ({ className = "nav-icon" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
    <circle cx="9" cy="7" r="4"/>
    <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
    <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
  </svg>
);

const IconShield = ({ className = "nav-icon" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
  </svg>
);

const IconClock = ({ className = "nav-icon" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/>
    <polyline points="12 6 12 12 16 14"/>
  </svg>
);

const IconCalendar = ({ className = "nav-icon" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
    <line x1="16" y1="2" x2="16" y2="6"/>
    <line x1="8" y1="2" x2="8" y2="6"/>
    <line x1="3" y1="10" x2="21" y2="10"/>
  </svg>
);

const IconLogOut = () => (
  <svg style={{ width: 15, height: 15, flexShrink: 0 }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
    <polyline points="16 17 21 12 16 7"/>
    <line x1="21" y1="12" x2="9" y2="12"/>
  </svg>
);

const IconBall = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/>
    <path d="M12 2a10 10 0 0 1 6.88 2.74L12 12 5.12 4.74A10 10 0 0 1 12 2z" strokeWidth="0" fill="white" fillOpacity="0.25"/>
    <path d="M12 12l6.88-7.26M12 12l-6.88-7.26M12 12v10M12 12l8.66 5M12 12l-8.66 5"/>
  </svg>
);

/* ── Role-based nav items ──────────────────────────────────── */

const ALL_NAV = [
  { key: "dashboard",    label: "Dashboard",   Icon: IconGrid,     roles: null },
  { key: "users",        label: "Korisnici",   Icon: IconUsers,    roles: ["ADMIN"] },
  { key: "teams",        label: "Timovi",      Icon: IconShield,   roles: ["ADMIN", "CAPTAIN"] },
  { key: "timeslots",    label: "Termini",     Icon: IconClock,    roles: null },
  { key: "reservations", label: "Rezervacije", Icon: IconCalendar, roles: null },
];

function getNavItems(role) {
  return ALL_NAV.filter(item => item.roles === null || item.roles.includes(role));
}

function getInitials(name) {
  if (!name) return "?";
  return name.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase();
}

/* ── Layout ────────────────────────────────────────────────── */

function Layout({ children }) {
  const { currentPage, navigate, selectedRole, isAuthenticated, logout, currentUser } = useAppContext();

  if (!isAuthenticated) return children;

  const displayName = currentUser?.fullName || currentUser?.username || "Korisnik";
  const navItems = getNavItems(selectedRole);

  return (
    <div className="layout-shell">
      <aside className="layout-sidebar">

        <div className="layout-brand">
          <div className="brand-logo">
            <div className="brand-icon">
              <IconBall />
            </div>
            <div>
              <div className="brand-title">Pitch Manager</div>
              <div className="brand-tagline">Fudbalski termini</div>
            </div>
          </div>
          <div className="brand-role-pill">
            <span className="brand-role-dot" />
            {selectedRole}
          </div>
        </div>

        <nav className="layout-nav">
          <div className="nav-section-label">Navigacija</div>
          {navItems.map(({ key, label, Icon }) => (
            <button
              key={key}
              type="button"
              onClick={() => navigate(key)}
              className={`nav-item ${currentPage === key ? "is-active" : ""}`}
            >
              <Icon />
              {label}
            </button>
          ))}
        </nav>

        <div className="layout-sidebar-footer">
          <div className="sidebar-user">
            <div className="sidebar-user-avatar">{getInitials(displayName)}</div>
            <div className="sidebar-user-info">
              <div className="sidebar-user-name">{displayName}</div>
              <div className="sidebar-user-role">{currentUser?.username || selectedRole}</div>
            </div>
          </div>
          <button type="button" className="btn-logout" onClick={logout}>
            <IconLogOut />
            Odjava
          </button>
        </div>

      </aside>

      <main className="layout-content">{children}</main>
    </div>
  );
}

export { IconUsers, IconShield, IconClock, IconCalendar, IconGrid };
export default Layout;
