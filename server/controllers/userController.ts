import pool from "../pool-config";

// i don't think these should be input elements
interface UserData {
  first_name: string;
  last_name: string;
  username: string;
  email: string;
  password: string;
}

export async function addUser({
  first_name,
  last_name,
  username,
  email,
  password,
}: UserData) {
  return new Promise((resolve, reject) => {
    pool.query(
      `INSERT INTO users (
        first_name,
				last_name,
				username,
				email,
				password) values ($1,$2,$3,$4,$5)
        RETURNING *`,
      [first_name, last_name, username, email, password],
      (err, results) => {
        if (err) reject(err);
        resolve(results.rows[0]);
      }
    );
  });
}
