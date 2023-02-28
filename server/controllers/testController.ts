import pool from "../pool-config";

export async function getExits() {
  return new Promise((resolve, reject) => {
    pool.query("SELECT * FROM exits", (err, results) => {
      if (err) {
        reject(err);
      }
      resolve(results.rows);
    });
  });
}
