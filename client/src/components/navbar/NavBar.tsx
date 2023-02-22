import "./navbar.css";
import { Box, Flex, Heading, Spacer, HStack } from "@chakra-ui/react";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function NavBar() {
  return (
    <Flex className="navbar" bg="bg.500">
      <Heading className="logo" as="h1" color="txt.500">
        ExitMap
      </Heading>
      <HStack className="navbar-links">
        <Box className="navbar-icon" color="txt.500">
          <FontAwesomeIcon icon={faBars} size={"xl"} />
        </Box>
        <Heading
          as="h2"
          color="txt.500"
          borderBottom="1px solid black"
          borderBottomColor="txt.500"
        >
          Home
        </Heading>
        <Heading as="h2" color="txt.500">
          Exits
        </Heading>
        <Heading as="h2" color="txt.500">
          Submit Exit
        </Heading>
      </HStack>
      <Spacer />
      <Box className="avatar-placeholder" bg="txt.500"></Box>
      <Heading as="h3" className="name-placeholder" color="txt.500">
        Luke Boyett
      </Heading>
    </Flex>
  );
}
