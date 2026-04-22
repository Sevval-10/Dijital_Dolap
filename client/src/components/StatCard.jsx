export default function StatCard({ label, value, accent }) {
  return (
    <article className="stat-card">
      <span className="stat-card__accent" style={{ background: accent }} />
      <p>{label}</p>
      <strong>{value}</strong>
    </article>
  );
}

