import pool from "../pool-config";

export async function getExitImages(exit_id: string) {
  return new Promise((resolve, reject) => {
    pool.query("SELECT * FROM images WHERE exit = $1", [exit_id], (err, results) => {
      if (err) {
        reject(err);
      }
      resolve(results.rows);
    });
  });
}