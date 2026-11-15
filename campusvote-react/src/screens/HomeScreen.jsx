// Student home: greeting, banner with a live countdown, quick actions,
// campus turnout and the elections that are open right now.
// Props: elections, votedIds, onVote(election), onNavigate(screenName)
import Icon from '../components/Icon.jsx';
import QuickAction from '../components/QuickAction.jsx';
import CountdownTimer from '../components/CountdownTimer.jsx';
import ElectionCard from '../components/ElectionCard.jsx';

export default function HomeScreen({ elections, votedIds, onVote, onNavigate }) {
  const openElections = elections.filter((e) => e.open);
  const waiting = openElections.filter((e) => !votedIds.includes(e.id)).length;

  return (
    <div className="view">
      <div className="row sp">
        <div className="row">
          <div className="av">ST</div>
          <div>
            <div className="mut">Welcome back</div>
            <h2>Hello, Student!</h2>
          </div>
        </div>
        <button className="back" style={{ position: 'relative' }} onClick={() => onNavigate('notes')}>
          <Icon name="bell" />
          <i className="dot" />
        </button>
      </div>

      <div className="hero mt">
        <span className="pill wait">{waiting > 0 ? "You haven't voted yet" : 'All votes cast'}</span>
        <h1 style={{ margin: '14px 0 4px' }}>Your vote matters!</h1>
        <p style={{ opacity: 0.85, fontSize: 14 }}>College President voting closes in</p>
        <CountdownTimer />
        <button
          className="btn"
          style={{ background: '#fff', color: 'var(--p)', boxShadow: 'none', width: 'auto', padding: '12px 22px' }}
          onClick={() => onNavigate('elections')}
        >
          Go to voting
        </button>
      </div>

      <div className="row sp" style={{ marginTop: 22, padding: '0 4px' }}>
        <QuickAction icon="vote" label="Vote" onClick={() => onNavigate('elections')} />
        <QuickAction icon="chart" label="Results" onClick={() => onNavigate('results')} />
        <QuickAction icon="bell" label="Alerts" onClick={() => onNavigate('notes')} />
        <QuickAction icon="user" label="Profile" onClick={() => onNavigate('profile')} />
      </div>

      <h2>Campus turnout</h2>
      <div className="card">
        <div className="row sp">
          <b>68% have voted</b>
          <span className="mut">Goal 80%</span>
        </div>
        <div className="bar"><i style={{ width: '68%' }} /></div>
      </div>

      <h2>Open now</h2>
      <div className="g">
        {openElections.map((election) => (
          <ElectionCard
            key={election.id}
            election={election}
            hasVoted={votedIds.includes(election.id)}
            onVote={onVote}
          />
        ))}
        {openElections.length === 0 && <p className="mut">No open elections right now.</p>}
      </div>
    </div>
  );
}
