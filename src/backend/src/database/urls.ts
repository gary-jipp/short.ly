import {Pool, QueryResult} from "pg";

interface Url {
  id: number;
  short_url: string;
  long_url: string;
  created?: string;
}

interface urlQueries {
  getUrls: () => Promise<Url[]>;
  getUrl: (shortUrl: string) => Promise<Url>;
  addUrl: (shortUrl: string, longUrl: string) => Promise<Url>;
  updateUrl: (id: number, longUrl: string) => Promise<number>;
  deleteUrl: (id: number) => Promise<number>;
}

export default function(pool: Pool): urlQueries {

  const getUrls = async (): Promise<Url[]> => {
    const sql = "SELECT id, short_url AS shortUrl, long_url AS longUrl, created FROM urls";

    const res: QueryResult<Url> = await pool.query(sql);
    return res.rows;
  };

  const getUrl = async (shortUrl: string): Promise<Url> => {
    const sql = "SELECT id, short_url AS shortUrl, long_url AS longUrl, created FROM urls WHERE short_url=$1";

    const res: QueryResult<Url> = await pool.query(sql, [shortUrl]);
    return res.rows[0];
  };

  const addUrl = async (shortUrl: string, longUrl: string): Promise<Url> => {
    const sql = 'insert into urls (short_url, long_url) values ($1,$2) returning *';

    const res: QueryResult<Url> = await pool.query(sql, [shortUrl, longUrl]);
    return res.rows[0];
  };

  const updateUrl = async (id: number, longUrl: string): Promise<number> => {
    const sql = 'update urls set long_url=$1 where id=$2';

    const res: QueryResult = await pool.query(sql, [longUrl, id]);
    return res.rowCount ?? 0; // return rows updated
  };

  const deleteUrl = async (id: number): Promise<number> => {
    const sql = 'delete from urls where id=$1';

    const res: QueryResult = await pool.query(sql, [id]);
    return res.rowCount ?? 0; // return rows updated
  };

  return {getUrls, getUrl, addUrl, updateUrl, deleteUrl};
};
