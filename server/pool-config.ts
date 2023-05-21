import dotenv from "dotenv";
dotenv.config();
import * as pg from "pg";
const Pool = pg.Pool;

// const pool = new Pool({
//   user: "postgres",
//   host: "localhost",
//   database: "exitmap_v2",
//   password: process.env.POSTGRES_PW,
//   port: 5432,
// });

const pool = new Pool({
  user: process.env.ELEPHANT_DATABASE,
  host: "drona.db.elephantsql.com",
  database: process.env.ELEPHANT_DATABASE,
  password: process.env.ELEPHANT_PASSWORD,
  port: 5432,
});

export default pool;
