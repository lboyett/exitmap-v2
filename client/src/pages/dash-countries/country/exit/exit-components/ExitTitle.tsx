import "./exit-title.css";
import { Heading, Flex, Text, useColorModeValue } from "@chakra-ui/react";
import { FaMapMarkerAlt } from "react-icons/fa";

function ExitTitle(props: any) {
  const txt_300 = useColorModeValue("txt_light.300", "txt_dark.300");
  const txt_500 = useColorModeValue("txt_light.500", "txt_dark.500");
  const out_500 = useColorModeValue("out_light.500", "out_dark.500");

  return (
    <div>
      <Flex className="exit-location">
        <Flex
          className="exit-location-left"
          direction="column"
          borderColor={out_500}
        >
          <Heading as="h1" className="exit-name">
            {props.exit.name}
          </Heading>
          <Text>
            {props.exit.city}, {props.exit.country}
          </Text>
        </Flex>
        <Flex className="exit-location-right">
          <FaMapMarkerAlt className="fa-marker"></FaMapMarkerAlt>
          <Text>
            {props.exit.lat}, {props.exit.lng}
          </Text>
        </Flex>
      </Flex>

      <Text className="exit-description" borderColor={out_500}>
        {props.exit.description}
      </Text>
    </div>
  );
}

export default ExitTitle;
