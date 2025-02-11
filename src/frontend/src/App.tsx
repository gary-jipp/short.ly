import {Typography} from '@mui/material';
import {useState} from 'react';

import AutoBox from './components/AutoBox';
import UrlRecordList from './components/UrlRecordList';
import UrlRecordEdit from './components/UrlRecordEdit';
import {UrlRecord} from "./types/UrlRecord"; // TODO: Should use @types for this

import records from './stubData';  // Import the stub data

function App() {
  const [modal, setModal] = useState(true);
  const [record, setRecord] = useState<UrlRecord | null>(null);

  const toggleModal = function(): void {
    setModal(!modal);
  };

  const onClick = function(record: UrlRecord) {
    setRecord(record);
  };

  return (
    <>
      <AutoBox>
        <Typography variant="h5" component="h1" gutterBottom>
          URL Shortener
        </Typography>

        {/* Display Edit Component if set */}
        {modal && <UrlRecordEdit record={record} onClose={toggleModal} />}

        {/* Otherwise Render Url List */}
        {!modal && <UrlRecordList records={records} onClick={onClick} />}

      </AutoBox>
    </>
  );
}

export default App;
