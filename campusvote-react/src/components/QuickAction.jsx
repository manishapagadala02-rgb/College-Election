// A round shortcut button with an icon and a label (Vote, Results, Alerts...).
// Usage: <QuickAction icon="vote" label="Vote" onClick={...} />
import Icon from './Icon.jsx';

export default function QuickAction({ icon, label, onClick }) {
  return (
    <button className="qa" onClick={onClick}>
      <div className="av">
        <Icon name={icon} />
      </div>
      {label}
    </button>
  );
}
