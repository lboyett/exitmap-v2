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
  url: string,
  key: string,
  is_main: boolean
) {
  return new Promise((resolve, reject) => {
    pool.query(
      "INSERT INTO images (submitted_by, exit, url, key, is_main) values ($1,$2,$3,$4,$5) RETURNING *",
      [submitted_by, exit, url, key, is_main],
      (err, results) => {
        if (err) reject(err);
        resolve(results);
      }
    );
  });
}

export async function getMainImageData(exit_id: string) {
  return new Promise((resolve, reject) => {
    pool.query(
      "SELECT * FROM images WHERE exit = $1 AND is_main = true;",
      [exit_id],
      (err, results) => {
        if (err) {
          reject(err);
        }
        if (results.rows[0]) {
          resolve(results.rows[0].key);
        } else {
          resolve("exit_fallback.jpg");
        }
      }
    );
  });
}
