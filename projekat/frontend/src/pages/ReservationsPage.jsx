import React, { useEffect, useMemo, useState } from "react";
import { useAppContext } from "../context/AppContext.jsx";
import { formatDate, formatTime, statusLabel } from "../utils/format.js";

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
    loadingReservations,
    loadingTimeSlots,
    addReservation,
    approveReservation,
    rejectReservation,
    cancelReservation,
    rescheduleReservation,
  } = useAppContext();

  const isAdmin   = selectedRole === "ADMIN";
  const canCreate = selectedRole === "ADMIN" || selectedRole === "CAPTAIN";

  const currentUserId = currentUser?.userId ?? currentUser?.id ?? null;

  const [filter,     setFilter]     = useState("all");
  const [form,       setForm]       = useState({ teamId: "", slotId: "", note: "", sport: "" });
  const [message,    setMessage]    = useState({ text: "", ok: true });
  const [submitting, setSubmitting] = useState(false);

  const [rescheduleTarget,   setRescheduleTarget]   = useState(null);
  const [rescheduleSlotId,   setRescheduleSlotId]   = useState("");
  const [rescheduleNote,     setRescheduleNote]     = useState("");
  const [rescheduleError,    setRescheduleError]    = useState("");
  const [rescheduleSubmitting, setRescheduleSubmitting] = useState(false);

  useEffect(() => {
    setForm(prev => ({
      teamId: prev.teamId || String(teams[0]?.id || ""),
      slotId: prev.slotId || String(availableTimeSlots[0]?.id || ""),
      note:   prev.note || "",
      sport:  prev.sport || "",
    }));
  }, [teams, availableTimeSlots]);

  const visibleReservations = useMemo(() => {
    if (!isAdmin && !canCreate) {
      return reservations.filter(r => r.createdByUserId === currentUserId);
    }
    return reservations;
  }, [reservations, isAdmin, canCreate, currentUserId]);

  const filtered = useMemo(() => {
    const base = filter === "all" ? visibleReservations : visibleReservations.filter(r => r.status === filter);
    return [...base].sort((a, b) => {
      if (a.slotDate !== b.slotDate) return a.slotDate < b.slotDate ? -1 : 1;
      return a.startTime < b.startTime ? -1 : 1;
    });
  }, [filter, visibleReservations]);

  const counts = useMemo(() => ({
    pending:   visibleReservations.filter(r => r.status === "PENDING").length,
    approved:  visibleReservations.filter(r => r.status === "APPROVED").length,
    rejected:  visibleReservations.filter(r => r.status === "REJECTED").length,
    cancelled: visibleReservations.filter(r => r.status === "CANCELLED").length,
  }), [visibleReservations]);

  const onChange = e => setForm(p => ({ ...p, [e.target.name]: e.target.value }));

  const onSubmit = async e => {
    e.preventDefault();
    if (!form.teamId || !form.slotId) {
      setMessage({ text: "Odaberite tim i slobodan termin.", ok: false });
      return;
    }
    setSubmitting(true);
    setMessage({ text: "", ok: true });
    try {
      await addReservation({ ...form, sport: form.sport || null });
      setForm({
        teamId: String(teams[0]?.id || ""),
        slotId: String(availableTimeSlots[0]?.id || ""),
        note:   "",
        sport:  "",
      });
      setMessage({ text: "Rezervacija je uspješno kreirana i čeka odobrenje.", ok: true });
    } catch (err) {
      setMessage({ text: err.message || "Greška pri kreiranju rezervacije.", ok: false });
    } finally {
      setSubmitting(false);
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

        {canCreate && (
          <div className="content-card">
            <div className="content-card-header">
              <h2 className="content-card-title">Nova rezervacija</h2>
              <p className="content-card-subtitle">Rezervišite slobodan termin za odabrani tim</p>
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
                    {teams.filter(t => !form.sport || !t.sport || t.sport === form.sport).map(t => (
                      <option key={t.id} value={t.id}>{t.name}</option>
                    ))}
                  </select>
                </div>
                <div className="field field-grow">
                  <label className="field-label">Slobodan termin</label>
                  <select
                    className="field-input"
                    name="slotId"
                    value={form.slotId}
                    onChange={onChange}
                    disabled={loadingTimeSlots || !availableTimeSlots.length}
                  >
                    <option value="">
                      {loadingTimeSlots ? "Učitavanje..." : availableTimeSlots.length === 0 ? "Nema slobodnih termina" : "— Odaberi termin —"}
                    </option>
                    {availableTimeSlots.map(s => (
                      <option key={s.id} value={s.id}>
                        {s.resourceName} · {s.location} · {formatDate(s.slotDate)} · {formatTime(s.startTime)}–{formatTime(s.endTime)}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="form-row">
                <div className="field field-grow">
                  <label className="field-label">Napomena <span className="field-optional">(opcionalno)</span></label>
                  <input className="field-input" name="note" placeholder="Kratka napomena..." value={form.note} onChange={onChange} />
                </div>
                <div className="field field-action">
                  <label className="field-label">&nbsp;</label>
                  <button className="btn btn-primary" type="submit" disabled={submitting || !availableTimeSlots.length}>
                    {submitting ? "Kreiranje..." : "Kreiraj rezervaciju"}
                  </button>
                </div>
              </div>
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
                  onClick={() => setFilter(f.value)}
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
                    <th>Akcije</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map(r => {
                    const isPending      = r.status === "PENDING";
                    const isActive       = r.status === "PENDING" || r.status === "APPROVED";
                    const isOwn          = r.createdByUserId === currentUserId;
                    const isLeagueLinked = Boolean(r.linkedMatchId);
                    const canCancel      = isActive && !isLeagueLinked && (isAdmin || isOwn);
                    const canReschedule  = isActive && !isLeagueLinked && (isAdmin || isOwn);

                    return (
                      <tr key={r.id}>
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
                    );
                  })}
                </tbody>
              </table>
            </div>
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
                  <label className="field-label">Novi slobodan termin</label>
                  <select
                    className="field-input"
                    value={rescheduleSlotId}
                    onChange={(e) => setRescheduleSlotId(e.target.value)}
                    disabled={!availableTimeSlots.length}
                  >
                    <option value="">
                      {availableTimeSlots.length === 0 ? "Nema slobodnih termina" : "— Odaberi termin —"}
                    </option>
                    {availableTimeSlots
                      .filter(s => s.id !== rescheduleTarget.slotId)
                      .map(s => (
                        <option key={s.id} value={s.id}>
                          {s.resourceName} · {s.location} · {formatDate(s.slotDate)} · {formatTime(s.startTime)}–{formatTime(s.endTime)}
                        </option>
                      ))}
                  </select>
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
