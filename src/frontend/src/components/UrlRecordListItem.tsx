import React, {useState} from "react";
import {ListItem, Box, ListItemText, Typography, IconButton} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import {UrlRecord} from "../types/UrlRecord"; // TODO: Should use @types for this
import ConfirmDialog from "./ConfirmDialog";

interface UrlRecordListItemProps {
  record: UrlRecord;
  onClick: (record: UrlRecord) => void;
  onDelete: (record: UrlRecord) => void;
}

const UrlRecordListItem: React.FC<UrlRecordListItemProps> = function(props) {
  const [showDelete, setShowDelete] = useState(false);
  const {record} = props;

  const deleteRecord = function() {
    // TODO:  Call delete from Context
    setShowDelete(false);
    console.log("Delete");

  };

  // Delegate function in case we want to do more here
  const onClick = function() {
    props.onClick(record);
  };

  return (
    <>
      <Box sx={{'&:hover': {backgroundColor: 'rgba(0, 0, 0, 0.08)', cursor: 'pointer', }, padding: 1}}>

        <ListItem>
          <ListItemText onClick={onClick}
            primary={
              <>
                <Typography variant="subtitle2" sx={{fontWeight: 'bold'}}>
                  {record.shortUrl}
                </Typography>
                <Typography variant="body2" sx={{color: 'text.secondary'}}>
                  {record.longUrl}
                </Typography>
                <Typography variant="body2" sx={{color: 'text.secondary'}}>
                  Used {record.usageCount} times
                </Typography>
              </>
            }
          />

          <Box sx={{display: 'flex', alignItems: 'center'}}>
            <IconButton edge="end" color="error" onClick={() => setShowDelete(true)}>
              <DeleteIcon />
            </IconButton>
          </Box>
        </ListItem>
      </Box>

      <ConfirmDialog show={showDelete} cancelInfo={record.shortUrl} onConfirm={deleteRecord} onCancel={() => setShowDelete(false)} title="Do you want to delete this URL?" buttonText="Yes, Delete" />
    </>
  );
};

export default UrlRecordListItem;
