import {useState} from "react";
import {Typography, TextField, Button, Box, CircularProgress} from "@mui/material";
import {useApi} from "../providers/ApiProvider";
import NewShortUrl from "./NewShortUrl";
import {UrlRecord} from "../types/UrlRecord"; // TODO: Should use @types for this
import useTransientState from "../hooks/useTransientState";

interface UrlFormNewProps {
  onCancel: () => void; // Adding close function to the props
}

const UrlFormNew: React.FC<UrlFormNewProps> = function(props) {
  const [longUrl, setLongUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [success, setSuccess] = useState(false);

  const [pending, setPending] = useState<boolean>(false);
  const [error, setError] = useTransientState<string>("", 2000);

  const {addUrlRecord} = useApi(); // API provider

  // Add using context function
  const addRecord = function() {
    if (longUrl?.length < 6) {
      setError("Your URL is too short");
      return;
    }

    // Add record & set shortUrl to enable render
    const record: UrlRecord = {longUrl, shortUrl};
    addUrlRecord(record)
      .then(res => {
        setShortUrl(res.shortUrl ? res.shortUrl : "");
        setSuccess(true);
      })
      .catch(err => {
        const msg = err.response?.data?.error || err.message;
        setError(`Unable to save this URL - ${msg}`);
      })
      .finally(() => {
        setPending(false);
      });;
  };

  return (
    <Box maxWidth="sm" sx={{mt: 4, p: 4, border: "1px solid #ddd", borderRadius: 2}}    >
      <Typography variant="subtitle1" gutterBottom>
        Enter the URL to shorten
      </Typography>

      <TextField fullWidth label="URL" value={longUrl} onChange={(e) => setLongUrl(e.target.value)} margin="normal" variant="outlined" />


      {/* Could use a ternary here but harder to read */}
      {!pending && <Button variant="contained" color="primary" disabled={success || !!error} fullWidth onClick={addRecord}>Shorten</Button>}

      {pending && <Button variant="contained" fullWidth disabled>
        <CircularProgress size={20} sx={{position: "absolute"}} />
        <span style={{visibility: "hidden"}}>Placeholder</span>
      </Button>
      }

      {/* Show error if something went wrong */}
      {error && <NewShortUrl shortUrl={shortUrl} mode={"error"} title={`Error! ${error}`} />}

      {success && <NewShortUrl shortUrl={shortUrl} mode={"success"} title="Success!  Here's your new Short URL:" />}

      {/* Close button to dismiss the modal */}
      <Button variant="outlined" color="primary" fullWidth onClick={props.onCancel} sx={{mt: 2}}>
        Close
      </Button>

    </Box>
  );
};

export default UrlFormNew;
