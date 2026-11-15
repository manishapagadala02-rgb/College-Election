// A live countdown (days, hours, minutes, seconds) that updates every second.
//
// useState  keeps the current time.
// useEffect starts a timer when the component appears and stops it when it disappears.
import { useState, useEffect } from 'react';

export default function CountdownTimer() {
  // Demo: the election ends 11 days and 4 hours from now.
  // (With real data you would use the election's end date here.)
  const [endTime] = useState(() => Date.now() + (11 * 24 + 4) * 60 * 60 * 1000);
  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    const timer = setInterval(() => setNow(Date.now()), 1000); // tick every second
    return () => clearInterval(timer);                          // clean up when leaving the page
  }, []);

  const secondsLeft = Math.max(0, Math.floor((endTime - now) / 1000));
  const boxes = [
    { value: Math.floor(secondsLeft / 86400), label: 'days' },
    { value: Math.floor((secondsLeft % 86400) / 3600), label: 'hrs' },
    { value: Math.floor((secondsLeft % 3600) / 60), label: 'min' },
    { value: secondsLeft % 60, label: 'sec' },
  ];

  return (
    <div className="row" style={{ gap: 8, margin: '14px 0' }}>
      {boxes.map((box) => (
        <div
          key={box.label}
          style={{ flex: 1, background: 'rgba(255,255,255,.16)', borderRadius: 14, padding: '9px 0', textAlign: 'center' }}
        >
          <b style={{ fontSize: 20 }}>{String(box.value).padStart(2, '0')}</b>
          <div style={{ fontSize: 10.5, opacity: 0.8 }}>{box.label}</div>
        </div>
      ))}
    </div>
  );
}
