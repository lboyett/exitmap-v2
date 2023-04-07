import axios from "axios";
interface FormInputs extends HTMLFormControlsCollection {
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
  city: HTMLInputElement;
  region: HTMLInputElement;
  hiking_time_hrs: HTMLInputElement;
  hiking_time_mins: HTMLInputElement;
  approach_difficulty: HTMLInputElement;
  description: HTMLInputElement;
  access_approach: HTMLInputElement;
  landing_area: HTMLInputElement;
}

export function validateCheckboxes(checkboxes: boolean[]) {
  let result = false;
  checkboxes.forEach((box) => {
    if (box) {
      result = true;
    }
  });
  return result;
}
export function validateLocation(code: string | null) {
  if (!code) return false;
  if (code && code.length > 2) return false;
  return true;
}
export function getCountryName(
  code: string | null,
  countriesJson: { [key: string]: string }
) {
  if (!code) return null;
  if (code in countriesJson) {
    return countriesJson[code];
  } else {
    return null;
  }
}
export function compileExitData(
  e: React.FormEvent<HTMLFormElement>,
  country_code: string | null,
  country_name: string | null,
  units: string,
  user_id: number
) {
  const target = e.target as HTMLFormElement;
  const inputs = target.elements as FormInputs;
  const exit_data = {
    name: inputs.exit_name.value,
    object_type: inputs.object_type.value.toLowerCase(),
    exit_type: `${+inputs.sd.checked}${+inputs.ts.checked}${+inputs.ws
      .checked}`,
    exp_req: inputs.experience_required.value.toLowerCase(),
    legality: inputs.legality.value.toLowerCase(),
    bust_factor: inputs.bust_factor.value,
    height_impact:
      units == "m"
        ? Math.floor(+inputs.height_impact.value * 3.28)
        : Math.floor(+inputs.height_impact.value),
    height_landing:
      units == "m"
        ? Math.floor(+inputs.height_landing.value * 3.28)
        : Math.floor(+inputs.height_landing.value),
    lat: inputs.lat.value,
    lng: inputs.lng.value,
    city: lowercaseInput(inputs.city.value),
    region: lowercaseInput(inputs.region.value),
    country_code: country_code,
    country_name: country_name,
    hiking_time_hrs: inputs.hiking_time_hrs.value
      ? inputs.hiking_time_hrs.value
      : 0,
    hiking_time_mins: inputs.hiking_time_mins.value
      ? inputs.hiking_time_mins.value
      : 0,
    approach_diff: +inputs.approach_difficulty.value,
    description: inputs.description.value,
    access_approach: inputs.access_approach.value,
    landing_area: inputs.landing_area.value,
    submitted_by: user_id,
  };
  return exit_data;
}
export async function submitExitDataWithoutImage(exit_data: any) {
  const url = "http://localhost:8000/exits";
  try {
    const { data } = await axios.post(url, exit_data);
    return data._id;
  } catch (err) {
    return err;
  }
}
export async function submitExitDataWithImage(
  exit_data: any, //FixThis
  formData: FormData,
  user_id: number
) {
  try {
    const exit_id = await postExit(exit_data);
    await postImage(formData, exit_id, user_id);
  } catch (err) {
    throw err;
  }
}

async function postExit(exit_data: any) {
  const exitUrl = "http://localhost:8000/exits";
  try {
    const { data } = await axios.post(exitUrl, exit_data);
    return data._id;
  } catch (err) {
    throw err; //FixThis
  }
}

export async function getSignedUrl() {
  const url = "http://localhost:8000/signed-url";
  try {
    const { data } = await axios.get(url);
    return data;
  } catch (err) {
    throw err;
  }
}

export async function postImage(
  formData: FormData,
  exit_id: any,
  user_id: number
) {
  const exitUrl = "http://localhost:8000/exits";
  const imageUrl = "http://localhost:8000/images";
  try {
    const { signedUrl, key } = await getSignedUrl();
    const file = formData.get("image") as File;
    await axios.put(signedUrl, file, {
      headers: {
        "Content-Type": file.type,
      },
    });
    await axios.post(imageUrl, {
      submitted_by: user_id,
      exit: exit_id,
      url: `https://lboyett-exitmap-v2.s3.eu-central-1.amazonaws.com/${key}`,
      key: key,
      is_main: true,
    });
  } catch (err) {
    console.log(err);
    try {
      const res = await axios.delete(`${exitUrl}/${exit_id}`);
      throw err;
    } catch (err) {
      throw err; //FixThis
    }
  }
}

export function lowercaseInput(input: string) {
  if (input.length > 1) {
    return `${input[0].toUpperCase()}${input.slice(1).toLowerCase()}`;
  } else return input.toUpperCase();
}
