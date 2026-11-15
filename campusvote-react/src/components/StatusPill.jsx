// Small "Open" / "Closed" tag. Usage: <StatusPill open={true} />

export default function StatusPill({ open }) {
  return <span className={'pill ' + (open ? 'open' : 'closed')}>{open ? 'Open' : 'Closed'}</span>;
}
