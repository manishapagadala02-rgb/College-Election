// Form to create a new election.
// Props: onCreate({ title, position, academicYear, startDate, endDate, description, candidates })
import { useState } from 'react';
import Header from '../components/Header.jsx';

export default function CreateElectionScreen({ onCreate }) {
  const [title, setTitle] = useState('');
  const [position, setPosition] = useState('');
  const [academicYear, setAcademicYear] = useState('All years');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [description, setDescription] = useState('');
  const [names, setNames] = useState(['', '']); // starts with two empty candidate boxes

  // Change one candidate name. We copy the list, change one item, and save the copy.
  function changeName(index, value) {
    const copy = [...names];
    copy[index] = value;
    setNames(copy);
  }

  function addCandidateBox() {
    setNames([...names, '']);
  }

  function submit() {
    const candidates = names.map((n) => n.trim()).filter((n) => n !== ''); // remove empty boxes
    onCreate({ title, position, academicYear, startDate, endDate, description, candidates });
  }

  return (
    <div className="view">
      <Header title="Create election" />

      <label>Election title</label>
      <input placeholder="e.g. Sports Captain 2026" value={title} onChange={(e) => setTitle(e.target.value)} />

      <label>Position</label>
      <input placeholder="e.g. Captain" value={position} onChange={(e) => setPosition(e.target.value)} />

      <label>Academic year</label>
      <select value={academicYear} onChange={(e) => setAcademicYear(e.target.value)}>
        <option>All years</option>
        <option>1st year</option>
        <option>2nd year</option>
        <option>3rd year</option>
      </select>

      <div className="row">
        <div style={{ flex: 1 }}>
          <label>Start date</label>
          <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
        </div>
        <div style={{ flex: 1 }}>
          <label>End date</label>
          <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
        </div>
      </div>

      <label>Description</label>
      <textarea rows="2" value={description} onChange={(e) => setDescription(e.target.value)} />

      <div className="row sp" style={{ marginTop: 18 }}>
        <h2>Candidates</h2>
        <button className="pill open" onClick={addCandidateBox}>+ Add candidate</button>
      </div>

      {names.map((name, index) => (
        <input
          key={index}
          placeholder={'Candidate ' + (index + 1)}
          style={{ marginTop: 10 }}
          value={name}
          onChange={(e) => changeName(index, e.target.value)}
        />
      ))}

      <button className="btn" style={{ marginTop: 22 }} onClick={submit}>Create election</button>
    </div>
  );
}
