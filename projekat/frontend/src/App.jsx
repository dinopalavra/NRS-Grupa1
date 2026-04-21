import UsersPage from "./pages/UsersPage";
import TeamsPage from "./pages/TeamsPage";
import ReservationsPage from "./pages/ReservationsPage";
import LeaguesPage from "./pages/LeaguesPage";
import ResultsPage from "./pages/ResultsPage";

function App() {
  return (
    <div style={{ fontFamily: "Arial, sans-serif", padding: "2rem" }}>
      <h1>Sistem za upravljanje sportskim terminima i ligama</h1>
      <p>Frontend skeleton je uspješno pokrenut i organizovan po glavnim modulima sistema.</p>

      <hr />
      <UsersPage />
      <hr />
      <TeamsPage />
      <hr />
      <ReservationsPage />
      <hr />
      <LeaguesPage />
      <hr />
      <ResultsPage />
    </div>
  );
}

export default App;