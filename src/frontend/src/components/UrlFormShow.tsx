import {useState} from "react";
import {Typography, TextField, Button, Box, Link, IconButton, CircularProgress, Alert} from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import {UrlRecord} from "../types/UrlRecord"; // TODO: Should use @types for this
import ShortUrl from "./ShortUrl";
import {useApi} from "../providers/ApiProvider";

interface UrlRecordShowProps {
  record: UrlRecord;
  onClose: () => void; // Adding close function to the props
}

const UrlFormShow: React.FC<UrlRecordShowProps> = function(props) {
  const [longUrl, setUrl] = useState(props.record?.longUrl || "");    // Long Url Text field
  const [shortUrl] = useState(props.record?.shortUrl || "");          // Displayed ShortUrl
  const [copied, setCopied] = useState(false);
  const [update, setUpdate] = useState(false);          // Toggle to allow editing
  const [success, setSuccess] = useState(false);
  const [localError, setLocalError] = useState("");     // Locally generated errors
  const {updateUrlRecord, apiPending, apiError} = useApi(); // API provider

  // Add using context function
  const saveRecord = function() {
    if (longUrl?.length < 6) {
      setLocalError("Your URL is too short");
      return setTimeout(() => {   // Clear error message after 3 seconds
        setLocalError("");
      }, 2000);
    }

    // Updaye longUrl in record & save
    updateUrlRecord({...props.record, longUrl})
      .then(() => {
        setSuccess(true);
      });

  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shortUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // API and local errors are treated the same
  const error = localError || apiError;

  return (
    <Box maxWidth="sm" sx={{mt: 4, p: 4, border: "1px solid #ddd", borderRadius: 2}}    >
      <Typography variant="subtitle1" gutterBottom>
        {update ? "Enter new URL" : "This is your URL"}
      </Typography>

      <TextField fullWidth label="URL" value={longUrl} onChange={(e) => setUrl(e.target.value)} margin="normal" variant="outlined" disabled={!update} />

      <Box sx={{display: "flex", alignItems: "center", mt: 1}}>
        <Link href={props.record?.longUrl} target="_blank" rel="noopener" underline="hover" sx={{fontWeight: "bold"}}            >
          {shortUrl}
        </Link>

        <IconButton color="primary" onClick={copyToClipboard} sx={{ml: 1}}>
          <ContentCopyIcon />
        </IconButton>
        {copied && (<Typography color="success.main">Copied to clipboard!</Typography>)}
      </Box>

      {!update && <Button variant="outlined" color="primary" fullWidth sx={{mt: 2}} onClick={() => setUpdate(true)}>
        Update
      </Button>}

      {/* {update && <Button variant="outlined" color="primary" fullWidth sx={{mt: 2}} onClick={saveRecord}>
        Save
      </Button>} */}

      {/* Display pending, error, sucess or Save Button */}
      {update && (
        <Box sx={{mt: 2}}>
          {apiPending ? (<Button variant="outlined" color="primary" fullWidth disabled><CircularProgress size={24} /></Button>)
            : error ? (<Alert severity="error">{error}</Alert>)
              : success ? (<Alert severity="success">Saved successfully!</Alert>)
                : (<Button variant="outlined" color="primary" fullWidth onClick={saveRecord}>Save</Button>)}
        </Box>
      )}

      <Button variant="contained" color="primary" fullWidth sx={{mt: 2}} onClick={props.onClose}>
        Close
      </Button>
    </Box>
  );
};

export default UrlFormShow;
