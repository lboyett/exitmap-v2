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
import { useState, useEffect } from "react";
import Exit from "../../type-definitions/exit";
import axios from "axios";

interface ExitCardProps {
  exit: Exit;
  isDisplayed: boolean;
}

function ExitCard({ exit, isDisplayed }: ExitCardProps) {
  const navigate = useNavigate();
  const txt_300 = useColorModeValue("txt_light.300", "txt_dark.300");
  const out_500 = useColorModeValue("out_light.500", "out_dark.500");
  const [image, setImage] = useState<any>();
  const [imageUrl, setImageUrl] = useState<string>();

  useEffect(() => {
    const url = `${import.meta.env.VITE_SERVER_DOMAIN_NAME}/images/${
      exit._id
    }/main`;
    (async () => {
      const { data } = await axios.get(url);
      const imageKitUrl = `https://ik.imagekit.io/lboyett/${data}?tr=w-300`;
      setImageUrl(imageKitUrl);
    })();
  }, []);

  function legalityColorPicker() {
    switch (exit.legality) {
      case "legal":
        return "lime";
      case "semi":
        return "yellow";
      case "illegal":
        return "red";
    }
  }

  let description: string;
  if (exit.description.length > 70) {
    description = `${exit.description.slice(0, 120)}...`;
  } else {
    description = exit.description;
  }

  return (
    <ListItem
      display={isDisplayed ? "auto" : "none"}
      className="exit-card"
      key={exit.name}
      color={out_500}
      border="1px solid"
      _hover={{
        borderColor: txt_300,
        color: txt_300,
      }}
      onClick={() => {
        navigate(`${exit._id}`);
      }}
    >
      <Image src={imageUrl} loading="lazy" decoding="async" />
      <Flex className="exit-card-flex">
        <Flex className="exit-card-top">
          <Heading as="h4">{exit.name}</Heading>
          <Text
            className="exit-card-legality"
            style={{ color: legalityColorPicker() }}
            bg="black "
          >
            {exit.legality}
          </Text>
        </Flex>
        <Text className="exit-card-description">{description}</Text>
        <Flex className="exit-card-bottom">
          <Text className="exit-card-height">{exit.height_impact} ft</Text>
          <Flex className="exit-card-hiking">
            <FaHiking className="exit-card-hiking-icon" />
            <Text className="exit-card-hiking-time">
              {exit.hiking_time_hrs} hrs {exit.hiking_time_mins} min
            </Text>
          </Flex>
        </Flex>
      </Flex>
    </ListItem>
  );
}

export default ExitCard;
