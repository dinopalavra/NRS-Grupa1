import React, { useEffect, useState } from "react";
import { useAppContext } from "../../context/AppContext.jsx";

function TeamModule() {
  const { teams, registerTeam, loadTeams, loadingTeams } = useAppContext();

  const [form, setForm] = useState({
    name: "",
    city: "",
    captainName: "",
    membersCount: 1
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    loadTeams();
  }, [loadTeams]);

  const onChange = (event) => {
    setForm((prev) => ({
      ...prev,
      [event.target.name]:
        event.target.name === "membersCount"
          ? Number(event.target.value)
          : event.target.value
    }));
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    setMessage("");
    setError("");

    if (!form.name.trim() || !form.city.trim() || !form.captainName.trim()) {
      setError("Unesite naziv tima, grad i ime kapitena.");
      return;
    }

    if (!form.membersCount || Number(form.membersCount) < 1) {
      setError("Broj članova mora biti najmanje 1.");
      return;
    }

    setSubmitting(true);

    try {
      await registerTeam({
        name: form.name.trim(),
        city: form.city.trim(),
        captainName: form.captainName.trim(),
        membersCount: Number(form.membersCount)
      });

      setMessage("Tim je uspješno kreiran u backend bazi.");
      setForm({
        name: "",
        city: "",
        captainName: "",
        membersCount: 1
      });
    } catch (err) {
      setError(err.message || "Kreiranje tima nije uspjelo.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="module-layout">
      <div className="card">
        <h3>Novi tim</h3>

        {error && <p className="error-text">{error}</p>}
        {message && <p className="success-text">{message}</p>}

        <form className="form" onSubmit={onSubmit}>
          <div className="form-grid">
            <div className="input-group">
              <label>Naziv tima</label>
              <input
                className="input"
                name="name"
                value={form.name}
                onChange={onChange}
              />
            </div>

            <div className="input-group">
              <label>Grad</label>
              <input
                className="input"
                name="city"
                value={form.city}
                onChange={onChange}
              />
            </div>

            <div className="input-group">
              <label>Kapiten</label>
              <input
                className="input"
                name="captainName"
                value={form.captainName}
                onChange={onChange}
              />
            </div>

            <div className="input-group">
              <label>Broj članova</label>
              <input
                className="input"
                type="number"
                min="1"
                name="membersCount"
                value={form.membersCount}
                onChange={onChange}
              />
            </div>
          </div>

          <button className="button" type="submit" disabled={submitting}>
            {submitting ? "Spremanje..." : "Kreiraj tim"}
          </button>
        </form>
      </div>

      <div className="card">
        <div className="page-header">
          <div>
            <h3>Lista timova</h3>
            <p className="muted">Podaci se učitavaju sa backend endpointa `/api/teams`.</p>
          </div>
          <button className="secondary-button" onClick={loadTeams}>
            Osvježi
          </button>
        </div>

        {loadingTeams ? (
          <div className="empty-state">Učitavanje timova...</div>
        ) : teams.length === 0 ? (
          <div className="empty-state">Nema timova za prikaz.</div>
        ) : (
          <div className="table-wrapper">
            <table className="data-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Naziv</th>
                  <th>Grad</th>
                  <th>Kapiten</th>
                  <th>Članova</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {teams.map((team) => (
                  <tr key={team.id}>
                    <td>{team.id}</td>
                    <td>{team.name}</td>
                    <td>{team.city}</td>
                    <td>{team.captainName}</td>
                    <td>{team.membersCount}</td>
                    <td>{team.status}</td>
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

export default TeamModule;