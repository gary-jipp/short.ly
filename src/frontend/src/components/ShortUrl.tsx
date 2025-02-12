import {useState} from "react";
import {Typography, Box, Link, IconButton, Alert} from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

interface UrlRecordEditProps {
  title: string;
  shortUrl: string;
  mode: "error" | "info" | "success";
}

const ShortUrl: React.FC<UrlRecordEditProps> = function(props) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(props.shortUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (

    <Box sx={{mt: 3}}>

      <Alert severity={props.mode}>
        {props.title}
      </Alert>

      <Box sx={{display: "flex", alignItems: "center", mt: 1}}>

        <Link href={props.shortUrl} target="_blank" rel="noopener" underline="hover" sx={{fontWeight: "bold"}}            >
          {props.shortUrl}
        </Link>

        {props.mode != "error" &&
          <IconButton color="primary" onClick={handleCopy} sx={{ml: 1}}>
            <ContentCopyIcon />
          </IconButton>
        }

      </Box>

      {copied && (<Typography color="success.main">Copied to clipboard!</Typography>)}
    </Box>
  );
};

export default ShortUrl;
