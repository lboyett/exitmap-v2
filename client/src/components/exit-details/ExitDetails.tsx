import "./exit-details.css";
import { useState, useEffect } from "react";
import { Flex, Box, Text, useColorModeValue } from "@chakra-ui/react";
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
  const out_500 = useColorModeValue("out_light.500", "out_dark.500");

  useEffect(() => {
    // console.log(props.exit.exit_type[0] === '1')
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

  return (
    <div>
      <Flex color={txt_300} className="exit-details">
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
          {(width < 800 && width > 700 || width < 415) ? <Flex>
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
                {props.exit.legality}
              </Flex>
              <Flex className="exit-legality" color={returnBFColor()}>
                <Box color={out_500}>
                  <GiHandcuffs />
                </Box>
                low
              </Flex>
            </Box>
          </Flex> : null }
        </Box>

        {(width >= 800 || width <=700 && width >= 415) ? <Box className="exit-details-middle">
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
        </Box> : null}

        {(width >= 800 || width <=700 && width >= 415) ? <Box className="exit-details-right">
          <Flex className="exit-legality" color={returnLegalColor()}>
            <Box color={out_500}>{returnLegalIcon()}</Box>
            {props.exit.legality}
          </Flex>
          <Flex className="exit-legality" color={returnBFColor()}>
            <Box color={out_500}>
              <GiHandcuffs />
            </Box>
            low
          </Flex>
        </Box> : null}
      </Flex>

      <Box className="exit-experience" color={txt_300} borderColor={txt_300}>
        Experience Level
        <Flex className="exit-experience-bar">
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

      <Box
        className="exit-access-container"
        color={txt_300}
        borderColor={txt_300}
      >
        <Flex className="exit-access" onClick={() => showTextAccess()}>
          Access and Approach
          <FaTimes
            className={`exit-x ${activeXAccess}`}
            onClick={() => showTextAccess()}
          />
        </Flex>
        <Text className={`exit-access-description ${activeAccess}`}>
          {props.exit.access_approach}
        </Text>
      </Box>

      <Box
        className="exit-landing-container"
        color={txt_300}
        borderColor={txt_300}
      >
        <Flex className="exit-landing" onClick={() => showTextLanding()}>
          Landing Area
          <FaTimes
            className={`exit-x ${activeXLanding}`}
            onClick={() => showTextLanding()}
          />
        </Flex>
        <Text className={`exit-landing-description ${activeLanding}`}>
          {props.exit.landing_area}
        </Text>
      </Box>
    </div>
  );
}

export default ExitDetails;
