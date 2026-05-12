import React from "react";
import { useAppContext } from "../context/AppContext.jsx";
import UserModule from "../modules/users/UserModule.jsx";

function UsersPage() {
  const { selectedRole, users } = useAppContext();

  if (selectedRole !== "ADMIN") {
    return (
      <div className="app-page">
        <div className="page-hero">
          <div className="page-hero-text">
            <h1 className="page-title">Korisnici</h1>
            <p className="page-subtitle">Pristup ograničen na administratore.</p>
          </div>
        </div>
        <div className="page-body">
          <div className="content-card">
            <div className="empty-state">
              <div className="empty-state-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
              </div>
              <p>Ova stranica je dostupna samo korisnicima sa ulogom ADMIN.</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="app-page">
      <div className="page-hero">
        <div className="page-hero-text">
          <h1 className="page-title">Korisnici</h1>
          <p className="page-subtitle">
            Upravljanje korisnicima, registracija i pregled naloga iz baze.
          </p>
        </div>
        <div className="page-hero-stats">
          <div className="mini-stat mini-stat-total">
            <span className="mini-stat-val">{users.length}</span>
            <span className="mini-stat-label">registrovanih</span>
          </div>
        </div>
      </div>
      <div className="page-body">
        <UserModule />
      </div>
    </div>
  );
}

export default UsersPage;
