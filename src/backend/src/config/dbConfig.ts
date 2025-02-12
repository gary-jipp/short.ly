import {Pool, PoolConfig} from "pg";

type DBConfig = {
  user?: string;
  password?: string;
  host?: string;
  database?: string;
};

// Defaults if not in .env file
const dbConfig: DBConfig = {
  user: process.env.DB_USERNAME || "postgres",
  password: process.env.DB_PASSWORD || "password",
  host: process.env.DB_HOST || "localhost",
  database: process.env.DB_DATABASE || "shortly",
};

const pool: Pool = new Pool(dbConfig as PoolConfig);

export default pool;
