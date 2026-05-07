import React, { useState } from "react";
import { useAppContext } from "../context/AppContext.jsx";

function LoginPage() {
  const { login, registerUser, backendStatus } = useAppContext();

  const [mode, setMode] = useState("login");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const [loginForm, setLoginForm] = useState({ username: "", password: "" });

  const [registerForm, setRegisterForm] = useState({
    fullName: "",
    email: "",
    username: "",
    password: "",
    role: "PLAYER"
  });

  const handleLoginChange = (e) =>
    setLoginForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleRegisterChange = (e) =>
    setRegisterForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const submitLogin = async (e) => {
    e.preventDefault();
    setError(""); setSuccess(""); setSubmitting(true);
    try {
      await login(loginForm);
    } catch (err) {
      setError(err.message || "Prijava nije uspjela.");
    } finally {
      setSubmitting(false);
    }
  };

  const submitRegister = async (e) => {
    e.preventDefault();
    setError(""); setSuccess(""); setSubmitting(true);
    try {
      await registerUser(registerForm);
      setSuccess("Korisnik je uspješno registrovan. Možeš se prijaviti.");
      setLoginForm({ username: registerForm.username, password: registerForm.password });
      setRegisterForm({ fullName: "", email: "", username: "", password: "", role: "PLAYER" });
      setMode("login");
    } catch (err) {
      setError(err.message || "Registracija nije uspjela.");
    } finally {
      setSubmitting(false);
    }
  };

  const statusClass = backendStatus.loading ? "loading" : backendStatus.ok ? "online" : "offline";
  const statusLabel = backendStatus.loading ? "Provjera..." : backendStatus.ok ? "Backend online" : "Backend offline";

  return (
    <div className="auth-shell">
      <div className="auth-card">

        <div className="auth-header">
          <div className="auth-ball">
            <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ width: 36, height: 36 }}>
              <circle cx="12" cy="12" r="10"/>
              <path d="M12 2a10 10 0 0 1 6.88 2.74L12 12 5.12 4.74A10 10 0 0 1 12 2z" strokeWidth="0" fill="white" fillOpacity="0.35"/>
              <path d="M12 12l6.88-7.26M12 12l-6.88-7.26M12 12v10M12 12l8.66 5M12 12l-8.66 5"/>
            </svg>
          </div>
          <h1 className="auth-title">Pitch Manager</h1>
          <p className="auth-desc">Rezervacija i upravljanje fudbalskim terminima</p>
          <div className="auth-status-row">
            <span className={`status-pill ${statusClass}`}>
              <span className="status-pill-dot" />
              {statusLabel}
            </span>
          </div>
        </div>

        <div className="tab-row">
          <button
            type="button"
            className={`tab-button ${mode === "login" ? "tab-button-active" : ""}`}
            onClick={() => { setMode("login"); setError(""); setSuccess(""); }}
          >
            Prijava
          </button>
          <button
            type="button"
            className={`tab-button ${mode === "register" ? "tab-button-active" : ""}`}
            onClick={() => { setMode("register"); setError(""); setSuccess(""); }}
          >
            Registracija
          </button>
        </div>

        {error   && <p className="error-text">{error}</p>}
        {success && <p className="success-text">{success}</p>}

        {mode === "login" ? (
          <form className="form" onSubmit={submitLogin}>
            <div className="input-group">
              <label>Korisničko ime</label>
              <input
                className="input"
                name="username"
                value={loginForm.username}
                onChange={handleLoginChange}
                placeholder="Npr. admin"
                autoComplete="username"
              />
            </div>

            <div className="input-group">
              <label>Lozinka</label>
              <input
                className="input"
                type="password"
                name="password"
                value={loginForm.password}
                onChange={handleLoginChange}
                placeholder="Unesi lozinku"
                autoComplete="current-password"
              />
            </div>

            <button className="button" type="submit" disabled={submitting} style={{ marginTop: 4 }}>
              {submitting ? "Prijava u toku..." : "Prijavi se"}
            </button>
          </form>
        ) : (
          <form className="form" onSubmit={submitRegister}>
            <div className="form-grid">
              <div className="input-group">
                <label>Ime i prezime</label>
                <input
                  className="input"
                  name="fullName"
                  value={registerForm.fullName}
                  onChange={handleRegisterChange}
                  placeholder="Puno ime"
                />
              </div>

              <div className="input-group">
                <label>Email</label>
                <input
                  className="input"
                  type="email"
                  name="email"
                  value={registerForm.email}
                  onChange={handleRegisterChange}
                  placeholder="ime@domena.com"
                />
              </div>

              <div className="input-group">
                <label>Korisničko ime</label>
                <input
                  className="input"
                  name="username"
                  value={registerForm.username}
                  onChange={handleRegisterChange}
                  placeholder="Odaberi username"
                />
              </div>

              <div className="input-group">
                <label>Lozinka</label>
                <input
                  className="input"
                  type="password"
                  name="password"
                  value={registerForm.password}
                  onChange={handleRegisterChange}
                  placeholder="Unesi lozinku"
                />
              </div>

              <div className="input-group" style={{ gridColumn: "1 / -1" }}>
                <label>Uloga</label>
                <select
                  className="input"
                  name="role"
                  value={registerForm.role}
                  onChange={handleRegisterChange}
                >
                  <option value="PLAYER">Igrač (PLAYER)</option>
                  <option value="CAPTAIN">Kapiten (CAPTAIN)</option>
                  <option value="ADMIN">Administrator (ADMIN)</option>
                  <option value="REFEREE_SCOREKEEPER">Sudija / Zapisničar</option>
                </select>
              </div>
            </div>

            <button className="button" type="submit" disabled={submitting} style={{ marginTop: 4 }}>
              {submitting ? "Registracija..." : "Registruj se"}
            </button>
          </form>
        )}

      </div>
    </div>
  );
}

export default LoginPage;
