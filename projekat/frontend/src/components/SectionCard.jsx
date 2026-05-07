import React from "react";

function SectionCard({ title, subtitle, children, right }) {
  return (
    <section className="section-card">
      <div className="section-card-head">
        <div>
          <h2 className="section-card-title">{title}</h2>
          {subtitle ? <p className="section-card-subtitle">{subtitle}</p> : null}
        </div>
        {right ? <div>{right}</div> : null}
      </div>
      <div className="section-card-body">{children}</div>
    </section>
  );
}

export default SectionCard;
