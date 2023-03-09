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
}

function ExitCard({ exit }: ExitCardProps) {
  const navigate = useNavigate();
  const txt_300 = useColorModeValue("txt_light.300", "txt_dark.300");
  const out_500 = useColorModeValue("out_light.500", "out_dark.500");
  const [image, setImage] = useState<any>();
  const [imageUrl, setImageUrl] = useState<string>();

  useEffect(() => {
    const url = `http://localhost:8000/images/${exit._id}/main`;
    (async () => {
      const { data } = await axios.get(url);
      const imageKitUrl = `https://ik.imagekit.io/lboyett/${data}?tr=w-300`;
      setImageUrl(imageKitUrl);
    })();
  }, []);

  useEffect(() => {
    "ran";
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
    description = `${exit.description.slice(0, 70)}...`;
  } else {
    description = exit.description;
  }

  return (
    <div>
      <ListItem
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
        <Grid
          className="exit-card-grid"
          templateColumns="3fr 1fr"
          templateRows={"0.5fr 1fr 0.5fr"}
        >
          <Heading as="h4">{exit.name}</Heading>
          <Text
            className="exit-card-legality"
            style={{ color: legalityColorPicker() }}
            bg="black "
          >
            {exit.legality}
          </Text>
          <Text className="exit-card-description">{description}</Text>
          <Spacer />
          <Text className="exit-card-height">{exit.height_impact} ft</Text>
          <Flex className="exit-card-hiking">
            <FaHiking className="exit-card-hiking-icon" />
            <Text className="exit-card-hiking-time">
              {exit.hiking_time_hrs} hrs {exit.hiking_time_mins} min
            </Text>
          </Flex>
        </Grid>
      </ListItem>
    </div>
  );
}

export default ExitCard;
