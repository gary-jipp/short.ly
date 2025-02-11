import {Box, Typography} from '@mui/material';
import UrlList from './components/UrlRecordList';
import UrlRecordEdit from './components/UrlRecordEdit';
import records from './stubData';  // Import the stub data
import {useState} from 'react';
import {UrlRecord} from './components/UrlRecordList/RecordList.types';
import ResponsiveBox from './components/AutoBox';

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
      <ResponsiveBox>
        <Typography variant="h5" component="h1" gutterBottom>
          URL Shortener
        </Typography>

        {/* Display Edit Component if set */}
        {modal && <UrlRecordEdit record={record} onClose={toggleModal} />}

        {/* Otherwise Render Url List */}
        {!modal && <UrlList records={records} onClick={onClick} />}

      </ResponsiveBox>
    </>
  );
}

export default App;
