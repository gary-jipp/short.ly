import {Typography} from '@mui/material';
import {useState} from 'react';

import AutoBox from './components/AutoBox';
import UrlRecordList from './components/UrlRecordList';
import UrlRecordEdit from './components/UrlRecordEdit';
import {UrlRecord} from "./types/UrlRecord"; // TODO: Should use @types for this

import records from './stubData';  // Import the stub data

function App() {
  const [modal, setModal] = useState(false); // boolean type inferred here
  const [record, setRecord] = useState<UrlRecord | null>(null);

  // Close the modal to render list
  const close = function(): void {
    setModal(false);
  };

  // Show the modal
  const show = function(record: UrlRecord) {
    setRecord(record);
    setModal(true);
  };

  return (
    <>
      <AutoBox>
        <Typography variant="h5" component="h1" gutterBottom>
          URL Shortener
        </Typography>

        {/* Display Edit Component if set */}
        {modal && <UrlRecordEdit record={record} onClose={close} />}

        {/* Otherwise Render Url List */}
        {!modal && <UrlRecordList records={records} onClick={show} />}

      </AutoBox>
    </>
  );
}

export default App;
