import {Typography} from '@mui/material';
import {useState} from 'react';

import AutoBox from './components/AutoBox';
import UrlRecordList from './components/UrlRecordList';
import {UrlRecord} from "./types/UrlRecord"; // TODO: Should use @types for this

import records from './stubData';  // Import the stub data
import UrlFormNew from './components/UrlFormNew';
import UrlFormShow from './components/UrlFormShow';


function App() {
  const LIST = "LIST";
  const ADD = "ADD";
  const SHOW = "SHOW";
  type ModeType = "LIST" | "ADD" | "SHOW";

  const [mode, setMode] = useState<ModeType>(LIST);
  const [record, setRecord] = useState<UrlRecord | null>(null);

  // Close the modal to render list
  const close = function(): void {
    setMode(LIST);
  };

  // Show the modal
  const show = function(record: UrlRecord) {
    setRecord(record);
    setMode(SHOW);
  };

  // Show the modal
  const add = function() {
    setRecord(null);
    setMode(ADD);
  };

  const deleteRecord = function(record: UrlRecord) {
    console.log("Delete: ", record);
  };

  return (
    <>
      <AutoBox>
        <Typography variant="h5" component="h1" gutterBottom>
          URL Shortener
        </Typography>

        {/* Render Url Show Component if set */}
        {mode === SHOW && <UrlFormShow record={record} onClose={close} />}

        {/* Render New URL Form */}
        {mode === ADD && <UrlFormNew onCancel={close} />}

        {/*  Render Url List */}
        {mode === LIST && <UrlRecordList records={records} onClick={show} onAdd={add} onDelete={deleteRecord} />}

      </AutoBox>
    </>
  );
}

export default App;
