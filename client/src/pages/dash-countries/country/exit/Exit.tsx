import "./exit.css";
import NavBar from "../../../../components/navbar/NavBar";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Heading,
  Flex,
  Box,
  Text,
  Grid,
  Image,
  Checkbox,
  useColorModeValue,
} from "@chakra-ui/react";
import { exitData } from "../../../../data/sample-exit-data";
import {
  FaMapMarkerAlt,
  FaMountain,
  FaArrowsAltV,
  FaCheck,
  FaTimes,
  FaThumbsUp,
  FaCircle,
} from "react-icons/fa";
import { GiHandcuffs } from "react-icons/gi";
import { render } from "@testing-library/react";

function Exit() {
  const { exit_name } = useParams();
  const [experienceArr, setExperienceArr] = useState<string[]>([]);
  const exit = exitData[0];

  const txt_300 = useColorModeValue("txt_light.300", "txt_dark.300");
  const txt_500 = useColorModeValue("txt_light.500", "txt_dark.500");
  const out_500 = useColorModeValue("out_light.500", "out_dark.500");

  useEffect(() => {
    experienceCounter(exit.experience);
  }, []);

  function experienceCounter(experience: string) {
    setExperienceArr([]);
    switch (experience) {
      case "Beginner":
        createExperienceArr(3);
        break;
      case "Intermediate":
        createExperienceArr(5);
        break;
      case "Advanced":
        createExperienceArr(7);
        break;
      case "Expert":
        createExperienceArr(10);
        break;
    }
  }

  function createExperienceArr(experience: number) {
    console.log(`Experience array function input: ${experience}`)
    for (let i = 0; i < experience; i++) {
      if (i < 3) {
        setExperienceArr((prevArr) => [...prevArr, "lime"]);
      } else if (i < 7) {
        setExperienceArr((prevArr) => [...prevArr, "yellow"]);
      } else {
        setExperienceArr((prevArr) => [...prevArr, "red"]);
      }
    }
  }

  return (
    <div>
      <NavBar />
      <Grid className="exit-page">
        <Box className="exit-left">
          <Flex className="exit-location">
            <Flex
              className="exit-location-left"
              direction="column"
              borderColor={out_500}
            >
              <Heading as="h1" className="exit-name">
                {exit.name}
              </Heading>
              <Text>
                {exit.city}, {exit.country}
              </Text>
            </Flex>
            <Flex className="exit-location-right">
              <FaMapMarkerAlt className="fa-marker"></FaMapMarkerAlt>
              <Text>
                {exit.lat}, {exit.lng}
              </Text>
            </Flex>
          </Flex>

          <Text className="exit-description" borderColor={out_500}>
            {exit.description}
          </Text>

          <Flex color={txt_300} className="exit-details">
            <Box className="exit-details-left" borderColor={txt_300}>
              <Flex className="exit-details-title" borderColor={txt_300}>
                Exit Details
                <FaMountain />
              </Flex>
              <Flex>
                <Flex className="exit-height">
                  <FaArrowsAltV fontSize={"24px"} />
                  Impact: {exit.height_impact} ft.
                </Flex>
                <Flex className="exit-height">
                  <FaArrowsAltV fontSize={"24px"} />
                  Landing: {exit.height_landing} ft.
                </Flex>
              </Flex>
            </Box>
            <Box className="exit-details-middle">
              <Flex className="exit-jump-type">
                <FaCheck color="lime" />
                Slider down
              </Flex>
              <Flex className="exit-jump-type">
                <FaTimes color="red" />
                Tracking suit
              </Flex>
              <Flex className="exit-jump-type">
                <FaCheck color="lime" />
                Wingsuit
              </Flex>
            </Box>
            <Box className="exit-details-right">
              <Flex className="exit-legality" color="lime">
                <Box color={out_500}>
                  <FaThumbsUp />
                </Box>
                legal
              </Flex>
              <Flex className="exit-legality" color="lime">
                <Box color={out_500}>
                  <GiHandcuffs />
                </Box>
                low
              </Flex>
            </Box>
          </Flex>

          <Box className="exit-experience" color={txt_300}>
            Experience Level
            <Flex className="exit-experience-bar">
              {experienceArr.map((circle, i) => {
                return (
                  <FaCircle color={circle} key={i}/>
                )
              })}
              <Text color={experienceArr[experienceArr.length - 1]}>{exit.experience}</Text>
            </Flex>
          </Box>

          <Box className="exit-access">Access and Approach</Box>

          <Box className="exit-landing">Landing Area</Box>

          <Box className="exit-comments">Comments</Box>
        </Box>

        <Box className="exit-right">
          <Image
            src={`${exit.image}`}
            alt="pic of exit"
            className="exit-image"
          />

          <Flex className="exit-image-carousel">Carousel</Flex>

          <Box className="exit-map">Map</Box>
        </Box>
      </Grid>
    </div>
  );
}

export default Exit;
