import NavBar from "../../components/navbar/NavBar";
import {
  Box,
  UnorderedList,
  ListItem,
  useColorModeValue,
} from "@chakra-ui/react";
import "./dash-countries.css";
import { countriesList } from "../../data/countries-data";
import { useNavigate } from "react-router-dom";
import CountryCard from "../../components/country-card/CountryCard";
import useReviewedExitsFetch from "../../hooks/useReviewedExitsFetch";
import { useEffect, useState } from "react";

interface Country {
  code: string;
  country: string;
  num_jumps: number;
  regions: any;
}

interface MyObj {
  [key: string]: Country;
}

function DashCountries() {
  const navigate = useNavigate();
  const { data, error, loading} = useReviewedExitsFetch();
  const [countries, setCountries] = useState<Country[]>();

  useEffect(() => {
    const arr = [] as string[];
    if (data !== undefined) {
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
    }
  }, [data]);

  const lettersArr = [] as string[];
  for (let i = 65; i < 91; i++) {
    lettersArr.push(String.fromCharCode(i));
  }

  const bg_500 = useColorModeValue("bg_light.500", "bg_dark.500");
  const out_500 = useColorModeValue("out_light.500", "out_dark.500");

  return (
    <div className="dash-countries">
      <NavBar currentPage="exits" />
      <Box className="content">
        <UnorderedList
          className="letter-bar"
          color={out_500}
          border="1px solid"
          background={bg_500}
        >
          {lettersArr.map((letter) => {
            return <ListItem key={letter}>{letter}</ListItem>;
          })}
        </UnorderedList>
        <UnorderedList className="country-list">
          {countries
            ? countries.map((country, i) => {
                return <CountryCard key={i} country={country} />;
              })
            : null}
        </UnorderedList>
      </Box>
    </div>
  );
}

export default DashCountries;
