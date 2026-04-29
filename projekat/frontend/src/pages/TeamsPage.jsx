import TeamModule from "../modules/teams/TeamModule.jsx";

function TeamsPage() {
  return (
    <>
      <div className="page-header">
        <div>
          <h2 className="page-title">Timovi</h2>
          <p className="page-subtitle">
            Upravljanje timovima, članovima i osnovnim podacima o ekipama.
          </p>
        </div>
        <div className="badge">Teams module</div>
      </div>

      <TeamModule />
    </>
  );
}

export default TeamsPage;