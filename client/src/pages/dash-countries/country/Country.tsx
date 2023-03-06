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
import Exit from '../../../type-definitions/exit';
import { ExitDataContext } from "../../../ExitDataContext";


function Country() {
  let { country } = useParams();
  // const { data, error, loading } = useReviewedExitsFetch();
  const [ exits, setExits ] = useState<Array<Exit | undefined>>();
  const { exitDataContext, setExitDataContext } = useContext(ExitDataContext);

  useEffect(() => {
    let exitArray: Array<Exit | undefined> = [];
    exitDataContext?.forEach((exit: Exit) => {
      if (exit.country_code === country) {
        exitArray.push(exit)
      }
    });
    setExits(exitArray)
  }, [exitDataContext]);

  const bg_500 = useColorModeValue("bg_light.500", "bg_dark.500");
  const out_500 = useColorModeValue("out_light.500", "out_dark.500");


  if (!exits) {
    return <></>
  } else {
  return (
    <div className="country">
      <NavBar currentPage="exits" />

      <h1 className="country-header">{country}</h1>
      <UnorderedList className="states-bar" color={out_500}>
        {statesArr.map((state) => {
          return (
            <ListItem className="state" background={bg_500} key={state}>
              {state}
            </ListItem>
          );
        })}
      </UnorderedList>

      <UnorderedList>
        <Flex className="exit-cards-container">
          {exits.map((exit, i) => {
            if (!exit) return
            return (
              <ExitCard
                name={exit.name}
                description={exit.description}
                height={exit.height_impact}
                legality={exit.legality}
                hikingtime={exit.hiking_time_mins}
                key={i}
              />
            );
          })}
        </Flex>
      </UnorderedList>
      <div className="exits-container"></div>
    </div>
  );
}
}

export default Country;
