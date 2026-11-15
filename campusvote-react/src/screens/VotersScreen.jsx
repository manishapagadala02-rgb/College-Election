// Admin list of voters: search, add and remove.
// Props: voters, onAdd(name), onDelete(pk)
import { useState } from 'react';
import Header from '../components/Header.jsx';
import Icon from '../components/Icon.jsx';

export default function VotersScreen({ voters, onAdd, onDelete }) {
  const [search, setSearch] = useState('');
  const [newName, setNewName] = useState('');

  // Keep only voters whose name or ID contains the search text
  const text = search.toLowerCase();
  const shown = voters.filter((v) => (v.name + v.studentId).toLowerCase().includes(text));

  function addVoter() {
    if (newName.trim() === '') return;
    onAdd(newName.trim());
    setNewName('');
  }

  return (
    <div className="view">
      <Header title="Voters list" />

      <input placeholder="Search voters" value={search} onChange={(e) => setSearch(e.target.value)} />

      <div className="row mt">
        <input placeholder="Add voter name" value={newName} onChange={(e) => setNewName(e.target.value)} />
        <button className="btn" style={{ width: 'auto', padding: '13px 20px' }} onClick={addVoter}>Add</button>
      </div>

      <div className="mut mt">{shown.length} of {voters.length} voters</div>

      <div className="g" style={{ marginTop: 10 }}>
        {shown.map((voter) => (
          <div key={voter.pk} className="card row" style={{ padding: '12px 14px' }}>
            <div className="av">{voter.name[0]}</div>
            <div>
              <b>{voter.name}</b>
              <div className="mut">
                {voter.studentId} · {voter.faceEnrolled ? 'Face enrolled' : 'Face not enrolled'}
              </div>
            </div>
            <button style={{ marginLeft: 'auto', color: 'var(--bad)' }} onClick={() => onDelete(voter.pk)}>
              <Icon name="trash" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
