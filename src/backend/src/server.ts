import dotenv from 'dotenv';
dotenv.config();

import express from "express";
import morgan from "morgan";
import pool from './config/dbConfig';
import urlRoutes from './routes/urlRoutes';

const app = express();  // Type is inferred
const port: number = Number(process.env.API_PORT || 8000);

app.use(express.json());
app.use(morgan('dev'));

// Use an Express Router for modularity
app.use('/api/urls', urlRoutes(pool));

// Health check
app.get("/api/health", (_, res) => {
  res.json({"status": "healthy"});
});

app.use((req, res) => {
  res.status(404).json({error: "Not Found"});
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});