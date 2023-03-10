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
import { BaseSyntheticEvent, useContext, useEffect, useState } from "react";
import { useGetCountriesFromExit } from "../../hooks/useGetCountriesFromExits";
import { ExitDataContext } from "../../ExitDataContext";
import { getCountriesFromExits } from "../../utils/getCountriesFromExits";
import Country from "../../type-definitions/country-type";
import { countriesCodesJson } from "../../data/countries-with-codes";
import axios from "axios";

function DashCountries() {
  const navigate = useNavigate();
  const { data, error, loading } = useReviewedExitsFetch();
  const { exitDataContext, setExitDataContext } = useContext(ExitDataContext);
  const [countries, setCountries] = useState<Country[]>();

  useEffect(() => {
    if (exitDataContext) {
      const arr = getCountriesFromExits(exitDataContext).sort((a, b) => {
        if (a.country < b.country) return -1;
        else return 1;
      });
      setCountries(arr);
    }
  }, [exitDataContext]);

  const lettersArr = [] as string[];
  for (let i = 65; i < 91; i++) {
    lettersArr.push(String.fromCharCode(i));
  }

  const bg_500 = useColorModeValue("bg_light.500", "bg_dark.500");
  const txt_300 = useColorModeValue("txt_light.300", "txt_dark.300");
  const out_500 = useColorModeValue("out_light.500", "out_dark.500");

  function handleClickScroll(e: BaseSyntheticEvent) {
    const element = document.getElementById(`country-${e.target.innerText}`);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  }

  async function downloadCountrySvgs() {
    const arr = Object.keys(countriesCodesJson);
    arr.forEach(async (code) => {
      try {
        const flag = await axios.get(`https://countryflagsapi.com/svg/${code}`);
        const res = await axios.post("http://localhost:8000/upload-flags", {
          svg: flag.data,
          code: code,
        });
      } catch (err) {
        console.log(err);
      }
    });
  }

  return (
    <div className="dash-countries">
      <NavBar currentPage="exits" />
      <button
        onClick={() => {
          downloadCountrySvgs();
        }}
      >
        Click
      </button>
      <Box className="content">
        <UnorderedList
          className="letter-bar"
          color={out_500}
          border="1px solid"
          background={bg_500}
        >
          {lettersArr.map((letter) => {
            return (
              <ListItem
                key={letter}
                className={"scroll-letter"}
                _hover={{ color: txt_300, fontWeight: `400 !important` }}
                onClick={(e) => handleClickScroll(e)}
              >
                {letter}
              </ListItem>
            );
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
