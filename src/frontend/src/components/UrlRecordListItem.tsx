import React, {useState} from "react";
import {ListItem, Box, ListItemText, Typography, IconButton} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import {UrlRecord} from "../types/UrlRecord"; // TODO: Should use @types for this
import ConfirmDialog from "./ConfirmDialog";
import {useRecords} from "../providers/RecordProvider";

interface UrlRecordListItemProps {
  record: UrlRecord;
  onClick: (record: UrlRecord) => void;
  onDelete: (record: UrlRecord) => void;
}

const UrlRecordListItem: React.FC<UrlRecordListItemProps> = function(props) {
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState("");

  const {deleteUrlRecord} = useRecords(); // get delete function from Context

  const {record} = props;

  // Delete using context function
  const deleteRecord = function() {
    setShowConfirm(false);
    deleteUrlRecord(record)
      .then(() => {
        console.log("Deleted");
      })
      .catch(err => {
        console.log(err);
        setError("An error occured deleting this record");
        setTimeout(() => {   // Clear error message after 3 seconds
          setError("");
        }, 3000);
      });
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

          <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'flex-end'}}>
            <IconButton edge="end" color="error" onClick={() => setShowConfirm(true)}>
              <DeleteIcon />
            </IconButton>

            {/* Error message */}
            {error && (
              <Typography variant="caption" color="error" sx={{marginTop: 1}}>
                {error}
              </Typography>
            )}
          </Box>

        </ListItem>
      </Box>

      <ConfirmDialog show={showConfirm} content={record.shortUrl} onConfirm={deleteRecord} onCancel={() => setShowConfirm(false)} title="Do you want to delete this URL?" buttonText="Yes, Delete" />
    </>
  );
};

export default UrlRecordListItem;
