import {useState} from "react";
import {Container, Typography, TextField, Button, Box, Link, IconButton, Alert} from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

const UrlEditor = function() {

  const [url, setUrl] = useState("https://example.com/foo/bar/biz");
  const [shortUrl, setShortUrl] = useState("https://short.ly/abc123");
  const [copySuccess, setCopySuccess] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(shortUrl);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2000);
  };

  return (
    <Container maxWidth="sm" sx={{mt: 4, p: 4, border: "1px solid #ddd", borderRadius: 2, boxShadow: 1}}>
      <Typography variant="h5" component="h1" gutterBottom>
        URL Shortener
      </Typography>

      <Typography variant="subtitle1" gutterBottom>
        Enter the URL to shorten
      </Typography>

      <TextField
        fullWidth
        label="URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        margin="normal"
        variant="outlined"
        disabled
      />

      <Button variant="contained" color="primary" fullWidth disabled sx={{mt: 2}}>
        Shorten
      </Button>

      {shortUrl && (
        <Box sx={{mt: 3}}>
          <Alert severity="success">Success! Here's your short URL:</Alert>
          <Box sx={{display: "flex", alignItems: "center", mt: 1}}>
            <Link href={shortUrl} target="_blank" rel="noopener" underline="hover" sx={{fontWeight: "bold"}}>
              {shortUrl}
            </Link>
            <IconButton color="primary" onClick={handleCopy} sx={{ml: 1}}>
              <ContentCopyIcon />
            </IconButton>
          </Box>
          {copySuccess && <Typography color="success.main">Copied to clipboard!</Typography>}
        </Box>
      )}
    </Container>
  );
};

export default UrlEditor;