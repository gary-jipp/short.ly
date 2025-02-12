import {Pool, QueryResult} from "pg";

interface UrlBaseRecord {
  id: number;
  long_url: string;
  usage_count: number;
  created?: string;
}
interface UrlIdRecord extends UrlBaseRecord {
  urli_d: string;
  short_url?: string;
}
interface ShortUrlRecord extends UrlBaseRecord {
  short_url: string;
  url_id?: string;
}
// Type with url_id or short_url mandatory
type UrlRecord = ShortUrlRecord | UrlIdRecord;

interface urlQueries {
  getUrls: (baseUrl: string) => Promise<UrlRecord[]>;
  getUrl: (urlId: string) => Promise<UrlRecord>;
  addUrl: (urlId: string, longUrl: string) => Promise<UrlRecord>;
  updateUrl: (id: number, longUrl: string) => Promise<number>;
  deleteUrl: (id: number) => Promise<number>;
}

export default function(pool: Pool): urlQueries {

  // Fetch All URL records with full short URL's
  const getUrls = async (baseUrl: string): Promise<UrlRecord[]> => {

    // Prepend baseUrl to url_id to get a complete URL
    const sql = "SELECT id, CONCAT($1::text, url_id) AS short_url, long_url, usage_count, created FROM urls order by created desc";

    const res: QueryResult<UrlRecord> = await pool.query(sql, [baseUrl]);
    return res.rows;
  };

  // Fetch a single URL record by its url_id string
  const getUrl = async (shortUrl: string): Promise<UrlRecord> => {
    const sql = "SELECT id, url_id, long_url, created FROM urls WHERE url_id=$1";

    const res: QueryResult<UrlRecord> = await pool.query(sql, [shortUrl]);
    return res.rows[0];
  };

  // Add a new URL record
  const addUrl = async (shortUrl: string, longUrl: string): Promise<UrlRecord> => {
    const sql = 'insert into urls (url_id, long_url) values ($1,$2) returning *';

    const res: QueryResult<UrlRecord> = await pool.query(sql, [shortUrl, longUrl]);
    return res.rows[0];
  };

  // Update an existing URL record's long_url by id
  const updateUrl = async (id: number, longUrl: string): Promise<number> => {
    const sql = 'update urls set long_url=$1 where id=$2';

    const res: QueryResult = await pool.query(sql, [longUrl, id]);
    return res.rowCount ?? 0; // return rows updated
  };

  // Delete a URL record by id
  const deleteUrl = async (id: number): Promise<number> => {
    const sql = 'delete from urls where id=$1';

    const res: QueryResult = await pool.query(sql, [id]);
    return res.rowCount ?? 0; // return rows updated
  };

  return {getUrls, getUrl, addUrl, updateUrl, deleteUrl};
};
