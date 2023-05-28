import pool from "../pool-config";
import crypto from "crypto";

export interface UserData extends Object {
  first_name: string;
  last_name: string;
  username: string;
  email: string;
  hashed_password?: Buffer;
  salt?: Buffer;
  is_approved: boolean;
  is_admin: boolean;
  is_deleted?: boolean;
  password: string;
  _id?: string;
}

export async function addUser({
  first_name,
  last_name,
  username,
  email,
  password,
}: UserData) {
  return new Promise((resolve, reject) => {
    let salt = crypto.randomBytes(16);
    pool.query(
      `INSERT INTO users (
        first_name,
				last_name,
				username,
				email,
				hashed_password,
        salt) values ($1,$2,$3,$4,$5, $6)
        RETURNING *`,
      [
        first_name,
        last_name,
        username,
        email,
        crypto.pbkdf2Sync(password, salt, 310000, 32, "sha256"),
        salt,
      ],
      (err, results) => {
        if (err) {
          console.log(
            "!!! There was an error attempting to add a new user !!!"
          );
          reject(err);
        }
        resolve(results);
      }
    );
  });
}

export async function getUnreviewedUsers() {
  return new Promise((resolve, reject) => {
    pool.query(
      "SELECT * FROM users WHERE is_approved = false",
      (err, results) => {
        if (err) reject({ status: 500, message: "Internal server error" });
        else resolve(results.rows);
      }
    );
  });
}

export async function approveUser(id: string) {
  return new Promise((resolve, reject) => {
    pool.query(
      "UPDATE users SET is_approved = true WHERE _id = $1;",
      [id],
      (err, results) => {
        if (err) {
          reject(err);
        }
        if (results && results.rows) resolve(results.rows);
      }
    );
  });
}

export async function populateTestUsers() {
  let salt = crypto.randomBytes(16);
  pool.query(
    "INSERT INTO users (username, first_name, last_name, email, hashed_password, salt, is_approved, is_admin, is_deleted) values ($1, $2, $3, $4, $5, $6, $7, $8, $9) ON CONFLICT DO NOTHING ",
    [
      "j",
      "j",
      "j",
      "j@j.j",
      crypto.pbkdf2Sync("j", salt, 310000, 32, "sha256"),
      salt,
      true,
      true,
      false,
    ]
  );
  pool.query(
    "INSERT INTO users (username, first_name, last_name, email, hashed_password, salt, is_approved, is_admin, is_deleted) values ($1, $2, $3, $4, $5, $6, $7, $8, $9) ON CONFLICT DO NOTHING ",
    [
      "l",
      "l",
      "l",
      "l@l.l",
      crypto.pbkdf2Sync("l", salt, 310000, 32, "sha256"),
      salt,
      true,
      true,
      false,
    ]
  );
  pool.query(
    "INSERT INTO users (username, first_name, last_name, email, hashed_password, salt, is_approved, is_admin, is_deleted) values ($1, $2, $3, $4, $5, $6, $7, $8, $9) ON CONFLICT DO NOTHING ",
    [
      "c",
      "c",
      "c",
      "c@c.c",
      crypto.pbkdf2Sync("c", salt, 310000, 32, "sha256"),
      salt,
      true,
      true,
      false,
    ]
  );
}

export async function getUserByEmail(email: string) {
  return new Promise((resolve, reject) => {
    pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email],
      (err, results) => {
        if (err) reject({ status: 500, message: "Internal server error" });
        else if (!results.rows[0])
          reject({ status: 404, message: "Email not found" });
        else resolve(results.rows[0]);
      }
    );
  });
}

export async function getUserById(id: string) {
  return new Promise((resolve, reject) => {
    pool.query("SELECT * FROM users WHERE _id = $1", [id], (err, results) => {
      if (err) reject({ status: 500, message: "Internal server error" });
      else if (!results.rows[0])
        reject({ status: 401, message: "User not found" });
      else resolve(results.rows[0]);
    });
  });
}

export async function putUserAvatar(user_id: string, key: string) {
  return new Promise((resolve, reject) => {
    pool.query(
      "UPDATE users SET avatar_key = $1 WHERE _id = $2 RETURNING *",
      [key, user_id],
      (err, results) => {
        if (err) reject({ status: 500, message: "Internal server error" });
        else if (!results.rows[0])
          reject({ status: 500, message: "Internal server error" });
        else resolve(results.rows[0]);
      }
    );
  });
}

export async function resetUserPassword(user_id: string, new_password: string) {
  let salt = crypto.randomBytes(16);
  let hashed_password = crypto.pbkdf2Sync(
    new_password,
    salt,
    310000,
    32,
    "sha256"
  );
  return new Promise((resolve, reject) => {
    pool.query(
      "UPDATE users SET hashed_password = $1, salt = $2 WHERE _id = $3;",
      [hashed_password, salt, user_id],
      (err, results) => {
        if (err) {
          reject(err);
        }
        if (results && results.rows) {
          console.log(user_id);
          resolve(results.rows);
          console.log(results.rows);
        }
      }
    );
  });
}
