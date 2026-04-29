import { useAppContext } from "../context/AppContext.jsx";

const navItems = [
  { key: "dashboard", label: "Dashboard" },
  { key: "users", label: "Korisnici" },
  { key: "teams", label: "Timovi" },
  { key: "reservations", label: "Rezervacije" },
  { key: "leagues", label: "Lige" },
  { key: "results", label: "Rezultati" }
];

function Layout({ children }) {
  const { currentPage, setCurrentPage, selectedRole, setSelectedRole } = useAppContext();

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand">
          <h1>Sports Manager</h1>
          <p>Sistem za upravljanje timovima, terminima i ligama</p>
        </div>

        <div className="role-box">
          <label htmlFor="role-select">Aktivna uloga</label>
          <select
            id="role-select"
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value)}
          >
            <option value="ADMIN">ADMIN</option>
            <option value="MANAGER">MANAGER</option>
            <option value="USER">USER</option>
          </select>
        </div>

        <div className="nav-box">
          <div className="nav-title">Navigacija</div>
          <div className="nav-list">
            {navItems.map((item) => (
              <button
                key={item.key}
                className={`nav-button ${currentPage === item.key ? "active" : ""}`}
                onClick={() => setCurrentPage(item.key)}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </aside>

      <main className="content">{children}</main>
    </div>
  );
}

export default Layout;