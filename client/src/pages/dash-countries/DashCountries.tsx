import NavBar from "../../components/navbar/NavBar";
import {
  Box,
  UnorderedList,
  ListItem,
  useColorModeValue,
} from "@chakra-ui/react";
import "./dash-countries.css";
import { useNavigate } from "react-router-dom";
import CountryCard from "../../components/country-card/CountryCard";
import { BaseSyntheticEvent, useContext, useEffect, useState } from "react";
import { ExitDataContext } from "../../context/ExitDataContext";
import { getCountriesFromExits } from "../../utils/getCountriesFromExits";
import Country from "../../type-definitions/country-type";

function DashCountries() {
  const navigate = useNavigate();
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

  return (
    <div className="dash-countries">
      <div className="countries-page-nav-bar">
        <NavBar currentPage="exits" />
      </div>
      <Box className="content" paddingTop={"110px"}>
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
