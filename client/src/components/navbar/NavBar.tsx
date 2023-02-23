import "./navbar.css";
import {
  Box,
  Flex,
  Heading,
  Spacer,
  HStack,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
  Text,
} from "@chakra-ui/react";
import { MoonIcon } from "@chakra-ui/icons";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";

type CurrentPage = "home" | "exits" | "submit";
interface NavBarProps extends React.HTMLAttributes<HTMLDivElement> {
  currentPage?: CurrentPage;
}

export default function NavBar(props: NavBarProps) {
  const navigate = useNavigate();
  const page = props.currentPage;

  return (
    <Flex className="navbar" bg="bg.500">
      <Heading
        className="logo"
        as="h1"
        color="txt.500"
        _hover={{ color: "txt.300", textShadow: "0px 0px 3px" }}
        onClick={() => navigate("/home")}
      >
        ExitMap
      </Heading>
      <HStack className="navbar-links">
        <Menu>
          <Box color="txt.500" className="navbar-icon">
            <MenuButton
              as={IconButton}
              icon={<FontAwesomeIcon icon={faBars} size={"xl"} />}
            >
              Actions
            </MenuButton>
          </Box>
          <MenuList
            className="navbar-menu-list"
            bg="bg.500"
            color="txt.500"
            borderColor="txt.500"
          >
            <MenuItem
              bg="bg.500"
              _hover={{ color: "txt.300", textShadow: "0px 0px 3px" }}
              onClick={() => navigate("/home")}
            >
              <Text borderBottom={page === "home" ? "1px solid" : "hidden"}>
                HOME
              </Text>
            </MenuItem>
            <MenuItem
              bg="bg.500"
              _hover={{ color: "txt.300", textShadow: "0px 0px 3px" }}
              onClick={() => navigate("/countries")}
            >
              <Text borderBottom={page === "exits" ? "1px solid" : "hidden"}>
                EXITS
              </Text>
            </MenuItem>
            <MenuItem
              bg="bg.500"
              _hover={{ color: "txt.300", textShadow: "0px 0px 3px" }}
              onClick={() => navigate("/submit")}
            >
              <Text borderBottom={page === "submit" ? "1px solid" : "hidden"}>
                SUBMIT EXIT
              </Text>
            </MenuItem>
          </MenuList>
        </Menu>
        <Heading
          as="h2"
          color="txt.500"
          _hover={{ color: "txt.300", textShadow: "0px 0px 3px" }}
          onClick={() => navigate("/home")}
          borderBottom={page === "home" ? "1px solid" : "hidden"}
        >
          HOME
        </Heading>
        <Heading
          as="h2"
          color="txt.500"
          _hover={{ color: "txt.300", textShadow: "0px 0px 3px" }}
          onClick={() => navigate("/countries")}
          borderBottom={page === "exits" ? "1px solid" : "hidden"}
        >
          EXITS
        </Heading>
        <Heading
          as="h2"
          color="txt.500"
          _hover={{ color: "txt.300", textShadow: "0px 0px 3px" }}
          onClick={() => navigate("/submit")}
          borderBottom={page === "submit" ? "1px solid" : "hidden"}
        >
          SUBMIT EXIT
        </Heading>
      </HStack>
      <Spacer />
      <Box
        className="darkmode-icon"
        color="txt.500"
        borderColor="txt.500"
        _hover={{
          color: "txt.300",
          borderColor: "txt.300",
          boxShadow: `0px 0px 5px`,
        }}
      >
        <MoonIcon boxSize={5} />
      </Box>
      <Box className="avatar-placeholder" bg="txt.500"></Box>
      <Heading as="h3" className="name-placeholder" color="txt.500">
        Jackson Boyett
      </Heading>
    </Flex>
  );
}
