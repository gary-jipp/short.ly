import {useState} from "react";
import {Typography, TextField, Button, Box, Link, IconButton, Alert} from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import {UrlRecord} from "../types/UrlRecord"; // TODO: Should use @types for this
import ShortUrl from "./ShortUrl";

interface UrlRecordShowProps {
  record: UrlRecord | null;
  onClose: () => void; // Adding close function to the props
}

const UrlFormShow: React.FC<UrlRecordShowProps> = function(props) {
  const [url, setUrl] = useState(props.record?.longUrl || "");
  const [shortUrl] = useState(props.record?.shortUrl || "");
  const [copied, setCopied] = useState(false);
  const [update, setUpdate] = useState(false);

  const save = function() {

  };

  const handleCopy = () => {
    navigator.clipboard.writeText(shortUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Box maxWidth="sm" sx={{mt: 4, p: 4, border: "1px solid #ddd", borderRadius: 2}}    >
      <Typography variant="subtitle1" gutterBottom>
        {update ? "Enter new URL" : "This is your URL"}
      </Typography>

      <TextField fullWidth label="URL" value={url} onChange={(e) => setUrl(e.target.value)} margin="normal" variant="outlined" disabled={!update} />

      <Box sx={{display: "flex", alignItems: "center", mt: 1}}>
        <Link href={props.record?.longUrl} target="_blank" rel="noopener" underline="hover" sx={{fontWeight: "bold"}}            >
          {shortUrl}
        </Link>

        <IconButton color="primary" onClick={handleCopy} sx={{ml: 1}}>
          <ContentCopyIcon />
        </IconButton>
        {copied && (<Typography color="success.main">Copied to clipboard!</Typography>)}
      </Box>

      {!update && <Button variant="outlined" color="primary" fullWidth sx={{mt: 2}} onClick={() => setUpdate(true)}>
        Update
      </Button>}

      {update && <Button variant="outlined" color="primary" fullWidth sx={{mt: 2}} onClick={save}>
        Save
      </Button>}

      <Button variant="contained" color="primary" fullWidth sx={{mt: 2}} onClick={props.onClose}>
        Close
      </Button>
    </Box>
  );
};

export default UrlFormShow;
