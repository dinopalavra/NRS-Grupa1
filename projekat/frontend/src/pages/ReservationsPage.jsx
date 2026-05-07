import React, { useEffect, useMemo, useState } from "react";
import { useAppContext } from "../context/AppContext.jsx";
import SectionCard from "../components/SectionCard.jsx";
import DataTable from "../components/DataTable.jsx";
import { formatDate, formatTime, statusLabel } from "../utils/format.js";

function ReservationsPage() {
  const {
    reservations,
    teams,
    availableTimeSlots,
    selectedRole,
    loadingReservations,
    loadingTimeSlots,
    addReservation,
    approveReservation,
    rejectReservation,
    cancelReservation
  } = useAppContext();

  const [filter, setFilter] = useState("all");
  const [form, setForm] = useState({
    teamId: "",
    slotId: "",
    note: ""
  });
  const [message, setMessage] = useState("");

  useEffect(() => {
    setForm((prev) => ({
      teamId: prev.teamId || String(teams[0]?.id || ""),
      slotId: prev.slotId || String(availableTimeSlots[0]?.id || ""),
      note: prev.note || ""
    }));
  }, [teams, availableTimeSlots]);

  const filteredReservations = useMemo(() => {
    if (filter === "all") {
      return reservations;
    }

    return reservations.filter((item) => item.status === filter);
  }, [filter, reservations]);

  const onChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmit = async (event) => {
    event.preventDefault();

    if (!form.teamId || !form.slotId) {
      setMessage("Odaberite tim i slobodan termin.");
      return;
    }

    try {
      await addReservation(form);
      setForm({
        teamId: String(teams[0]?.id || ""),
        slotId: String(availableTimeSlots[0]?.id || ""),
        note: ""
      });
      setMessage("Rezervacija je uspješno kreirana.");
    } catch (error) {
      setMessage(error.message || "Greška pri kreiranju rezervacije.");
    }
  };

  const columns = [
    {
      key: "resourceName",
      header: "Resurs",
      render: (row) => row.resourceName || "-"
    },
    {
      key: "location",
      header: "Lokacija",
      render: (row) => row.location || "-"
    },
    {
      key: "teamName",
      header: "Tim",
      render: (row) => row.teamName || "-"
    },
    {
      key: "slotDate",
      header: "Datum",
      render: (row) => formatDate(row.slotDate)
    },
    {
      key: "time",
      header: "Termin",
      render: (row) => `${formatTime(row.startTime)} - ${formatTime(row.endTime)}`
    },
    {
      key: "createdByUsername",
      header: "Kreirao",
      render: (row) => row.createdByUsername || "-"
    },
    {
      key: "status",
      header: "Status",
      render: (row) => <span className={`status ${String(row.status).toLowerCase()}`}>{statusLabel(row.status)}</span>
    },
    {
      key: "actions",
      header: "Akcije",
      render: (row) => {
        const isPending = row.status === "PENDING";
        const canCancel = row.status === "PENDING" || row.status === "APPROVED";

        return (
          <div className="actions">
            {selectedRole === "ADMIN" && isPending ? (
              <>
                <button
                  className="btn btn-primary"
                  type="button"
                  onClick={() => approveReservation(row.id)}
                >
                  Odobri
                </button>
                <button
                  className="btn btn-danger"
                  type="button"
                  onClick={() => rejectReservation(row.id)}
                >
                  Odbij
                </button>
              </>
            ) : null}

            {canCancel ? (
              <button
                className="btn btn-secondary"
                type="button"
                onClick={() => cancelReservation(row.id)}
              >
                Otkaži
              </button>
            ) : null}

            {!isPending && !canCancel ? <span className="page-subtitle">Nema akcija</span> : null}
          </div>
        );
      }
    }
  ];

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
        <SectionCard
          title="Nova rezervacija"
          subtitle="Kreiranje zahtjeva za slobodan termin iz sistema time slotova."
        >
          <form onSubmit={onSubmit} className="form-grid">
            <select
              className="form-select"
              name="teamId"
              value={form.teamId}
              onChange={onChange}
            >
              <option value="">Odaberi tim</option>
              {teams.map((team) => (
                <option key={team.id} value={team.id}>
                  {team.name}
                </option>
              ))}
            </select>

            <select
              className="form-select"
              name="slotId"
              value={form.slotId}
              onChange={onChange}
              disabled={!availableTimeSlots.length || loadingTimeSlots}
            >
              <option value="">
                {loadingTimeSlots ? "Učitavanje termina..." : "Odaberi slobodan termin"}
              </option>
              {availableTimeSlots.map((slot) => (
                <option key={slot.id} value={slot.id}>
                  {slot.location} - {slot.resourceName} | {formatDate(slot.slotDate)} |{" "}
                  {formatTime(slot.startTime)} - {formatTime(slot.endTime)}
                </option>
              ))}
            </select>

            <textarea
              className="form-input form-grid-full"
              name="note"
              placeholder="Napomena (opcionalno)"
              value={form.note}
              onChange={onChange}
              rows={4}
            />

            <button className="btn btn-primary form-grid-full" type="submit">
              Kreiraj rezervaciju
            </button>
          </form>

          {message ? <div className="notice">{message}</div> : null}

          {!availableTimeSlots.length && !loadingTimeSlots ? (
            <div className="warning-box">
              Trenutno nema slobodnih termina za rezervaciju.
            </div>
          ) : null}
        </SectionCard>

        <SectionCard
          title="Filter rezervacija"
          subtitle="Brzi pregled po statusu."
        >
          <div className="toolbar">
            <button className="btn btn-secondary" type="button" onClick={() => setFilter("all")}>
              Sve
            </button>
            <button className="btn btn-secondary" type="button" onClick={() => setFilter("PENDING")}>
              Na čekanju
            </button>
            <button className="btn btn-secondary" type="button" onClick={() => setFilter("APPROVED")}>
              Odobrene
            </button>
            <button className="btn btn-secondary" type="button" onClick={() => setFilter("REJECTED")}>
              Odbijene
            </button>
            <button className="btn btn-secondary" type="button" onClick={() => setFilter("CANCELLED")}>
              Otkazane
            </button>
          </div>

          <div className="warning-box" style={{ marginTop: 16 }}>
            Admin može odobriti ili odbiti PENDING rezervacije direktno iz tabele.
          </div>
        </SectionCard>
      </div>

      <div style={{ marginTop: 18 }}>
        <SectionCard
          title="Lista rezervacija"
          subtitle="Pregled svih rezervacija u sistemu."
        >
          {loadingReservations ? (
            <p className="page-subtitle">Učitavanje rezervacija...</p>
          ) : (
            <DataTable
              columns={columns}
              rows={filteredReservations}
              emptyText="Nema rezervacija za odabrani filter."
            />
          )}
        </SectionCard>
      </div>
    </>
  );
}

export default ReservationsPage;