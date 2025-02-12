import { Pool, PoolConfig } from "pg";

type DBConfig = {
  user?: string;
  password?: string;
  host?: string;
  database?: string;
};

const dbConfig: DBConfig = {
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
};

const pool: Pool = new Pool(dbConfig as PoolConfig);

export default pool;
