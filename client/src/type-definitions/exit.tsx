type ExitType = "building" | "antenna" | "span" | "earth" | "other";
type ExperienceRequired = "beginner" | "intermediate" | "advanced" | "expert";
type Legality = "legal" | "semi" | "illegal";
type BustFactor = "na" | "low" | "moderate" | "high";
type ApproachDiff = "easy" | "medium" | "hard";

export default interface Exit {
  _id: number;
  name: string;
  description: string;
  exit_type: ExitType;
  experience_required: ExperienceRequired;
  legality: Legality;
  bust_factor: BustFactor;
  height_impact: number;
  height_landing: number;
  lat: number;
  lng: number;
  city: string;
  state: string;
  country_name: string;
  country_code: string;
  hiking_time: number;
  approach_diff: ApproachDiff;
  access_approach: string;
  landing_area: string;
  is_deleted: boolean;
}
