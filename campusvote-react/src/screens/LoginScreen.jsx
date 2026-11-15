// The first screen. The student or admin types their ID and password.
// Props: onLogin(id, password, role)  -> called when the button is pressed
import { useState } from 'react';
import Icon from '../components/Icon.jsx';

export default function LoginScreen({ onLogin }) {
  // useState remembers what the user typed. Each one gives [value, functionToChangeIt].
  const [role, setRole] = useState('student');
  const [id, setId] = useState('S1001');
  const [password, setPassword] = useState('password');
  const [remember, setRemember] = useState(true);

  function chooseRole(newRole) {
    setRole(newRole);
    setId(newRole === 'admin' ? 'admin01' : 'S1001'); // fill in a demo ID for convenience
  }

  return (
    <div className="view" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <div className="logo">
        <Icon name="shield" />
      </div>
      <h1 style={{ marginTop: 20, fontSize: 32 }}>CampusVote</h1>
      <p className="mut" style={{ margin: '6px 0 24px' }}>
        Secure voting for your college. Your vote stays anonymous.
      </p>

      <div className="tabs">
        <button className={role === 'student' ? 'on' : ''} onClick={() => chooseRole('student')}>Student</button>
        <button className={role === 'admin' ? 'on' : ''} onClick={() => chooseRole('admin')}>Admin</button>
      </div>

      <label>{role === 'admin' ? 'Admin ID' : 'Student ID'}</label>
      <input value={id} onChange={(e) => setId(e.target.value)} />

      <label>Password</label>
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />

      <div className="row sp" style={{ margin: '14px 0 20px', fontSize: 13 }}>
        <label className="row" style={{ margin: 0, gap: 8, color: 'var(--ink)' }}>
          <input
            type="checkbox"
            checked={remember}
            onChange={(e) => setRemember(e.target.checked)}
            style={{ width: 18, height: 18, padding: 0 }}
          />
          Remember me
        </label>
        <a style={{ color: 'var(--p)', fontWeight: 600 }}>Forgot password?</a>
      </div>

      <button className="btn" onClick={() => onLogin(id, password, role)}>Sign in</button>

      <div className="card mt row" style={{ padding: 12, boxShadow: 'none', color: 'var(--mut)', fontSize: 12.5 }}>
        <span style={{ color: 'var(--ok)' }}><Icon name="shield" /></span>
        Your account confirms eligibility only. Your voting remains anonymous.
      </div>
    </div>
  );
}
