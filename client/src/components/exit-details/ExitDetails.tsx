import "./exit-details.css";
import { useState, useEffect } from "react";
import {
  Flex,
  Box,
  Text,
  useColorModeValue,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Heading,
  Spacer,
} from "@chakra-ui/react";
import {
  FaRegBuilding,
  FaBroadcastTower,
  FaMountain,
  FaArrowsAltV,
  FaCheck,
  FaTimes,
  FaThumbsUp,
  FaThumbsDown,
  FaCircle,
} from "react-icons/fa";
import { GiHandcuffs, GiCableStayedBridge } from "react-icons/gi";
import { BsEmojiNeutral } from "react-icons/bs";
import { FaHiking } from "react-icons/fa";
import useWindowDimensions from "../../hooks/useWindowDimensions";

function ExitDetails(props: any) {
  const [experienceArr, setExperienceArr] = useState<string[]>([]);
  const { height, width } = useWindowDimensions();

  const [activeAccess, setActiveAccess] = useState("");
  const [activeXAccess, setActiveXAccess] = useState("");
  const [activeLanding, setActiveLanding] = useState("");
  const [activeXLanding, setActiveXLanding] = useState("");

  const txt_300 = useColorModeValue("txt_light.300", "txt_dark.300");
  const txt_500 = useColorModeValue("txt_light.500", "txt_dark.500");
  const bg_500 = useColorModeValue("bg_light.500", "bg_dark.500");
  const out_500 = useColorModeValue("out_light.500", "out_dark.500");
  const lightMode = useColorModeValue(true, false);

  useEffect(() => {
    console.log(props.exit);
    experienceCounter(props.exit.exp_req);
  }, []);

  function experienceCounter(experience: string) {
    setExperienceArr([]);
    switch (experience) {
      case "beginner":
        createExperienceArr(3);
        break;
      case "intermediate":
        createExperienceArr(5);
        break;
      case "advanced":
        createExperienceArr(7);
        break;
      case "expert":
        createExperienceArr(10);
        break;
    }
  }

  function createExperienceArr(experience: number) {
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

  function showTextAccess() {
    if (activeAccess === "") {
      setActiveAccess("active-access");
      setActiveXAccess("active-x-access");
    } else {
      setActiveAccess("");
      setActiveXAccess("");
    }
  }

  function showTextLanding() {
    if (activeLanding === "") {
      setActiveLanding("active-landing");
      setActiveXLanding("active-x-landing");
    } else {
      setActiveLanding("");
      setActiveXLanding("");
    }
  }

  function returnExitTypeIcon() {
    switch (props.exit.object_type) {
      case "Building":
        return <FaRegBuilding />;
      case "Antenna":
        return <FaBroadcastTower />;
      case "Span":
        return <GiCableStayedBridge />;
      case "Earth":
        return <FaMountain />;
    }
  }

  function returnLegalIcon() {
    switch (props.exit.legality) {
      case "legal":
        return <FaThumbsUp />;
      case "legalish":
        return <BsEmojiNeutral />;
      case "illegal":
        return <FaThumbsDown />;
    }
  }

  function returnLegalColor() {
    switch (props.exit.legality) {
      case "legal":
        return "lime";
      case "semi":
        return "yellow";
      case "illegal":
        return "red";
    }
  }

  function returnLegalStatus() {
    switch (props.exit.legality) {
      case "legal":
        return "legal";
      case "semi":
        return "semi-legal";
      case "illegal":
        return "illegal";
    }
  }

  function returnBFColor() {
    switch (props.exit.bust_factor) {
      case "0":
        return "lime";
      case "0.5":
        return "yellow";
      case "1":
        return "red";
    }
  }

  function returnBF() {
    switch (props.exit.bust_factor) {
      case "0":
        return "low";
      case "0.5":
        return "medium";
      case "1":
        return "high";
    }
  }

  return (
    <div>
      <Flex color={txt_500} className="exit-details">
        <Box className="exit-details-left" borderColor={txt_300}>
          <Flex className="exit-details-title" borderColor={txt_300}>
            Exit Details
            {returnExitTypeIcon()}
          </Flex>

          <Flex>
            <Flex className="exit-height">
              <FaArrowsAltV fontSize={"24px"} style={{ marginRight: "4px" }} />
              Impact: {props.exit.height_impact} ft.
            </Flex>
            <Flex className="exit-height">
              <FaArrowsAltV fontSize={"24px"} style={{ marginRight: "4px" }} />
              Landing: {props.exit.height_landing} ft.
            </Flex>
          </Flex>

          {/* Only show below on mobile */}
          {(width < 875 && width > 700) || width < 415 ? (
            <Flex>
              <Box className="exit-details-middle">
                <Flex className="exit-jump-type">
                  {props.exit.exit_type[0] === "1" ? (
                    <FaCheck color="lime" />
                  ) : (
                    <FaTimes color="red" />
                  )}
                  Slider down
                </Flex>
                <Flex className="exit-jump-type">
                  {props.exit.exit_type[1] === "1" ? (
                    <FaCheck color="lime" />
                  ) : (
                    <FaTimes color="red" />
                  )}
                  Tracking suit
                </Flex>
                <Flex className="exit-jump-type">
                  {props.exit.exit_type[2] === "1" ? (
                    <FaCheck color="lime" />
                  ) : (
                    <FaTimes color="red" />
                  )}
                  Wingsuit
                </Flex>
              </Box>
              <Box className="exit-details-right">
                <Flex className="exit-legality" color={returnLegalColor()}>
                  <Box color={out_500}>{returnLegalIcon()}</Box>
                  <Text className="legal-status">{returnLegalStatus()}</Text>
                </Flex>
                <Flex className="exit-legality" color={returnBFColor()}>
                  <Box color={out_500}>
                    <GiHandcuffs />
                  </Box>
                  <Box bg={out_500}>{returnBF()}</Box>
                </Flex>
              </Box>
            </Flex>
          ) : null}
        </Box>

        {width >= 875 || (width <= 700 && width >= 415) ? (
          <Box className="exit-details-middle">
            <Flex className="exit-jump-type">
              {props.exit.exit_type[0] === "1" ? (
                <FaCheck color="lime" />
              ) : (
                <FaTimes color="red" />
              )}
              Slider down
            </Flex>
            <Flex className="exit-jump-type">
              {props.exit.exit_type[1] === "1" ? (
                <FaCheck color="lime" />
              ) : (
                <FaTimes color="red" />
              )}
              Tracking suit
            </Flex>
            <Flex className="exit-jump-type">
              {props.exit.exit_type[2] === "1" ? (
                <FaCheck color="lime" />
              ) : (
                <FaTimes color="red" />
              )}
              Wingsuit
            </Flex>
          </Box>
        ) : null}

        {width >= 875 || (width <= 700 && width >= 415) ? (
          <Box className="exit-details-right">
            <Flex
              className="exit-legality"
              color={returnLegalColor()}
              mb="0.5rem"
            >
              <Box color={out_500}>{returnLegalIcon()}</Box>
              <Text
                className="legal-status"
                bg={lightMode ? out_500 : ""}
                p="0 0.5rem"
                borderRadius="5px"
              >
                {returnLegalStatus()}
              </Text>
            </Flex>
            <Flex className="exit-legality" color={returnBFColor()}>
              <Box color={out_500}>
                <GiHandcuffs />
              </Box>
              <Box
                bg={lightMode ? out_500 : ""}
                p="0 0.5rem"
                borderRadius="5px"
              >
                {returnBF()}
              </Box>
            </Flex>
          </Box>
        ) : null}
      </Flex>

      <Box className="exit-experience" color={txt_500} borderColor={txt_300}>
        Experience Level
        <Flex
          className="exit-experience-bar"
          bg={lightMode ? out_500 : ""}
          p="0 0.5rem"
          borderRadius="5px"
        >
          {experienceArr.map((circle, i) => {
            return <FaCircle color={circle} key={i} />;
          })}
          <Text
            color={experienceArr[experienceArr.length - 1]}
            className="exit-experience-text"
          >
            {props.exit.exp_req}
          </Text>
        </Flex>
      </Box>
      <Accordion allowMultiple className="accordion" borderColor={txt_300}>
        <AccordionItem borderTop="none">
          <AccordionButton padding="0.5rem 0">
            <Heading fontWeight={400} color={txt_500}>
              Approach & Access
            </Heading>
            <Spacer />
            <AccordionIcon color={txt_500} />
          </AccordionButton>
          <AccordionPanel>
            <Flex gap={"6px"} fontSize={"1.2rem"}>
              <FaHiking className="exit-card-hiking-icon" />
              <Text className="exit-card-hiking-time">
                {props.exit.hiking_time_hrs} hrs {props.exit.hiking_time_mins}{" "}
                min
              </Text>
            </Flex>
            {props.exit.access_approach}
          </AccordionPanel>
        </AccordionItem>
        <AccordionItem>
          <AccordionButton padding="0.5rem 0">
            <Heading fontWeight={400} color={txt_500}>
              Landing Area
            </Heading>
            <Spacer />

            <AccordionIcon color={txt_500} />
          </AccordionButton>
          <AccordionPanel>{props.exit.landing_area}</AccordionPanel>
        </AccordionItem>
      </Accordion>
    </div>
  );
}

export default ExitDetails;
