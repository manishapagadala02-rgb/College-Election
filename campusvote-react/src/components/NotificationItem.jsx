// One notification row: icon, title, text and how long ago.
import Icon from './Icon.jsx';

export default function NotificationItem({ note }) {
  return (
    <div className="card row" style={{ alignItems: 'flex-start' }}>
      <div className="av">
        <Icon name={note.icon} />
      </div>
      <div>
        <b>{note.title}</b>
        <div className="mut" style={{ marginTop: 2 }}>{note.text}</div>
      </div>
      <span className="mut" style={{ marginLeft: 'auto', fontSize: 11.5 }}>{note.time}</span>
    </div>
  );
}
