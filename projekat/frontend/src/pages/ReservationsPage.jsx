import React, { useEffect, useMemo, useState } from "react";
import { useAppContext } from "../context/AppContext.jsx";
import { formatDate, formatTime, statusLabel } from "../utils/format.js";
import { fetchReservationComments, addReservationComment } from "../services/api.js";
import Pagination from "../components/Pagination.jsx";

const PAGE_SIZE = 10;

const SPORT_OPTIONS = [
  { value: "FOOTBALL",   label: "⚽ Fudbal" },
  { value: "BASKETBALL", label: "🏀 Košarka" },
  { value: "VOLLEYBALL", label: "🏐 Odbojka" },
  { value: "HANDBALL",   label: "🤾 Rukomet" },
  { value: "FUTSAL",     label: "🥅 Futsal" },
  { value: "TENNIS",     label: "🎾 Tenis" },
  { value: "OTHER",      label: "🏅 Ostalo" },
];

const STATUS_FILTERS = [
  { value: "all",       label: "Sve" },
  { value: "PENDING",   label: "Na čekanju" },
  { value: "APPROVED",  label: "Odobrene" },
  { value: "REJECTED",  label: "Odbijene" },
  { value: "CANCELLED", label: "Otkazane" },
];

function ReservationsPage() {
  const {
    reservations,
    teams,
    availableTimeSlots,
    selectedRole,
    currentUser,
    auth,
    loadingReservations,
    loadingTimeSlots,
    addReservation,
    addRecurringReservation,
    approveReservation,
    rejectReservation,
    cancelReservation,
    rescheduleReservation,
  } = useAppContext();

  const { myMembership } = useAppContext();

  const isAdmin   = selectedRole === "ADMIN";
  const isCaptain = selectedRole === "CAPTAIN";
  const isPlayer  = selectedRole === "PLAYER";
  const canCreate = isAdmin || isCaptain;

  const currentUserId = currentUser?.userId ?? currentUser?.id ?? null;

  // Timovi koje korisnik može koristiti za rezervaciju:
  //  - ADMIN: svi
  //  - CAPTAIN: samo tim(ovi) gdje je on kapiten
  //  - ostali: nijedan (i tako ne mogu kreirati)
  const myTeams = useMemo(() => {
    if (isAdmin) return teams;
    if (isCaptain) return teams.filter(t => t.captainUserId === currentUserId);
    return [];
  }, [teams, isAdmin, isCaptain, currentUserId]);

  const captainHasNoTeam = isCaptain && myTeams.length === 0;

  const [filter,     setFilter]     = useState("all");
  const [page,       setPage]       = useState(1);
  const [form,       setForm]       = useState({ teamId: "", slotId: "", note: "", sport: "", recurring: false, intervalWeeks: 1, occurrences: 2 });
  const [message,    setMessage]    = useState({ text: "", ok: true });
  const [submitting, setSubmitting] = useState(false);

  // Comments state
  const [expandedRow, setExpandedRow] = useState(null);
  const [commentsMap, setCommentsMap] = useState({});
  const [commentInput, setCommentInput] = useState({});
  const [commentSubmitting, setCommentSubmitting] = useState({});

  const [rescheduleTarget,   setRescheduleTarget]   = useState(null);
  const [rescheduleSlotId,   setRescheduleSlotId]   = useState("");
  const [rescheduleNote,     setRescheduleNote]     = useState("");
  const [rescheduleError,    setRescheduleError]    = useState("");
  const [rescheduleSubmitting, setRescheduleSubmitting] = useState(false);

  useEffect(() => {
    setForm(prev => ({
      teamId: prev.teamId || String(myTeams[0]?.id || ""),
      slotId: prev.slotId || String(availableTimeSlots[0]?.id || ""),
      note:   prev.note || "",
      sport:  prev.sport || "",
    }));
  }, [myTeams, availableTimeSlots]);

  // Skup timId-ova koji "tiču" trenutnog korisnika (kapiten = njegovi timovi)
  const myTeamIds = useMemo(() => new Set(myTeams.map(t => t.id)), [myTeams]);

  const visibleReservations = useMemo(() => {
    if (isAdmin) return reservations;
    if (isCaptain) return reservations.filter(r => myTeamIds.has(r.teamId));
    if (isPlayer) {
      // Igrač vidi rezervacije svog tima (membership), ne samo vlastite kreacije
      if (!myMembership) return [];
      return reservations.filter(r => r.teamId === myMembership.teamId);
    }
    // Fallback: samo vlastite kreacije
    return reservations.filter(r => r.createdByUserId === currentUserId);
  }, [reservations, isAdmin, isCaptain, isPlayer, currentUserId, myTeamIds, myMembership]);

  const filtered = useMemo(() => {
    const base = filter === "all" ? visibleReservations : visibleReservations.filter(r => r.status === filter);
    return [...base].sort((a, b) => {
      if (a.slotDate !== b.slotDate) return a.slotDate < b.slotDate ? -1 : 1;
      return a.startTime < b.startTime ? -1 : 1;
    });
  }, [filter, visibleReservations]);

  const paginated = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return filtered.slice(start, start + PAGE_SIZE);
  }, [filtered, page]);

  const counts = useMemo(() => ({
    pending:   visibleReservations.filter(r => r.status === "PENDING").length,
    approved:  visibleReservations.filter(r => r.status === "APPROVED").length,
    rejected:  visibleReservations.filter(r => r.status === "REJECTED").length,
    cancelled: visibleReservations.filter(r => r.status === "CANCELLED").length,
  }), [visibleReservations]);

  const onChange = e => {
    const { name, value } = e.target;
    setForm(p => {
      const next = { ...p, [name]: value };
      // Kad korisnik promijeni sport, isprazni slotId jer prethodno odabrani termin
      // možda nije za taj sport
      if (name === "sport") {
        next.slotId = "";
      }
      return next;
    });
  };

  const onSubmit = async e => {
    e.preventDefault();
    if (!form.teamId || !form.slotId) {
      setMessage({ text: "Odaberite tim i slobodan termin.", ok: false });
      return;
    }
    setSubmitting(true);
    setMessage({ text: "", ok: true });
    try {
      if (form.recurring) {
        const result = await addRecurringReservation({
          ...form,
          sport: form.sport || null,
          intervalWeeks: Number(form.intervalWeeks),
          occurrences: Number(form.occurrences)
        });
        const count = Array.isArray(result) ? result.length : 1;
        setForm({ teamId: String(myTeams[0]?.id || ""), slotId: String(availableTimeSlots[0]?.id || ""), note: "", sport: "", recurring: false, intervalWeeks: 1, occurrences: 2 });
        setMessage({ text: `Kreirano ${count} rezervacija. Čekaju odobrenje admina.`, ok: true });
      } else {
        await addReservation({ ...form, sport: form.sport || null });
        setForm({ teamId: String(myTeams[0]?.id || ""), slotId: String(availableTimeSlots[0]?.id || ""), note: "", sport: "", recurring: false, intervalWeeks: 1, occurrences: 2 });
        setMessage({ text: "Rezervacija je uspješno kreirana. Čeka odobrenje admina, a članovi tima su obaviješteni.", ok: true });
      }
    } catch (err) {
      setMessage({ text: err.message || "Greška pri kreiranju rezervacije.", ok: false });
    } finally {
      setSubmitting(false);
    }
  };

  const loadComments = async (resId) => {
    try {
      const data = await fetchReservationComments(resId, auth?.token);
      setCommentsMap(prev => ({ ...prev, [resId]: Array.isArray(data) ? data : [] }));
    } catch {
      setCommentsMap(prev => ({ ...prev, [resId]: [] }));
    }
  };

  const toggleComments = async (resId) => {
    if (expandedRow === resId) {
      setExpandedRow(null);
    } else {
      setExpandedRow(resId);
      if (!commentsMap[resId]) {
        await loadComments(resId);
      }
    }
  };

  const submitComment = async (resId) => {
    const text = (commentInput[resId] || "").trim();
    if (!text) return;
    setCommentSubmitting(prev => ({ ...prev, [resId]: true }));
    try {
      await addReservationComment(resId, text, auth?.token);
      setCommentInput(prev => ({ ...prev, [resId]: "" }));
      await loadComments(resId);
    } catch { /* ignore */ } finally {
      setCommentSubmitting(prev => ({ ...prev, [resId]: false }));
    }
  };

  const handleAction = async (fn, id, label) => {
    try {
      await fn(id);
    } catch (err) {
      setMessage({ text: `${label} nije uspjelo: ${err.message || "nepoznata greška"}`, ok: false });
    }
  };

  const openReschedule = (reservation) => {
    setRescheduleTarget(reservation);
    setRescheduleSlotId("");
    setRescheduleNote(reservation.note || "");
    setRescheduleError("");
  };

  const closeReschedule = () => {
    setRescheduleTarget(null);
    setRescheduleSlotId("");
    setRescheduleNote("");
    setRescheduleError("");
    setRescheduleSubmitting(false);
  };

  const submitReschedule = async (e) => {
    e.preventDefault();
    if (!rescheduleTarget) return;
    if (!rescheduleSlotId) {
      setRescheduleError("Odaberite novi termin.");
      return;
    }
    setRescheduleSubmitting(true);
    setRescheduleError("");
    try {
      await rescheduleReservation(rescheduleTarget.id, {
        newSlotId: rescheduleSlotId,
        note: rescheduleNote
      });
      setMessage({ text: "Rezervacija je uspješno premještena na novi termin.", ok: true });
      closeReschedule();
    } catch (err) {
      setRescheduleError(err.message || "Greška pri izmjeni termina.");
    } finally {
      setRescheduleSubmitting(false);
    }
  };

  return (
    <div className="app-page">

      <div className="page-hero">
        <div className="page-hero-text">
          <h1 className="page-title">Rezervacije</h1>
          <p className="page-subtitle">
            {isAdmin
              ? "Pregledajte, odobrite ili odbijte zahtjeve za rezervaciju termina."
              : canCreate
              ? "Kreirajte rezervacije za vaš tim i pratite njihov status."
              : "Pregledajte rezervacije vašeg tima."}
          </p>
        </div>
        <div className="page-hero-stats">
          <div className="mini-stat mini-stat-pending">
            <span className="mini-stat-val">{counts.pending}</span>
            <span className="mini-stat-label">na čekanju</span>
          </div>
          <div className="mini-stat mini-stat-approved">
            <span className="mini-stat-val">{counts.approved}</span>
            <span className="mini-stat-label">odobrenih</span>
          </div>
          <div className="mini-stat mini-stat-total">
            <span className="mini-stat-val">{visibleReservations.length}</span>
            <span className="mini-stat-label">ukupno</span>
          </div>
        </div>
      </div>

      <div className="page-body">

        {canCreate && captainHasNoTeam && (
          <div className="content-card">
            <div className="empty-state">
              <div className="empty-state-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
                </svg>
              </div>
              <p>Niste dodijeljeni nijednom timu kao kapiten. Kontaktirajte administratora da vam dodijeli tim, pa onda možete kreirati rezervacije.</p>
            </div>
          </div>
        )}

        {canCreate && !captainHasNoTeam && (
          <div className="content-card">
            <div className="content-card-header">
              <h2 className="content-card-title">Nova rezervacija</h2>
              <p className="content-card-subtitle">
                {isCaptain
                  ? `Rezervišite slobodan termin za vaš tim — svi članovi tima biće obaviješteni.`
                  : "Rezervišite slobodan termin za odabrani tim — svi članovi tima biće obaviješteni."}
              </p>
            </div>
            <form onSubmit={onSubmit} className="inline-form">
              <div className="form-row">
                <div className="field field-grow">
                  <label className="field-label">Sport</label>
                  <select className="field-input" name="sport" value={form.sport} onChange={onChange}>
                    <option value="">Odaberi sport...</option>
                    {SPORT_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                  </select>
                </div>
                <div className="field field-grow">
                  <label className="field-label">Tim</label>
                  <select className="field-input" name="teamId" value={form.teamId} onChange={onChange}>
                    <option value="">— Odaberi tim —</option>
                    {myTeams.filter(t => !form.sport || !t.sport || t.sport === form.sport).map(t => (
                      <option key={t.id} value={t.id}>{t.name}</option>
                    ))}
                  </select>
                </div>
                <div className="field field-grow">
                  <label className="field-label">Slobodan termin (sala)</label>
                  {(() => {
                    const filteredSlots = availableTimeSlots.filter(
                      s => !form.sport || s.sport === form.sport
                    );
                    return (
                      <select
                        className="field-input"
                        name="slotId"
                        value={form.slotId}
                        onChange={onChange}
                        disabled={loadingTimeSlots || !filteredSlots.length}
                      >
                        <option value="">
                          {loadingTimeSlots
                            ? "Učitavanje..."
                            : !form.sport
                              ? "Prvo odaberite sport..."
                              : filteredSlots.length === 0
                                ? `Nema slobodnih terena za ${SPORT_OPTIONS.find(o => o.value === form.sport)?.label || form.sport}`
                                : "— Odaberi salu i termin —"}
                        </option>
                        {filteredSlots.map(s => (
                          <option key={s.id} value={s.id}>
                            {s.resourceName} · {s.location} · {formatDate(s.slotDate)} · {formatTime(s.startTime)}–{formatTime(s.endTime)}
                          </option>
                        ))}
                      </select>
                    );
                  })()}
                </div>
              </div>
              <div className="form-row">
                <div className="field field-grow">
                  <label className="field-label">Napomena <span className="field-optional">(opcionalno)</span></label>
                  <input className="field-input" name="note" placeholder="Kratka napomena..." value={form.note} onChange={onChange} />
                </div>
                <div className="field" style={{ justifyContent: "center", alignSelf: "flex-end", paddingBottom: 6 }}>
                  <label style={{ display: "flex", alignItems: "center", gap: 6, cursor: "pointer", color: "var(--color-text, #e5e7eb)", fontSize: "0.9rem" }}>
                    <input
                      type="checkbox"
                      checked={form.recurring}
                      onChange={e => setForm(p => ({ ...p, recurring: e.target.checked }))}
                    />
                    Ponavljajuća
                  </label>
                </div>
                <div className="field field-action">
                  <label className="field-label">&nbsp;</label>
                  <button className="btn btn-primary" type="submit" disabled={submitting || !availableTimeSlots.length}>
                    {submitting ? "Kreiranje..." : "Kreiraj rezervaciju"}
                  </button>
                </div>
              </div>
              {form.recurring && (
                <div className="form-row">
                  <div className="field field-grow">
                    <label className="field-label">Interval</label>
                    <select
                      className="field-input"
                      value={form.intervalWeeks}
                      onChange={e => setForm(p => ({ ...p, intervalWeeks: Number(e.target.value) }))}
                    >
                      <option value={1}>Svake sedmice</option>
                      <option value={2}>Svake dvije sedmice</option>
                    </select>
                  </div>
                  <div className="field field-grow">
                    <label className="field-label">Broj ponavljanja (1–12)</label>
                    <input
                      className="field-input"
                      type="number"
                      min={1}
                      max={12}
                      value={form.occurrences}
                      onChange={e => setForm(p => ({ ...p, occurrences: Number(e.target.value) }))}
                    />
                  </div>
                </div>
              )}
              {message.text && (
                <div className={message.ok ? "inline-success" : "inline-error"}>{message.text}</div>
              )}
            </form>
          </div>
        )}

        <div className="content-card">
          <div className="content-card-header content-card-header-row">
            <div>
              <h2 className="content-card-title">Lista rezervacija</h2>
              <p className="content-card-subtitle">
                {filter === "all"
                  ? `${filtered.length} rezervacija`
                  : `${filtered.length} — ${STATUS_FILTERS.find(f => f.value === filter)?.label}`}
                {!isAdmin && !canCreate && " · samo vaše rezervacije"}
              </p>
            </div>
            <div className="filter-chips">
              {STATUS_FILTERS.map(f => (
                <button
                  key={f.value}
                  type="button"
                  className={`filter-chip ${filter === f.value ? "filter-chip-active" : ""}`}
                  onClick={() => { setFilter(f.value); setPage(1); }}
                >
                  {f.label}
                  {f.value !== "all" && counts[f.value.toLowerCase()] > 0 && (
                    <span className="filter-chip-count">{counts[f.value.toLowerCase()]}</span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {loadingReservations ? (
            <div className="loading-state">Učitavanje rezervacija...</div>
          ) : filtered.length === 0 ? (
            <div className="empty-state">
              <div className="empty-state-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
              </div>
              <p>
                {filter === "all"
                  ? "Nema rezervacija."
                  : `Nema ${STATUS_FILTERS.find(f => f.value === filter)?.label.toLowerCase()} rezervacija.`}
              </p>
            </div>
          ) : (
            <>
            {filtered.length > PAGE_SIZE && (
              <p className="pagination-info">
                Prikazano {Math.min((page - 1) * PAGE_SIZE + 1, filtered.length)}–{Math.min(page * PAGE_SIZE, filtered.length)} od {filtered.length} rezervacija
              </p>
            )}
            <div className="slots-table-wrap">
              <table className="slots-table">
                <thead>
                  <tr>
                    <th>Termin / Lokacija</th>
                    <th>Tim</th>
                    <th>Datum</th>
                    <th>Sport</th>
                    <th>Kreirao</th>
                    <th>Status</th>
                    <th>Komentari</th>
                    <th>Akcije</th>
                  </tr>
                </thead>
                <tbody>
                  {paginated.map(r => {
                    const isPending      = r.status === "PENDING";
                    const isActive       = r.status === "PENDING" || r.status === "APPROVED";
                    const isOwn          = r.createdByUserId === currentUserId;
                    const isLeagueLinked = Boolean(r.linkedMatchId);
                    const canCancel      = isActive && !isLeagueLinked && (isAdmin || isOwn);
                    const canReschedule  = isActive && !isLeagueLinked && (isAdmin || isOwn);
                    const isExpanded     = expandedRow === r.id;
                    const comments       = commentsMap[r.id] || [];

                    return (
                      <React.Fragment key={r.id}>
                      <tr>
                        <td>
                          <div className="slot-resource">{r.resourceName || "—"}</div>
                          <div className="slot-location">{r.location || "—"} · {formatTime(r.startTime)}–{formatTime(r.endTime)}</div>
                        </td>
                        <td>{r.teamName || "—"}</td>
                        <td>{formatDate(r.slotDate)}</td>
                        <td>
                          {r.sport
                            ? (SPORT_OPTIONS.find(o => o.value === r.sport)?.label || r.sport)
                            : <span style={{ color: "var(--color-text-muted)" }}>—</span>}
                        </td>
                        <td>{r.createdByUsername || "—"}</td>
                        <td>
                          <span className={`status-chip status-${String(r.status).toLowerCase()}`}>
                            {statusLabel(r.status)}
                          </span>
                          {isLeagueLinked && (
                            <span
                              className="status-chip status-league"
                              title="Termin je vezan za ligašku utakmicu i ne može se direktno otkazati ili izmijeniti."
                              style={{ marginLeft: 6 }}
                            >
                              Liga
                            </span>
                          )}
                        </td>
                        <td>
                          <button
                            className="btn btn-xs btn-secondary"
                            type="button"
                            onClick={() => toggleComments(r.id)}
                          >
                            {isExpanded ? "Zatvori" : `Komentari${commentsMap[r.id] ? ` (${comments.length})` : ""}`}
                          </button>
                        </td>
                        <td>
                          <div className="row-actions">
                            {isAdmin && isPending && (
                              <>
                                <button
                                  className="btn btn-xs btn-success"
                                  onClick={() => handleAction(approveReservation, r.id, "Odobravanje")}
                                >Odobri</button>
                                <button
                                  className="btn btn-xs btn-danger"
                                  onClick={() => handleAction(rejectReservation, r.id, "Odbijanje")}
                                >Odbij</button>
                              </>
                            )}
                            {canReschedule && (
                              <button
                                className="btn btn-xs btn-secondary"
                                onClick={() => openReschedule(r)}
                              >Izmijeni</button>
                            )}
                            {canCancel && (
                              <button
                                className="btn btn-xs btn-danger"
                                onClick={() => handleAction(cancelReservation, r.id, "Otkazivanje")}
                              >Otkaži</button>
                            )}
                            {!isAdmin && !isPending && !canCancel && !canReschedule && (
                              <span className="no-action">—</span>
                            )}
                          </div>
                        </td>
                      </tr>
                      {isExpanded && (
                        <tr>
                          <td colSpan={8} style={{ padding: "12px 18px", background: "rgba(255,255,255,0.03)" }}>
                            <div style={{ marginBottom: 8, fontWeight: 600, fontSize: "0.85rem", color: "var(--color-text-muted)" }}>Komentari</div>
                            {comments.length === 0 ? (
                              <div style={{ fontSize: "0.82rem", color: "var(--color-text-muted)", marginBottom: 8 }}>Nema komentara.</div>
                            ) : (
                              <div style={{ display: "flex", flexDirection: "column", gap: 6, marginBottom: 10 }}>
                                {comments.map(c => (
                                  <div key={c.id} style={{ fontSize: "0.82rem", borderLeft: "2px solid rgba(255,255,255,0.15)", paddingLeft: 10 }}>
                                    <strong>{c.authorName || c.authorUsername}</strong>
                                    <span style={{ color: "var(--color-text-muted)", marginLeft: 8, fontSize: "0.76rem" }}>
                                      {c.createdAt ? new Date(c.createdAt).toLocaleString("bs") : ""}
                                    </span>
                                    <div>{c.content}</div>
                                  </div>
                                ))}
                              </div>
                            )}
                            <div style={{ display: "flex", gap: 8 }}>
                              <input
                                className="field-input"
                                style={{ flex: 1, fontSize: "0.82rem" }}
                                placeholder="Dodaj komentar..."
                                value={commentInput[r.id] || ""}
                                onChange={e => setCommentInput(prev => ({ ...prev, [r.id]: e.target.value }))}
                                onKeyDown={e => { if (e.key === "Enter") submitComment(r.id); }}
                              />
                              <button
                                className="btn btn-xs btn-primary"
                                type="button"
                                disabled={commentSubmitting[r.id] || !(commentInput[r.id] || "").trim()}
                                onClick={() => submitComment(r.id)}
                              >
                                {commentSubmitting[r.id] ? "..." : "Pošalji"}
                              </button>
                            </div>
                          </td>
                        </tr>
                      )}
                      </React.Fragment>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <Pagination total={filtered.length} page={page} pageSize={PAGE_SIZE} onChange={setPage} />
            </>
          )}
        </div>

      </div>

      {rescheduleTarget && (
        <div className="modal-overlay" onClick={closeReschedule}>
          <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="modal-title">Izmjena termina</h3>
              <button type="button" className="modal-close" onClick={closeReschedule}>×</button>
            </div>
            <form onSubmit={submitReschedule}>
              <div className="modal-body">
                <p className="modal-subtitle">
                  <strong>Trenutni termin:</strong> {rescheduleTarget.resourceName || "—"} · {rescheduleTarget.location || "—"} · {formatDate(rescheduleTarget.slotDate)} · {formatTime(rescheduleTarget.startTime)}–{formatTime(rescheduleTarget.endTime)}
                </p>
                <div className="field">
                  <label className="field-label">Novi slobodan termin (samo za {rescheduleTarget.sport ? (SPORT_OPTIONS.find(o => o.value === rescheduleTarget.sport)?.label || rescheduleTarget.sport) : "ovaj sport"})</label>
                  {(() => {
                    const targetSport = rescheduleTarget.sport;
                    const eligible = availableTimeSlots
                      .filter(s => s.id !== rescheduleTarget.slotId)
                      .filter(s => !targetSport || s.sport === targetSport);
                    return (
                      <select
                        className="field-input"
                        value={rescheduleSlotId}
                        onChange={(e) => setRescheduleSlotId(e.target.value)}
                        disabled={!eligible.length}
                      >
                        <option value="">
                          {eligible.length === 0 ? "Nema slobodnih termina za ovaj sport" : "— Odaberi termin —"}
                        </option>
                        {eligible.map(s => (
                          <option key={s.id} value={s.id}>
                            {s.resourceName} · {s.location} · {formatDate(s.slotDate)} · {formatTime(s.startTime)}–{formatTime(s.endTime)}
                          </option>
                        ))}
                      </select>
                    );
                  })()}
                </div>
                <div className="field">
                  <label className="field-label">Napomena <span className="field-optional">(opcionalno)</span></label>
                  <input
                    className="field-input"
                    placeholder="Kratka napomena..."
                    value={rescheduleNote}
                    onChange={(e) => setRescheduleNote(e.target.value)}
                  />
                </div>
                {rescheduleError && (
                  <div className="inline-error">{rescheduleError}</div>
                )}
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={closeReschedule} disabled={rescheduleSubmitting}>
                  Odustani
                </button>
                <button type="submit" className="btn btn-primary" disabled={rescheduleSubmitting || !availableTimeSlots.length}>
                  {rescheduleSubmitting ? "Spremam..." : "Premjesti termin"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default ReservationsPage;
