import { useParams } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import NavBar from "../../../components/navbar/NavBar";
import {
  useColorModeValue,
  UnorderedList,
  ListItem,
  Flex,
} from "@chakra-ui/react";
import "./country.css";
import { statesArr } from "../../../data/states-data";
import ExitCard from "../../../components/exit-card/ExitCard";
import { exitsData } from "../../../data/sample-exit-card-data";
import useReviewedExitsFetch from "../../../hooks/useReviewedExitsFetch";
import Exit from "../../../type-definitions/exit";
import { ExitDataContext } from "../../../ExitDataContext";
import CountryType from "../../../type-definitions/country-type";
import { getCountriesFromExits } from "../../../utils/getCountriesFromExits";
import { countriesCodesJson } from "../../../data/countries-with-codes";

function Country() {
  let { country_code } = useParams();
  const [exits, setExits] = useState<Array<Exit | undefined>>();
  const { exitDataContext, setExitDataContext } = useContext(ExitDataContext);
  const [country, setCountry] = useState<CountryType>();

  useEffect(() => {
    if (exitDataContext) {
      const countries = getCountriesFromExits(exitDataContext);
      countries.forEach((country) => {
        if (country.code === country_code) {
          setCountry(country);
        }
      });
    }
  }, [exitDataContext]);

  useEffect(() => {
    let exitArray: Array<Exit | undefined> = [];
    exitDataContext?.forEach((exit: Exit) => {
      if (exit.country_code === country_code) {
        exitArray.push(exit);
      }
    });
    setExits(exitArray);
  }, [exitDataContext]);

  const bg_500 = useColorModeValue("bg_light.500", "bg_dark.500");
  const out_500 = useColorModeValue("out_light.500", "out_dark.500");

  if (!exits) {
    return <></>;
  } else {
    return (
      <div className="country">
        <NavBar currentPage="exits" />

        <h1 className="country-header">{country?.country}</h1>
        <UnorderedList className="states-bar" color={out_500}>
          {country
            ? country.regions.map((region) => {
                return (
                  <ListItem
                    className="state"
                    background={bg_500}
                    border="1px solid"
                    key={region}
                  >
                    {region}
                  </ListItem>
                );
              })
            : null}
        </UnorderedList>

        <UnorderedList>
          <Flex className="exit-cards-container">
            {exits.map((exit, i) => {
              if (!exit) return;
              return <ExitCard exit={exit} key={i} />;
            })}
          </Flex>
        </UnorderedList>
        <div className="exits-container"></div>
      </div>
    );
  }
}

export default Country;
