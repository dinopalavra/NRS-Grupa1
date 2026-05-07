import React, { useMemo, useState } from "react";
import { useAppContext } from "../context/AppContext.jsx";
import SectionCard from "../components/SectionCard.jsx";
import DataTable from "../components/DataTable.jsx";
import { formatDate, formatTime, statusLabel } from "../utils/format.js";

function TimeSlotsPage() {
  const {
    timeSlots,
    loadingTimeSlots,
    createNewTimeSlot,
    selectedRole
  } = useAppContext();

  const [filter, setFilter] = useState("all");
  const [message, setMessage] = useState("");
  const [form, setForm] = useState({
    slotDate: "",
    startTime: "",
    endTime: "",
    location: "",
    resourceName: ""
  });

  const filteredSlots = useMemo(() => {
    if (filter === "all") return timeSlots;
    return timeSlots.filter((slot) => slot.availabilityStatus === filter);
  }, [filter, timeSlots]);

  const stats = useMemo(() => {
    return {
      total: timeSlots.length,
      available: timeSlots.filter((item) => item.availabilityStatus === "AVAILABLE").length,
      reserved: timeSlots.filter((item) => item.availabilityStatus === "RESERVED").length,
      blocked: timeSlots.filter((item) => item.availabilityStatus === "BLOCKED").length
    };
  }, [timeSlots]);

  const onChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmit = async (event) => {
    event.preventDefault();

    if (
      !form.slotDate ||
      !form.startTime ||
      !form.endTime ||
      !form.location.trim() ||
      !form.resourceName.trim()
    ) {
      setMessage("Popuni sva polja za novi termin.");
      return;
    }

    try {
      await createNewTimeSlot({
        slotDate: form.slotDate,
        startTime: form.startTime.length === 5 ? `${form.startTime}:00` : form.startTime,
        endTime: form.endTime.length === 5 ? `${form.endTime}:00` : form.endTime,
        location: form.location.trim(),
        resourceName: form.resourceName.trim()
      });

      setForm({
        slotDate: "",
        startTime: "",
        endTime: "",
        location: "",
        resourceName: ""
      });
      setMessage("Termin je uspješno kreiran i dostupan za rezervaciju.");
    } catch (error) {
      setMessage(error.message || "Greška pri kreiranju termina.");
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
      key: "availabilityStatus",
      header: "Status",
      render: (row) => (
        <span className={`status ${String(row.availabilityStatus).toLowerCase()}`}>
          {statusLabel(row.availabilityStatus)}
        </span>
      )
    }
  ];

  return (
    <>
      <div className="page-header">
        <div>
          <h2 className="page-title">Time slotovi</h2>
          <p className="page-subtitle">
            Kreiranje i pregled dostupnih termina za rezervacije.
          </p>
        </div>
        <div className="badge">Uloga: {selectedRole}</div>
      </div>

      <div className="grid grid-2">
        <SectionCard
          title="Novi termin"
          subtitle="Dodaj novi slobodan termin koji će odmah biti dostupan za rezervacije."
        >
          <form onSubmit={onSubmit} className="form-grid">
            <input
              className="form-input"
              type="date"
              name="slotDate"
              value={form.slotDate}
              onChange={onChange}
            />

            <input
              className="form-input"
              type="time"
              name="startTime"
              value={form.startTime}
              onChange={onChange}
            />

            <input
              className="form-input"
              type="time"
              name="endTime"
              value={form.endTime}
              onChange={onChange}
            />

            <input
              className="form-input"
              name="location"
              placeholder="Lokacija, npr. Skenderija"
              value={form.location}
              onChange={onChange}
            />

            <input
              className="form-input form-grid-full"
              name="resourceName"
              placeholder="Naziv resursa, npr. Teren 1"
              value={form.resourceName}
              onChange={onChange}
            />

            <button className="btn btn-primary form-grid-full" type="submit">
              Kreiraj termin
            </button>
          </form>

          {message ? <div className="notice">{message}</div> : null}
        </SectionCard>

        <SectionCard
          title="Pregled statusa"
          subtitle="Brzi filter i broj stanja slotova."
        >
          <div className="toolbar">
            <button className="btn btn-secondary" type="button" onClick={() => setFilter("all")}>
              Sve ({stats.total})
            </button>
            <button className="btn btn-secondary" type="button" onClick={() => setFilter("AVAILABLE")}>
              Dostupni ({stats.available})
            </button>
            <button className="btn btn-secondary" type="button" onClick={() => setFilter("RESERVED")}>
              Rezervisani ({stats.reserved})
            </button>
            <button className="btn btn-secondary" type="button" onClick={() => setFilter("BLOCKED")}>
              Blokirani ({stats.blocked})
            </button>
          </div>

          <div className="warning-box" style={{ marginTop: 16 }}>
            Novi termin se kreira kao dostupan i odmah se pojavljuje u rezervacijama.
          </div>
        </SectionCard>
      </div>

      <div style={{ marginTop: 18 }}>
        <SectionCard
          title="Lista termina"
          subtitle="Svi termini u sistemu."
        >
          {loadingTimeSlots ? (
            <p className="page-subtitle">Učitavanje termina...</p>
          ) : (
            <DataTable
              columns={columns}
              rows={filteredSlots}
              emptyText="Nema termina za odabrani filter."
            />
          )}
        </SectionCard>
      </div>
    </>
  );
}

export default TimeSlotsPage;