// Page title with an optional back button.
// Usage: <Header title="Results" />   or   <Header title="Vote" onBack={goBack} />
import Icon from './Icon.jsx';

export default function Header({ title, onBack }) {
  return (
    <div className="row" style={{ marginBottom: 18 }}>
      {onBack && (
        <button className="back" onClick={onBack}>
          <Icon name="back" />
        </button>
      )}
      <h1>{title}</h1>
    </div>
  );
}
