import express, {Router} from "express";
import crypto from 'crypto';
import {Pool} from "pg";
import urlQueries from '../database/urls';

const generateShortUrlId = function(size: number): string {
  // Generate a pretty unique shortUrl ID
  return crypto.randomBytes(3).toString('hex').toUpperCase().slice(0, size).toLowerCase();
};

// Get Express Router to use for endpoints
const router = express.Router();

export default function(pool: Pool): Router {  // inferred so not really neccesary
  const {getUrls, getUrl, addUrl, updateUrl, deleteUrl} = urlQueries(pool);

  router.get("/", async (_, res) => {
    try {
      const rows = await getUrls();
      res.json(rows);
    } catch (error) {
      console.log(error);
      res.json(error);
    }
  });

  const shortUrlIdLength = Number(process.env.URL_ID_LENGTH);
  console.log("URL_ID_LENGTH =", shortUrlIdLength);

  router.post("/", async (req, res) => {
    const longUrl = req.body.longUrl;

    let shortUrl: string;
    do {
      shortUrl = generateShortUrlId(shortUrlIdLength);
      console.log("shortUrl", shortUrl);
    } while (await getUrl(shortUrl));

    console.log("Add Record");
    try {
      const row = await addUrl(shortUrl, longUrl);
      res.json(row);
    } catch (error) {
      console.log(error);
      res.json(error);
    }
  });

  router.put("/:id", async (req, res) => {
    const id: number = Number(req.params.id);
    const longUrl = req.body.longUrl;

    try {
      const row = await updateUrl(id, longUrl);
      res.json(row);
    } catch (error) {
      console.log(error);
      res.json(error);
    }
  });

  router.delete("/:id", async (req, res) => {
    const id: number = Number(req.params.id);

    try {
      const row = await deleteUrl(id);
      res.json(row);
    } catch (error) {
      console.log(error);
      res.json(error);
    }
  });

  return router;
};
