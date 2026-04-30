import React, { useState } from "react";
import { useAppContext } from "../context/AppContext.jsx";

function LoginPage() {
  const { login, registerUser, backendStatus } = useAppContext();

  const [mode, setMode] = useState("login");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const [loginForm, setLoginForm] = useState({
    username: "",
    password: ""
  });

  const [registerForm, setRegisterForm] = useState({
    fullName: "",
    email: "",
    username: "",
    password: "",
    role: "PLAYER"
  });

  const handleLoginChange = (event) => {
    setLoginForm((prev) => ({
      ...prev,
      [event.target.name]: event.target.value
    }));
  };

  const handleRegisterChange = (event) => {
    setRegisterForm((prev) => ({
      ...prev,
      [event.target.name]: event.target.value
    }));
  };

  const submitLogin = async (event) => {
    event.preventDefault();
    setError("");
    setSuccess("");
    setSubmitting(true);

    try {
      await login(loginForm);
      setSuccess("Prijava uspješna.");
    } catch (err) {
      setError(err.message || "Prijava nije uspjela.");
    } finally {
      setSubmitting(false);
    }
  };

  const submitRegister = async (event) => {
    event.preventDefault();
    setError("");
    setSuccess("");
    setSubmitting(true);

    try {
      await registerUser(registerForm);
      setSuccess("Korisnik je uspješno registrovan. Sada se možeš prijaviti.");
      setLoginForm({
        username: registerForm.username,
        password: registerForm.password
      });
      setRegisterForm({
        fullName: "",
        email: "",
        username: "",
        password: "",
        role: "PLAYER"
      });
      setMode("login");
    } catch (err) {
      setError(err.message || "Registracija nije uspjela.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="auth-shell">
      <div className="auth-card">
        <div className="page-header">
          <div>
            <h1>Sports Manager</h1>
            <p className="muted">
              Sprint 5 inkrement: registracija, prijava, korisnici i timovi.
            </p>
          </div>
          <span className={`badge ${backendStatus.ok ? "badge-success" : "badge-danger"}`}>
            {backendStatus.loading ? "Provjera..." : backendStatus.ok ? "Backend online" : "Backend offline"}
          </span>
        </div>

        <div className="tab-row">
          <button
            className={`tab-button ${mode === "login" ? "tab-button-active" : ""}`}
            onClick={() => setMode("login")}
            type="button"
          >
            Prijava
          </button>
          <button
            className={`tab-button ${mode === "register" ? "tab-button-active" : ""}`}
            onClick={() => setMode("register")}
            type="button"
          >
            Registracija
          </button>
        </div>

        {error && <p className="error-text">{error}</p>}
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
                placeholder="npr. admin"
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
              />
            </div>

            <button className="button" type="submit" disabled={submitting}>
              {submitting ? "Prijava..." : "Prijavi se"}
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
                  placeholder="Unesi puno ime"
                />
              </div>

              <div className="input-group">
                <label>Email</label>
                <input
                  className="input"
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

              <div className="input-group">
                <label>Uloga</label>
                <select
                  className="input"
                  name="role"
                  value={registerForm.role}
                  onChange={handleRegisterChange}
                >
                  <option value="PLAYER">PLAYER</option>
                  <option value="CAPTAIN">CAPTAIN</option>
                  <option value="ADMIN">ADMIN</option>
                  <option value="REFEREE_SCOREKEEPER">REFEREE_SCOREKEEPER</option>
                </select>
              </div>
            </div>

            <button className="button" type="submit" disabled={submitting}>
              {submitting ? "Spremanje..." : "Registruj korisnika"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default LoginPage;