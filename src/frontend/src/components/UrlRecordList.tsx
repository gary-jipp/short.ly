import {Fragment} from 'react';
import {List, Box, Divider, Typography, IconButton} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import UrlRecordListItem from './UrlRecordListItem';
import {UrlRecord} from "../types/UrlRecord"; // TODO: Should use @types for this

interface UrlRecordListProps {
  records: UrlRecord[];  // array of UrlRecord objects
  onClick: (record: UrlRecord) => void;
  onAdd: () => void;
}

const UrlRecordList: React.FC<UrlRecordListProps> = function(props) {

  return (
    <Box sx={{padding: 1}}>

      <Box sx={{padding: 0, display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
        <Typography variant="subtitle1" component="h1" gutterBottom>
          Your Short URL's
        </Typography>

        <IconButton color="primary" onClick={props.onAdd}>
          <AddIcon />
        </IconButton>
      </Box>

      <List disablePadding sx={{border: '1px solid #ddd', borderRadius: 2}}>
        {props.records.map((record, index) => (

          <Fragment key={index}>
            <UrlRecordListItem record={record} onClick={props.onClick} />
            {index < props.records.length - 1 && <Divider />}
          </Fragment>

        ))}
      </List>
    </Box>
  );
};

export default UrlRecordList;
