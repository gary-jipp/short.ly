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
  const record: UrlRecord = props.record;

  const [urlId, setUrlId] = useState(record?.urlId || "");    // Url ID  field
  const [shortUrl] = useState(record?.shortUrl || "");          // Displayed ShortUrl
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
    // crude length check
    if (urlId.length < 6 || urlId.length > 20) {
      setError("Your URL Code must be between 6-20 chars");
      setUrlId(record.urlId);
      return;
    }

    // Replace urlId & shorturl in record & save
    const shortUrl = record.shortUrl?.replace(/\/[^/]+$/, `/${urlId}`);
    console.log({...props.record, urlId});

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

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shortUrl);
    setCopied(true);
  };

  return (
    <Box maxWidth="sm" sx={{mt: 4, p: 4, border: "1px solid #ddd", borderRadius: 2}}    >

      <TextField fullWidth label="URL" value={props.record?.longUrl} margin="normal" variant="outlined" disabled />

      {!update &&
        <>
          <Typography variant="subtitle1" color="info" gutterBottom sx={{fontWeight: "bold"}}>
            This is your Short URL
          </Typography>

          <Box sx={{display: "flex", alignItems: "center", mt: 1}}>
            <Link href={props.record?.longUrl} target="_blank" rel="noopener" underline="hover" sx={{fontWeight: "Semi-Bold"}}            >
              {shortUrl}
            </Link>

            <IconButton color="primary" onClick={copyToClipboard} sx={{ml: 1}}>
              <ContentCopyIcon />
            </IconButton>
          </Box>
          {copied && (<Typography color="success.main">Copied to clipboard!</Typography>)}

          <Button variant="outlined" color="primary" fullWidth sx={{mt: 2}} onClick={startUpdate}>
            Update
          </Button>
        </>
      }

      {update && (
        <>
          <Typography variant="subtitle1" color="info" gutterBottom sx={{fontWeight: "bold"}}>
            Edit your URL Code (max 20 characters)
          </Typography>

          {/* Text Field for the URL Code */}
          <TextField fullWidth label="URL Code" value={urlId}
            onChange={(e) => setUrlId(e.target.value.toLowerCase().replace(/[^a-z0-9]/g, ""))} margin="normal" variant="outlined" disabled={!update} />

          <Box sx={{display: "flex", alignItems: "center", mt: 1}}>


            {/* Display pending, error, sucess or Save Button */}
            {pending ? (
              <Button variant="outlined" color="primary" fullWidth disabled><CircularProgress size={24} />
              </Button>)
              : error ? (<Alert severity="error">{error}</Alert>)
                : success ? (<Alert severity="success">Saved successfully!</Alert>)
                  : (<Button variant="outlined" color="primary" fullWidth onClick={saveRecord}>Save</Button>)}

          </Box>

          {!success && <Button variant="outlined" color="primary" fullWidth sx={{mt: 2}} onClick={() => setUpdate(false)}>
            Cancel
          </Button>
          }
        </>
      )}

      <Button variant="contained" color="primary" fullWidth sx={{mt: 2}} onClick={props.onClose}>
        Close
      </Button>
    </Box>
  );
};

export default UrlFormShow;
