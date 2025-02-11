import {useState} from "react";
import {Typography, TextField, Button, Box, Link, IconButton, Alert} from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import {UrlRecord} from "../types/UrlRecord"; // TODO: Should use @types for this
import ShortUrl from "./ShortUrl";

interface UrlFormNewProps {
  onCancel: () => void; // Adding close function to the props
}

const UrlFormNew: React.FC<UrlFormNewProps> = function(props) {
  const [url, setUrl] = useState("");
  const [shortUrl] = useState("");
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

      <Button variant="contained" color="primary" fullWidth sx={{mt: 2}}>
        Shorten
      </Button>

      {shortUrl && <ShortUrl shortUrl={shortUrl} added={false} title="Short Url" />}

      {/* Close button to dismiss the modal */}
      <Button variant="outlined" color="primary" fullWidth onClick={props.onCancel} sx={{mt: 2}}>
        Close
      </Button>
    </Box>
  );
};

export default UrlFormNew;
