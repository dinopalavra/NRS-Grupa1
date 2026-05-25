import React from "react";
import { useAppContext } from "../context/AppContext.jsx";
import TeamModule from "../modules/teams/TeamModule.jsx";

function TeamsPage() {
  const { selectedRole, teams, myMembership } = useAppContext();
  const allowed = selectedRole === "ADMIN"
                || selectedRole === "CAPTAIN"
                || selectedRole === "PLAYER";

  if (!allowed) {
    return (
      <div className="app-page">
        <div className="page-hero">
          <div className="page-hero-text">
            <h1 className="page-title">Timovi</h1>
            <p className="page-subtitle">Pristup ograničen.</p>
          </div>
        </div>
        <div className="page-body">
          <div className="content-card">
            <div className="empty-state">
              <div className="empty-state-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
              </div>
              <p>Ova stranica nije dostupna vašoj ulozi.</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const isPlayer = selectedRole === "PLAYER";
  const playerHasNoTeam = isPlayer && !myMembership;

  const subtitle = isPlayer
    ? (playerHasNoTeam
        ? "Niste član nijednog tima — kontaktirajte kapitena ili admina da vas dodaju."
        : "Pregled tima u kojem ste član.")
    : selectedRole === "CAPTAIN"
      ? "Pregled vašeg tima i upravljanje rosterom."
      : "Kreiranje i pregled svih sportskih timova registrovanih u sistemu.";

  // Za PLAYER prikazujemo broj timova kao 1 (njihov tim) ili 0
  const teamCount = isPlayer
    ? (myMembership ? 1 : 0)
    : teams.length;

  return (
    <div className="app-page">
      <div className="page-hero">
        <div className="page-hero-text">
          <h1 className="page-title">Timovi</h1>
          <p className="page-subtitle">{subtitle}</p>
        </div>
        <div className="page-hero-stats">
          <div className="mini-stat mini-stat-total">
            <span className="mini-stat-val">{teamCount}</span>
            <span className="mini-stat-label">{isPlayer ? "moj tim" : "timova"}</span>
          </div>
        </div>
      </div>
      <div className="page-body">
        <TeamModule />
      </div>
    </div>
  );
}

export default TeamsPage;
