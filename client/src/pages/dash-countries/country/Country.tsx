import { useParams } from "react-router-dom";
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
import { exitsData } from "../../../data/sample-exit-data";

function Country() {
  let { country } = useParams();

  const txt_300 = useColorModeValue("txt_light.300", "txt_dark.300");
  const txt_500 = useColorModeValue("txt_light.500", "txt_dark.500");
  const bg_500 = useColorModeValue("bg_light.500", "bg_dark.500");
  const out_500 = useColorModeValue("out_light.500", "out_dark.500");
  const lightMode = useColorModeValue(true, false);

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
          {exitsData.map((exit, i) => {
            return (
              <ExitCard
                name={exit.name}
                description={exit.description}
                height={exit.height}
                legality={exit.legality}
                hikingTime={exit.hikingTime}
              />
            );
          })}
        </Flex>
      </UnorderedList>
      <div className="exits-container"></div>
    </div>
  );
}

export default Country;
