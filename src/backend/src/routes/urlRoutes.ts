import express, {Router} from "express";
import crypto from 'crypto';
import {Pool} from "pg";
import urlQueries from '../database/urls';

const router = express.Router();

const generateShortUrl = function(size: number): string {
  return crypto.randomBytes(3).toString('hex').toUpperCase().slice(0, size); // pretty unique
};

export default function(pool: Pool): Router {  // inferred so not really neccesary
  const {getUrls, getUrl, addUrl, updateUrl, deleteUrl} = urlQueries(pool);

  router.post("/", async (req, res) => {
    const longUrl = req.body.longUrl;     //
    const shortUrl = generateShortUrl(6);

    try {
      const row = await addUrl(shortUrl, longUrl);
      res.json(row);
    } catch (error) {
      console.log(error);
      res.json(error);
    }
  });

  router.get("/", async (_, res) => {
    try {
      const rows = await getUrls();
      res.json(rows);
    } catch (error) {
      console.log(error);
      res.json(error);
    }
  });

  return router;
};
