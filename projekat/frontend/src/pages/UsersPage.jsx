import { useAppContext } from "../context/AppContext.jsx";
import UserModule from "../modules/users/UserModule.jsx";

function UsersPage() {
  const { selectedRole } = useAppContext();

  return (
    <>
      <div className="page-header">
        <div>
          <h2 className="page-title">Korisnici</h2>
          <p className="page-subtitle">
            Upravljanje korisnicima, ulogama i osnovnim pregledom naloga.
          </p>
        </div>
        <div className="badge">RBAC demo</div>
      </div>

      {selectedRole !== "ADMIN" ? (
        <div className="card">
          <h3>Pristup ograničen</h3>
          <p className="page-subtitle">
            Ova stranica je dostupna samo kada je aktivna uloga ADMIN.
          </p>
          <div className="warning-box">
            U lijevom meniju promijenite ulogu na ADMIN da biste testirali korisnički modul.
          </div>
        </div>
      ) : (
        <UserModule />
      )}
    </>
  );
}

export default UsersPage;