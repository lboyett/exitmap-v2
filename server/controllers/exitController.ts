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
  return new Promise((resolve, reject) => {
    pool.query("SELECT * FROM exits WHERE _id = $1", [id], (err, results) => {
      if (err) {
        reject(err);
      }
      resolve(results.rows);
    });
  });
}

export async function addExit(exit_data: ExitData) {
  console.log(exit_data);
}
