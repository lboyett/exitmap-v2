import pool from "../pool-config";

export async function getExitComments(exit_id: string) {
  return new Promise((resolve, reject) => {
    pool.query(
      "SELECT comments.created_at AS comment_created_at, * FROM comments JOIN users ON comments.author = users._id WHERE exit = $1 ",
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

export async function addComment(
  comment: string,
  author_id: number,
  exit_id: number
) {
  return new Promise((resolve, reject) => {
    pool.query(
      "INSERT INTO comments (comment, author, exit) values ($1,$2,$3) RETURNING *;",
      [comment, author_id, exit_id],
      (err, results) => {
        if (err) reject(err);
        console.log(author_id);
        if (results && results.rows) resolve(results.rows[0]);
        else reject("Not successful");
      }
    );
  });
}
