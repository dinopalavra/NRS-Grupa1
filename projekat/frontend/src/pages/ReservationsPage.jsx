import React from "react";
import { useMemo, useState } from "react";
import { useAppContext } from "../context/AppContext.jsx";
import SectionCard from "../components/SectionCard.jsx";
import DataTable from "../components/DataTable.jsx";
import { formatDate, statusLabel } from "../utils/format.js";

function ReservationsPage() {
  const {
    reservations,
    teams,
    selectedRole,
    addReservation,
    approveReservation,
    rejectReservation
  } = useAppContext();

  const [filter, setFilter] = useState("all");
  const [form, setForm] = useState({
    facility: "",
    team: teams[0]?.name || "",
    date: "",
    time: ""
  });
  const [message, setMessage] = useState("");

  const filteredReservations = useMemo(() => {
    if (filter === "all") return reservations;
    return reservations.filter((item) => item.status === filter);
  }, [filter, reservations]);

  const onChange = (event) => {
    setForm((prev) => ({
      ...prev,
      [event.target.name]: event.target.value
    }));
  };

  const onSubmit = (event) => {
    event.preventDefault();

    if (!form.facility || !form.team || !form.date || !form.time) {
      setMessage("Popunite sva polja za novu rezervaciju.");
      return;
    }

    addReservation(form);
    setForm({
      facility: "",
      team: teams[0]?.name || "",
      date: "",
      time: ""
    });
    setMessage("Rezervacija je evidentirana sa statusom 'Na čekanju'.");
  };

  return (
    <>
      <div className="page-header">
        <div>
          <h2 className="page-title">Rezervacije</h2>
          <p className="page-subtitle">
            Pregled termina, zahtjeva za rezervaciju i adminsko odobravanje.
          </p>
        </div>
        <div className="badge">Uloga: {selectedRole}</div>
      </div>

      <div className="grid grid-2">
        <SectionCard title="Nova rezervacija" subtitle="Kreiranje zahtjeva za termin">
          <form onSubmit={onSubmit} className="form-grid">
            <input
              className="form-input"
              name="facility"
              placeholder="Naziv sportskog objekta"
              value={form.facility}
              onChange={onChange}
            />
            <select
              className="form-select"
              name="team"
              value={form.team}
              onChange={onChange}
            >
              {teams.map((team) => (
                <option key={team.id} value={team.name}>
                  {team.name}
                </option>
              ))}
            </select>
            <input
              className="form-input"
              type="date"
              name="date"
              value={form.date}
              onChange={onChange}
            />
            <input
              className="form-input"
              name="time"
              placeholder="npr. 19:00 - 20:30"
              value={form.time}
              onChange={onChange}
            />
            <button className="btn btn-primary form-grid-full" type="submit">
              Kreiraj rezervaciju
            </button>
          </form>

          {message ? <div className="notice">{message}</div> : null}
        </SectionCard>

        <SectionCard title="Filter rezervacija" subtitle="Brzi pregled po statusu">
          <div className="toolbar">
            <button className="btn btn-secondary" onClick={() => setFilter("all")}>Sve</button>
            <button className="btn btn-secondary" onClick={() => setFilter("pending")}>Na čekanju</button>
            <button className="btn btn-secondary" onClick={() => setFilter("approved")}>Odobrene</button>
            <button className="btn btn-secondary" onClick={() => setFilter("rejected")}>Odbijene</button>
          </div>

          <div className="warning-box">
            Admin može odobriti ili odbiti rezervacije direktno iz tabele ispod.
          </div>
        </SectionCard>
      </div>

      <div style={{ marginTop: 18 }}>
        <SectionCard title="Lista rezervacija" subtitle="Pregled svih rezervacija u sistemu">
          <DataTable
            columns={[
              { key: "facility", header: "Objekat" },
              { key: "team", header: "Tim" },
              { key: "date", header: "Datum", render: (row) => formatDate(row.date) },
              { key: "time", header: "Termin" },
              {
                key: "status",
                header: "Status",
                render: (row) => <span className={`status ${row.status}`}>{statusLabel(row.status)}</span>
              },
              {
                key: "actions",
                header: "Akcije",
                render: (row) =>
                  selectedRole === "ADMIN" && row.status === "pending" ? (
                    <div className="actions">
                      <button className="btn btn-primary" onClick={() => approveReservation(row.id)}>
                        Odobri
                      </button>
                      <button className="btn btn-danger" onClick={() => rejectReservation(row.id)}>
                        Odbij
                      </button>
                    </div>
                  ) : (
                    <span className="page-subtitle">Nema akcija</span>
                  )
              }
            ]}
            rows={filteredReservations}
            emptyText="Nema rezervacija za odabrani filter."
          />
        </SectionCard>
      </div>
    </>
  );
}

export default ReservationsPage;