// Sample data used when DEMO_MODE is true (no server needed).
// Each election has a list of candidates, and each candidate has a number of votes.

export const sampleElections = [
  {
    id: 3, title: 'College President 2026', position: 'President', deadline: 'Nov 20', open: true,
    candidates: [
      { id: 1, name: 'Alexander Reed', votes: 60 },
      { id: 2, name: 'Daniel Moore', votes: 20 },
      { id: 3, name: 'NOTA', votes: 20 },
    ],
  },
  {
    id: 2, title: 'Student Council Rep 2026', position: 'Council', deadline: 'Closed', open: false,
    candidates: [
      { id: 4, name: 'Mia Lindholm', votes: 48 },
      { id: 5, name: 'Kittu Rao', votes: 37 },
      { id: 6, name: 'NOTA', votes: 9 },
    ],
  },
  {
    id: 1, title: 'Cultural Rep 2026', position: 'Cultural', deadline: 'Closed', open: false,
    candidates: [
      { id: 7, name: 'Sara Nyberg', votes: 52 },
      { id: 8, name: 'Omar Haddad', votes: 31 },
      { id: 9, name: 'NOTA', votes: 7 },
    ],
  },
];

export const sampleVoters = [
  { pk: 1, name: 'Alexander', studentId: 'S1001', faceEnrolled: true },
  { pk: 2, name: 'Daniel', studentId: 'S1002', faceEnrolled: true },
  { pk: 3, name: 'Mimi', studentId: 'S1003', faceEnrolled: true },
  { pk: 4, name: 'Kittu', studentId: 'S1004', faceEnrolled: false },
];

// Elections this student has already voted in
export const sampleVotedIds = [1, 2];

// Notifications shown on the Alerts screen
export const sampleNotifications = [
  { icon: 'vote', title: 'Voting is open', text: 'College President 2026 closes in 11 days.', time: '2h' },
  { icon: 'camera', title: 'Face check required', text: 'You’ll verify with your camera before voting.', time: '1d' },
  { icon: 'chart', title: 'Results declared', text: 'Student Council Rep results are out.', time: '3d' },
];
