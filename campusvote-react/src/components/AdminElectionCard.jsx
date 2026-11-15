// An election in the admin list: a Results button and a Close/Reopen button.
// Props: election, onToggle(id), onResults(id)
import StatusPill from './StatusPill.jsx';

export default function AdminElectionCard({ election, onToggle, onResults }) {
  const totalVotes = election.candidates.reduce((sum, c) => sum + c.votes, 0);

  return (
    <div className="card">
      <div className="row sp">
        <StatusPill open={election.open} />
        <span className="mut">{totalVotes} votes</span>
      </div>
      <h2 style={{ margin: '10px 0 12px' }}>{election.title}</h2>
      <div className="row">
        <button className="btn ghost" style={{ padding: 11 }} onClick={() => onResults(election.id)}>
          Results
        </button>
        <button
          className="btn"
          style={election.open ? { padding: 11, background: 'var(--bad)' } : { padding: 11 }}
          onClick={() => onToggle(election.id)}
        >
          {election.open ? 'Close voting' : 'Reopen'}
        </button>
      </div>
    </div>
  );
}
