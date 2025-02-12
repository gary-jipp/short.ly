import express, {Router, Request} from "express";
import crypto from 'crypto';
import {Pool} from "pg";
import urlQueries from '../database/urlQueries';

const generateShortUrlId = function(size: number): string {
  // Generate a pretty unique url ID
  return crypto.randomBytes(3).toString('hex').toUpperCase().slice(0, size).toLowerCase();
};

const getBaseUrl = function(req: Request) {
  return `${req.protocol}://${req.get('host')}`;
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
  console.log("URL_ID_LENGTH =", UrlIdLength);

  router.post("/", async (req, res) => {
    const longUrl = req.body.longUrl;

    let UrlId: string;
    do {
      UrlId = generateShortUrlId(UrlIdLength);
      console.log("urlId", UrlId);
    } while (await getUrl(UrlId));

    console.log("Add Record");
    try {
      const row = await addUrl(UrlId, longUrl);
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
