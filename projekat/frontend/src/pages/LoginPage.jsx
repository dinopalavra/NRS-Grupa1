import React, { useState } from "react";
import { useAppContext } from "../context/AppContext.jsx";
import { forgotPassword, resetPassword } from "../services/api.js";

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
    role: "PLAYER",
    sport: ""
  });

  const [forgotForm, setForgotForm] = useState({ email: "" });
  const [forgotToken, setForgotToken] = useState("");
  const [resetForm, setResetForm] = useState({ token: "", newPassword: "", confirmPassword: "" });

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
      await registerUser({ ...registerForm, sport: registerForm.sport || null });
      setSuccess("Korisnik je uspješno registrovan. Možeš se prijaviti.");
      setLoginForm({ username: registerForm.username, password: registerForm.password });
      setRegisterForm({ fullName: "", email: "", username: "", password: "", role: "PLAYER", sport: "" });
      setMode("login");
    } catch (err) {
      setError(err.message || "Registracija nije uspjela.");
    } finally {
      setSubmitting(false);
    }
  };

  const submitForgot = async (e) => {
    e.preventDefault();
    setError(""); setSuccess(""); setSubmitting(true);
    try {
      const data = await forgotPassword(forgotForm.email);
      setForgotToken(data.token);
      setSuccess(data.message);
    } catch (err) {
      setError(err.message || "Greška pri slanju zahtjeva.");
    } finally {
      setSubmitting(false);
    }
  };

  const submitReset = async (e) => {
    e.preventDefault();
    setError(""); setSuccess(""); setSubmitting(true);
    if (resetForm.newPassword !== resetForm.confirmPassword) {
      setError("Lozinke se ne podudaraju.");
      setSubmitting(false);
      return;
    }
    try {
      const data = await resetPassword(resetForm.token, resetForm.newPassword);
      setSuccess(data.message + " Možeš se prijaviti.");
      setMode("login");
      setResetForm({ token: "", newPassword: "", confirmPassword: "" });
      setForgotToken("");
    } catch (err) {
      setError(err.message || "Greška pri resetovanju lozinke.");
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
          <p className="auth-desc">Rezervacija i upravljanje sportskim terminima</p>
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
            onClick={() => { setMode("login"); setError(""); setSuccess(""); setForgotToken(""); }}
          >
            Prijava
          </button>
          <button
            type="button"
            className={`tab-button ${mode === "register" ? "tab-button-active" : ""}`}
            onClick={() => { setMode("register"); setError(""); setSuccess(""); setForgotToken(""); }}
          >
            Registracija
          </button>
        </div>

        {error   && <p className="error-text">{error}</p>}
        {success && <p className="success-text">{success}</p>}

        {mode === "login" && (
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
            <button
              type="button"
              style={{ background: "none", border: "none", color: "var(--gold)", cursor: "pointer", fontSize: "0.82rem", marginTop: 8, textDecoration: "underline", padding: 0 }}
              onClick={() => { setMode("forgot"); setError(""); setSuccess(""); setForgotToken(""); }}
            >
              Zaboravili ste lozinku?
            </button>
          </form>
        )}

        {mode === "register" && (
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

              {registerForm.role !== "ADMIN" && (
                <div className="input-group" style={{ gridColumn: "1 / -1" }}>
                  <label>Sport</label>
                  <select
                    className="input"
                    name="sport"
                    value={registerForm.sport}
                    onChange={handleRegisterChange}
                  >
                    <option value="">Odaberi sport...</option>
                    <option value="FOOTBALL">⚽ Fudbal</option>
                    <option value="BASKETBALL">🏀 Košarka</option>
                    <option value="VOLLEYBALL">🏐 Odbojka</option>
                    <option value="HANDBALL">🤾 Rukomet</option>
                    <option value="FUTSAL">🥅 Futsal</option>
                    <option value="TENNIS">🎾 Tenis</option>
                    <option value="OTHER">🏅 Ostalo</option>
                  </select>
                </div>
              )}
            </div>

            <button className="button" type="submit" disabled={submitting} style={{ marginTop: 4 }}>
              {submitting ? "Registracija..." : "Registruj se"}
            </button>
          </form>
        )}

        {mode === "forgot" && (
          <form className="form" onSubmit={submitForgot}>
            <div className="input-group">
              <label>Email adresa</label>
              <input
                className="input"
                type="email"
                name="email"
                value={forgotForm.email}
                onChange={e => setForgotForm({ email: e.target.value })}
                placeholder="ime@domena.com"
                required
              />
            </div>
            <button className="button" type="submit" disabled={submitting} style={{ marginTop: 4 }}>
              {submitting ? "Slanje..." : "Pošalji zahtjev"}
            </button>
            {forgotToken && (
              <div style={{ marginTop: 16, padding: "12px 14px", background: "rgba(201,168,124,0.1)", border: "1px solid rgba(201,168,124,0.25)", borderRadius: 6 }}>
                <p style={{ fontSize: "0.82rem", color: "var(--cream-muted)", marginBottom: 8 }}>
                  U produkciji token bi bio poslan na email. Za svrhe demonstracije, token je:
                </p>
                <code style={{ display: "block", wordBreak: "break-all", fontSize: "0.78rem", color: "var(--gold)", background: "rgba(0,0,0,0.3)", padding: "8px 10px", borderRadius: 4 }}>
                  {forgotToken}
                </code>
                <button
                  type="button"
                  className="button"
                  style={{ marginTop: 12, fontSize: "0.85rem", padding: "8px 16px" }}
                  onClick={() => { setMode("reset"); setResetForm(f => ({ ...f, token: forgotToken })); setError(""); setSuccess(""); }}
                >
                  Unesi token
                </button>
              </div>
            )}
            <button
              type="button"
              style={{ background: "none", border: "none", color: "var(--gold)", cursor: "pointer", fontSize: "0.82rem", marginTop: 8, textDecoration: "underline", padding: 0 }}
              onClick={() => { setMode("login"); setError(""); setSuccess(""); }}
            >
              Nazad na prijavu
            </button>
          </form>
        )}

        {mode === "reset" && (
          <form className="form" onSubmit={submitReset}>
            <div className="input-group">
              <label>Token</label>
              <input
                className="input"
                name="token"
                value={resetForm.token}
                onChange={e => setResetForm(f => ({ ...f, token: e.target.value }))}
                placeholder="Reset token"
                required
              />
            </div>
            <div className="input-group">
              <label>Nova lozinka</label>
              <input
                className="input"
                type="password"
                value={resetForm.newPassword}
                onChange={e => setResetForm(f => ({ ...f, newPassword: e.target.value }))}
                placeholder="Nova lozinka"
                required
              />
            </div>
            <div className="input-group">
              <label>Potvrdi lozinku</label>
              <input
                className="input"
                type="password"
                value={resetForm.confirmPassword}
                onChange={e => setResetForm(f => ({ ...f, confirmPassword: e.target.value }))}
                placeholder="Ponovi lozinku"
                required
              />
            </div>
            <button className="button" type="submit" disabled={submitting} style={{ marginTop: 4 }}>
              {submitting ? "Mijenjam..." : "Promijeni lozinku"}
            </button>
            <button
              type="button"
              style={{ background: "none", border: "none", color: "var(--gold)", cursor: "pointer", fontSize: "0.82rem", marginTop: 8, textDecoration: "underline", padding: 0 }}
              onClick={() => { setMode("login"); setError(""); setSuccess(""); }}
            >
              Nazad na prijavu
            </button>
          </form>
        )}

      </div>
    </div>
  );
}

export default LoginPage;
