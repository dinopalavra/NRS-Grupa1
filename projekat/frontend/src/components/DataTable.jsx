import React from "react";

function DataTable({
  columns = [],
  rows = [],
  emptyText = "Nema podataka za prikaz."
}) {
  if (!rows.length) {
    return (
      <div
        style={{
          padding: "16px",
          border: "1px dashed #d1d5db",
          borderRadius: "12px",
          color: "#6b7280",
          background: "#f9fafb"
        }}
      >
        {emptyText}
      </div>
    );
  }

  return (
    <div style={{ overflowX: "auto" }}>
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          background: "#ffffff"
        }}
      >
        <thead>
          <tr style={{ background: "#f3f4f6" }}>
            {columns.map((column) => (
              <th
                key={column.key}
                style={{
                  textAlign: "left",
                  padding: "12px",
                  borderBottom: "1px solid #e5e7eb",
                  color: "#374151",
                  fontSize: "0.92rem"
                }}
              >
                {column.label}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {rows.map((row, index) => (
            <tr key={row.id ?? index}>
              {columns.map((column) => (
                <td
                  key={column.key}
                  style={{
                    padding: "12px",
                    borderBottom: "1px solid #e5e7eb",
                    color: "#111827",
                    verticalAlign: "top"
                  }}
                >
                  {typeof column.render === "function"
                    ? column.render(row)
                    : row[column.key] ?? "-"}
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