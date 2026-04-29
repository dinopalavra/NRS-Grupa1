import React from "react";

function StatCard({ label, value, help }) {
  return (
    <div className="card stat-card">
      <span className="stat-label">{label}</span>
      <strong className="stat-value">{value}</strong>
      <span className="stat-help">{help}</span>
    </div>
  );
}

export default StatCard;