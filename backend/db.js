import { createPool } from "mysql2/promise";
import dotenv from "dotenv";
dotenv.config();
 
console.log("ENV CHECK:",
  process.env.DB_HOST,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  process.env.DB_NAME
);
console.log(process.env.DB_HOST)
const pool = createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});
 
export default pool;