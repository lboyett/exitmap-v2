import "./navbar.css";
import { Box, Flex, Heading, Spacer, HStack } from "@chakra-ui/react";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";

interface NavBarProps extends React.HTMLAttributes<HTMLDivElement> {
}

export default function NavBar(props: NavBarProps) {
  const navigate = useNavigate();

  return (
    <Flex className="navbar" bg="bg.500">
      <Heading className="logo" as="h1" color="txt.500" onClick={() => navigate('/home')}>
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
          onClick={() => navigate('/home')}
        >
          Home
        </Heading>
        <Heading as="h2" color="txt.500" onClick={() => navigate('/countries')}>
          Exits
        </Heading>
        <Heading as="h2" color="txt.500" onClick={() => navigate('/submit')}>
          Submit Exit
        </Heading>
      </HStack>
      <Spacer />
      <Box className="avatar-placeholder" bg="txt.500"></Box>
      <Heading as="h3" className="name-placeholder" color="txt.500">
        Jackson Boyett
      </Heading>
    </Flex>
  );
}
