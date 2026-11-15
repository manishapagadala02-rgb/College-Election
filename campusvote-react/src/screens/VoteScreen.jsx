// The ballot. The student picks one candidate and presses Submit.
// Props: election, onSubmit(candidateId), onBack()
import { useState } from 'react';
import Header from '../components/Header.jsx';
import Icon from '../components/Icon.jsx';
import CandidateOption from '../components/CandidateOption.jsx';

export default function VoteScreen({ election, onSubmit, onBack }) {
  const [selectedId, setSelectedId] = useState(null); // nothing selected at first

  return (
    <div className="view">
      <Header title="Cast your vote" onBack={onBack} />

      <span className="pill open row" style={{ display: 'inline-flex', gap: 6, margin: '-6px 0 12px' }}>
        <Icon name="check" />
        Face verified
      </span>
      <p className="mut" style={{ marginBottom: 16 }}>
        Select your preferred candidate for {election.title}.
      </p>

      <div className="g">
        {election.candidates.map((candidate, index) => (
          <CandidateOption
            key={candidate.id}
            candidate={candidate}
            index={index}
            selected={selectedId === candidate.id}
            onSelect={() => setSelectedId(candidate.id)}
          />
        ))}
      </div>

      <button
        className="btn"
        style={{ marginTop: 24 }}
        disabled={selectedId === null}
        onClick={() => onSubmit(selectedId)}
      >
        Submit vote
      </button>
      <p className="mut" style={{ textAlign: 'center', marginTop: 12 }}>
        You can't change your vote after submitting.
      </p>
    </div>
  );
}
