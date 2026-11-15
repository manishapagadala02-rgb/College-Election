// One election in a list. Shows the title, status and a vote button.
// Props:  election   the election to show
//         hasVoted   true if this student already voted in it
//         onVote     function to call when the button is pressed
import StatusPill from './StatusPill.jsx';

export default function ElectionCard({ election, hasVoted, onVote }) {
  const canVote = election.open && !hasVoted;

  let buttonText = 'Cast your vote';
  if (!election.open) buttonText = 'Voting closed';
  else if (hasVoted) buttonText = 'You have voted';

  return (
    <div className="card">
      <div className="row sp">
        <StatusPill open={election.open} />
        <span className="mut">{election.open ? 'Ends ' + election.deadline : 'Voting ended'}</span>
      </div>
      <h2 style={{ margin: '12px 0 2px' }}>{election.title}</h2>
      <div className="mut">Position: {election.position}</div>
      <button
        className={canVote ? 'btn mt' : 'btn ghost mt'}
        disabled={!canVote}
        onClick={() => onVote(election)}
      >
        {buttonText}
      </button>
    </div>
  );
}
