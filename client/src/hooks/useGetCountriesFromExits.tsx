import Exit from "../type-definitions/exit";
import { useEffect, useState } from "react";

interface Country {
  code: string;
  country: string;
  num_jumps: number;
  regions: string[];
}

interface MyObj {
  [key: string]: Country;
}

export function useGetCountriesFromExit(data: Exit[] | undefined) {
  if (data == undefined) return;
  const [countries, setCountries] = useState<Country[]>();
  useEffect(() => {
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
    console.log(obj);
    setCountries(Object.entries(obj).map((obj) => obj[1]));
  }, []);
  return countries;
}
