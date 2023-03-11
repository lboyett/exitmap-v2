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

interface Region {
  region: string;
  active: boolean;
}

function Country() {
  let { country_code } = useParams();
  const [exits, setExits] = useState<Array<Exit | undefined>>();
  const { exitDataContext, setExitDataContext } = useContext(ExitDataContext);
  const [country, setCountry] = useState<CountryType>();
  const [activeRegions, setActiveRegions] = useState<Region[]>();

  useEffect(() => {
    if (exitDataContext) {
      initializeRegionsCards(exitDataContext);
    }
  }, [exitDataContext]);

  useEffect(() => {
    const exitArray = initializeExitArray(exitDataContext);
    setExits(exitArray);
  }, [exitDataContext]);

  function initializeRegionsCards(exitData: any) {
    const countries = getCountriesFromExits(exitData);
    countries.forEach((country) => {
      if (country.code === country_code) {
        const activeRegionsArr = country.regions.map((region) => {
          return { region: region, active: true };
        }) as Region[];
        setActiveRegions(activeRegionsArr);
        setCountry(country);
      }
    });
  }

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

  function changeActiveRegion(activeRegion: string) {
    if (!activeRegions) return;
    const regions = activeRegions.map((region) => {
      if (region.region === activeRegion)
        return { region: region.region, active: true };
      return { region: region.region, active: false };
    });
    setActiveRegions(regions);
  }

  function checkIfExitDisplayed(exit: Exit, activeRegions: Region[]) {
    let boo = false;
    activeRegions.forEach((activeRegion) => {
      if (exit.region === activeRegion.region && activeRegion.active)
        boo = true;
    });
    return boo;
  }

  function checkIfRegionCardIsSelected(
    region: string,
    activeRegions: Region[]
  ) {
    let arr = [] as any;
    activeRegions.map((activeRegion) => {
      if (activeRegion.active) arr.push(activeRegion);
    });
    if (arr.length > 1) return false;
    let boo = false;
    activeRegions.forEach((activeRegion) => {
      if (region === activeRegion.region && activeRegion.active) boo = true;
    });
    return boo;
  }

  function resetActivatedRegions(exitData: any) {
    initializeRegionsCards(exitData);
  }

  const bg_500 = useColorModeValue("bg_light.500", "bg_dark.500");
  const out_500 = useColorModeValue("out_light.500", "out_dark.500");

  if (!exits) {
    return <></>;
  } else {
    return (
      <div className="country">
        <NavBar currentPage="exits" />

        <h1 className="country-header">{country?.country}</h1>
        <UnorderedList className="regions-bar" color={out_500} padding="0.5rem">
          {country
            ? country.regions.map((region) => {
                if (!region || !activeRegions) return;
                let boo = false;
                if (checkIfRegionCardIsSelected(region, activeRegions)) {
                  boo = true;
                }
                return (
                  <RegionCard
                    isActive={boo}
                    region={region}
                    key={region}
                    activateRegion={(region: string) =>
                      changeActiveRegion(region)
                    }
                    resetActivatedRegions={() =>
                      resetActivatedRegions(exitDataContext)
                    }
                  />
                );
              })
            : null}
        </UnorderedList>

        <UnorderedList>
          <Flex className="exit-cards-container">
            {exits.map((exit) => {
              if (!exit || !activeRegions) return;
              let boo = false;
              if (checkIfExitDisplayed(exit, activeRegions)) {
                boo = true;
              }
              return <ExitCard exit={exit} key={exit._id} isDisplayed={boo} />;
            })}
          </Flex>
        </UnorderedList>
        <div className="exits-container"></div>
      </div>
    );
  }
}

export default Country;
