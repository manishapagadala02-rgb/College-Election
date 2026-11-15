// Results: pick an election at the top, see the leader and each candidate's share.
// Props: elections, startId (the election to show first)
import { useState } from 'react';
import Header from '../components/Header.jsx';
import ResultBar from '../components/ResultBar.jsx';

export default function ResultsScreen({ elections, startId }) {
  const [selectedId, setSelectedId] = useState(startId || (elections[0] && elections[0].id));
  const election = elections.find((e) => e.id === selectedId);

  if (!election) {
    return (
      <div className="view">
        <Header title="Results" />
        <p className="mut">No elections yet.</p>
      </div>
    );
  }

  // Work out the numbers
  const totalVotes = election.candidates.reduce((sum, c) => sum + c.votes, 0);
  const leader = [...election.candidates].sort((a, b) => b.votes - a.votes)[0];
  const percentOf = (votes) => (totalVotes === 0 ? 0 : Math.round((votes / totalVotes) * 100));

  return (
    <div className="view">
      <Header title="Results" />

      <div className="chips">
        {elections.map((e) => (
          <button key={e.id} className={e.id === selectedId ? 'on' : ''} onClick={() => setSelectedId(e.id)}>
            {e.position}
          </button>
        ))}
      </div>

      <div className="hero mt">
        <span className="pill wait">{election.open ? 'Live count' : 'Final result'}</span>
        <div style={{ opacity: 0.8, marginTop: 14, fontSize: 13 }}>{election.title}</div>
        <div style={{ fontSize: 12, opacity: 0.7, marginTop: 10 }}>Leading</div>
        <h1 style={{ fontSize: 30 }}>{leader.name}</h1>
        <div style={{ marginTop: 6, fontWeight: 600 }}>
          {percentOf(leader.votes)}% of {totalVotes} votes
        </div>
      </div>

      <div className="card mt">
        <h2>Vote breakdown</h2>
        {election.candidates.map((candidate) => (
          <ResultBar key={candidate.id} name={candidate.name} percent={percentOf(candidate.votes)} />
        ))}
        <div className="mut mt">Total votes {totalVotes} · Voter turnout 68%</div>
      </div>
    </div>
  );
}
