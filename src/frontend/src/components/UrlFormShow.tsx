import {useState} from "react";
import {Typography, TextField, Button, Box, Link, IconButton, CircularProgress, Alert} from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import {UrlRecord} from "../types/UrlRecord"; // TODO: Should use @types for this
import {useApi} from "../providers/ApiProvider";
import useTransientState from "../hooks/useTransientState";

interface UrlRecordShowProps {
  record: UrlRecord;
  onClose: () => void; // Adding close function to the props
}

const UrlFormShow: React.FC<UrlRecordShowProps> = function(props) {
  const [longUrl, setUrl] = useState(props.record?.longUrl || "");    // Long Url Text field
  const [shortUrl] = useState(props.record?.shortUrl || "");          // Displayed ShortUrl
  const [update, setUpdate] = useState(false);          // Toggle to allow editing
  const [success, setSuccess] = useState(false);
  const [pending, setPending] = useState<boolean>(false);

  const [copied, setCopied] = useTransientState<boolean>(false, 2000);
  const [error, setError] = useTransientState<string>("", 2000);

  const {updateUrlRecord} = useApi(); // API provider

  // Enable Updating
  const startUpdate = function() {
    setError("");
    setUpdate(true);
    setSuccess(false);
  };

  // Add using context function
  const saveRecord = function() {
    if (longUrl?.length < 6) {
      setError("Your URL is too short");
      return;
    }

    // Update longUrl in record & save
    updateUrlRecord({...props.record, longUrl})
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

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shortUrl);
    setCopied(true);
  };

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
      </Box>
      {copied && (<Typography color="success.main">Copied to clipboard!</Typography>)}

      {!update && <Button variant="outlined" color="primary" fullWidth sx={{mt: 2}} onClick={startUpdate}>
        Update
      </Button>}

      {/* {update && <Button variant="outlined" color="primary" fullWidth sx={{mt: 2}} onClick={saveRecord}>
        Save
      </Button>} */}

      {/* Display pending, error, sucess or Save Button */}
      {update && (
        <Box sx={{mt: 2}}>
          {pending ? (
            <Button variant="outlined" color="primary" fullWidth disabled><CircularProgress size={24} />
            </Button>)
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
