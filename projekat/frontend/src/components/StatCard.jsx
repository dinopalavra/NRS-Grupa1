import React from "react";

function StatCard({ label, value, icon, help }) {
  return (
    <div className="stat-card">
      {icon ? <span className="stat-icon">{icon}</span> : null}
      <strong>{value}</strong>
      <span className="stat-label">{label}</span>
      {help ? <span className="muted" style={{ fontSize: "0.78rem" }}>{help}</span> : null}
    </div>
  );
}

export default StatCard;
