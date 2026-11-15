// The student's profile: details, status, dark mode switch, voting history and log out.
// Props: faceVerified, history, dark, onToggleDark(), onLogout()
import Header from '../components/Header.jsx';
import Icon from '../components/Icon.jsx';
import Switch from '../components/Switch.jsx';

export default function ProfileScreen({ faceVerified, history, dark, onToggleDark, onLogout }) {
  const details = [
    ['Email', 'student@college.edu'],
    ['Department', 'Computer Science'],
    ['Academic year', '2nd year'],
  ];

  return (
    <div className="view">
      <Header title="My profile" />

      <div className="card" style={{ textAlign: 'center' }}>
        <div className="av" style={{ width: 76, height: 76, margin: '0 auto 10px', fontSize: 24 }}>ST</div>
        <h2>Student Name</h2>
        <div className="mut">S1001 · Computer Science</div>
        <span className="pill open row" style={{ display: 'inline-flex', gap: 6, marginTop: 10 }}>
          <Icon name="camera" />
          Face ID enrolled
        </span>
      </div>

      <div className="card mt">
        {details.map(([label, value]) => (
          <div key={label} className="row sp" style={{ padding: '9px 0' }}>
            <span className="mut">{label}</span>
            <b style={{ fontSize: 14 }}>{value}</b>
          </div>
        ))}
      </div>

      <div className="card mt">
        <div className="row sp" style={{ padding: '9px 0' }}>
          <span className="mut">Eligibility</span>
          <span className="pill open">Eligible</span>
        </div>
        <div className="row sp" style={{ padding: '9px 0' }}>
          <span className="mut">Face verification</span>
          <span className={'pill ' + (faceVerified ? 'open' : 'closed')}>
            {faceVerified ? 'Verified' : 'Needed to vote'}
          </span>
        </div>
        <div className="row sp" style={{ padding: '9px 0' }}>
          <span className="mut">Dark mode</span>
          <Switch on={dark} onToggle={onToggleDark} />
        </div>
      </div>

      <h2>Voting history</h2>
      <div className="g">
        {history.map((item, index) => (
          <div key={index} className="card row" style={{ padding: '12px 14px' }}>
            <div className="av"><Icon name="check" /></div>
            <div>
              <b>{item.title}</b>
              <div className="mut">Voted today at {item.time}</div>
            </div>
          </div>
        ))}
        {history.length === 0 && <p className="mut">No votes yet. Your history shows up here.</p>}
      </div>

      <button className="btn ghost row" style={{ justifyContent: 'center', marginTop: 20 }} onClick={onLogout}>
        <Icon name="out" />
        Log out
      </button>
    </div>
  );
}
