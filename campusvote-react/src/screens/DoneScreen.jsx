// Shown after a vote is submitted, with a receipt.
// Props: receipt, electionTitle, onResults(), onHome()
import Icon from '../components/Icon.jsx';

export default function DoneScreen({ receipt, electionTitle, onResults, onHome }) {
  const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const rows = [
    ['Receipt ID', receipt],
    ['Election', electionTitle],
    ['Identity', 'Face verified'],
    ['Time', time],
  ];

  return (
    <div className="view" style={{ textAlign: 'center' }}>
      <div className="ok" style={{ marginTop: 24 }}>
        <Icon name="check" />
      </div>
      <h1>Vote submitted</h1>
      <p className="mut" style={{ margin: '8px 0 20px' }}>Thank you for taking part. Your choice is anonymous.</p>

      <div className="card" style={{ textAlign: 'left' }}>
        {rows.map(([label, value]) => (
          <div key={label} className="row sp" style={{ padding: '8px 0' }}>
            <span className="mut">{label}</span>
            <b style={{ fontSize: 13.5, textAlign: 'right' }}>{value}</b>
          </div>
        ))}
      </div>

      <button className="btn" style={{ marginTop: 20 }} onClick={onResults}>View results</button>
      <button className="btn ghost mt" onClick={onHome}>Back to home</button>
    </div>
  );
}
