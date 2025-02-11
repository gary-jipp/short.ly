import React from "react";
import {ListItem, Box, ListItemText, Typography, IconButton} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import {UrlRecord} from "../RecordList/RecordList.types"; // Should use @types for this

interface RecordListItemProps {
  record: UrlRecord;
}

const RecordListItem: React.FC<RecordListItemProps> = function(props) {

  const onDelete = function() {
  };
  const onEdit = function() {
  };

  return (
    <>
      <Box sx={{'&:hover': {backgroundColor: 'rgba(0, 0, 0, 0.08)', cursor: 'pointer', }, padding: 1}}>

        <ListItem >
          <ListItemText
            primary={
              <>
                <Typography variant="subtitle1" sx={{fontWeight: 'bold'}}>
                  {props.record.shortUrl}
                </Typography>
                <Typography variant="body2" sx={{color: 'text.secondary'}}>
                  {props.record.longUrl}
                </Typography>
                <Typography variant="body2" sx={{color: 'text.secondary'}}>
                  Used {props.record.usageCount} times
                </Typography>
              </>
            }
          />

          <Box sx={{display: 'flex', alignItems: 'center'}}>
            <IconButton edge="end" color="primary" onClick={() => onEdit()}>
              <EditIcon />
            </IconButton>
            <IconButton edge="end" color="error" onClick={() => onDelete()}>
              <DeleteIcon />
            </IconButton>
          </Box>
        </ListItem>

      </Box>

    </>
  );
};

export default RecordListItem;
