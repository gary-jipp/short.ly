import {useState} from "react";
import {TextField, Button, Box} from "@mui/material";
import {UrlRecord} from "../types/UrlRecord"; // TODO: Should use @types for this
import UrlShow from "./UrlShow";
import UrlEdit from "./UrlEdit";

interface UrlRecordShowProps {
  record: UrlRecord;
  onClose: () => void;
}

const UrlFormShow: React.FC<UrlRecordShowProps> = function(props) {
  const record: UrlRecord = props.record;
  const [edit, setEdit] = useState(false);          // Toggle to allow editing

  return (
    <Box maxWidth="sm" sx={{mt: 4, p: 4, border: "1px solid #ddd", borderRadius: 2}}    >

      <TextField fullWidth label="URL" value={props.record?.longUrl} margin="normal" variant="outlined" disabled />

      {/* Display record read-only */}
      {!edit && <UrlShow record={record} onEdit={() => setEdit(true)} />}

      {/* Show record Edit Controls */}
      {edit && <UrlEdit record={record} onCancelEdit={() => setEdit(false)} />}

      <Button variant="contained" color="primary" fullWidth sx={{mt: 2}} onClick={props.onClose}>
        Close
      </Button>
    </Box>
  );
};

export default UrlFormShow;
