import React, { useEffect, useState } from "react";
import { useAppContext } from "../context/AppContext.jsx";

const ROLE_LABEL = {
  ADMIN:               "Administrator",
  CAPTAIN:             "Kapiten tima",
  PLAYER:              "Igrač",
  REFEREE_SCOREKEEPER: "Sudija / Zapisničar",
};

function ProfilePage() {
  const { currentUser, selectedRole, updateProfile, changePassword } = useAppContext();

  const [profile, setProfile] = useState({ fullName: "", email: "" });
  const [profileMsg, setProfileMsg] = useState({ text: "", ok: true });
  const [profileSubmitting, setProfileSubmitting] = useState(false);

  const [pwd, setPwd] = useState({ oldPassword: "", newPassword: "", confirm: "" });
  const [pwdMsg, setPwdMsg] = useState({ text: "", ok: true });
  const [pwdSubmitting, setPwdSubmitting] = useState(false);

  useEffect(() => {
    setProfile({
      fullName: currentUser?.fullName || "",
      email:    currentUser?.email || ""
    });
  }, [currentUser?.fullName, currentUser?.email]);

  const onProfileChange = (e) =>
    setProfile(p => ({ ...p, [e.target.name]: e.target.value }));

  const onPwdChange = (e) =>
    setPwd(p => ({ ...p, [e.target.name]: e.target.value }));

  const submitProfile = async (e) => {
    e.preventDefault();
    if (!profile.fullName.trim() || !profile.email.trim()) {
      setProfileMsg({ text: "Ime i email su obavezni.", ok: false });
      return;
    }
    setProfileSubmitting(true);
    setProfileMsg({ text: "", ok: true });
    try {
      await updateProfile({
        fullName: profile.fullName.trim(),
        email:    profile.email.trim()
      });
      setProfileMsg({ text: "Profil je uspješno ažuriran.", ok: true });
    } catch (err) {
      setProfileMsg({ text: err.message || "Greška pri spremanju profila.", ok: false });
    } finally {
      setProfileSubmitting(false);
    }
  };

  const submitPwd = async (e) => {
    e.preventDefault();
    if (!pwd.oldPassword || !pwd.newPassword) {
      setPwdMsg({ text: "Sva polja su obavezna.", ok: false });
      return;
    }
    if (pwd.newPassword.length < 6) {
      setPwdMsg({ text: "Nova lozinka mora imati minimalno 6 karaktera.", ok: false });
      return;
    }
    if (pwd.newPassword !== pwd.confirm) {
      setPwdMsg({ text: "Potvrda lozinke se ne poklapa.", ok: false });
      return;
    }
    setPwdSubmitting(true);
    setPwdMsg({ text: "", ok: true });
    try {
      await changePassword({
        oldPassword: pwd.oldPassword,
        newPassword: pwd.newPassword
      });
      setPwd({ oldPassword: "", newPassword: "", confirm: "" });
      setPwdMsg({ text: "Lozinka je uspješno promijenjena.", ok: true });
    } catch (err) {
      setPwdMsg({ text: err.message || "Greška pri promjeni lozinke.", ok: false });
    } finally {
      setPwdSubmitting(false);
    }
  };

  return (
    <div className="app-page">
      <div className="page-hero">
        <div className="page-hero-text">
          <h1 className="page-title">Moj profil</h1>
          <p className="page-subtitle">
            Ažurirajte svoje podatke ili promijenite lozinku.
          </p>
        </div>
      </div>

      <div className="page-body">
        <div className="content-card">
          <div className="content-card-header">
            <h2 className="content-card-title">Osnovni podaci</h2>
            <p className="content-card-subtitle">
              {currentUser?.username} · {ROLE_LABEL[selectedRole] || selectedRole}
            </p>
          </div>
          <form onSubmit={submitProfile} className="inline-form">
            <div className="form-row">
              <div className="field field-grow">
                <label className="field-label">Puno ime</label>
                <input
                  className="field-input"
                  name="fullName"
                  value={profile.fullName}
                  onChange={onProfileChange}
                />
              </div>
              <div className="field field-grow">
                <label className="field-label">Email</label>
                <input
                  className="field-input"
                  name="email"
                  type="email"
                  value={profile.email}
                  onChange={onProfileChange}
                />
              </div>
              <div className="field field-action">
                <label className="field-label">&nbsp;</label>
                <button className="btn btn-primary" type="submit" disabled={profileSubmitting}>
                  {profileSubmitting ? "Spremam..." : "Spremi profil"}
                </button>
              </div>
            </div>
            {profileMsg.text && (
              <div className={profileMsg.ok ? "inline-success" : "inline-error"}>{profileMsg.text}</div>
            )}
          </form>
        </div>

        <div className="content-card">
          <div className="content-card-header">
            <h2 className="content-card-title">Promjena lozinke</h2>
            <p className="content-card-subtitle">Minimalno 6 karaktera.</p>
          </div>
          <form onSubmit={submitPwd} className="inline-form">
            <div className="form-row">
              <div className="field field-grow">
                <label className="field-label">Trenutna lozinka</label>
                <input
                  className="field-input"
                  name="oldPassword"
                  type="password"
                  value={pwd.oldPassword}
                  onChange={onPwdChange}
                />
              </div>
              <div className="field field-grow">
                <label className="field-label">Nova lozinka</label>
                <input
                  className="field-input"
                  name="newPassword"
                  type="password"
                  value={pwd.newPassword}
                  onChange={onPwdChange}
                />
              </div>
              <div className="field field-grow">
                <label className="field-label">Potvrdi novu</label>
                <input
                  className="field-input"
                  name="confirm"
                  type="password"
                  value={pwd.confirm}
                  onChange={onPwdChange}
                />
              </div>
              <div className="field field-action">
                <label className="field-label">&nbsp;</label>
                <button className="btn btn-primary" type="submit" disabled={pwdSubmitting}>
                  {pwdSubmitting ? "Spremam..." : "Promijeni lozinku"}
                </button>
              </div>
            </div>
            {pwdMsg.text && (
              <div className={pwdMsg.ok ? "inline-success" : "inline-error"}>{pwdMsg.text}</div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
