type ObjectType = "building" | "antenna" | "span" | "earth" | "other";
type ExperienceRequired = "beginner" | "inetermediate" | "advanced" | "expert";
type Legality = "legal" | "semi" | "illegal";
type BustFactor = "0" | "0.5" | "1";
type ApproachDiff = "0" | "0.5" | "1";

export default interface Exit {
  _id: number;
  name: string;
  object_type: ObjectType;
  exit_type: boolean[];
  exp_req: ExperienceRequired;
  legality: Legality;
  bust_factor: BustFactor;
  height_impact: number;
  height_landing: number;
  lat: number;
  lng: number;
  city: string;
  region: string;
  country_code: string;
  country_name: string;
  hiking_time_hrs: number;
  hiking_time_mins: number;
  approach_diff: ApproachDiff;
  description: string;
  access_approach: string;
  landing_area: string;
  submitted_by: number;
  is_reviewed: boolean;
  is_deleted: boolean;
  created_at: string;
}
