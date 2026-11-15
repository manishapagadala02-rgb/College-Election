// One row of the results: name, percentage and a filled bar.

export default function ResultBar({ name, percent }) {
  return (
    <div style={{ marginTop: 16 }}>
      <div className="row sp" style={{ fontWeight: 600 }}>
        <span>{name}</span>
        <span>{percent}%</span>
      </div>
      <div className="bar">
        <i style={{ width: percent + '%' }} />
      </div>
    </div>
  );
}
