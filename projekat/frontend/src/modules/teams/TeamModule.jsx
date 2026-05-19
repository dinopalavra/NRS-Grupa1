import React, { useEffect, useState } from "react";
import { useAppContext } from "../../context/AppContext.jsx";

const SPORT_OPTIONS = [
  { value: "FOOTBALL",   label: "⚽ Fudbal" },
  { value: "BASKETBALL", label: "🏀 Košarka" },
  { value: "VOLLEYBALL", label: "🏐 Odbojka" },
  { value: "HANDBALL",   label: "🤾 Rukomet" },
  { value: "FUTSAL",     label: "🥅 Futsal" },
  { value: "TENNIS",     label: "🎾 Tenis" },
  { value: "OTHER",      label: "🏅 Ostalo" },
];

function TeamModule() {
  const { teams, leagues, registerTeam, loadTeams, loadingTeams, getTeamStats } = useAppContext();

  const [form, setForm] = useState({ name: "", city: "", captainName: "", membersCount: 1, sport: "" });
  const [message, setMessage]   = useState({ text: "", ok: true });
  const [submitting, setSubmitting] = useState(false);

  const [search, setSearch] = useState("");
  const [sportFilter, setSportFilter] = useState("");

  const [statsTarget, setStatsTarget] = useState(null);
  const [statsData, setStatsData]     = useState(null);
  const [statsLeagueId, setStatsLeagueId] = useState("");
  const [statsLoading, setStatsLoading]   = useState(false);
  const [statsError, setStatsError]       = useState("");

  useEffect(() => { loadTeams(); }, [loadTeams]);

  useEffect(() => {
    if (!statsTarget) return;
    let cancelled = false;
    setStatsLoading(true);
    setStatsError("");
    getTeamStats(statsTarget.id, statsLeagueId || null)
      .then(data => { if (!cancelled) setStatsData(data); })
      .catch(err => { if (!cancelled) setStatsError(err.message || "Greška pri učitavanju statistike."); })
      .finally(() => { if (!cancelled) setStatsLoading(false); });
    return () => { cancelled = true; };
  }, [statsTarget, statsLeagueId, getTeamStats]);

  const openStats = (team) => {
    setStatsTarget(team);
    setStatsLeagueId("");
    setStatsData(null);
    setStatsError("");
  };

  const closeStats = () => {
    setStatsTarget(null);
    setStatsData(null);
    setStatsLeagueId("");
    setStatsError("");
  };

  const filteredTeams = teams.filter(t => {
    const q = search.trim().toLowerCase();
    if (q && !(`${t.name} ${t.city} ${t.captainName}`).toLowerCase().includes(q)) return false;
    if (sportFilter && t.sport !== sportFilter) return false;
    return true;
  });

  const onChange = e => setForm(p => ({
    ...p,
    [e.target.name]: e.target.name === "membersCount" ? Number(e.target.value) : e.target.value
  }));

  const onSubmit = async e => {
    e.preventDefault();
    setMessage({ text: "", ok: true });
    if (!form.name.trim() || !form.city.trim() || !form.captainName.trim()) {
      setMessage({ text: "Unesite naziv tima, grad i ime kapitena.", ok: false });
      return;
    }
    if (!form.membersCount || Number(form.membersCount) < 1) {
      setMessage({ text: "Broj članova mora biti najmanje 1.", ok: false });
      return;
    }
    setSubmitting(true);
    try {
      await registerTeam({
        name: form.name.trim(),
        city: form.city.trim(),
        captainName: form.captainName.trim(),
        membersCount: Number(form.membersCount),
        sport: form.sport || null
      });
      setMessage({ text: "Tim je uspješno kreiran.", ok: true });
      setForm({ name: "", city: "", captainName: "", membersCount: 1, sport: "" });
    } catch (err) {
      setMessage({ text: err.message || "Kreiranje tima nije uspjelo.", ok: false });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <div className="content-card">
        <div className="content-card-header">
          <h2 className="content-card-title">Novi tim</h2>
          <p className="content-card-subtitle">Registruj novi fudbalski tim u sistemu</p>
        </div>
        <form onSubmit={onSubmit} className="inline-form">
          <div className="form-row">
            <div className="field field-grow">
              <label className="field-label">Naziv tima</label>
              <input className="field-input" name="name" value={form.name} onChange={onChange} placeholder="Npr. FK Sarajevo" />
            </div>
            <div className="field field-grow">
              <label className="field-label">Grad</label>
              <input className="field-input" name="city" value={form.city} onChange={onChange} placeholder="Npr. Sarajevo" />
            </div>
          </div>
          <div className="form-row">
            <div className="field field-grow">
              <label className="field-label">Kapiten</label>
              <input className="field-input" name="captainName" value={form.captainName} onChange={onChange} placeholder="Ime i prezime kapitena" />
            </div>
            <div className="field" style={{ width: 130 }}>
              <label className="field-label">Broj članova</label>
              <input className="field-input" type="number" min="1" name="membersCount" value={form.membersCount} onChange={onChange} />
            </div>
            <div className="field">
              <label className="field-label">Sport</label>
              <select className="field-input" name="sport" value={form.sport} onChange={onChange}>
                <option value="">Odaberi sport...</option>
                {SPORT_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
              </select>
            </div>
            <div className="field field-action">
              <label className="field-label">&nbsp;</label>
              <button className="btn btn-primary" type="submit" disabled={submitting}>
                {submitting ? "Kreiranje..." : "Kreiraj tim"}
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
            <h2 className="content-card-title">Lista timova</h2>
            <p className="content-card-subtitle">{filteredTeams.length} od {teams.length} timova</p>
          </div>
          <button className="btn btn-secondary" type="button" onClick={loadTeams}>
            Osvježi
          </button>
        </div>

        <div className="form-row" style={{ padding: "0 0 16px 0", gap: 12 }}>
          <div className="field field-grow">
            <input
              className="field-input"
              placeholder="🔍 Pretraga (naziv, grad, kapiten)..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
          <div className="field" style={{ width: 200 }}>
            <select
              className="field-input"
              value={sportFilter}
              onChange={e => setSportFilter(e.target.value)}
            >
              <option value="">Svi sportovi</option>
              {SPORT_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
          </div>
        </div>

        {loadingTeams ? (
          <div className="loading-state">Učitavanje timova...</div>
        ) : filteredTeams.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
            </div>
            <p>{teams.length === 0 ? "Nema timova za prikaz." : "Nema timova koji odgovaraju filteru."}</p>
          </div>
        ) : (
          <div className="slots-table-wrap">
            <table className="slots-table">
              <thead>
                <tr>
                  <th>Tim</th>
                  <th>Grad</th>
                  <th>Kapiten</th>
                  <th>Članova</th>
                  <th>Sport</th>
                  <th>Status</th>
                  <th>Akcije</th>
                </tr>
              </thead>
              <tbody>
                {filteredTeams.map(team => (
                  <tr key={team.id}>
                    <td>
                      <div className="slot-resource">{team.name}</div>
                      <div className="slot-location">ID #{team.id}</div>
                    </td>
                    <td>{team.city}</td>
                    <td>{team.captainName}</td>
                    <td>{team.membersCount}</td>
                    <td>
                      {team.sport
                        ? (SPORT_OPTIONS.find(o => o.value === team.sport)?.label || team.sport)
                        : <span style={{ color: "var(--color-text-muted)" }}>—</span>}
                    </td>
                    <td>
                      <span className={`status-chip status-${String(team.status).toLowerCase()}`}>
                        {team.status === "ACTIVE" ? "Aktivan" : team.status}
                      </span>
                    </td>
                    <td>
                      <button
                        className="btn btn-xs btn-secondary"
                        type="button"
                        onClick={() => openStats(team)}
                      >Statistika</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {statsTarget && (
        <div className="modal-overlay" onClick={closeStats}>
          <div className="modal-dialog modal-dialog-wide" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="modal-title">Statistika: {statsTarget.name}</h3>
              <button type="button" className="modal-close" onClick={closeStats}>×</button>
            </div>
            <div className="modal-body">
              <div className="field">
                <label className="field-label">Liga</label>
                <select
                  className="field-input"
                  value={statsLeagueId}
                  onChange={e => setStatsLeagueId(e.target.value)}
                >
                  <option value="">Sve lige (ukupno)</option>
                  {(leagues || []).map(l => (
                    <option key={l.id} value={l.id}>
                      {l.leagueName} · {l.season}
                    </option>
                  ))}
                </select>
              </div>

              {statsLoading && <div className="loading-state">Učitavanje statistike...</div>}
              {statsError && <div className="inline-error">{statsError}</div>}

              {!statsLoading && !statsError && statsData && (
                <div className="stats-grid">
                  <div className="stat-tile"><div className="stat-tile-val">{statsData.matchesPlayed}</div><div className="stat-tile-lbl">Odigrano</div></div>
                  <div className="stat-tile stat-tile-green"><div className="stat-tile-val">{statsData.wins}</div><div className="stat-tile-lbl">Pobjede</div></div>
                  <div className="stat-tile stat-tile-yellow"><div className="stat-tile-val">{statsData.draws}</div><div className="stat-tile-lbl">Remi</div></div>
                  <div className="stat-tile stat-tile-red"><div className="stat-tile-val">{statsData.losses}</div><div className="stat-tile-lbl">Porazi</div></div>
                  <div className="stat-tile"><div className="stat-tile-val">{statsData.goalsFor}</div><div className="stat-tile-lbl">Dati golovi</div></div>
                  <div className="stat-tile"><div className="stat-tile-val">{statsData.goalsAgainst}</div><div className="stat-tile-lbl">Primljeni</div></div>
                  <div className="stat-tile"><div className="stat-tile-val">{statsData.goalDifference > 0 ? "+" : ""}{statsData.goalDifference}</div><div className="stat-tile-lbl">Gol razlika</div></div>
                  <div className="stat-tile stat-tile-gold"><div className="stat-tile-val">{statsData.points}</div><div className="stat-tile-lbl">Bodova</div></div>
                  <div className="stat-tile stat-tile-wide">
                    <div className="stat-tile-lbl">Forma (zadnjih {statsData.last5Form?.length || 0})</div>
                    <div className="form-chips">
                      {statsData.last5Form && statsData.last5Form.length > 0 ? (
                        statsData.last5Form.map((r, i) => (
                          <span key={i} className={`form-chip form-chip-${r}`}>{r}</span>
                        ))
                      ) : (
                        <span style={{ color: "var(--color-text-muted)" }}>nema odigranih utakmica</span>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={closeStats}>Zatvori</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default TeamModule;
