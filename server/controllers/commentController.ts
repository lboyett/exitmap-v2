import pool from "../pool-config";

export async function getExitComments(exit_id: string) {
  return new Promise((resolve, reject) => {
    pool.query("SELECT * FROM comments JOIN users ON comments.author = users._id WHERE exit = $1 ", [exit_id], (err, results) => {
      if (err) {
        reject(err);
      }
      console.log(results.rows)
      resolve(results.rows);
    });
  });
}