import {Typography} from '@mui/material';
import {useState} from 'react';

import AutoBox from '../components/AutoBox';
import UrlRecordList from '../components/UrlRecordList';
import UrlFormNew from '../components/UrlFormNew';
import UrlFormShow from '../components/UrlFormShow';
import {useApi} from '../providers/ApiProvider';
import {UrlRecord} from "../types/UrlRecord"; // TODO: Should use @types for this

const HomeRoute: React.FC = function() {
  const {urlRecords} = useApi();

  const ModeType = {
    LIST: "LIST",
    ADD: "ADD",
    SHOW: "SHOW",
  } as const;
  type ModeType = typeof ModeType[keyof typeof ModeType];

  const [mode, setMode] = useState<ModeType>(ModeType.LIST);
  const [record, setRecord] = useState<UrlRecord | null>(null);

  // Close the modal to render list
  const close = function(): void {
    setMode(ModeType.LIST);
  };

  // Show the modal
  const show = function(record: UrlRecord) {
    setRecord(record);  // ListItem could also do this using context
    setMode(ModeType.SHOW);
  };

  // Show the modal
  const add = function() {
    setRecord(null);
    setMode(ModeType.ADD);
  };

  return (
    <>
      <AutoBox>
        <Typography variant="h5" component="h1" gutterBottom>
          URL Shortener
        </Typography>

        {/* Render Url Show Component if set */}
        {mode === ModeType.SHOW && record !== null && <UrlFormShow record={record} onClose={close} />}

        {/* Render New URL Form */}
        {mode === ModeType.ADD && <UrlFormNew onCancel={close} />}

        {/*  Render Url List */}
        {mode === ModeType.LIST && <UrlRecordList records={urlRecords} onClick={show} onAdd={add} />}

      </AutoBox>
    </>
  );
};

export default HomeRoute;