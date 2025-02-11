import React, {useState} from "react";
import {ListItem, Box, ListItemText, Typography, IconButton, Dialog, DialogActions, DialogTitle, Button} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import {UrlRecord} from "../types/UrlRecord"; // TODO: Should use @types for this

interface UrlRecordListItemProps {
  record: UrlRecord;
  onClick: (record: UrlRecord) => void;
  onDelete: (record: UrlRecord) => void;
}

const UrlRecordListItem: React.FC<UrlRecordListItemProps> = function(props) {
  const [isModalOpen, setModalOpen] = useState(false);

  const deleteRecord = function() {
    // TODO:  Call delete from Context
    setModalOpen(false);
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
            <IconButton edge="end" color="error" onClick={() => deleteRecord()}>
              <DeleteIcon />
            </IconButton>
          </Box>
        </ListItem>
      </Box>

      {/* Confirmation Modal */}
      <Dialog open={isModalOpen} onClose={() => setModalOpen(false)}>
        <DialogTitle>Are you sure you want to delete this record?</DialogTitle>
        <DialogActions>
          <Button onClick={() => setModalOpen(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={deleteRecord} color="error" autoFocus>
            Yes, Delete
          </Button>
        </DialogActions>
      </Dialog >

    </>
  );
};

export default UrlRecordListItem;
