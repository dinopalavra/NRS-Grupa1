import React, { useMemo, useState } from "react";
import { useAppContext } from "../context/AppContext.jsx";
import { formatDate, formatTime, statusLabel } from "../utils/format.js";

const FILTERS = [
  { value: "all",       label: "Svi termini" },
  { value: "AVAILABLE", label: "Slobodni" },
  { value: "RESERVED",  label: "Rezervisani" },
  { value: "BLOCKED",   label: "Blokirani" },
];

function TimeSlotsPage() {
  const {
    timeSlots,
    loadingTimeSlots,
    createNewTimeSlot,
    selectedRole,
  } = useAppContext();

  const isAdmin = selectedRole === "ADMIN";

  const [filter, setFilter]   = useState("all");
  const [message, setMessage] = useState({ text: "", ok: true });
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    slotDate: "", startTime: "", endTime: "", location: "", resourceName: "",
  });

  const stats = useMemo(() => ({
    total:     timeSlots.length,
    available: timeSlots.filter(s => s.availabilityStatus === "AVAILABLE").length,
    reserved:  timeSlots.filter(s => s.availabilityStatus === "RESERVED").length,
    blocked:   timeSlots.filter(s => s.availabilityStatus === "BLOCKED").length,
  }), [timeSlots]);

  const filtered = useMemo(() => {
    const base = filter === "all" ? timeSlots : timeSlots.filter(s => s.availabilityStatus === filter);
    return [...base].sort((a, b) => {
      if (a.slotDate !== b.slotDate) return a.slotDate < b.slotDate ? -1 : 1;
      return a.startTime < b.startTime ? -1 : 1;
    });
  }, [timeSlots, filter]);

  const onChange = e => setForm(p => ({ ...p, [e.target.name]: e.target.value }));

  const onSubmit = async e => {
    e.preventDefault();
    if (!form.slotDate || !form.startTime || !form.endTime || !form.location.trim() || !form.resourceName.trim()) {
      setMessage({ text: "Popuni sva polja.", ok: false });
      return;
    }
    setSubmitting(true);
    setMessage({ text: "", ok: true });
    try {
      await createNewTimeSlot({
        slotDate:     form.slotDate,
        startTime:    form.startTime.length === 5 ? `${form.startTime}:00` : form.startTime,
        endTime:      form.endTime.length   === 5 ? `${form.endTime}:00`   : form.endTime,
        location:     form.location.trim(),
        resourceName: form.resourceName.trim(),
      });
      setForm({ slotDate: "", startTime: "", endTime: "", location: "", resourceName: "" });
      setMessage({ text: "Termin je uspješno kreiran.", ok: true });
    } catch (err) {
      setMessage({ text: err.message || "Greška pri kreiranju termina.", ok: false });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="app-page">

      <div className="page-hero">
        <div className="page-hero-text">
          <h1 className="page-title">Termini</h1>
          <p className="page-subtitle">
            {isAdmin
              ? "Kreirajte nove termine i pregledajte sve raspoložive resurse."
              : "Pregledajte dostupne termine za rezervaciju."}
          </p>
        </div>
        <div className="page-hero-stats">
          <div className="mini-stat"><span className="mini-stat-val">{stats.available}</span><span className="mini-stat-label">slobodnih</span></div>
          <div className="mini-stat mini-stat-reserved"><span className="mini-stat-val">{stats.reserved}</span><span className="mini-stat-label">rezervisanih</span></div>
          <div className="mini-stat mini-stat-total"><span className="mini-stat-val">{stats.total}</span><span className="mini-stat-label">ukupno</span></div>
        </div>
      </div>

      <div className="page-body">

        {isAdmin && (
          <div className="content-card">
            <div className="content-card-header">
              <h2 className="content-card-title">Novi termin</h2>
              <p className="content-card-subtitle">Dodaj slobodan termin koji odmah postaje dostupan za rezervaciju</p>
            </div>
            <form onSubmit={onSubmit} className="inline-form">
              <div className="form-row">
                <div className="field">
                  <label className="field-label">Datum</label>
                  <input className="field-input" type="date" name="slotDate" value={form.slotDate} onChange={onChange} />
                </div>
                <div className="field">
                  <label className="field-label">Početak</label>
                  <input className="field-input" type="time" name="startTime" value={form.startTime} onChange={onChange} />
                </div>
                <div className="field">
                  <label className="field-label">Kraj</label>
                  <input className="field-input" type="time" name="endTime" value={form.endTime} onChange={onChange} />
                </div>
              </div>
              <div className="form-row">
                <div className="field field-grow">
                  <label className="field-label">Lokacija</label>
                  <input className="field-input" name="location" placeholder="npr. Skenderija" value={form.location} onChange={onChange} />
                </div>
                <div className="field field-grow">
                  <label className="field-label">Naziv resursa</label>
                  <input className="field-input" name="resourceName" placeholder="npr. Teren 1" value={form.resourceName} onChange={onChange} />
                </div>
                <div className="field field-action">
                  <label className="field-label">&nbsp;</label>
                  <button className="btn btn-primary" type="submit" disabled={submitting}>
                    {submitting ? "Kreiranje..." : "Kreiraj termin"}
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
              <h2 className="content-card-title">Lista termina</h2>
              <p className="content-card-subtitle">
                {filter === "all" ? `${filtered.length} termina ukupno` : `${filtered.length} termina — filter: ${FILTERS.find(f => f.value === filter)?.label}`}
              </p>
            </div>
            <div className="filter-chips">
              {FILTERS.map(f => (
                <button
                  key={f.value}
                  type="button"
                  className={`filter-chip ${filter === f.value ? "filter-chip-active" : ""}`}
                  onClick={() => setFilter(f.value)}
                >
                  {f.label}
                  {f.value !== "all" && <span className="filter-chip-count">{stats[f.value] ?? 0}</span>}
                </button>
              ))}
            </div>
          </div>

          {loadingTimeSlots ? (
            <div className="loading-state">Učitavanje termina...</div>
          ) : filtered.length === 0 ? (
            <div className="empty-state">
              <div className="empty-state-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
              </div>
              <p>Nema termina za odabrani filter.</p>
            </div>
          ) : (
            <div className="slots-table-wrap">
              <table className="slots-table">
                <thead>
                  <tr>
                    <th>Resurs / Lokacija</th>
                    <th>Datum</th>
                    <th>Termin</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map(slot => (
                    <tr key={slot.id}>
                      <td>
                        <div className="slot-resource">{slot.resourceName || "—"}</div>
                        <div className="slot-location">{slot.location || "—"}</div>
                      </td>
                      <td>{formatDate(slot.slotDate)}</td>
                      <td className="slot-time">{formatTime(slot.startTime)} – {formatTime(slot.endTime)}</td>
                      <td>
                        <span className={`status-chip status-${String(slot.availabilityStatus).toLowerCase()}`}>
                          {statusLabel(slot.availabilityStatus)}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

export default TimeSlotsPage;
