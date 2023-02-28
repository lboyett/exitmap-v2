import "./exit-title.css";
import { Heading, Flex, Text, useColorModeValue } from "@chakra-ui/react";
import { FaMapMarkerAlt } from "react-icons/fa";

function ExitTitle(props: any) {
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
            {props.exit.exit_name}
          </Heading>
          <Flex className='exit-city-latlng'>
          <Text className='exit-city'>
            {props.exit.city}, {props.exit.country_name}
          </Text>
          <Flex className="exit-latlng-wide">
          <FaMapMarkerAlt className="fa-marker"></FaMapMarkerAlt>
          <Text>
          {(+props.exit.lat).toFixed(6)}, {(+props.exit.lng).toFixed(6)}
          </Text>
        </Flex>

          </Flex>
          <Flex className="exit-latlng-mobile">
          <FaMapMarkerAlt className="fa-marker"></FaMapMarkerAlt>
          <Text>
            {(+props.exit.lat).toFixed(6)}, {(+props.exit.lng).toFixed(6)}
          </Text>
        </Flex>
        </Flex>
      </Flex>

      <Text className="exit-description" borderColor={out_500}>
        {props.exit.description}
      </Text>
    </div>
  );
}

export default ExitTitle;
