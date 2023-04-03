import pool from "../pool-config";
interface ExitData {
  name: string;
  object_type: string;
  exit_type: string;
  exp_req: string;
  legality: string;
  bust_factor: string;
  height_impact: number;
  height_landing: number;
  lat: number;
  lng: number;
  city: string;
  region: string;
  country_code: string;
  country_name: string;
  hiking_time_hrs: number | undefined;
  hiking_time_mins: number | undefined;
  approach_diff: number;
  description: string;
  access_approach: string;
  landing_area: string;
  submitted_by: number;
}

export async function getExit(id: string) {
  return new Promise((resolve, reject) => {
    pool.query("SELECT * FROM exits WHERE _id = $1", [id], (err, results) => {
      if (err) {
        reject(err);
      }
      resolve(results.rows);
    });
  });
}

export async function getReviewedExits() {
  return new Promise((resolve, reject) => {
    pool.query(
      "SELECT * FROM exits WHERE is_reviewed = true;",
      (err, results) => {
        if (err) {
          reject(err);
        }
        resolve(results.rows);
      }
    );
  });
}

export async function addExit({
  name,
  object_type,
  exit_type,
  exp_req,
  legality,
  bust_factor,
  height_impact,
  height_landing,
  lat,
  lng,
  city,
  region,
  country_code,
  country_name,
  hiking_time_hrs,
  hiking_time_mins,
  approach_diff,
  description,
  access_approach,
  landing_area,
  submitted_by,
}: ExitData) {
  return new Promise((resolve, reject) => {
    pool.query(
      `INSERT INTO exits 
        (name,
        object_type,
        exit_type,
        exp_req,
        legality,
        bust_factor,
        height_impact,
        height_landing,
        lat,
        lng,
        city,
        region,
        country_code,
        country_name,
        hiking_time_hrs,
        hiking_time_mins,
        approach_diff,
        description,
        access_approach,
        landing_area,
        submitted_by) 
        values ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20,$21)
        RETURNING *;`,
      [
        name,
        object_type,
        exit_type,
        exp_req,
        legality,
        bust_factor,
        height_impact,
        height_landing,
        lat,
        lng,
        city,
        region,
        country_code,
        country_name,
        hiking_time_hrs,
        hiking_time_mins,
        approach_diff,
        description,
        access_approach,
        landing_area,
        submitted_by,
      ],
      (err, results) => {
        if (err) {
          console.log(err);
          reject(err);
        }
        if (results.rows) {
          resolve(results.rows[0]);
        }
      }
    );
  });
}

export async function deleteExit(id: number) {
  return new Promise((resolve, reject) => {
    pool.query("DELETE FROM exits WHERE _id = $1", [id], (err, results) => {
      if (err) {
        console.log(err);
        reject(err);
      }
      if (results && results.rowCount) resolve(results.rowCount);
      else reject("Error deleting exit");
    });
  });
}

export async function getExitsByUser(id: string) {
  return new Promise((resolve, reject) => {
    pool.query(
      "SELECT * FROM exits WHERE submitted_by = $1 AND is_reviewed = true AND is_deleted = false",
      [id],
      (err, results) => {
        if (err) {
          console.log(err);
          reject(err);
        }
        if (results && results.rows) resolve(results.rows);
        else reject("Error getting user exits");
      }
    );
  });
}
