import {useState} from "react";
import {Typography, Button, Box, Link, IconButton} from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import {UrlRecord} from "../types/UrlRecord"; // TODO: Should use @types for this
import useTransientState from "../hooks/useTransientState";

interface UrlShowProps {
  record: UrlRecord;
  onEdit: () => void;  // User Clicks the Update Button
}

const UrlShow: React.FC<UrlShowProps> = function(props) {
  const record: UrlRecord = props.record;
  const [shortUrl] = useState(record.shortUrl);          // Displayed ShortUrl
  const [copied, setCopied] = useTransientState<boolean>(false, 2000);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shortUrl);
    setCopied(true);
  };

  return (
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

      <Button variant="outlined" color="primary" fullWidth sx={{mt: 2}} onClick={props.onEdit}>
        Edit
      </Button>
    </>
  );
};

export default UrlShow;
