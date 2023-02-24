import {
  useColorModeValue,
  UnorderedList,
  ListItem,
  Image,
  Flex,
  Heading,
  Spacer,
  Text,
  Grid,
  Box,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import countryImage from "../../assets/country-image.jpeg";
import "./exit-card.css";
import { FaHiking } from "react-icons/fa";
import { useState } from "react";

interface ExitCardProps {
  name: string;
  description: string;
  height: number;
  legality: string;
  hikingtime: number;
}

function ExitCard(props: ExitCardProps) {
  const navigate = useNavigate();

  const txt_300 = useColorModeValue("txt_light.300", "txt_dark.300");
  const out_500 = useColorModeValue("out_light.500", "out_dark.500");

  function legalityColorPicker() {
    switch (props.legality) {
      case "legal":
        return "lime";
      case "legalish":
        return "yellow";
      case "illegal":
        return "red";
    }
  }

  return (
    <div>
      <ListItem
        className="exit-card"
        key={props.name}
        color={out_500}
        border="1px solid"
        _hover={{
          borderColor: txt_300,
          color: txt_300,
        }}
        onClick={() => navigate(props.name)}
      >
        <Image src={countryImage} loading="lazy" />
        <Grid
          className="exit-card-grid"
          templateColumns="3fr 1fr"
          templateRows={"0.5fr 1fr 0.5fr"}
        >
          <Heading as="h4">{props.name}</Heading>
          <Text
            className="exit-card-legality"
            style={{ color: legalityColorPicker() }}
            bg="black "
          >
            {props.legality}
          </Text>
          <Text className="exit-card-description">{props.description}</Text>
          <Spacer />
          <Text className="exit-card-height">{props.height} ft</Text>
          <Flex className="exit-card-hiking">
            <FaHiking className="exit-card-hiking-icon" />
            <Text className="exit-card-hiking-time">
              {props.hikingtime} hrs
            </Text>
          </Flex>
        </Grid>
      </ListItem>
    </div>
  );
}

export default ExitCard;
