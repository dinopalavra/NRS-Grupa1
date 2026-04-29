import React from "react";
import { useState } from "react";
import { useAppContext } from "../../context/AppContext.jsx";
import SectionCard from "../../components/SectionCard.jsx";
import DataTable from "../../components/DataTable.jsx";

function TeamModule() {
  const { teams, addTeam } = useAppContext();
  const [form, setForm] = useState({
    name: "",
    city: "",
    captain: "",
    members: 0
  });
  const [message, setMessage] = useState("");

  const onChange = (event) => {
    setForm((prev) => ({
      ...prev,
      [event.target.name]: event.target.value
    }));
  };

  const onSubmit = (event) => {
    event.preventDefault();

    if (!form.name.trim() || !form.city.trim() || !form.captain.trim()) {
      setMessage("Unesite naziv tima, grad i kapitena.");
      return;
    }

    addTeam(form);
    setForm({ name: "", city: "", captain: "", members: 0 });
    setMessage("Tim je uspješno dodat u lokalni frontend prikaz.");
  };

  return (
    <div className="grid grid-2">
      <SectionCard title="Pregled timova" subtitle="Aktivni timovi i osnovne informacije">
        <DataTable
          columns={[
            { key: "name", header: "Naziv tima" },
            { key: "city", header: "Grad" },
            { key: "captain", header: "Kapiten" },
            { key: "members", header: "Članovi" }
          ]}
          rows={teams}
          emptyText="Trenutno nema timova."
        />
      </SectionCard>

      <SectionCard title="Dodavanje tima" subtitle="Forma za kreiranje novog tima">
        <form onSubmit={onSubmit} className="form-grid">
          <input
            className="form-input"
            name="name"
            placeholder="Naziv tima"
            value={form.name}
            onChange={onChange}
          />
          <input
            className="form-input"
            name="city"
            placeholder="Grad"
            value={form.city}
            onChange={onChange}
          />
          <input
            className="form-input"
            name="captain"
            placeholder="Kapiten"
            value={form.captain}
            onChange={onChange}
          />
          <input
            className="form-input"
            name="members"
            type="number"
            min="0"
            placeholder="Broj članova"
            value={form.members}
            onChange={onChange}
          />
          <button className="btn btn-primary form-grid-full" type="submit">
            Sačuvaj tim
          </button>
        </form>

        {message ? <div className="notice">{message}</div> : null}
      </SectionCard>
    </div>
  );
}

export default TeamModule;