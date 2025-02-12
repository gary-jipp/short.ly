import express, {Router} from "express";
import crypto from 'crypto';
import {Pool} from "pg";
import urlQueries from '../database/urlQueries';

// Get Express Router to use for endpoints
const router = express.Router();

export default function(pool: Pool): Router {
  const {getUrl} = urlQueries(pool);    // We only need this one

  // Redirect short url to target longUrl
  router.get("/:urlId", async (req, res) => {
    const urlId = req.params.urlId;

    try {
      const row = await getUrl(urlId);
      if (!row) { // No matching record found
        res.status(404).send("The page you requested was not found");
        return;
      }

      res.redirect(row.long_url);
    } catch (error) {
      console.log(error);
      res.json(error);
    }
  });

  return router;
};
