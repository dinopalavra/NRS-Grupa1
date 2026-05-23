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
  const {
    teams,
    leagues,
    users,
    registerTeam,
    loadTeams,
    loadingTeams,
    getTeamStats,
    getTeamMembers,
    addTeamMember,
    removeTeamMember,
  } = useAppContext();

  const [form, setForm] = useState({ name: "", city: "", captainUserId: "", maxMembers: 11, sport: "" });
  const [message, setMessage]   = useState({ text: "", ok: true });
  const [submitting, setSubmitting] = useState(false);

  const [search, setSearch] = useState("");
  const [sportFilter, setSportFilter] = useState("");

  const [statsTarget, setStatsTarget] = useState(null);
  const [statsData, setStatsData]     = useState(null);
  const [statsLeagueId, setStatsLeagueId] = useState("");
  const [statsLoading, setStatsLoading]   = useState(false);
  const [statsError, setStatsError]       = useState("");

  // Roster modal state
  const [rosterTarget, setRosterTarget] = useState(null);
  const [rosterMembers, setRosterMembers] = useState([]);
  const [rosterLoading, setRosterLoading] = useState(false);
  const [rosterError, setRosterError] = useState("");
  const [memberForm, setMemberForm] = useState({ userId: "", jerseyNumber: "", position: "" });
  const [memberSubmitting, setMemberSubmitting] = useState(false);
  const [removingMemberId, setRemovingMemberId] = useState(null);

  const loadRoster = async (teamId) => {
    setRosterLoading(true);
    setRosterError("");
    try {
      const data = await getTeamMembers(teamId);
      setRosterMembers(Array.isArray(data) ? data : []);
    } catch (err) {
      setRosterError(err.message || "Greška pri učitavanju igrača.");
    } finally {
      setRosterLoading(false);
    }
  };

  const openRoster = (team) => {
    setRosterTarget(team);
    setRosterMembers([]);
    setMemberForm({ userId: "", jerseyNumber: "", position: "" });
    setRosterError("");
    loadRoster(team.id);
  };

  const closeRoster = () => {
    setRosterTarget(null);
    setRosterMembers([]);
    setMemberForm({ userId: "", jerseyNumber: "", position: "" });
    setRosterError("");
  };

  const submitAddMember = async (e) => {
    e.preventDefault();
    if (!memberForm.userId) {
      setRosterError("Odaberite korisnika.");
      return;
    }
    setMemberSubmitting(true);
    setRosterError("");
    try {
      await addTeamMember(rosterTarget.id, memberForm);
      setMemberForm({ userId: "", jerseyNumber: "", position: "" });
      await loadRoster(rosterTarget.id);
    } catch (err) {
      setRosterError(err.message || "Greška pri dodavanju igrača.");
    } finally {
      setMemberSubmitting(false);
    }
  };

  const handleRemoveMember = async (userId) => {
    setRemovingMemberId(userId);
    setRosterError("");
    try {
      await removeTeamMember(rosterTarget.id, userId);
      await loadRoster(rosterTarget.id);
    } catch (err) {
      setRosterError(err.message || "Greška pri uklanjanju igrača.");
    } finally {
      setRemovingMemberId(null);
    }
  };

  // Korisnici koji su kandidat za dodavanje u roster:
  //  - nisu vec u ovom timu
  //  - imaju ulogu PLAYER ili CAPTAIN
  //  - sport im se poklapa sa sportom tima (ili tim/user nemaju sport)
  // Napomena: provjeru "nije u drugom timu" radi backend (mi ne znamo sve rostere).
  const memberUserIds = new Set(rosterMembers.map(m => m.userId));
  const eligibleUsers = (users || []).filter(u => {
    if (memberUserIds.has(u.id)) return false;
    if (u.role !== "PLAYER" && u.role !== "CAPTAIN") return false;
    if (rosterTarget?.sport && u.sport && rosterTarget.sport !== u.sport) return false;
    return true;
  });

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

  const onChange = e => {
    const { name, value } = e.target;
    setForm(p => {
      const next = { ...p, [name]: name === "maxMembers" ? Number(value) : value };
      // Kada se promijeni sport, isprazni captain dropdown jer kandidati se mijenjaju
      if (name === "sport") {
        next.captainUserId = "";
      }
      return next;
    });
  };

  // Kandidati za kapitena: CAPTAIN role, sport matches, jos nisu kapiten drugog tima
  const captainCandidates = (users || []).filter(u => {
    if (u.role !== "CAPTAIN") return false;
    if (!form.sport) return false; // bez sporta — ne biramo
    if (u.sport !== form.sport) return false;
    // Već je kapiten nekog tima?
    const alreadyCaptain = (teams || []).some(t => t.captainUserId === u.id);
    if (alreadyCaptain) return false;
    return true;
  });

  const onSubmit = async e => {
    e.preventDefault();
    setMessage({ text: "", ok: true });
    if (!form.name.trim() || !form.city.trim()) {
      setMessage({ text: "Unesite naziv tima i grad.", ok: false });
      return;
    }
    if (!form.sport) {
      setMessage({ text: "Sport je obavezan.", ok: false });
      return;
    }
    if (!form.captainUserId) {
      setMessage({ text: "Odaberite kapitena (sa odgovarajućim sportom).", ok: false });
      return;
    }
    if (!form.maxMembers || Number(form.maxMembers) < 1) {
      setMessage({ text: "Maksimalni broj članova mora biti najmanje 1.", ok: false });
      return;
    }
    setSubmitting(true);
    try {
      await registerTeam({
        name: form.name.trim(),
        city: form.city.trim(),
        captainUserId: Number(form.captainUserId),
        maxMembers: Number(form.maxMembers),
        sport: form.sport
      });
      setMessage({ text: "Tim je uspješno kreiran.", ok: true });
      setForm({ name: "", city: "", captainUserId: "", maxMembers: 11, sport: "" });
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
          <p className="content-card-subtitle">Registruj novi sportski tim u sistemu</p>
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
            <div className="field">
              <label className="field-label">Sport <span style={{ color: "#fca5a5" }}>*</span></label>
              <select className="field-input" name="sport" value={form.sport} onChange={onChange} required>
                <option value="">Odaberi sport...</option>
                {SPORT_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
              </select>
            </div>
          </div>
          <div className="form-row">
            <div className="field field-grow">
              <label className="field-label">Kapiten <span style={{ color: "#fca5a5" }}>*</span></label>
              <select
                className="field-input"
                name="captainUserId"
                value={form.captainUserId}
                onChange={onChange}
                disabled={!form.sport}
                required
              >
                <option value="">
                  {!form.sport
                    ? "Prvo odaberi sport..."
                    : captainCandidates.length === 0
                      ? "Nema raspoloživih kapitena za ovaj sport"
                      : "— Odaberi kapitena —"}
                </option>
                {captainCandidates.map(u => (
                  <option key={u.id} value={u.id}>
                    {u.fullName} (@{u.username})
                  </option>
                ))}
              </select>
            </div>
            <div className="field" style={{ width: 170 }}>
              <label className="field-label">Maks. članova <span style={{ color: "#fca5a5" }}>*</span></label>
              <input className="field-input" type="number" min="1" name="maxMembers" value={form.maxMembers} onChange={onChange} />
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
                    <td>{team.captainName || <span style={{ color: "var(--color-text-muted)" }}>—</span>}</td>
                    <td>
                      <strong>{team.membersCount ?? 0}</strong>
                      {team.maxMembers != null && (
                        <span style={{ color: "var(--color-text-muted)" }}> / {team.maxMembers}</span>
                      )}
                    </td>
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
                      <div className="row-actions">
                        <button
                          className="btn btn-xs btn-secondary"
                          type="button"
                          onClick={() => openRoster(team)}
                        >Igrači</button>
                        <button
                          className="btn btn-xs btn-secondary"
                          type="button"
                          onClick={() => openStats(team)}
                        >Statistika</button>
                      </div>
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

      {rosterTarget && (
        <div className="modal-overlay" onClick={closeRoster}>
          <div className="modal-dialog modal-dialog-wide" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="modal-title">Igrači: {rosterTarget.name}</h3>
              <button type="button" className="modal-close" onClick={closeRoster}>×</button>
            </div>
            <div className="modal-body">
              <form onSubmit={submitAddMember} className="inline-form">
                <div className="form-row">
                  <div className="field field-grow">
                    <label className="field-label">Korisnik</label>
                    <select
                      className="field-input"
                      value={memberForm.userId}
                      onChange={e => setMemberForm(p => ({ ...p, userId: e.target.value }))}
                    >
                      <option value="">
                        {eligibleUsers.length === 0
                          ? "Nema raspoloživih korisnika (player/captain)"
                          : "— Odaberi korisnika —"}
                      </option>
                      {eligibleUsers.map(u => (
                        <option key={u.id} value={u.id}>
                          {u.fullName || u.username} · {u.role}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="field" style={{ width: 110 }}>
                    <label className="field-label">Dres #</label>
                    <input
                      className="field-input"
                      type="number"
                      min="0"
                      value={memberForm.jerseyNumber}
                      onChange={e => setMemberForm(p => ({ ...p, jerseyNumber: e.target.value }))}
                      placeholder="opc."
                    />
                  </div>
                  <div className="field field-grow">
                    <label className="field-label">Pozicija</label>
                    <input
                      className="field-input"
                      value={memberForm.position}
                      onChange={e => setMemberForm(p => ({ ...p, position: e.target.value }))}
                      placeholder="npr. Napadač, Vezni..."
                    />
                  </div>
                  <div className="field field-action">
                    <label className="field-label">&nbsp;</label>
                    <button className="btn btn-primary" type="submit" disabled={memberSubmitting || !memberForm.userId}>
                      {memberSubmitting ? "Dodajem..." : "Dodaj"}
                    </button>
                  </div>
                </div>
              </form>

              {rosterError && <div className="inline-error">{rosterError}</div>}

              <div className="content-card-subtitle" style={{ marginTop: 8 }}>
                {rosterMembers.length} igrača u rosteru
              </div>

              {rosterLoading ? (
                <div className="loading-state">Učitavanje igrača...</div>
              ) : rosterMembers.length === 0 ? (
                <div className="empty-state-mini">Nema igrača u ovom timu.</div>
              ) : (
                <div className="slots-table-wrap">
                  <table className="slots-table">
                    <thead>
                      <tr>
                        <th style={{ width: 60 }}>#</th>
                        <th>Igrač</th>
                        <th>Korisničko ime</th>
                        <th>Pozicija</th>
                        <th>Akcije</th>
                      </tr>
                    </thead>
                    <tbody>
                      {rosterMembers.map(m => (
                        <tr key={m.membershipId}>
                          <td>
                            {m.jerseyNumber != null
                              ? <strong style={{ color: "var(--gold-light, #c9a87c)" }}>{m.jerseyNumber}</strong>
                              : "—"}
                          </td>
                          <td>
                            <div className="slot-resource">{m.fullName || m.username}</div>
                            <div className="slot-location">{m.email}</div>
                          </td>
                          <td>{m.username}</td>
                          <td>{m.position || <span style={{ color: "var(--color-text-muted)" }}>—</span>}</td>
                          <td>
                            <button
                              className="btn btn-xs btn-danger"
                              type="button"
                              disabled={removingMemberId === m.userId}
                              onClick={() => handleRemoveMember(m.userId)}
                            >
                              {removingMemberId === m.userId ? "..." : "Ukloni"}
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={closeRoster}>Zatvori</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default TeamModule;
