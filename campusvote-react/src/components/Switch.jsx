// An on/off switch. Usage: <Switch on={dark} onToggle={...} />

export default function Switch({ on, onToggle }) {
  return <button className={'sw' + (on ? ' on' : '')} onClick={onToggle} aria-label="Toggle" />;
}
