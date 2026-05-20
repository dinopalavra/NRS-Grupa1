import React, { useState, useEffect, useCallback } from "react";
import { useAppContext } from "../context/AppContext.jsx";

const SPORT_ICONS = {
  FOOTBALL: "⚽", BASKETBALL: "🏀", VOLLEYBALL: "🏐",
  HANDBALL: "🤾", FUTSAL: "🥅", TENNIS: "🎾", OTHER: "🏅",
};
const SPORT_LABELS = {
  FOOTBALL: "Fudbal", BASKETBALL: "Košarka", VOLLEYBALL: "Odbojka",
  HANDBALL: "Rukomet", FUTSAL: "Futsal", TENNIS: "Tenis", OTHER: "Ostalo",
};

function getScoreLabels(sport) {
  switch (sport) {
    case "BASKETBALL": return { for: "Koševi+", against: "Koševi-", diff: "+/-" };
    case "VOLLEYBALL": return { for: "Setovi+", against: "Setovi-", diff: "+/-" };
    case "TENNIS":     return { for: "Gem+",    against: "Gem-",    diff: "+/-" };
    case "HANDBALL":
    case "FUTSAL":
    case "FOOTBALL":
    default:           return { for: "G+",      against: "G-",      diff: "+/-" };
  }
}

/* ── Icons ─────────────────────────────────────────────────── */

const IconTrophy = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/>
    <path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/>
    <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/>
    <path d="M18 2H6v7a6 6 0 0 0 12 0V2z"/>
  </svg>
);

const IconPlus = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
);

const IconChevron = ({ right }) => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    {right ? <polyline points="9 18 15 12 9 6"/> : <polyline points="15 18 9 12 15 6"/>}
  </svg>
);

const IconX = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
);

const IconCheck = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
);

const IconCalendar = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
  </svg>
);

const IconEdit = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
  </svg>
);

/* ── Shared UI ──────────────────────────────────────────────── */

function Alert({ type = "error", message, onDismiss }) {
  if (!message) return null;
  const isError = type === "error";
  return (
    <div className={`liga-alert liga-alert--${type}`}>
      <span>{message}</span>
      {onDismiss && <button type="button" className="liga-alert-close" onClick={onDismiss}><IconX /></button>}
    </div>
  );
}

function Spinner() {
  return <div className="liga-spinner" />;
}

function EmptyState({ icon, title, subtitle }) {
  return (
    <div className="liga-empty">
      <div className="liga-empty-icon">{icon}</div>
      <div className="liga-empty-title">{title}</div>
      {subtitle && <div className="liga-empty-sub">{subtitle}</div>}
    </div>
  );
}

/* ── League List Panel ──────────────────────────────────────── */

