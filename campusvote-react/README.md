# CampusVote – React version

A student voting app with face verification, built with React (Vite) in plain JavaScript.

## Run it
1. Open this folder in IntelliJ (File > Open).
2. In the Terminal tab:
       npm install
       npm run dev
3. Open http://localhost:5173 (press F12 and click the phone icon for mobile view).

It runs with demo data, so you do NOT need the backend or MongoDB.
Login: any ID and password (student or admin tab).

### Connect to the Node/Express backend (optional)
1. Start the backend (the other project) with `npm run dev` so it runs on port 3000.
2. In `src/api.js` change `const DEMO_MODE = true;` to `false`.
3. Log in with S1001 / password (student) or admin01 / password (admin).

---

## How the app is organised

    src/
      main.jsx            starts React
      App.jsx             the "boss": holds the data + decides which screen shows
      api.js              ALL data goes through here (demo data or the real server)
      sampleData.js       demo elections and voters
      index.css           the styles
      components/         small reusable pieces
      screens/            one file per page

## The 3 ideas you need to understand React here

1. **Component** = a function that returns HTML-like code (JSX).
   `function Header({ title }) { return <h1>{title}</h1>; }`
2. **Props** = the inputs of a component, like function arguments.
   `<Header title="Results" />` sends title="Results" into Header.
3. **State** = data a component remembers. When state changes, the screen updates.
   `const [name, setName] = useState('');`  -> `name` is the value, `setName(...)` changes it.

Data flows DOWN (App -> screen -> component via props).
Events flow UP (a button calls a function that App gave it, e.g. `onVote`).

## Build order (the order a person would write it)

Step 1  Create the project: `npm create vite@latest campusvote-react -- --template react`, then `npm install`.
Step 2  Add the styles (`index.css`) and set up `main.jsx` and `index.html`.
Step 3  Write `sampleData.js`: plain JavaScript objects, no React yet.
Step 4  Write `api.js`: functions like `getElections()` so components never touch data directly.
Step 5  Build the tiny components first. They have no state, only props:
          Icon, StatusPill, Header, Toast, Switch, QuickAction, StatTile, NotificationItem, ResultBar
Step 6  Build the bigger reusable components:
          BottomNav, ElectionCard, CandidateOption, AdminElectionCard
Step 7  CountdownTimer: the first component with useState + useEffect (a timer that ticks every second).
Step 8  Build the screens, simplest first. Each screen uses the components above:
          LoginScreen (first state: useState for the inputs)
          ElectionsScreen, NotificationsScreen (lists with .map)
          HomeScreen (banner + countdown + quick actions + turnout + open elections)
          VoteScreen (state: which candidate is selected; manifesto lines)
          DoneScreen (receipt), ResultsScreen, ProfileScreen (details, dark mode switch, voting history)
          AdminHomeScreen (dashboard), AdminElectionsScreen, CreateElectionScreen, VotersScreen
Step 9  Build FaceVerifyModal (the hardest one: it uses useRef and useEffect for the camera).
Step 10 Write `App.jsx` last. It holds the state and connects everything:
          user, screen, elections, notes, history, dark... plus the functions:
          handleLogin, startVoting, submitVote, handleCreate...

## Every feature in the app
Student:  login (Student/Admin tabs) · home with live countdown · quick actions · campus turnout ·
          notifications (bell + red dot) · active elections · face verification popup ·
          ballot with manifestos · vote receipt · results with leader + breakdown ·
          profile with details, dark mode switch and voting history
Admin:    login · live dashboard (total votes, stat tiles) · quick actions ·
          manage elections (Results, Close/Reopen) · create election (year, dates, description, candidates) ·
          voters list (search, add, delete)

## Where each React feature is used
- useState ........ every screen with inputs, and App.jsx
- Props ........... every component (look at the comment at the top of each file)
- Lists (.map) .... ElectionsScreen, ResultsScreen, VotersScreen (each item needs a `key`)
- Conditional UI .. `{screen === 'home' && <HomeScreen />}` in App.jsx
- Forms ........... LoginScreen, CreateElectionScreen (value + onChange = "controlled input")
- useEffect ....... CountdownTimer (ticking clock), App.jsx (dark mode)
- useRef .......... FaceVerifyModal (camera)

## The voting flow (follow it in App.jsx)
1. Student presses "Cast your vote"  -> startVoting(election) opens the face popup
2. Face matches, presses Continue    -> faceCheckPassed() shows the VoteScreen
3. Picks a candidate, presses Submit -> submitVote(candidateId) calls api.castVote(...)
4. DoneScreen shows the receipt

## Face recognition
The camera and the photo are real, but matching is a demo (it always says "matched").
For real matching, the backend's `services/faceService.js` must compare the photo to a stored one.
