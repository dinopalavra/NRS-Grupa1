import React from "react";
import { useAppContext } from "../context/AppContext.jsx";
import StatCard from "../components/StatCard.jsx";
import SectionCard from "../components/SectionCard.jsx";
import DataTable from "../components/DataTable.jsx";
import { formatDate, statusLabel } from "../utils/format.js";

function DashboardPage() {
  const { users, teams, reservations, results, selectedRole } = useAppContext();

  const approvedReservations = reservations.filter((item) => item.status === "approved").length;
  const pendingReservations = reservations.filter((item) => item.status === "pending").length;
  const completedMatches = results.filter((item) => item.status === "completed").length;

  return (
    <>
      <div className="page-header">
        <div>
          <h2 className="page-title">Dashboard</h2>
          <p className="page-subtitle">
            Početni pregled sistema za upravljanje sportskim terminima i ligama.
          </p>
        </div>
        <div className="badge">Aktivna uloga: {selectedRole}</div>
      </div>

      <div className="grid grid-4">
        <StatCard label="Ukupno korisnika" value={users.length} help="Registrovani korisnici u sistemu" />
        <StatCard label="Ukupno timova" value={teams.length} help="Aktivni sportski timovi" />
        <StatCard label="Odobrene rezervacije" value={approvedReservations} help="Potvrđeni sportski termini" />
        <StatCard label="Završene utakmice" value={completedMatches} help="Rezultati evidentirani u sistemu" />
      </div>

      <div className="grid grid-2" style={{ marginTop: 18 }}>
        <SectionCard
          title="Rezervacije na čekanju"
          subtitle="Zahtjevi koji traže obradu ili potvrdu"
          right={<div className="badge">{pendingReservations} otvorenih</div>}
        >
          <DataTable
            columns={[
              { key: "facility", header: "Objekat" },
              { key: "team", header: "Tim" },
              { key: "date", header: "Datum", render: (row) => formatDate(row.date) },
              { key: "status", header: "Status", render: (row) => <span className={`status ${row.status}`}>{statusLabel(row.status)}</span> }
            ]}
            rows={reservations.filter((item) => item.status === "pending")}
            emptyText="Trenutno nema rezervacija na čekanju."
          />
        </SectionCard>

        <SectionCard title="Brzi pregled timova" subtitle="Sažetak aktivnih timova i kapitena">
          <div className="list">
            {teams.map((team) => (
              <div key={team.id} className="list-item">
                <div className="kv">
                  <strong>{team.name}</strong>
                  <span>Grad: {team.city}</span>
                  <span>Kapiten: {team.captain}</span>
                  <span>Broj članova: {team.members}</span>
                </div>
              </div>
            ))}
          </div>
        </SectionCard>
      </div>
    </>
  );
}

export default DashboardPage;