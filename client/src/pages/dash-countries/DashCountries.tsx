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

function DashCountries() {
  const navigate = useNavigate();

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
          {countriesList.map((country) => {
            return <CountryCard country={country} />;
          })}
        </UnorderedList>
      </Box>
    </div>
  );
}

export default DashCountries;
