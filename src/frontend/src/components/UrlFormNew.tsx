import {useState} from "react";
import {Typography, TextField, Button, Box, CircularProgress} from "@mui/material";
import {useRecords} from "../providers/RecordProvider";
import ShortUrl from "./ShortUrl";
import {UrlRecord} from "../types/UrlRecord"; // TODO: Should use @types for this

interface UrlFormNewProps {
  onCancel: () => void; // Adding close function to the props
}

const UrlFormNew: React.FC<UrlFormNewProps> = function(props) {
  const [longUrl, setLongUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [success, setSuccess] = useState(false);

  const [pending, setPending] = useState(false);    // TODO: move to context
  const [error, setError] = useState("");           // TODO:  move to context

  const {addUrlRecord, } = useRecords(); // get delete function from Context state

  const testHandler = function() {
    // setPending(!pending);
    // setShortUrl("https://short.ly/123178hg");
    // setSuccess(!success);
    // setError("`Url is too short");
  };

  // Add using context function
  const addRecord = function() {
    if (!longUrl || longUrl.length < 5) {
      setError("Your URL is too short");
    }

    const record: UrlRecord = {longUrl, shortUrl};
    setPending(true);

    addUrlRecord(record)
      .then((res) => {
        setShortUrl(urlRecord.shortUrl);
        setSuccess(true);
        console.log("Added");
      })
      .catch(err => {
        console.log(err);
        setError(`Unable to Create: ${err.message}`);
        setTimeout(() => {   // Clear error message after 3 seconds
          setError("");
        }, 3000);
      })
      .finally(() => {
        setPending(false);
      });
  };


  return (
    <Box maxWidth="sm" sx={{mt: 4, p: 4, border: "1px solid #ddd", borderRadius: 2}}    >
      <Typography variant="subtitle1" gutterBottom>
        Enter the URL to shorten
      </Typography>

      <TextField fullWidth label="URL" value={longUrl} onChange={(e) => setLongUrl(e.target.value)} margin="normal" variant="outlined" />


      {/* Could use a ternary here but harder to read */}
      {!pending && <Button variant="contained" color="primary" disabled={success || !!error} fullWidth onClick={testHandler}>Shorten</Button>}

      {pending && <Button variant="contained" fullWidth disabled>
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
