// One selectable candidate on the ballot, with a short manifesto line.
// Props:  candidate  { id, name, votes }
//         index      position in the list (used to pick a manifesto line)
//         selected   true if this one is chosen
//         onSelect   function to call when tapped
import Icon from './Icon.jsx';

const manifestos = [
  'Better labs and 24/7 library access',
  'Stronger student wellbeing support',
  'More clubs, events and campus funding',
  'Open budgets and a transparent council',
];

export default function CandidateOption({ candidate, index, selected, onSelect }) {
  const isNota = candidate.name === 'NOTA';
  const initials = candidate.name.split(' ').map((word) => word[0]).join('').slice(0, 2);
  const manifesto = isNota ? 'Choose none of the candidates' : manifestos[(candidate.name.length + index) % 4];

  return (
    <button className={'cand' + (selected ? ' sel' : '')} onClick={onSelect}>
      <div className="av">{isNota ? '✕' : initials}</div>
      <div>
        <b>{candidate.name}</b>
        <div className="mut" style={{ fontSize: 12.5 }}>{manifesto}</div>
      </div>
      <span className="tick">
        <Icon name="check" />
      </span>
    </button>
  );
}
