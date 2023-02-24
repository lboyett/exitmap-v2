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
  useColorMode,
  useColorModeValue,
  Image,
} from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import avatar from "../../assets/avatar.jpeg";

type CurrentPage = "home" | "exits" | "submit";
interface NavBarProps extends React.HTMLAttributes<HTMLDivElement> {
  currentPage?: CurrentPage;
}

export default function NavBar(props: NavBarProps) {
  const { colorMode, toggleColorMode } = useColorMode();
  const navigate = useNavigate();
  const page = props.currentPage;
  const txt_300 = useColorModeValue("txt_light.300", "txt_dark.300");
  const txt_500 = useColorModeValue("txt_light.500", "txt_dark.500");
  const bg_500 = useColorModeValue("bg_light.500", "bg_dark.500");
  const lightMode = useColorModeValue(true, false);

  return (
    <Flex
      className="navbar"
      bg={bg_500}
      border={lightMode ? `1px solid` : "none"}
    >
      <Heading
        className="logo"
        as="h1"
        color={txt_500}
        _hover={{ color: txt_300, textShadow: "0px 0px 3px" }}
        onClick={() => navigate("/home")}
      >
        ExitMap
      </Heading>
      <HStack className="navbar-links">
        <Menu>
          <Box color={txt_500} className="navbar-icon">
            <MenuButton
              as={IconButton}
              icon={<FontAwesomeIcon icon={faBars} size={"xl"} />}
            />
          </Box>
          <MenuList
            className="navbar-menu-list"
            bg={bg_500}
            color={txt_500}
            borderColor={txt_500}
          >
            <MenuItem
              bg={bg_500}
              _hover={{ color: txt_300, textShadow: "0px 0px 3px" }}
              onClick={() => navigate("/home")}
            >
              <Text borderBottom={page === "home" ? "1px solid" : "hidden"}>
                HOME
              </Text>
            </MenuItem>
            <MenuItem
              bg={bg_500}
              _hover={{ color: txt_300, textShadow: "0px 0px 3px" }}
              onClick={() => navigate("/countries")}
            >
              <Text borderBottom={page === "exits" ? "1px solid" : "hidden"}>
                EXITS
              </Text>
            </MenuItem>
            <MenuItem
              bg={bg_500}
              _hover={{ color: txt_300, textShadow: "0px 0px 3px" }}
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
          color={txt_500}
          _hover={{ color: txt_300, textShadow: "0px 0px 3px" }}
          onClick={() => navigate("/home")}
          borderBottom={page === "home" ? "1px solid" : "hidden"}
        >
          HOME
        </Heading>
        <Heading
          as="h2"
          color={txt_500}
          _hover={{ color: txt_300, textShadow: "0px 0px 3px" }}
          onClick={() => navigate("/countries")}
          borderBottom={page === "exits" ? "1px solid" : "hidden"}
        >
          EXITS
        </Heading>
        <Heading
          as="h2"
          color={txt_500}
          _hover={{ color: txt_300, textShadow: "0px 0px 3px" }}
          onClick={() => navigate("/submit")}
          borderBottom={page === "submit" ? "1px solid" : "hidden"}
        >
          SUBMIT EXIT
        </Heading>
      </HStack>
      <Spacer />
      <Box
        onClick={() => {
          toggleColorMode();
        }}
        className="darkmode-icon"
        color={txt_500}
        borderColor={txt_500}
        _hover={{
          color: txt_300,
          borderColor: txt_300,
          boxShadow: `0px 0px 5px`,
        }}
      >
        {lightMode ? <SunIcon boxSize={5} /> : <MoonIcon boxSize={5} />}
      </Box>
      <Image className="avatar" src={avatar}></Image>
      <Heading as="h3" className="name-placeholder" color={txt_500}>
        splitseam
      </Heading>
    </Flex>
  );
}
