// App is the "boss" component. It:
//   1. keeps the main data in state (user, elections, which screen we are on)
//   2. decides which screen to show
//   3. passes data and functions down to the screens as props
import { useState, useEffect } from 'react';
import {
  login, getElections, getVotedIds, castVote,
  createElection, toggleElection, getVoters, addVoter, deleteVoter,
} from './api.js';
import { sampleNotifications } from './sampleData.js';

import LoginScreen from './screens/LoginScreen.jsx';
import HomeScreen from './screens/HomeScreen.jsx';
import ElectionsScreen from './screens/ElectionsScreen.jsx';
import NotificationsScreen from './screens/NotificationsScreen.jsx';
import VoteScreen from './screens/VoteScreen.jsx';
import DoneScreen from './screens/DoneScreen.jsx';
import ResultsScreen from './screens/ResultsScreen.jsx';
import ProfileScreen from './screens/ProfileScreen.jsx';
import AdminHomeScreen from './screens/AdminHomeScreen.jsx';
import AdminElectionsScreen from './screens/AdminElectionsScreen.jsx';
import CreateElectionScreen from './screens/CreateElectionScreen.jsx';
import VotersScreen from './screens/VotersScreen.jsx';

import BottomNav from './components/BottomNav.jsx';
import FaceVerifyModal from './components/FaceVerifyModal.jsx';
import Toast from './components/Toast.jsx';

// Screens that show the bottom tab bar
const screensWithNav = [
  'home', 'elections', 'notes', 'results', 'profile',
  'adminHome', 'adminElections', 'create', 'voters',
];

export default function App() {
  // ----- state: data that can change and makes the screen update -----
  const [user, setUser] = useState(null);                 // { name, role } after login
  const [screen, setScreen] = useState('login');          // which screen is showing
  const [elections, setElections] = useState([]);
  const [votedIds, setVotedIds] = useState([]);           // elections this student voted in
  const [voters, setVoters] = useState([]);               // admin only
  const [currentElection, setCurrentElection] = useState(null); // election being voted in
  const [resultsId, setResultsId] = useState(null);       // election to show first on Results
  const [showFaceCheck, setShowFaceCheck] = useState(false);
  const [faceVerified, setFaceVerified] = useState(false);
  const [receipt, setReceipt] = useState('');
  const [notes, setNotes] = useState(sampleNotifications);
  const [history, setHistory] = useState([]);             // this student's voting history
  const [dark, setDark] = useState(false);                // dark mode on/off
  const [message, setMessage] = useState('');             // text for the Toast

  // When "dark" changes, tell the page (the CSS reads this attribute)
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light');
  }, [dark]);

  // ----- helper functions -----
  function showMessage(text) {
    setMessage(text);
    setTimeout(() => setMessage(''), 2000);
  }

  // Load fresh data from the backend (or demo data)
  async function loadData(role) {
    setElections(await getElections());
    if (role === 'admin') setVoters(await getVoters());
    else setVotedIds(await getVotedIds());
  }

  // Run an action, then reload the data. Shows an error message if it fails.
  // Returns true if it worked.
  async function run(action, successText) {
    try {
      await action();
      await loadData(user.role);
      if (successText) showMessage(successText);
      return true;
    } catch (error) {
      showMessage(error.message);
      return false;
    }
  }

  // Go to a screen. Opening Results from a tab starts on the first election.
  function navigate(name) {
    if (name === 'results') setResultsId(null);
    setScreen(name);
  }

  function openResults(electionId) {
    setResultsId(electionId);
    setScreen('results');
  }

  // ----- what happens when the user does something -----
  async function handleLogin(id, password, role) {
    try {
      const loggedInUser = await login(id, password, role);
      setUser(loggedInUser);
      await loadData(loggedInUser.role);
      setScreen(loggedInUser.role === 'admin' ? 'adminHome' : 'home');
    } catch (error) {
      showMessage(error.message);
    }
  }

  function handleLogout() {
    setUser(null);
    setScreen('login');
  }

  // Step 1 of voting: remember the election and open the face check popup
  function startVoting(election) {
    setCurrentElection(election);
    setShowFaceCheck(true);
  }

  // Step 2: face matched, so show the ballot
  function faceCheckPassed() {
    setShowFaceCheck(false);
    setFaceVerified(true);
    setScreen('vote');
  }

  // Step 3: student picked a candidate and pressed Submit
  async function submitVote(candidateId) {
    try {
      const result = await castVote(currentElection.id, candidateId);
      const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      setReceipt(result.receipt);
      setHistory([{ title: currentElection.title, time }, ...history]);
      setNotes([
        { icon: 'check', title: 'Vote recorded', text: 'Your vote for ' + currentElection.title + ' was counted anonymously.', time: 'now' },
        ...notes,
      ]);
      await loadData(user.role);
      setScreen('done');
    } catch (error) {
      showMessage(error.message);
    }
  }

  async function handleCreate(data) {
    if (data.title.trim() === '' || data.candidates.length < 2) {
      showMessage('Add a title and two candidates');
      return;
    }
    const worked = await run(() => createElection(data), 'Election created');
    if (worked) setScreen('adminHome');
  }

  const handleToggle = (id) => run(() => toggleElection(id), 'Election updated');
  const handleAddVoter = (name) => run(() => addVoter(name), 'Voter added');
  const handleDeleteVoter = (pk) => run(() => deleteVoter(pk), 'Voter removed');

  // ----- what to show on the screen -----
  const showNav = user && screensWithNav.includes(screen);

  return (
    <div className="app">
      {screen === 'login' && <LoginScreen onLogin={handleLogin} />}

      {screen === 'home' && (
        <HomeScreen elections={elections} votedIds={votedIds} onVote={startVoting} onNavigate={navigate} />
      )}

      {screen === 'elections' && (
        <ElectionsScreen elections={elections} votedIds={votedIds} onVote={startVoting} />
      )}

      {screen === 'notes' && <NotificationsScreen notes={notes} onBack={() => setScreen('home')} />}

      {screen === 'vote' && (
        <VoteScreen election={currentElection} onSubmit={submitVote} onBack={() => setScreen('elections')} />
      )}

      {screen === 'done' && (
        <DoneScreen
          receipt={receipt}
          electionTitle={currentElection.title}
          onResults={() => openResults(currentElection.id)}
          onHome={() => setScreen('home')}
        />
      )}

      {screen === 'results' && <ResultsScreen elections={elections} startId={resultsId} />}

      {screen === 'profile' && (
        <ProfileScreen
          faceVerified={faceVerified}
          history={history}
          dark={dark}
          onToggleDark={() => setDark(!dark)}
          onLogout={handleLogout}
        />
      )}

      {screen === 'adminHome' && (
        <AdminHomeScreen
          elections={elections}
          voters={voters}
          onToggle={handleToggle}
          onResults={openResults}
          onNavigate={navigate}
          onLogout={handleLogout}
        />
      )}

      {screen === 'adminElections' && (
        <AdminElectionsScreen
          elections={elections}
          onToggle={handleToggle}
          onResults={openResults}
          onBack={() => setScreen('adminHome')}
        />
      )}

      {screen === 'create' && <CreateElectionScreen onCreate={handleCreate} />}

      {screen === 'voters' && (
        <VotersScreen voters={voters} onAdd={handleAddVoter} onDelete={handleDeleteVoter} />
      )}

      {showNav && <BottomNav role={user.role} current={screen} onNavigate={navigate} />}

      {showFaceCheck && <FaceVerifyModal onSuccess={faceCheckPassed} onCancel={() => setShowFaceCheck(false)} />}

      <Toast message={message} />
    </div>
  );
}
