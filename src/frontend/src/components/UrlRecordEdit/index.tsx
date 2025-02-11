import {useState} from "react";
import {Container, Typography, TextField, Button, Box, Link, IconButton, Alert} from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import {UrlRecord} from "../UrlRecordList/RecordList.types"; // TODO: Should use @types for this

interface UrlRecordEditProps {
  record: UrlRecord | null;
  onClose: () => void; // Adding close function to the props
}

const UrlRecordEdit: React.FC<UrlRecordEditProps> = function(props) {
  const [url, setUrl] = useState(props.record?.longUrl || "");
  const [shortUrl] = useState(props.record?.shortUrl || "");
  const [copySuccess, setCopySuccess] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(shortUrl);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2000);
  };

  return (
    <Box maxWidth="sm" sx={{mt: 4, p: 4, border: "1px solid #ddd", borderRadius: 2}}    >
      <Typography variant="subtitle1" gutterBottom>
        Enter the URL to shorten
      </Typography>

      <TextField fullWidth label="URL" value={url} onChange={(e) => setUrl(e.target.value)} margin="normal" variant="outlined" />

      <Button variant="contained" color="primary" fullWidth disabled sx={{mt: 2}}>
        Shorten
      </Button>

      {shortUrl && (
        <Box sx={{mt: 3}}>
          <Alert severity="success">
            Success! Here's your short URL:
          </Alert>

          <Box sx={{display: "flex", alignItems: "center", mt: 1}}>
            <Link href={shortUrl} target="_blank" rel="noopener" underline="hover" sx={{fontWeight: "bold"}}            >
              {shortUrl}
            </Link>

            <IconButton color="primary" onClick={handleCopy} sx={{ml: 1}}>
              <ContentCopyIcon />
            </IconButton>

          </Box>

          {copySuccess && (<Typography color="success.main">Copied to clipboard!</Typography>)}
        </Box>
      )}

      {/* Close button to dismiss the modal */}
      <Button variant="outlined" color="primary" fullWidth onClick={props.onClose} sx={{mt: 2}}>
        Close
      </Button>
    </Box>
  );
};

export default UrlRecordEdit;
