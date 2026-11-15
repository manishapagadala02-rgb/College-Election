// The full list of elections (open and closed).
// Props: elections, votedIds, onVote(election)
import Header from '../components/Header.jsx';
import ElectionCard from '../components/ElectionCard.jsx';

export default function ElectionsScreen({ elections, votedIds, onVote }) {
  return (
    <div className="view">
      <Header title="Active elections" />
      <div className="g">
        {elections.map((election) => (
          <ElectionCard
            key={election.id}
            election={election}
            hasVoted={votedIds.includes(election.id)}
            onVote={onVote}
          />
        ))}
      </div>
    </div>
  );
}
