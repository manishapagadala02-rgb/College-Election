// A number with a label, used in the admin dashboard strip.
// Usage: <StatTile label="Voters" value={1240} color="var(--ok)" />

export default function StatTile({ label, value, color }) {
  return (
    <div className="card" style={{ padding: 14 }}>
      <div className="mut" style={{ fontSize: 12 }}>{label}</div>
      <h2 style={{ color: color || 'var(--ink)', marginTop: 4 }}>{value}</h2>
    </div>
  );
}
