import React from "react";
import {ListItem, Box, ListItemText, Typography, IconButton} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import {UrlRecord} from "../types/UrlRecord"; // TODO: Should use @types for this

interface UrlRecordListItemProps {
  record: UrlRecord;
  onClick: (record: UrlRecord) => void;
}

const UrlRecordListItem: React.FC<UrlRecordListItemProps> = function(props) {

  const onDelete = function() {
  };

  const onEdit = function() {
  };

  // Delegate function in case we want more
  const onClick = function() {
    props.onClick(props.record);
  };

  return (
    <>
      <Box sx={{'&:hover': {backgroundColor: 'rgba(0, 0, 0, 0.08)', cursor: 'pointer', }, padding: 1}}>

        <ListItem onClick={onClick}>
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

export default UrlRecordListItem;
