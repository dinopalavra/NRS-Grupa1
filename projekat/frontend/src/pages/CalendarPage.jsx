import React, { useState, useEffect, useMemo } from "react";
import { useAppContext } from "../context/AppContext.jsx";
import { fetchAllMatches } from "../services/api.js";

const MONTHS = ["Januar","Februar","Mart","April","Maj","Juni","Juli","August","Septembar","Oktobar","Novembar","Decembar"];
const DAYS = ["Pon","Uto","Sri","Čet","Pet","Sub","Ned"];

function CalendarPage() {
  const { reservations, auth } = useAppContext();
  const [today] = useState(new Date());
  const [year, setYear]   = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth());
  const [selected, setSelected] = useState(null);
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    if (!auth?.token) return;
    fetchAllMatches(auth.token)
      .then(d => setMatches(Array.isArray(d) ? d : []))
      .catch(() => setMatches([]));
  }, [auth?.token]);

  const prev = () => { if (month === 0) { setMonth(11); setYear(y => y-1); } else setMonth(m => m-1); };
  const next = () => { if (month === 11) { setMonth(0); setYear(y => y+1); } else setMonth(m => m+1); };

  const firstDay = new Date(year, month, 1);
  const lastDay  = new Date(year, month+1, 0);
  let startDow = firstDay.getDay();
  startDow = startDow === 0 ? 6 : startDow - 1;

  const cells = [];
  for (let i = 0; i < startDow; i++) cells.push(null);
  for (let d = 1; d <= lastDay.getDate(); d++) cells.push(d);

  const eventsByDay = useMemo(() => {
    const map = {};
    (reservations || []).forEach(r => {
      if (!r.slotDate) return;
      const [ry, rm, rd] = r.slotDate.split("-").map(Number);
      if (ry === year && rm-1 === month) {
        if (!map[rd]) map[rd] = [];
        map[rd].push({ type: "reservation", label: `${r.teamName || ""} — ${r.resourceName || ""}`, status: r.status });
      }
    });
    matches.forEach(m => {
      if (!m.matchDate) return;
      const [ry, rm, rd] = m.matchDate.split("-").map(Number);
      if (ry === year && rm-1 === month) {
        if (!map[rd]) map[rd] = [];
        map[rd].push({ type: "match", label: `${m.homeTeamName} vs ${m.awayTeamName}`, leagueName: m.leagueName, status: m.status });
      }
    });
    return map;
  }, [reservations, matches, year, month]);

  const selectedEvents = selected ? (eventsByDay[selected] || []) : [];

  return (
    <div className="app-page">
      <div className="page-hero">
        <div className="page-hero-text">
          <h1 className="page-title">Kalendar</h1>
          <p className="page-subtitle">Pregled utakmica i rezervacija po datumu</p>
        </div>
      </div>

      <div className="content-card" style={{ overflow: 'visible' }}>
        <div className="content-card-header content-card-header-row">
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <button className="btn btn-secondary" style={{ padding: '6px 12px' }} onClick={prev}>‹</button>
            <h2 className="content-card-title" style={{ minWidth: 180, textAlign: 'center' }}>
              {MONTHS[month]} {year}
            </h2>
            <button className="btn btn-secondary" style={{ padding: '6px 12px' }} onClick={next}>›</button>
          </div>
          <button className="btn btn-secondary" onClick={() => { setMonth(today.getMonth()); setYear(today.getFullYear()); setSelected(null); }}>
            Danas
          </button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', borderBottom: '1px solid rgba(201,168,124,0.1)' }}>
          {DAYS.map(d => (
            <div key={d} style={{ padding: '10px 0', textAlign: 'center', fontSize: '0.68rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--gold)', borderRight: '1px solid rgba(201,168,124,0.06)' }}>
              {d}
            </div>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)' }}>
          {cells.map((day, i) => {
            if (!day) return <div key={`e-${i}`} style={{ minHeight: 80, borderRight: '1px solid rgba(201,168,124,0.06)', borderBottom: '1px solid rgba(201,168,124,0.06)', background: 'rgba(0,0,0,0.04)' }} />;
            const isToday = year === today.getFullYear() && month === today.getMonth() && day === today.getDate();
            const isSelected = selected === day;
            const events = eventsByDay[day] || [];
            return (
              <div
                key={day}
                onClick={() => setSelected(isSelected ? null : day)}
                style={{
                  minHeight: 80,
                  borderRight: '1px solid rgba(201,168,124,0.06)',
                  borderBottom: '1px solid rgba(201,168,124,0.06)',
                  padding: '8px 6px',
                  cursor: 'pointer',
                  background: isSelected ? 'rgba(201,168,124,0.1)' : isToday ? 'rgba(201,168,124,0.06)' : 'transparent',
                  transition: 'background 0.15s',
                }}
              >
                <div style={{
                  width: 28, height: 28, borderRadius: '50%',
                  background: isToday ? 'var(--gold)' : 'transparent',
                  color: isToday ? 'var(--dark-900)' : 'var(--cream)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '0.82rem', fontWeight: isToday ? 700 : 400, marginBottom: 4,
                }}>
                  {day}
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  {events.slice(0, 2).map((ev, j) => (
                    <div key={j} style={{
                      fontSize: '0.65rem',
                      padding: '1px 5px',
                      borderRadius: 3,
                      background: ev.type === 'match' ? 'rgba(201,168,124,0.18)' : 'rgba(52,211,153,0.15)',
                      color: ev.type === 'match' ? 'var(--gold-light)' : '#6ee7b7',
                      whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
                    }}>
                      {ev.label}
                    </div>
                  ))}
                  {events.length > 2 && (
                    <div style={{ fontSize: '0.62rem', color: 'var(--cream-muted)' }}>+{events.length - 2} više</div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {selected && selectedEvents.length > 0 && (
          <div style={{ padding: '16px 24px', borderTop: '1px solid rgba(201,168,124,0.12)' }}>
            <div style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--gold)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 10 }}>
              {selected}. {MONTHS[month]} {year}
            </div>
            {selectedEvents.map((ev, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 0', borderBottom: '1px solid rgba(201,168,124,0.06)' }}>
                <span style={{ width: 8, height: 8, borderRadius: '50%', background: ev.type === 'match' ? 'var(--gold)' : '#6ee7b7', flexShrink: 0 }} />
                <div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--cream)', fontWeight: 500 }}>{ev.label}</div>
                  {ev.leagueName && <div style={{ fontSize: '0.75rem', color: 'var(--cream-muted)' }}>{ev.leagueName}</div>}
                  <div style={{ fontSize: '0.72rem', color: 'var(--cream-muted)' }}>
                    {ev.type === 'match' ? '⚽ Utakmica' : '📅 Rezervacija'} · {ev.status}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        {selected && selectedEvents.length === 0 && (
          <div style={{ padding: '16px 24px', borderTop: '1px solid rgba(201,168,124,0.12)', color: 'var(--cream-muted)', fontSize: '0.85rem' }}>
            Nema događaja za {selected}. {MONTHS[month]} {year}.
          </div>
        )}
      </div>
    </div>
  );
}

export default CalendarPage;
