import React, { useEffect, useState } from "react";
import { useAppContext } from "../../context/AppContext.jsx";

const ROLE_LABELS = {
  ADMIN: "Administrator",
  CAPTAIN: "Kapiten",
  PLAYER: "Igrač",
  REFEREE_SCOREKEEPER: "Sudija / Zapisničar",
};

const SPORT_OPTIONS = [
  { value: "FOOTBALL",   label: "⚽ Fudbal" },
  { value: "BASKETBALL", label: "🏀 Košarka" },
  { value: "VOLLEYBALL", label: "🏐 Odbojka" },
  { value: "HANDBALL",   label: "🤾 Rukomet" },
  { value: "FUTSAL",     label: "🥅 Futsal" },
  { value: "TENNIS",     label: "🎾 Tenis" },
  { value: "OTHER",      label: "🏅 Ostalo" },
];

const sportLabel = (sport) =>
  SPORT_OPTIONS.find(o => o.value === sport)?.label || sport || "—";

function UserModule() {
  const { users, registerUser, removeUser, loadUsers, loadingUsers, currentUser } = useAppContext();

  const [form, setForm] = useState({
    fullName: "", email: "", username: "", password: "", role: "PLAYER", sport: ""
  });
  const [message, setMessage]   = useState({ text: "", ok: true });
  const [submitting, setSubmitting] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => { loadUsers(); }, [loadUsers]);

  const onChange = e => {
    const { name, value } = e.target;
    setForm(p => {
      const next = { ...p, [name]: value };
      // Kada se odabere ADMIN, ukloni sport. Kada se odabere non-admin a sport je prazan, ne diramo
      if (name === "role" && value === "ADMIN") {
        next.sport = "";
      }
      return next;
    });
  };

  const isAdminRole = form.role === "ADMIN";

  const onSubmit = async e => {
    e.preventDefault();
    setMessage({ text: "", ok: true });
    if (!form.fullName.trim() || !form.email.trim() || !form.username.trim() || !form.password.trim()) {
      setMessage({ text: "Unesite puno ime, email, username i lozinku.", ok: false });
      return;
    }
    if (!isAdminRole && !form.sport) {
      setMessage({ text: "Sport je obavezan za ulogu " + ROLE_LABELS[form.role] + ".", ok: false });
      return;
    }
    setSubmitting(true);
    try {
      await registerUser({
        ...form,
        sport: isAdminRole ? null : form.sport
      });
      setMessage({ text: "Korisnik je uspješno kreiran.", ok: true });
      setForm({ fullName: "", email: "", username: "", password: "", role: "PLAYER", sport: "" });
    } catch (err) {
      setMessage({ text: err.message || "Kreiranje korisnika nije uspjelo.", ok: false });
    } finally {
      setSubmitting(false);
    }
  };

  const onDelete = async (user) => {
    const selfId = currentUser?.userId ?? currentUser?.id ?? null;
    if (selfId && Number(selfId) === Number(user.id)) {
      setMessage({ text: "Ne možete obrisati vlastiti nalog.", ok: false });
      return;
    }
    if (!window.confirm(`Obrisati korisnika "${user.fullName || user.username}"? Ova akcija je nepovratna.`)) return;
    setDeletingId(user.id);
    setMessage({ text: "", ok: true });
    try {
      await removeUser(user.id);
      setMessage({ text: `Korisnik "${user.fullName || user.username}" je obrisan.`, ok: true });
    } catch (err) {
      setMessage({ text: err.message || "Brisanje nije uspjelo.", ok: false });
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <>
      <div className="content-card">
        <div className="content-card-header">
          <h2 className="content-card-title">Novi korisnik</h2>
          <p className="content-card-subtitle">Registruj novog korisnika u sistemu</p>
        </div>
        <form onSubmit={onSubmit} className="inline-form">
          <div className="form-row">
            <div className="field field-grow">
              <label className="field-label">Ime i prezime</label>
              <input className="field-input" name="fullName" value={form.fullName} onChange={onChange} placeholder="Npr. Haris Kovač" />
            </div>
            <div className="field field-grow">
              <label className="field-label">Email</label>
              <input className="field-input" type="email" name="email" value={form.email} onChange={onChange} placeholder="ime@domena.com" />
            </div>
          </div>
          <div className="form-row">
            <div className="field field-grow">
              <label className="field-label">Korisničko ime</label>
              <input className="field-input" name="username" value={form.username} onChange={onChange} placeholder="username" />
            </div>
            <div className="field field-grow">
              <label className="field-label">Lozinka</label>
              <input className="field-input" type="password" name="password" value={form.password} onChange={onChange} placeholder="••••••••" />
            </div>
            <div className="field">
              <label className="field-label">Uloga</label>
              <select className="field-input" name="role" value={form.role} onChange={onChange}>
                <option value="PLAYER">Igrač</option>
                <option value="CAPTAIN">Kapiten</option>
                <option value="ADMIN">Administrator</option>
                <option value="REFEREE_SCOREKEEPER">Sudija / Zapisničar</option>
              </select>
            </div>
            {!isAdminRole && (
              <div className="field">
                <label className="field-label">Sport <span style={{ color: "#fca5a5" }}>*</span></label>
                <select className="field-input" name="sport" value={form.sport} onChange={onChange} required>
                  <option value="">Odaberi sport...</option>
                  {SPORT_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                </select>
              </div>
            )}
            <div className="field field-action">
              <label className="field-label">&nbsp;</label>
              <button className="btn btn-primary" type="submit" disabled={submitting}>
                {submitting ? "Kreiranje..." : "Dodaj korisnika"}
              </button>
            </div>
          </div>
          {message.text && (
            <div className={message.ok ? "inline-success" : "inline-error"}>{message.text}</div>
          )}
        </form>
      </div>

      <div className="content-card">
        <div className="content-card-header content-card-header-row">
          <div>
            <h2 className="content-card-title">Lista korisnika</h2>
            <p className="content-card-subtitle">{users.length} korisnika registrovano u sistemu</p>
          </div>
          <button className="btn btn-secondary" type="button" onClick={loadUsers}>
            Osvježi
          </button>
        </div>

        {loadingUsers ? (
          <div className="loading-state">Učitavanje korisnika...</div>
        ) : users.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/></svg>
            </div>
            <p>Nema korisnika za prikaz.</p>
          </div>
        ) : (
          <div className="slots-table-wrap">
            <table className="slots-table">
              <thead>
                <tr>
                  <th>Korisnik</th>
                  <th>Email</th>
                  <th>Username</th>
                  <th>Uloga</th>
                  <th>Sport</th>
                  <th>Status</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {users.map(user => (
                  <tr key={user.id}>
                    <td>
                      <div className="slot-resource">{user.fullName || "—"}</div>
                      <div className="slot-location">ID #{user.id}</div>
                    </td>
                    <td>{user.email || "—"}</td>
                    <td>{user.username}</td>
                    <td>
                      <span className={`role-chip ${
                        user.role === "ADMIN" ? "role-chip--admin"
                        : user.role === "CAPTAIN" ? "role-chip--captain"
                        : user.role === "REFEREE_SCOREKEEPER" ? "role-chip--referee"
                        : "role-chip--default"
                      }`}>
                        {ROLE_LABELS[user.role] || user.role}
                      </span>
                    </td>
                    <td>
                      {user.role === "ADMIN"
                        ? <span style={{ color: "var(--color-text-muted)" }}>—</span>
                        : sportLabel(user.sport)}
                    </td>
                    <td>
                      <span className={`status-chip status-${user.active ? "available" : "blocked"}`}>
                        {user.active ? "Aktivan" : "Neaktivan"}
                      </span>
                    </td>
                    <td>
                      <button
                        className="btn btn-xs btn-danger"
                        onClick={() => onDelete(user)}
                        disabled={deletingId === user.id}
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
    </>
  );
}

export default UserModule;
