// Admin dashboard: total votes, stat tiles, quick actions and the list of elections.
// Props: elections, voters, onToggle(id), onResults(id), onNavigate(screen), onLogout()
import Icon from '../components/Icon.jsx';
import StatTile from '../components/StatTile.jsx';
import QuickAction from '../components/QuickAction.jsx';
import AdminElectionCard from '../components/AdminElectionCard.jsx';

export default function AdminHomeScreen({ elections, voters, onToggle, onResults, onNavigate, onLogout }) {
  const totalVotes = elections.reduce(
    (sum, election) => sum + election.candidates.reduce((s, c) => s + c.votes, 0),
    0
  );
  const openCount = elections.filter((e) => e.open).length;

  return (
    <div className="view">
      <div className="row sp">
        <div className="row">
          <div className="av">AD</div>
          <div>
            <div className="mut">Logged in as Admin</div>
            <h2>Hello, Admin!</h2>
          </div>
        </div>
        <button className="back" onClick={onLogout}>
          <Icon name="out" />
        </button>
      </div>

      <div className="hero mt">
        <span className="pill wait">Live dashboard</span>
        <div style={{ fontSize: 13, opacity: 0.8, marginTop: 14 }}>Total votes cast</div>
        <h1 style={{ fontSize: 42 }}>{totalVotes}</h1>
        <div style={{ marginTop: 8, fontSize: 13, opacity: 0.9 }}>68% turnout · {openCount} election open</div>
      </div>

      <div className="g mt" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
        <StatTile label="Voters" value={voters.length + 1236} />
        <StatTile label="Face OK" value={842} color="var(--ok)" />
        <StatTile label="Rejected" value={6} color="var(--bad)" />
      </div>

      <div className="row sp" style={{ marginTop: 20, padding: '0 4px' }}>
        <QuickAction icon="plus" label="Create" onClick={() => onNavigate('create')} />
        <QuickAction icon="users" label="Voters" onClick={() => onNavigate('voters')} />
        <QuickAction icon="chart" label="Results" onClick={() => onNavigate('results')} />
        <QuickAction icon="list" label="Elections" onClick={() => onNavigate('adminElections')} />
      </div>

      <h2>Manage elections</h2>
      <div className="g">
        {elections.map((election) => (
          <AdminElectionCard key={election.id} election={election} onToggle={onToggle} onResults={onResults} />
        ))}
      </div>
    </div>
  );
}
