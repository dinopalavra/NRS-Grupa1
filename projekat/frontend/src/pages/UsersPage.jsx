import React from "react";
import { useAppContext } from "../context/AppContext.jsx";
import UserModule from "../modules/users/UserModule.jsx";

function UsersPage() {
  const { selectedRole, navigate } = useAppContext();

  if (selectedRole !== "ADMIN") {
    return (
      <div className="app-page">
        <div className="page-header">
          <div>
            <h1>Korisnici</h1>
            <p className="muted">Pristup ograničen na administratore.</p>
          </div>
          <button className="secondary-button" onClick={() => navigate("dashboard")}>
            Nazad
          </button>
        </div>

        <div className="access-denied">
          Ova stranica je dostupna samo korisnicima sa ulogom ADMIN.
        </div>
      </div>
    );
  }

  return (
    <div className="app-page">
      <div className="page-header">
        <div>
          <h1>Korisnici</h1>
          <p className="muted">
            Upravljanje korisnicima, registracija i pregled naloga iz baze.
          </p>
        </div>
        <button className="secondary-button" onClick={() => navigate("dashboard")}>
          Nazad
        </button>
      </div>

      <UserModule />
    </div>
  );
}

export default UsersPage;