import {useState} from "react";
import {Typography, TextField, Button, Box, CircularProgress, Alert} from "@mui/material";
import {UrlRecord} from "../types/UrlRecord"; // TODO: Should use @types for this
import {useApi} from "../providers/ApiProvider";
import useTransientState from "../hooks/useTransientState";

interface UrlEditProps {
  record: UrlRecord;
  onCancelEdit: () => void;
}

const UrlEdit: React.FC<UrlEditProps> = function(props) {
  const record: UrlRecord = props.record;
  const [urlId, setUrlId] = useState(record?.urlId || "");    // Url ID  field
  const [success, setSuccess] = useState(false);
  const [pending, setPending] = useState<boolean>(false);
  const [error, setError] = useTransientState<string>("", 2000);

  const {updateUrlRecord} = useApi(); // API provider

  // Add using context function
  const saveRecord = function() {
    // crude length check
    if (urlId.length < 6 || urlId.length > 20) {
      setError("Your URL Code must be between 6-20 chars");
      setUrlId(record.urlId);
      return;
    }

    // Replace urlId & shorturl in record & save
    const shortUrl = record.shortUrl?.replace(/\/[^/]+$/, `/${urlId}`);

    updateUrlRecord({...props.record, urlId, shortUrl})
      .then(() => {
        setSuccess(true);
      })
      .catch(err => {
        const msg = err.response?.data?.error || err.message;
        setError(`Unable to save this URL - ${msg}`);
      })
      .finally(() => {
        setPending(false);
      });
  };


  return (
    <>
      <Typography variant="subtitle1" color="info" gutterBottom sx={{fontWeight: "bold"}}>
        Edit your URL Code (max 20 characters)
      </Typography>

      {/* Text Field for the URL Code */}
      <TextField fullWidth label="URL Code" value={urlId}
        onChange={(e) => setUrlId(e.target.value.toLowerCase().replace(/[^a-z0-9]/g, ""))} margin="normal" variant="outlined" />

      <Box sx={{display: "flex", alignItems: "center", mt: 1}}>

        {/* Display pending, error, sucess or Save Button */}
        {pending ? (
          <Button variant="outlined" color="primary" fullWidth disabled><CircularProgress size={24} />
          </Button>)
          : error ? (<Alert severity="error">{error}</Alert>)
            : success ? (<Alert severity="success">Saved successfully!</Alert>)
              : (<Button variant="outlined" color="primary" fullWidth onClick={saveRecord}>Save</Button>)}

      </Box>

      {!success && <Button variant="outlined" color="primary" fullWidth sx={{mt: 2}} onClick={props.onCancelEdit}>
        Cancel
      </Button>
      }
    </>
  );
};

export default UrlEdit;
