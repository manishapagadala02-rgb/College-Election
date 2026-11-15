// The Alerts page: a list of notifications.
// Props: notes (list), onBack()
import Header from '../components/Header.jsx';
import NotificationItem from '../components/NotificationItem.jsx';

export default function NotificationsScreen({ notes, onBack }) {
  return (
    <div className="view">
      <Header title="Notifications" onBack={onBack} />
      <div className="g">
        {notes.map((note, index) => (
          <NotificationItem key={index} note={note} />
        ))}
      </div>
    </div>
  );
}
