import express, {Router, Request} from "express";
import crypto from 'crypto';
import {Pool} from "pg";
import urlQueries from '../database/urlQueries';

const generateShortUrlId = function(size: number): string {
  // Generate a pretty unique url ID
  return crypto.randomBytes(3).toString('hex').toUpperCase().slice(0, size).toLowerCase();
};

const getBaseUrl = function(req: Request) {
  return `${req.protocol}://${req.get('host')}/`;
};

// Check if URL is valid (returns 2xx)
const isUrlValid = async function(url: string) {
  try {
    const response = await fetch(url, {method: 'GET', mode: 'no-cors'});
    return response.ok;  // will be true if status code is 2xx
  } catch (error) {
    console.error('URL not valid:', url);
    return false;
  }
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

  const UrlIdLength = Number(process.env.URL_ID_LENGTH);
  console.log("URL_ID_LENGTH =", UrlIdLength || 6);

  router.post("/", async (req, res) => {
    const longUrl = req.body.longUrl;

    if (!await isUrlValid(longUrl)) {
      console.log("Not Valid:", longUrl);

      res.status(400).json({error: "This URL is not valid"});
      return;
    }

    // make sure urlId is unique
    let urlId: string;
    do {
      urlId = generateShortUrlId(UrlIdLength);
    } while (await getUrl(urlId));

    const baseUrl = getBaseUrl(req);
    try {
      const row = await addUrl(urlId, longUrl);
      res.json({...row, short_url: `${baseUrl}${urlId}`});
    } catch (error) {
      console.log(error);
      res.json(error);
    }
  });

  router.put("/:id", async (req, res) => {
    const id: number = Number(req.params.id);
    const longUrl = req.body.longUrl;

    if (!await isUrlValid(longUrl)) {
      res.status(400).json({error: "This URL is not valid"});
      return;
    }

    try {
      // Update and return number of rows updated
      const row = await updateUrl(id, longUrl);
      if (!row) {
        res.status(404).json({error: "URL Record not found"});
        return;
      }

      res.status(204).send();
    } catch (error) {
      console.log(error);
      res.json(error);
    }
  });

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
      console.log(error);
      res.json(error);
    }
  });

  return router;
};
