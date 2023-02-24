import { useParams } from "react-router-dom";
import NavBar from "../../../components/navbar/NavBar";
import { useColorModeValue, UnorderedList, ListItem } from "@chakra-ui/react";
import "./country.css";
import { statesArr } from "../../../data/states-data";
import ExitCard from "../../../components/exitCard/exitCard";

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
      <ExitCard name='El Capitan' description='This was the first object in the world to be jumped.' height={3000} legality='illegal' hikingTime={6}/>
      </UnorderedList>
      <div className="exits-container"></div>
    </div>
  );
}

export default Country;
