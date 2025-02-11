import UrlList from './components/RecordList';
import UrlRecordView from './components/UrlRecord';
import records from './stubData';  // Import the stub data

function App() {

  return (
    <>
      <UrlRecordView record={records[0]} />
      // <UrlList records={records} />
    </>
  );
}

export default App;
