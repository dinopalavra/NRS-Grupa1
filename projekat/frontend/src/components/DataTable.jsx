import React from "react";

function DataTable({ columns = [], rows = [], emptyText = "Nema podataka za prikaz." }) {
  if (!rows.length) {
    return (
      <div className="empty-state">
        <span style={{ fontSize: "1.8rem", opacity: 0.35 }}>📋</span>
        {emptyText}
      </div>
    );
  }

  return (
    <div className="table-wrapper">
      <table className="data-table">
        <thead>
          <tr>
            {columns.map((col) => (
              <th key={col.key}>{col.label ?? col.header ?? col.key}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, idx) => (
            <tr key={row.id ?? idx}>
              {columns.map((col) => (
                <td key={col.key}>
                  {typeof col.render === "function"
                    ? col.render(row)
                    : row[col.key] ?? "-"}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DataTable;
