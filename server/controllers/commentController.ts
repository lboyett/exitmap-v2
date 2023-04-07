import pool from "../pool-config";

export async function getExitComments(exit_id: string) {
  return new Promise((resolve, reject) => {
    pool.query(
      "SELECT comments.created_at AS comment_created_at, comments._id AS comment_id, * FROM comments JOIN users ON comments.author = users._id WHERE exit = $1 AND comments.is_deleted = false",
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

export async function getCommentsByUser(id: string) {
  return new Promise((resolve, reject) => {
    pool.query(
      "SELECT * FROM comments WHERE author = $1 AND is_deleted = false",
      [id],
      (err, results) => {
        if (err) {
          console.log(err);
          reject(err);
        }
        if (results && results.rows) resolve(results.rows);
        else reject("Error getting user comments");
      }
    );
  });
}

export async function deleteComment(id: string | number) {
  return new Promise((resolve, reject) => {
    pool.query(
      "UPDATE comments SET is_deleted = true WHERE _id = $1",
      [id],
      (err, results) => {
        if (err) {
          reject(err);
          console.log(err);
        }
        if (results && results.rows) resolve(results.rows);
        else reject("Error deleting comment");
      }
    );
  });
}
