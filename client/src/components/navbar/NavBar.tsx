import "./navbar.css";
import { Box, Flex, Heading, Spacer, HStack } from "@chakra-ui/react";

export default function NavBar() {
  return (
    <Flex className="navbar" bg="bg.500">
      <Heading as="h1" color="txt.500">
        ExitMap
      </Heading>
      <HStack className="navbar-links">
        <Heading as="h2" color="txt.500">
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
      <Box className="avatar-placeholder"></Box>
      <Heading as="h3" className="name-placeholder" color="txt.500">
        Luke Boyett
      </Heading>
    </Flex>
  );
}
