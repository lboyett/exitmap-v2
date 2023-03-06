import Exit from "../type-definitions/exit";
import Country from "../type-definitions/country-type";

interface MyObj {
  [key: string]: Country;
}

export function getCountriesFromExits(data: Exit[]) {
  let obj = {} as MyObj;
  data.forEach(({ country_code, country_name, region }) => {
    obj[country_code] = {
      num_jumps: (obj[country_code] ? obj[country_code].num_jumps : 0) + 1,
      country: country_name,
      code: country_code,
      regions:
        obj[country_code] !== undefined
          ? [...obj[country_code].regions, region]
          : [region],
    };
  });
  const arr = Object.entries(obj);
  arr.forEach((obj) => (obj[1].regions = [...new Set(obj[1].regions)]));
  obj = Object.fromEntries(arr);
  const countries = Object.entries(obj).map((obj) => obj[1]);
  return countries;
}
