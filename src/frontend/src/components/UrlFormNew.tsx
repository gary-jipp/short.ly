import {useState} from "react";
import {Typography, TextField, Button, Box, CircularProgress} from "@mui/material";
import {useApi} from "../providers/ApiProvider";
import ShortUrl from "./ShortUrl";
import {UrlRecord} from "../types/UrlRecord"; // TODO: Should use @types for this

interface UrlFormNewProps {
  onCancel: () => void; // Adding close function to the props
}

const UrlFormNew: React.FC<UrlFormNewProps> = function(props) {
  const [longUrl, setLongUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [success, setSuccess] = useState(false);
  const [localError, setLocalError] = useState("");           // Locally generated errors
  const {addUrlRecord, apiPending, apiError} = useApi(); // API provider

  const testHandler = function() {
    // setPending(!pending);
    // setShortUrl("https://short.ly/123178hg");
    // setSuccess(!success);
    // setError("`Url is too short");
  };

  // Add using context function
  const addRecord = function() {
    if (longUrl?.length < 6) {
      setLocalError("Your URL is too short");
      return setTimeout(() => {   // Clear error message after 3 seconds
        setLocalError("");
      }, 2000);
    }

    const record: UrlRecord = {longUrl, shortUrl};

    addUrlRecord(record)
      .then(res => {
        setShortUrl(res.shortUrl);
        setSuccess(true);
      })
      .catch(err => {
        console.log(err);
        setTimeout(() => {   // Clear error message after 3 seconds
          setLocalError("");
        }, 3000);
      });
  };

  // API and local errors are treated the same
  const error = localError || apiError;

  return (
    <Box maxWidth="sm" sx={{mt: 4, p: 4, border: "1px solid #ddd", borderRadius: 2}}    >
      <Typography variant="subtitle1" gutterBottom>
        Enter the URL to shorten
      </Typography>

      <TextField fullWidth label="URL" value={longUrl} onChange={(e) => setLongUrl(e.target.value)} margin="normal" variant="outlined" />


      {/* Could use a ternary here but harder to read */}
      {!apiPending && <Button variant="contained" color="primary" disabled={success || !!error} fullWidth onClick={addRecord}>Shorten</Button>}

      {apiPending && <Button variant="contained" fullWidth disabled>
        <CircularProgress size={20} sx={{position: "absolute"}} />
        <span style={{visibility: "hidden"}}>Placeholder</span>
      </Button>
      }

      {/* Show error if something went wrong */}
      {error && <ShortUrl shortUrl={shortUrl} mode={"error"} title={`Error! ${error}`} />}

      {success && <ShortUrl shortUrl={shortUrl} mode={"success"} title="Sucess!  Here's your new Short URL:" />}

      {/* Close button to dismiss the modal */}
      <Button variant="outlined" color="primary" fullWidth onClick={props.onCancel} sx={{mt: 2}}>
        Close
      </Button>

    </Box>
  );
};

export default UrlFormNew;
