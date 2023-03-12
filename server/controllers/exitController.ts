import pool from "../pool-config";

// i don't think these should be input elements
interface ExitData {
  name: HTMLInputElement;
  object_type: HTMLInputElement;
  exit_type: HTMLInputElement;
  exp_req: HTMLInputElement;
  legality: HTMLInputElement;
  bust_factor: HTMLInputElement;
  height_impact: HTMLInputElement;
  height_landing: HTMLInputElement;
  lat: HTMLInputElement;
  lng: HTMLInputElement;
  city: HTMLInputElement;
  region: HTMLInputElement;
  country_code: HTMLInputElement;
  country_name: HTMLInputElement;
  hiking_time_hrs: HTMLInputElement;
  hiking_time_mins: HTMLInputElement;
  approach_diff: HTMLInputElement;
  description: HTMLInputElement;
  access_approach: HTMLInputElement;
  landing_area: HTMLInputElement;
  submitted_by: HTMLInputElement;
} // FixThis

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
          console.log(results.rows);
          resolve(results.rows[0]);
        }
      }
    );
  });
}
