import { useState } from "react";
import { useAppContext } from "../../context/AppContext.jsx";
import SectionCard from "../../components/SectionCard.jsx";
import DataTable from "../../components/DataTable.jsx";

function UserModule() {
  const { users, addUser } = useAppContext();
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    role: "USER"
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

    if (!form.fullName.trim() || !form.email.trim()) {
      setMessage("Unesite ime i email prije spremanja korisnika.");
      return;
    }

    addUser(form);
    setForm({ fullName: "", email: "", role: "USER" });
    setMessage("Korisnik je uspješno dodan u lokalni frontend prikaz.");
  };

  return (
    <div className="grid grid-2">
      <SectionCard title="Lista korisnika" subtitle="Pregled svih evidentiranih korisnika">
        <DataTable
          columns={[
            { key: "fullName", header: "Ime i prezime" },
            { key: "email", header: "Email" },
            { key: "role", header: "Uloga" },
            { key: "status", header: "Status" }
          ]}
          rows={users}
          emptyText="Nema korisnika za prikaz."
        />
      </SectionCard>

      <SectionCard title="Dodavanje korisnika" subtitle="Minimalna forma za demo prikaz">
        <form onSubmit={onSubmit} className="form-grid">
          <input
            className="form-input"
            name="fullName"
            placeholder="Ime i prezime"
            value={form.fullName}
            onChange={onChange}
          />
          <input
            className="form-input"
            name="email"
            placeholder="Email adresa"
            value={form.email}
            onChange={onChange}
          />
          <select
            className="form-select"
            name="role"
            value={form.role}
            onChange={onChange}
          >
            <option value="USER">USER</option>
            <option value="MANAGER">MANAGER</option>
            <option value="ADMIN">ADMIN</option>
          </select>
          <button className="btn btn-primary" type="submit">
            Sačuvaj korisnika
          </button>
        </form>

        {message ? <div className="notice">{message}</div> : null}
      </SectionCard>
    </div>
  );
}

export default UserModule;