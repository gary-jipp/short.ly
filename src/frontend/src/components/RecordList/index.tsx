import {List, Box, Divider, Typography, IconButton} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RecordListItem from '../RecordListItem';
import {UrlRecord} from "../RecordList/RecordList.types"; // Should use @types for this

interface UrlRecordListProps {
  records: UrlRecord[];  // array of UrlRecord objects
}

const RecordList: React.FC<UrlRecordListProps> = function(props) {

  // Delegate function in case we want to do more mere
  const onAdd = function(): void {
  };

  return (

    <Box sx={{padding: 1}}>

      <Box sx={{padding: 0, display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
        <Typography variant="subtitle1" component="h1" gutterBottom>
          Your Short URL's
        </Typography>

        <IconButton color="primary" onClick={onAdd}>
          <AddIcon />
        </IconButton>
      </Box>

      <List disablePadding sx={{border: '1px solid #ddd', borderRadius: 2}}>
        {props.records.map((record, index) => (

          <>
            <RecordListItem record={record} />
            {index < props.records.length - 1 && <Divider />}
          </>

        ))}
      </List>
    </Box>
  );
};

export default RecordList;
