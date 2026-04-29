import React from "react";
import { useAppContext } from "../context/AppContext.jsx";
import SectionCard from "../components/SectionCard.jsx";
import DataTable from "../components/DataTable.jsx";
import { formatDate, statusLabel } from "../utils/format.js";

function ResultsPage() {
  const { results } = useAppContext();

  return (
    <>
      <div className="page-header">
        <div>
          <h2 className="page-title">Rezultati</h2>
          <p className="page-subtitle">
            Evidencija utakmica, rezultata i statusa mečeva.
          </p>
        </div>
        <div className="badge">Match center</div>
      </div>

      <SectionCard title="Pregled utakmica" subtitle="Završeni i aktivni mečevi">
        <DataTable
          columns={[
            { key: "homeTeam", header: "Domaći" },
            { key: "awayTeam", header: "Gost" },
            { key: "score", header: "Rezultat" },
            { key: "date", header: "Datum", render: (row) => formatDate(row.date) },
            {
              key: "status",
              header: "Status",
              render: (row) => <span className={`status ${row.status}`}>{statusLabel(row.status)}</span>
            }
          ]}
          rows={results}
          emptyText="Nema unesenih rezultata."
        />
      </SectionCard>
    </>
  );
}

export default ResultsPage;