function SectionCard({ title, subtitle, children, right }) {
  return (
    <section className="card">
      <div className="page-header" style={{ marginBottom: 16 }}>
        <div>
          <h3 style={{ marginBottom: 6 }}>{title}</h3>
          {subtitle ? <p className="page-subtitle">{subtitle}</p> : null}
        </div>
        {right}
      </div>
      {children}
    </section>
  );
}

export default SectionCard;