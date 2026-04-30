import React from "react";
import { useAppContext } from "../context/AppContext.jsx";
import TeamModule from "../modules/teams/TeamModule.jsx";

function TeamsPage() {
  const { selectedRole, navigate } = useAppContext();
  const allowed = selectedRole === "ADMIN" || selectedRole === "CAPTAIN";

  if (!allowed) {
    return (
      <div className="app-page">
        <div className="page-header">
          <div>
            <h1>Timovi</h1>
            <p className="muted">Pristup ograničen na ADMIN i CAPTAIN uloge.</p>
          </div>
          <button className="secondary-button" onClick={() => navigate("dashboard")}>
            Nazad
          </button>
        </div>

        <div className="access-denied">
          Ova stranica je dostupna samo korisnicima sa ulogom ADMIN ili CAPTAIN.
        </div>
      </div>
    );
  }

  return (
    <div className="app-page">
      <div className="page-header">
        <div>
          <h1>Timovi</h1>
          <p className="muted">
            Kreiranje i pregled timova preko backend API-ja.
          </p>
        </div>
        <button className="secondary-button" onClick={() => navigate("dashboard")}>
          Nazad
        </button>
      </div>

      <TeamModule />
    </div>
  );
}

export default TeamsPage;