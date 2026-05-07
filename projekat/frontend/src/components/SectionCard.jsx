import React from "react";

function SectionCard({ title, subtitle, children, right }) {
  return (
    <section
      style={{
        background: "#ffffff",
        border: "1px solid #e5e7eb",
        borderRadius: "16px",
        padding: "20px",
        marginBottom: "20px",
        boxShadow: "0 4px 14px rgba(0,0,0,0.05)"
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          gap: "16px",
          marginBottom: "16px"
        }}
      >
        <div>
          <h2
            style={{
              margin: 0,
              fontSize: "1.2rem",
              fontWeight: 700,
              color: "#111827"
            }}
          >
            {title}
          </h2>
          {subtitle ? (
            <p
              style={{
                margin: "6px 0 0",
                color: "#6b7280",
                fontSize: "0.95rem"
              }}
            >
              {subtitle}
            </p>
          ) : null}
        </div>

        {right ? <div>{right}</div> : null}
      </div>

      <div>{children}</div>
    </section>
  );
}

export default SectionCard;