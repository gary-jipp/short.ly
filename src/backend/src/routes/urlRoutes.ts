import express, {Router, Request} from "express";
import crypto from 'crypto';
import {Pool} from "pg";
import urlQueries from '../database/urlQueries';
import validator from 'validator';

const generateShortUrlId = function(size: number): string {
  // Generate a pretty unique url ID
  const id = Math.floor(Date.now()).toString(36).slice(0, 6);
  return id;
};

const getBaseUrl = function(req: Request) {
  let host = req.get('host');

  // handle proxy rewrites
  // if (host?.startsWith("\\")) {
  //   host = host.replace(/^\\+/, '');  // Remove leading backslashes
  // }

  return `${req.protocol}://${host}/`;
};

// Get Express Router to use for endpoints
const router = express.Router();

export default function(pool: Pool): Router {  // Type is inferred so not really neccesary
  const {getUrls, getUrl, addUrl, updateUrl, deleteUrl} = urlQueries(pool);

  router.get("/", async (req, res) => {
    const baseUrl = getBaseUrl(req);

    try {
      const rows = await getUrls(baseUrl);
      res.json(rows);
    } catch (error) {
      console.log(error);
      res.json(error);
    }
  });

  const urlIdLength = Number(process.env.URL_ID_LENGTH || 6);
  console.log("URL_ID_LENGTH =", urlIdLength);

  /**
  * Create a new URL Record
  */
  router.post("/", async (req, res) => {
    const longUrl = req.body.longUrl;

    // Allow https, http & ftp (unlikely, but it can still happen!)
    if (!validator.isURL(longUrl, {require_protocol: true})) {
      console.log("Not Valid:", longUrl);
      res.status(400).json({error: "This URL is not valid"});
      return;
    }

    // make sure urlId is unique.  Could add some caching here
    let urlId: string;
    do {
      urlId = generateShortUrlId(urlIdLength);
      console.log("Generate ID:", urlId);
    } while (await getUrl(urlId));

    console.log("ID:", urlId);

    const baseUrl = getBaseUrl(req);
    try {
      const row = await addUrl(urlId, longUrl);
      res.json({...row, short_url: `${baseUrl}${urlId}`});
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
        res.status(400).json({error: error.message}); // TODO: use lookup for better errors
      }
    }
  });

  /**
   * Update the url_id of a record
   */
  router.put("/:id", async (req, res) => {
    const id: number = Number(req.params.id);
    const urlId = req.body.urlId;

    try {
      // Update and return number of rows updated
      const row = await updateUrl(id, urlId);
      if (!row) {
        res.status(404).json({error: "URL Record not found"});
        return;
      }

      res.status(204).send();
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
        res.status(400).json({error: error.message}); // TODO: use lookup for better errors
      }
    }
  });

  /**
  * Delete URL record
  */
  router.delete("/:id", async (req, res) => {
    const id: number = Number(req.params.id);

    try {
      const row = await deleteUrl(id);
      if (!row) {
        res.status(404).json({error: "URL Record not found"});
        return;
      }

      res.status(204).send();
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
        res.status(400).json({error: error.message}); // TODO: use lookup for better errors
      }
    }
  });

  return router;
};
