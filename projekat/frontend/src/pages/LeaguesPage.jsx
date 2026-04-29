import React from "react";
import { useAppContext } from "../context/AppContext.jsx";
import SectionCard from "../components/SectionCard.jsx";
import DataTable from "../components/DataTable.jsx";

function LeaguesPage() {
  const { leagues } = useAppContext();
  const league = leagues[0];

  return (
    <>
      <div className="page-header">
        <div>
          <h2 className="page-title">Lige</h2>
          <p className="page-subtitle">
            Pregled aktivnih liga, sezone i trenutne tabele.
          </p>
        </div>
        <div className="badge">{league?.season || "Bez sezone"}</div>
      </div>

      <SectionCard
        title={league?.name || "Liga nije dostupna"}
        subtitle="Tabela lige i osnovni statistički pregled"
      >
        <DataTable
          columns={[
            { key: "team", header: "Tim" },
            { key: "played", header: "Odigrano" },
            { key: "wins", header: "Pobjede" },
            { key: "draws", header: "Neriješeno" },
            { key: "losses", header: "Porazi" },
            { key: "points", header: "Bodovi" }
          ]}
          rows={league?.standings || []}
          emptyText="Trenutno nema podataka o tabeli."
        />
      </SectionCard>
    </>
  );
}

export default LeaguesPage;