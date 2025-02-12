import {Fragment} from 'react';
import {List, Box, Divider, Typography, IconButton, Alert} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import UrlRecordListItem from './UrlRecordListItem';
import {UrlRecord} from "../types/UrlRecord"; // TODO: Should use @types for this
import useTransientState from '../hooks/useTransientState';

interface UrlRecordListProps {
  records: UrlRecord[];  // array of UrlRecord objects
  onClick: (record: UrlRecord) => void;
  onAdd: () => void;
}

// Renmders a List of URL Record Items
const UrlRecordList: React.FC<UrlRecordListProps> = function(props) {
  const [notification, setNotification] = useTransientState<string>("", 2000);

  // When notified, show "deleted" notification
  const onDelete = function(record: UrlRecord) {
    setNotification(`${record.shortUrl} deleted`);
  };

  return (
    <Box sx={{padding: 1}}>

      <Box sx={{padding: 0, display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
        <Typography variant="subtitle1" component="h1" gutterBottom>
          Your Short URL's
        </Typography>

        {notification && (<Typography color="warning">{notification}</Typography>)}

        <IconButton color="primary" onClick={props.onAdd}>
          <AddIcon />
        </IconButton>
      </Box>

      {/* map records array to array of UrlRecordListItem objects  */}
      <List disablePadding sx={{border: '1px solid #ddd', borderRadius: 2}}>
        {props.records.map((record, index) => (

          // id key is better than using index
          <Fragment key={record.id}>
            <UrlRecordListItem record={record} onClick={props.onClick} onDelete={onDelete} />
            {index < props.records.length - 1 && <Divider />}
          </Fragment>

        ))}
      </List>
    </Box>
  );
};

export default UrlRecordList;