function LeagueListPanel({ leagues, loading, selectedId, onSelect, onCreateLeague, onDeleteLeague }) {
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ leagueName: "", season: "", sport: "" });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [sportFilter, setSportFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const handleDeleteConfirm = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    setError(null);
    try {
      await onDeleteLeague(deleteTarget.id);
      setDeleteTarget(null);
    } catch (err) {
      setError(err.message || "Brisanje lige nije uspjelo.");
    } finally {
      setDeleting(false);
    }
  };

  const filteredLeagues = leagues.filter(lg => {
    const q = search.trim().toLowerCase();
    if (q && !(`${lg.leagueName} ${lg.season}`).toLowerCase().includes(q)) return false;
    if (sportFilter && lg.sport !== sportFilter) return false;
    if (statusFilter && lg.status !== statusFilter) return false;
    return true;
  });

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!form.leagueName.trim() || !form.season.trim()) {
      setError("Naziv i sezona su obavezni.");
      return;
    }
    if (!form.sport) {
      setError("Sport je obavezan.");
      return;
    }
    setSaving(true);
    setError(null);
    try {
      await onCreateLeague({ leagueName: form.leagueName.trim(), season: form.season.trim(), sport: form.sport });
      setForm({ leagueName: "", season: "", sport: "" });
      setShowForm(false);
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="liga-panel liga-panel--list">
      <div className="liga-panel-header">
        <h2 className="liga-panel-title">
          <IconTrophy /> Liga
        </h2>
        <button type="button" className="btn-liga-sm btn-liga-primary" onClick={() => setShowForm(v => !v)}>
          <IconPlus /> Nova
        </button>
      </div>

      {showForm && (
        <form className="liga-inline-form" onSubmit={handleCreate}>
          <Alert type="error" message={error} onDismiss={() => setError(null)} />
          <div className="liga-field">
            <label className="liga-label">Naziv</label>
            <input
              className="liga-input"
              placeholder="npr. Gradska liga"
              value={form.leagueName}
              onChange={e => setForm(f => ({ ...f, leagueName: e.target.value }))}
            />
          </div>
          <div className="liga-field">
            <label className="liga-label">Sezona</label>
            <input
              className="liga-input"
              placeholder="npr. 2025/26"
              value={form.season}
              onChange={e => setForm(f => ({ ...f, season: e.target.value }))}
            />
          </div>
          <div className="liga-field">
            <label className="liga-label">Sport <span style={{ color: "#fca5a5" }}>*</span></label>
            <select className="liga-input liga-select" value={form.sport} onChange={e => setForm(f => ({ ...f, sport: e.target.value }))} required>
              <option value="">Odaberi sport...</option>
              <option value="FOOTBALL">Fudbal</option>
              <option value="BASKETBALL">Košarka</option>
              <option value="VOLLEYBALL">Odbojka</option>
              <option value="HANDBALL">Rukomet</option>
              <option value="FUTSAL">Futsal</option>
              <option value="TENNIS">Tenis</option>
              <option value="OTHER">Ostalo</option>
            </select>
          </div>
          <div className="liga-form-row">
            <button type="submit" className="btn-liga-sm btn-liga-primary" disabled={saving}>
              {saving ? <Spinner /> : <><IconCheck /> Kreiraj</>}
            </button>
            <button type="button" className="btn-liga-sm btn-liga-ghost" onClick={() => setShowForm(false)}>
              Otkaži
            </button>
          </div>
        </form>
      )}

      <div className="liga-search-row">
        <input
          className="liga-input"
          placeholder="🔍 Pretraga lige..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <select
          className="liga-input liga-select"
          value={sportFilter}
          onChange={e => setSportFilter(e.target.value)}
        >
          <option value="">Svi sportovi</option>
          <option value="FOOTBALL">Fudbal</option>
          <option value="BASKETBALL">Košarka</option>
          <option value="VOLLEYBALL">Odbojka</option>
          <option value="HANDBALL">Rukomet</option>
          <option value="FUTSAL">Futsal</option>
          <option value="TENNIS">Tenis</option>
          <option value="OTHER">Ostalo</option>
        </select>
        <select
          className="liga-input liga-select"
          value={statusFilter}
          onChange={e => setStatusFilter(e.target.value)}
        >
          <option value="">Svi statusi</option>
          <option value="ACTIVE">Aktivne</option>
          <option value="INACTIVE">Neaktivne</option>
        </select>
      </div>

      {loading ? (
        <div className="liga-list-loading"><Spinner /></div>
      ) : filteredLeagues.length === 0 ? (
        <EmptyState
          icon={<IconTrophy />}
          title={leagues.length === 0 ? "Nema liga" : "Nema rezultata"}
          subtitle={leagues.length === 0 ? "Kreirajte prvu ligu." : "Pokušajte sa drugim filterom."}
        />
      ) : (
        <ul className="liga-list">
          {filteredLeagues.map(lg => (
            <li key={lg.id} className="liga-list-row">
              <button
                type="button"
                className={`liga-list-item ${selectedId === lg.id ? "is-active" : ""}`}
                onClick={() => onSelect(lg)}
              >
                <div className="liga-list-item-avatar">{lg.leagueName[0]?.toUpperCase()}</div>
                <div className="liga-list-item-body">
                  <div className="liga-list-item-name">
                    {lg.sport ? (SPORT_ICONS[lg.sport] || "🏅") : "🏅"} {lg.leagueName}
                  </div>
                  <div className="liga-list-item-sub">
                    {lg.season}
                    {lg.sport && <span style={{ marginLeft: 6 }}>{SPORT_LABELS[lg.sport] || lg.sport}</span>}
                  </div>
                </div>
                <span className={`liga-status-chip liga-status-chip--${lg.status?.toLowerCase()}`}>
                  {lg.status}
                </span>
                <IconChevron right />
              </button>
              <button
                type="button"
                className="btn-liga-icon btn-liga-danger liga-list-delete"
                title="Obriši ligu"
                onClick={(e) => { e.stopPropagation(); setDeleteTarget(lg); }}
              >
                <IconX />
              </button>
            </li>
          ))}
        </ul>
      )}

      {deleteTarget && (
        <div className="modal-overlay" onClick={() => !deleting && setDeleteTarget(null)}>
          <div className="modal-dialog" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="modal-title">Obriši ligu</h3>
              <button type="button" className="modal-close" onClick={() => !deleting && setDeleteTarget(null)}>×</button>
            </div>
            <div className="modal-body">
              <p style={{ margin: 0, color: "var(--color-text, #e5e7eb)" }}>
                Sigurno želiš obrisati ligu <strong>{deleteTarget.leagueName}</strong> ({deleteTarget.season})?
              </p>
              <p style={{ margin: 0, fontSize: "0.85rem", color: "var(--color-text-muted, #9ca3af)" }}>
                Brišu se i sve utakmice, tabela i veze sa timovima. Rezervisani termini se oslobađaju.
                Ova akcija se ne može poništiti.
              </p>
              {error && <div className="inline-error">{error}</div>}
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={() => setDeleteTarget(null)} disabled={deleting}>
                Odustani
              </button>
              <button type="button" className="btn btn-danger" onClick={handleDeleteConfirm} disabled={deleting}>
                {deleting ? "Brišem..." : "Obriši ligu"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ── Tabs ───────────────────────────────────────────────────── */

function Tabs({ tabs, active, onChange }) {
  return (
    <div className="liga-tabs">
      {tabs.map(t => (
        <button
          key={t.key}
          type="button"
          className={`liga-tab ${active === t.key ? "is-active" : ""}`}
          onClick={() => onChange(t.key)}
        >
          {t.label}
        </button>
      ))}
    </div>
  );
}

/* ── Teams Tab ──────────────────────────────────────────────── */

function TeamsTab({ leagueId, allTeams, league }) {
  const { getLeagueTeams, addTeamToLeague, removeTeamFromLeague } = useAppContext();
  const [leagueTeams, setLeagueTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedTeamId, setSelectedTeamId] = useState("");
  const [adding, setAdding] = useState(false);
  const [removing, setRemoving] = useState(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getLeagueTeams(leagueId);
      setLeagueTeams(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [leagueId, getLeagueTeams]);

  useEffect(() => { load(); }, [load]);

  const leagueTeamIds = new Set(leagueTeams.map(t => t.id));
  const availableToAdd = allTeams.filter(t =>
    !leagueTeamIds.has(t.id) &&
    (!league?.sport || !t.sport || t.sport === league?.sport)
  );

  const handleAdd = async () => {
    if (!selectedTeamId) return;
    setAdding(true);
    setError(null);
    try {
      await addTeamToLeague(leagueId, Number(selectedTeamId));
      setSelectedTeamId("");
      await load();
    } catch (err) {
      setError(err.message);
    } finally {
      setAdding(false);
    }
  };

  const handleRemove = async (teamId) => {
    setRemoving(teamId);
    setError(null);
    try {
      await removeTeamFromLeague(leagueId, teamId);
      await load();
    } catch (err) {
      setError(err.message);
    } finally {
      setRemoving(null);
    }
  };

  if (loading) return <div className="liga-tab-body liga-center"><Spinner /></div>;

  return (
    <div className="liga-tab-body">
      <Alert type="error" message={error} onDismiss={() => setError(null)} />

      <div className="liga-add-row">
        <select
          className="liga-input liga-select"
          value={selectedTeamId}
          onChange={e => setSelectedTeamId(e.target.value)}
          disabled={availableToAdd.length === 0}
        >
          <option value="">{availableToAdd.length === 0 ? "Svi timovi su u ligi" : "Odaberite tim..."}</option>
          {availableToAdd.map(t => (
            <option key={t.id} value={t.id}>{t.name} — {t.city}</option>
          ))}
        </select>
        <button
          type="button"
          className="btn-liga-sm btn-liga-primary"
          onClick={handleAdd}
          disabled={!selectedTeamId || adding}
        >
          {adding ? <Spinner /> : <><IconPlus /> Dodaj</>}
        </button>
      </div>

      {leagueTeams.length === 0 ? (
        <EmptyState icon={<span style={{fontSize:28}}>🏟️</span>} title="Nema timova u ligi" subtitle="Dodajte timove iznad." />
      ) : (
        <ul className="liga-teams-list">
          {leagueTeams.map(t => (
            <li key={t.id} className="liga-team-row">
              <div className="liga-team-avatar">{t.name[0]?.toUpperCase()}</div>
              <div className="liga-team-info">
                <div className="liga-team-name">{t.name}</div>
                <div className="liga-team-sub">{t.city} · {t.captainName}</div>
              </div>
              <button
                type="button"
                className="btn-liga-icon btn-liga-danger"
                onClick={() => handleRemove(t.id)}
                disabled={removing === t.id}
                title="Ukloni iz lige"
              >
                {removing === t.id ? <Spinner /> : <IconX />}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

/* ── Matches Tab ────────────────────────────────────────────── */

function MatchesTab({ leagueId, leagueTeams, league }) {
  const { getLeagueMatches, addMatch, submitResult, availableTimeSlots } = useAppContext();
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ homeTeamId: "", awayTeamId: "", slotId: "" });
  const [saving, setSaving] = useState(false);
  const [resultForm, setResultForm] = useState({ matchId: null, homeScore: "", awayScore: "" });
  const [submitting, setSubmitting] = useState(false);

  // Strogo filtriraj slobodne termine — moraju biti za sport lige.
  // Termini bez sporta (legacy) se NE prikazuju kako bi se izbjegao odabir
  // neodgovarajuće sale (npr. teniski teren za fudbal).
  const sportFilteredSlots = (availableTimeSlots || []).filter(
    s => league?.sport && s.sport === league.sport
  );

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getLeagueMatches(leagueId);
      setMatches(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [leagueId, getLeagueMatches]);

  useEffect(() => { load(); }, [load]);

  const handleCreateMatch = async (e) => {
    e.preventDefault();
    if (!form.homeTeamId || !form.awayTeamId) {
      setError("Domaći i gostujući tim su obavezni.");
      return;
    }
    if (form.homeTeamId === form.awayTeamId) {
      setError("Domaći i gostujući tim ne mogu biti isti.");
      return;
    }
    if (!form.slotId) {
      setError("Odaberite slobodan termin (salu i vrijeme).");
      return;
    }
    setSaving(true);
    setError(null);
    try {
      // matchDate je u backendu povučen iz slotа kad se prosljedi slotId,
      // ali polje je @NotNull pa moramo poslati i datum iz slota.
      const selectedSlot = sportFilteredSlots.find(s => String(s.id) === String(form.slotId));
      await addMatch({
        leagueId,
        homeTeamId: Number(form.homeTeamId),
        awayTeamId: Number(form.awayTeamId),
        matchDate: selectedSlot ? selectedSlot.slotDate : null,
        slotId: form.slotId,
      });
      setForm({ homeTeamId: "", awayTeamId: "", slotId: "" });
      setShowForm(false);
      await load();
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleResultSubmit = async (e) => {
    e.preventDefault();
    const hs = parseInt(resultForm.homeScore, 10);
    const as = parseInt(resultForm.awayScore, 10);
    if (isNaN(hs) || isNaN(as) || hs < 0 || as < 0) {
      setError("Unesite ispravne rezultate (≥ 0).");
      return;
    }
    setSubmitting(true);
    setError(null);
    try {
      await submitResult(resultForm.matchId, { homeScore: hs, awayScore: as });
      setResultForm({ matchId: null, homeScore: "", awayScore: "" });
      await load();
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <div className="liga-tab-body liga-center"><Spinner /></div>;

  return (
    <div className="liga-tab-body">
      <Alert type="error" message={error} onDismiss={() => setError(null)} />

      <div className="liga-section-actions">
        <button type="button" className="btn-liga-sm btn-liga-primary" onClick={() => setShowForm(v => !v)}>
          <IconPlus /> Zakaži utakmicu
        </button>
      </div>

      {showForm && (
        <form className="liga-inline-form" onSubmit={handleCreateMatch}>
          <div className="liga-form-grid">
            <div className="liga-field">
              <label className="liga-label">Domaći tim <span style={{ color: "#fca5a5" }}>*</span></label>
              <select className="liga-input liga-select" value={form.homeTeamId} onChange={e => setForm(f => ({ ...f, homeTeamId: e.target.value }))} required>
                <option value="">Odaberite tim...</option>
                {leagueTeams.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
              </select>
            </div>
            <div className="liga-field">
              <label className="liga-label">Gostujući tim <span style={{ color: "#fca5a5" }}>*</span></label>
              <select className="liga-input liga-select" value={form.awayTeamId} onChange={e => setForm(f => ({ ...f, awayTeamId: e.target.value }))} required>
                <option value="">Odaberite tim...</option>
                {leagueTeams.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
              </select>
            </div>
          </div>
          <div className="liga-field" style={{ marginTop: 8 }}>
            <label className="liga-label">Termin (sala, datum i vrijeme) <span style={{ color: "#fca5a5" }}>*</span></label>
            <select
              className="liga-input liga-select"
              value={form.slotId}
              onChange={e => setForm(f => ({ ...f, slotId: e.target.value }))}
              disabled={sportFilteredSlots.length === 0}
              required
            >
              <option value="">
                {sportFilteredSlots.length === 0
                  ? "Nema slobodnih termina za ovaj sport — admin treba kreirati termin"
                  : "Odaberite salu i termin..."}
              </option>
              {sportFilteredSlots.map(s => (
                <option key={s.id} value={s.id}>
                  {s.resourceName} · {s.location} · {s.slotDate} · {(s.startTime || "").slice(0,5)}–{(s.endTime || "").slice(0,5)}
                </option>
              ))}
            </select>
            <span style={{ fontSize: "0.74rem", color: "var(--color-text-muted, #9ca3af)", marginTop: 4 }}>
              Odabrani termin se automatski rezerviše i ne može se koristiti za druge rezervacije.
            </span>
          </div>
          <div className="liga-form-row">
            <button type="submit" className="btn-liga-sm btn-liga-primary" disabled={saving || sportFilteredSlots.length === 0}>
              {saving ? <Spinner /> : <><IconCheck /> Zakaži utakmicu</>}
            </button>
            <button type="button" className="btn-liga-sm btn-liga-ghost" onClick={() => setShowForm(false)}>Otkaži</button>
          </div>
        </form>
      )}

      {resultForm.matchId && (
        <form className="liga-inline-form liga-result-form" onSubmit={handleResultSubmit}>
          <h4 className="liga-result-form-title">Unesi rezultat</h4>
          <div className="liga-result-inputs">
            <input
              type="number" min="0" className="liga-input liga-score-input"
              placeholder="Domaći" value={resultForm.homeScore}
              onChange={e => setResultForm(f => ({ ...f, homeScore: e.target.value }))}
            />
            <span className="liga-result-sep">:</span>
            <input
              type="number" min="0" className="liga-input liga-score-input"
              placeholder="Gosti" value={resultForm.awayScore}
              onChange={e => setResultForm(f => ({ ...f, awayScore: e.target.value }))}
            />
          </div>
          <div className="liga-form-row">
            <button type="submit" className="btn-liga-sm btn-liga-primary" disabled={submitting}>
              {submitting ? <Spinner /> : <><IconCheck /> Potvrdi</>}
            </button>
            <button type="button" className="btn-liga-sm btn-liga-ghost" onClick={() => setResultForm({ matchId: null, homeScore: "", awayScore: "" })}>Otkaži</button>
          </div>
        </form>
      )}

      {matches.length === 0 ? (
        <EmptyState icon={<span style={{fontSize:28}}>⚽</span>} title="Nema utakmica" subtitle="Zakaži prvu utakmicu." />
      ) : (
        <ul className="liga-matches-list">
          {matches.map(m => (
            <li key={m.id} className="liga-match-card">
              <div className="liga-match-teams">
                <span className="liga-match-team">{m.homeTeamName}</span>
                <div className="liga-match-score-box">
                  {m.status === "COMPLETED"
                    ? <span className="liga-match-score">{m.homeScore} : {m.awayScore}</span>
                    : <span className="liga-match-score liga-match-score--pending">vs</span>
                  }
                </div>
                <span className="liga-match-team liga-match-team--away">{m.awayTeamName}</span>
              </div>
              <div className="liga-match-footer">
                <span className="liga-match-date"><IconCalendar /> {m.matchDate}</span>
                {m.location && (
                  <span className="liga-match-date" style={{ fontSize: "0.73rem" }}>
                    📍 {m.location}{m.resourceName ? ` · ${m.resourceName}` : ""}
                    {m.startTime ? ` · ${m.startTime.slice(0,5)}` : ""}
                  </span>
                )}
                <span className={`liga-match-status liga-match-status--${m.status?.toLowerCase()}`}>
                  {m.status === "COMPLETED" ? "Završeno" : "Zakazano"}
                </span>
                <button
                  type="button"
                  className="btn-liga-icon btn-liga-secondary"
                  title="Unesi rezultat"
                  onClick={() => setResultForm({ matchId: m.id, homeScore: m.homeScore ?? "", awayScore: m.awayScore ?? "" })}
                >
                  <IconEdit />
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

/* ── Standings Tab ──────────────────────────────────────────── */

function StandingsTab({ leagueId, league }) {
  const { getLeagueStandings } = useAppContext();
  const [standings, setStandings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getLeagueStandings(leagueId);
      setStandings(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [leagueId, getLeagueStandings]);

  useEffect(() => { load(); }, [load]);

  if (loading) return <div className="liga-tab-body liga-center"><Spinner /></div>;

  const scoreLabels = getScoreLabels(league?.sport);

  return (
    <div className="liga-tab-body">
      <Alert type="error" message={error} onDismiss={() => setError(null)} />
      {standings.length === 0 ? (
        <EmptyState icon={<span style={{fontSize:28}}>📊</span>} title="Tabela je prazna" subtitle="Unesite rezultate utakmica." />
      ) : (
        <div className="liga-table-wrapper">
          <table className="liga-table">
            <thead>
              <tr>
                <th className="liga-th liga-th--rank">#</th>
                <th className="liga-th liga-th--team">Tim</th>
                <th className="liga-th liga-th--num" title="Odigrano">O</th>
                <th className="liga-th liga-th--num" title="Pobjede">P</th>
                <th className="liga-th liga-th--num" title="Remiji">R</th>
                <th className="liga-th liga-th--num" title="Porazi">Pr</th>
                <th className="liga-th liga-th--num" title={scoreLabels.for}>{scoreLabels.for}</th>
                <th className="liga-th liga-th--num" title={scoreLabels.against}>{scoreLabels.against}</th>
                <th className="liga-th liga-th--num" title={scoreLabels.diff}>{scoreLabels.diff}</th>
                <th className="liga-th liga-th--pts">Bod</th>
              </tr>
            </thead>
            <tbody>
              {standings.map((s, i) => {
                const gd = s.goalsFor - s.goalsAgainst;
                return (
                  <tr key={s.teamId} className={`liga-tr ${i === 0 ? "liga-tr--first" : i < 3 ? "liga-tr--top" : ""}`}>
                    <td className="liga-td liga-td--rank">
                      {i === 0 ? "🥇" : i === 1 ? "🥈" : i === 2 ? "🥉" : i + 1}
                    </td>
                    <td className="liga-td liga-td--team">
                      <div className="liga-standing-team">
                        <div className="liga-standing-avatar">{s.teamName[0]?.toUpperCase()}</div>
                        {s.teamName}
                      </div>
                    </td>
                    <td className="liga-td liga-td--num">{s.played}</td>
                    <td className="liga-td liga-td--num">{s.wins}</td>
                    <td className="liga-td liga-td--num">{s.draws}</td>
                    <td className="liga-td liga-td--num">{s.losses}</td>
                    <td className="liga-td liga-td--num">{s.goalsFor}</td>
                    <td className="liga-td liga-td--num">{s.goalsAgainst}</td>
                    <td className="liga-td liga-td--num">{gd > 0 ? `+${gd}` : gd}</td>
                    <td className="liga-td liga-td--pts"><strong>{s.points}</strong></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

/* ── Detail Panel ───────────────────────────────────────────── */

const TABS = [
  { key: "timovi", label: "Timovi" },
  { key: "utakmice", label: "Utakmice" },
  { key: "tabela", label: "Tabela" }
];

function LeagueDetailPanel({ league, onBack }) {
  const { getLeagueTeams, teams } = useAppContext();
  const [activeTab, setActiveTab] = useState("timovi");
  const [leagueTeams, setLeagueTeams] = useState([]);

  const refreshLeagueTeams = useCallback(async () => {
    try {
      const data = await getLeagueTeams(league.id);
      setLeagueTeams(Array.isArray(data) ? data : []);
    } catch { /* ignore */ }
  }, [league.id, getLeagueTeams]);

  useEffect(() => { refreshLeagueTeams(); }, [refreshLeagueTeams]);

  return (
    <div className="liga-panel liga-panel--detail">
      <div className="liga-panel-header liga-panel-header--detail">
        <button type="button" className="btn-liga-back" onClick={onBack}>
          <IconChevron /> Nazad
        </button>
        <div className="liga-detail-title">
          <div className="liga-detail-avatar">{league.leagueName[0]?.toUpperCase()}</div>
          <div>
            <h2 className="liga-panel-title">
              {league.sport ? (SPORT_ICONS[league.sport] || "🏅") : "🏅"} {league.leagueName}
            </h2>
            <div className="liga-detail-sub">{league.season}</div>
          </div>
        </div>
        <span className={`liga-status-chip liga-status-chip--${league.status?.toLowerCase()}`}>
          {league.status}
        </span>
      </div>

      <Tabs tabs={TABS} active={activeTab} onChange={t => { setActiveTab(t); refreshLeagueTeams(); }} />

      {activeTab === "timovi" && (
        <TeamsTab leagueId={league.id} allTeams={teams} league={league} />
      )}
      {activeTab === "utakmice" && (
        <MatchesTab leagueId={league.id} leagueTeams={leagueTeams} league={league} />
      )}
      {activeTab === "tabela" && (
        <StandingsTab leagueId={league.id} league={league} />
      )}
    </div>
  );
}

/* ── Main Page ──────────────────────────────────────────────── */

function LigaPage() {
  const { leagues, loadingLeagues, addLeague, removeLeague } = useAppContext();
  const [selected, setSelected] = useState(null);

  const handleSelect = (lg) => setSelected(lg);
  const handleBack = () => setSelected(null);

  const handleDeleteLeague = async (id) => {
    await removeLeague(id);
    if (selected?.id === id) setSelected(null);
  };

  return (
    <div className="app-page">
      <div className="page-hero page-hero-liga">
        <div className="page-hero-text">
          <h1 className="page-title">Upravljanje ligama</h1>
          <p className="page-subtitle">
            Kreiranje liga, dodavanje timova, raspoređivanje utakmica i automatska tabela.
          </p>
        </div>
      </div>

      <div className="page-body">
        <div className="liga-layout">
          {selected ? (
            <LeagueDetailPanel league={selected} onBack={handleBack} />
          ) : (
            <LeagueListPanel
              leagues={leagues}
              loading={loadingLeagues}
              selectedId={selected?.id}
              onSelect={handleSelect}
              onCreateLeague={addLeague}
              onDeleteLeague={handleDeleteLeague}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default LigaPage;
