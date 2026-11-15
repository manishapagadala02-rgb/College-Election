// The admin's full list of elections.
// Props: elections, onToggle(id), onResults(id), onBack()
import Header from '../components/Header.jsx';
import AdminElectionCard from '../components/AdminElectionCard.jsx';

export default function AdminElectionsScreen({ elections, onToggle, onResults, onBack }) {
  return (
    <div className="view">
      <Header title="Elections" onBack={onBack} />
      <div className="g">
        {elections.map((election) => (
          <AdminElectionCard key={election.id} election={election} onToggle={onToggle} onResults={onResults} />
        ))}
      </div>
    </div>
  );
}
