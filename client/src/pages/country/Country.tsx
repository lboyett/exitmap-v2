import { useParams } from "react-router-dom";
import { useEffect, useState, useContext, createContext } from "react";
import NavBar from "../../components/navbar/NavBar";
import { useColorModeValue, UnorderedList, Flex } from "@chakra-ui/react";
import "./country.css";
import { statesArr } from "../../data/states-data";
import ExitCard from "../../components/exit-card/ExitCard";
import Exit from "../../type-definitions/exit";
import { ExitDataContext } from "../../ExitDataContext";
import CountryType from "../../type-definitions/country-type";
import { getCountriesFromExits } from "../../utils/getCountriesFromExits";
import RegionCard from "../../components/region-card/RegionCard";

export const CountryExitContext = createContext<any>(null); //FixThis

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
    const exitArray = initializeExitArray(exitDataContext);
    setExits(exitArray);
  }, [exitDataContext]);

  function initializeExitArray(exitDataContext: any) {
    let exitArray: Array<Exit> = [];
    exitDataContext?.forEach((exit: Exit) => {
      if (exit.country_code === country_code) {
        exitArray.push(exit);
      }
    });
    if (exitArray[0] && exitArray[1]) {
      exitArray.sort((a, b) => a.name.localeCompare(b.name));
    }
    return exitArray;
  }

  const bg_500 = useColorModeValue("bg_light.500", "bg_dark.500");
  const out_500 = useColorModeValue("out_light.500", "out_dark.500");

  function filterJumpsByRegion(
    region: string | boolean,
    exits: (Exit | undefined)[]
  ) {
    if (region === false) {
      const data = initializeExitArray(exitDataContext);
      console.log(data);
      setExits(data);
      return;
    }
    const exitArray = initializeExitArray(exitDataContext);
    const filteredArray = exitArray.filter((exit) => exit.region === region);
    setExits([...filteredArray]);
  }

  useEffect(() => {
    console.log(exits);
  }, [exits]);

  if (!exits) {
    return <></>;
  } else {
    return (
      <div className="country">
        <NavBar currentPage="exits" />

        <h1 className="country-header">{country?.country}</h1>
        <CountryExitContext.Provider value={exits}>
          <UnorderedList className="regions-bar" color={out_500}>
            {country
              ? country.regions.map((region) => {
                  return (
                    <RegionCard
                      region={region}
                      key={region}
                      filterJumpsByRegion={(region: string | boolean) =>
                        filterJumpsByRegion(region, exits)
                      }
                    />
                  );
                })
              : null}
          </UnorderedList>
        </CountryExitContext.Provider>

        <UnorderedList>
          <Flex className="exit-cards-container">
            {exits.map((exit) => {
              if (!exit) return;
              return <ExitCard exit={exit} key={exit._id} />;
            })}
          </Flex>
        </UnorderedList>
        <div className="exits-container"></div>
      </div>
    );
  }
}

export default Country;
