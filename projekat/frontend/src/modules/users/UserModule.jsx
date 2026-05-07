import React, { useEffect, useState } from "react";
import { useAppContext } from "../../context/AppContext.jsx";

function UserModule() {
  const { users, registerUser, removeUser, loadUsers, loadingUsers, currentUser } = useAppContext();

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    username: "",
    password: "",
    role: "PLAYER"
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => {
    loadUsers();
  }, [loadUsers]);

  const onChange = (event) => {
    setForm((prev) => ({
      ...prev,
      [event.target.name]: event.target.value
    }));
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    setMessage("");
    setError("");

    if (!form.fullName.trim() || !form.email.trim() || !form.username.trim() || !form.password.trim()) {
      setError("Unesite puno ime, email, username i lozinku.");
      return;
    }

    setSubmitting(true);

    try {
      await registerUser(form);
      setMessage("Korisnik je uspješno kreiran u backend bazi.");
      setForm({ fullName: "", email: "", username: "", password: "", role: "PLAYER" });
    } catch (err) {
      setError(err.message || "Kreiranje korisnika nije uspjelo.");
    } finally {
      setSubmitting(false);
    }
  };

  const onDelete = async (user) => {
    const selfId = currentUser?.userId ?? currentUser?.id ?? null;
    if (selfId && Number(selfId) === Number(user.id)) {
      setError("Ne možete obrisati vlastiti nalog.");
      return;
    }
    if (!window.confirm(`Obrisati korisnika "${user.fullName || user.username}"? Ova akcija je nepovratna.`)) return;

    setDeletingId(user.id);
    setError("");
    setMessage("");
    try {
      await removeUser(user.id);
      setMessage(`Korisnik "${user.fullName || user.username}" je obrisan.`);
    } catch (err) {
      setError(err.message || "Brisanje nije uspjelo.");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="module-layout">
      <div className="card">
        <h3>Novi korisnik</h3>

        {error && <p className="error-text">{error}</p>}
        {message && <p className="success-text">{message}</p>}

        <form className="form" onSubmit={onSubmit}>
          <div className="form-grid">
            <div className="input-group">
              <label>Ime i prezime</label>
              <input className="input" name="fullName" value={form.fullName} onChange={onChange} />
            </div>
            <div className="input-group">
              <label>Email</label>
              <input className="input" name="email" value={form.email} onChange={onChange} />
            </div>
            <div className="input-group">
              <label>Korisničko ime</label>
              <input className="input" name="username" value={form.username} onChange={onChange} />
            </div>
            <div className="input-group">
              <label>Lozinka</label>
              <input className="input" type="password" name="password" value={form.password} onChange={onChange} />
            </div>
            <div className="input-group">
              <label>Uloga</label>
              <select className="input" name="role" value={form.role} onChange={onChange}>
                <option value="PLAYER">PLAYER</option>
                <option value="CAPTAIN">CAPTAIN</option>
                <option value="ADMIN">ADMIN</option>
                <option value="REFEREE_SCOREKEEPER">REFEREE_SCOREKEEPER</option>
              </select>
            </div>
          </div>
          <button className="button" type="submit" disabled={submitting}>
            {submitting ? "Spremanje..." : "Dodaj korisnika"}
          </button>
        </form>
      </div>

      <div className="card">
        <div className="page-header">
          <div>
            <h3>Lista korisnika</h3>
            <p className="muted">Podaci se učitavaju sa backend endpointa `/api/users`.</p>
          </div>
          <button className="secondary-button" onClick={loadUsers}>
            Osvježi
          </button>
        </div>

        {loadingUsers ? (
          <div className="empty-state">Učitavanje korisnika...</div>
        ) : users.length === 0 ? (
          <div className="empty-state">Nema korisnika za prikaz.</div>
        ) : (
          <div className="table-wrapper">
            <table className="data-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Ime i prezime</th>
                  <th>Email</th>
                  <th>Username</th>
                  <th>Uloga</th>
                  <th>Status</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.fullName}</td>
                    <td>{user.email}</td>
                    <td>{user.username}</td>
                    <td>{user.role}</td>
                    <td>
                      <span className={`status-chip ${user.active ? "status-available" : "status-blocked"}`}>
                        {user.active ? "AKTIVAN" : "NEAKTIVAN"}
                      </span>
                    </td>
                    <td>
                      <button
                        className="btn-xs btn-danger"
                        onClick={() => onDelete(user)}
                        disabled={deletingId === user.id}
                        title="Obriši korisnika"
                      >
                        {deletingId === user.id ? "..." : "Obriši"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default UserModule;
