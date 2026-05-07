import React from "react";
import { useAppContext } from "../context/AppContext.jsx";

const COMING_FEATURES = [
  {
    title: "Kreiranje lige",
    desc: "Administrator ili organizator kreira novu ligu ili takmičenje sa osnovnim podacima — naziv, sezona i format.",
    story: "US-9",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="8" r="6"/><path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11"/>
      </svg>
    ),
  },
  {
    title: "Dodavanje timova u ligu",
    desc: "Organizator dodaje postojeće timove u odabranu ligu. Isti tim ne može biti dodan više puta.",
    story: "US-10",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
  },
  {
    title: "Unos rezultata utakmica",
    desc: "Ovlaštena osoba unosi konačni rezultat za odigranu utakmicu. Sistem evidentira ko je unio rezultat i kada.",
    story: "US-11",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
      </svg>
    ),
  },
  {
    title: "Automatska tabela lige",
    desc: "Nakon unosa rezultata sistem automatski izračunava poene, gol-razliku i poredak timova na tabeli.",
    story: "US-12",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/>
        <line x1="6" y1="20" x2="6" y2="14"/><line x1="2" y1="20" x2="22" y2="20"/>
      </svg>
    ),
  },
];

function LigaPage() {
  const { teams } = useAppContext();

  return (
    <div className="app-page">

      <div className="page-hero page-hero-liga">
        <div className="page-hero-text">
          <div className="coming-soon-badge">Sprint 7 · Uskoro</div>
          <h1 className="page-title">Liga</h1>
          <p className="page-subtitle">
            Modul za upravljanje ligama, utakmicama i automatskim ažuriranjem tabele.
            Biće dostupan u narednom sprintu.
          </p>
        </div>
      </div>

      <div className="page-body">

        <div className="coming-soon-grid">
          {COMING_FEATURES.map(f => (
            <div key={f.story} className="coming-soon-card">
              <div className="coming-soon-card-icon">{f.icon}</div>
              <div className="coming-soon-card-body">
                <div className="coming-soon-story">{f.story}</div>
                <h3 className="coming-soon-title">{f.title}</h3>
                <p className="coming-soon-desc">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="content-card">
          <div className="content-card-header">
            <h2 className="content-card-title">Pregled timova za ligu</h2>
            <p className="content-card-subtitle">
              {teams.length > 0
                ? `${teams.length} timova registrovano u sistemu — biće dostupni za dodjelu u ligu`
                : "Nema registrovanih timova u sistemu"}
            </p>
          </div>
          {teams.length === 0 ? (
            <div className="empty-state">
              <div className="empty-state-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                  <circle cx="9" cy="7" r="4"/>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                </svg>
              </div>
              <p>Dodajte timove u modulu Timovi pa se ovdje mogu dodijeliti u ligu.</p>
            </div>
          ) : (
            <div className="teams-preview-grid">
              {teams.map(t => (
                <div key={t.id} className="team-preview-chip">
                  <div className="team-preview-avatar">{t.name?.[0]?.toUpperCase() || "T"}</div>
                  <span>{t.name}</span>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

export default LigaPage;
