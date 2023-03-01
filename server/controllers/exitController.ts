import pool from "../pool-config";

interface ExitData {
  exit_name: HTMLInputElement;
  object_type: HTMLInputElement;
  sd: HTMLInputElement;
  ts: HTMLInputElement;
  ws: HTMLInputElement;
  experience_required: HTMLInputElement;
  legality: HTMLInputElement;
  bust_factor: HTMLInputElement;
  height_impact: HTMLInputElement;
  height_landing: HTMLInputElement;
  lat: HTMLInputElement;
  lng: HTMLInputElement;
  hiking_time_hrs: HTMLInputElement;
  hiking_time_mins: HTMLInputElement;
  approach_difficulty: HTMLInputElement;
  description: HTMLInputElement;
  access_approach: HTMLInputElement;
  landing_area: HTMLInputElement;
}

export async function getExit(id: string) {
  return new Promise((resolve) => {
    pool.query("SELECT * FROM exits WHERE _id = $1", [id], (err, results) => {
      console.log(id);
      if (err) {
        console.log(err);
      }
      resolve(results.rows);
    });
  });
}

export async function addExit({
  exit_name,
  object_type,
  sd,
  ts,
  ws,
  experience_required,
  legality,
  bust_factor,
  height_impact,
  height_landing,
  lat,
  lng,
  hiking_time_hrs,
  hiking_time_mins,
  approach_difficulty,
  description,
  access_approach,
  landing_area,
}: ExitData) {
  return new Promise((resolve, reject) => {
    pool.query(
      `INSERT INTO exits (name, description, type, heightImpact, heightLanding, lat, 
      long, city, state, country, image, legal);`,
      [
        exit_name,
        object_type,
        sd,
        ts,
        ws,
        experience_required,
        legality,
        bust_factor,
        height_impact,
        height_landing,
        lat,
        lng,
        hiking_time_hrs,
        hiking_time_mins,
        approach_difficulty,
        description,
        access_approach,
        landing_area,
      ],
      (err, results) => {
        if (err) reject(err);
        resolve(results.rows[0]);
      }
    );
  });
}
