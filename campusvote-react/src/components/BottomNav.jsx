// The tab bar at the bottom. Students and admins get different tabs.
// "current" is the screen we are on, so we can highlight that tab.
import Icon from './Icon.jsx';

const studentTabs = [
  { screen: 'home', icon: 'home', label: 'Home' },
  { screen: 'elections', icon: 'vote', label: 'Vote' },
  { screen: 'results', icon: 'chart', label: 'Results' },
  { screen: 'profile', icon: 'user', label: 'Profile' },
];

const adminTabs = [
  { screen: 'adminHome', icon: 'home', label: 'Home' },
  { screen: 'create', icon: 'plus', label: 'Create' },
  { screen: 'voters', icon: 'users', label: 'Voters' },
  { screen: 'results', icon: 'chart', label: 'Results' },
];

export default function BottomNav({ role, current, onNavigate }) {
  const tabs = role === 'admin' ? adminTabs : studentTabs;

  return (
    <div className="nav">
      {tabs.map((tab) => (
        <button
          key={tab.screen}
          className={current === tab.screen ? 'on' : ''}
          onClick={() => onNavigate(tab.screen)}
        >
          <Icon name={tab.icon} />
          {tab.label}
        </button>
      ))}
    </div>
  );
}
