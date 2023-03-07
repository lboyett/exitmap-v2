import pool from "../pool-config";

export async function getExitImages(exit_id: string) {
  return new Promise((resolve, reject) => {
    pool.query(
      "SELECT * FROM images WHERE exit = $1",
      [exit_id],
      (err, results) => {
        if (err) {
          reject(err);
        }
        resolve(results.rows);
      }
    );
  });
}

export async function addImage(
  submitted_by: number,
  exit: number,
  url: string
) {
  return new Promise((resolve, reject) => {
    pool.query(
      "INSERT INTO images (submitted_by, exit, url, is_main) values ($1,$2,$3,true) RETURNING *",
      [submitted_by, exit, url],
      (err, results) => {
        if (err) reject(err);
        resolve(results);
      }
    );
  });
}

export async function getMainImageKey(exit_id: string) {
  return new Promise((resolve, reject) => {
    pool.query(
      "SELECT * FROM images WHERE exit = $1 AND is_main = true;",
      [exit_id],
      (err, results) => {
        if (err) {
          reject(err);
        }
        resolve(results.rows[0].url);
      }
    );
  });
}
