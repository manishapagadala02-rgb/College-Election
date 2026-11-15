// A small message at the bottom of the screen, e.g. "Election created".
// If the message is empty, show nothing.

export default function Toast({ message }) {
  if (!message) return null;
  return <div className="toast">{message}</div>;
}
