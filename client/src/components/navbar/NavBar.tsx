import "./navbar.css";
import {
  Button,
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
  Image,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useColorMode,
  useColorModeValue,
  useDisclosure,
  List,
  ListItem,
} from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import avatar from "../../assets/avatar.jpeg";
import axios from "axios";
import Exit from "../../type-definitions/exit";
import { UserContext } from "../../context/UserContext";

type CurrentPage = "home" | "exits" | "submit";
interface NavBarProps extends React.HTMLAttributes<HTMLDivElement> {
  currentPage?: CurrentPage;
}

export default function NavBar(props: NavBarProps) {
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();
  const page = props.currentPage;
  const txt_300 = useColorModeValue("txt_light.300", "txt_dark.300");
  const txt_500 = useColorModeValue("txt_light.500", "txt_dark.500");
  const bg_500 = useColorModeValue("bg_light.500", "bg_dark.500");
  const lightMode = useColorModeValue(true, false);
  const [userExits, setUserExits] = useState<Exit[]>();
  const user = useContext(UserContext);

  useEffect(() => {
    (async () => {
      try {
        const user_id = 1; //USERID
        const url = `http://localhost:8000/exits/by-user/${user_id}`;
        const data = (await axios.get(url)) as Exit[];
        setUserExits(data);
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  return (
    <Flex className="navbar" bg={bg_500}>
      <Heading
        className="logo"
        as="h1"
        color={txt_500}
        _hover={{ color: txt_300, textShadow: "0px 0px 3px" }}
        onClick={() => navigate("/home")}
      >
        ExitMap
      </Heading>
      <HStack className="navbar-links" zIndex={"1000"}>
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
          className="navbar-h2"
          color={txt_500}
          _hover={{ color: txt_300, textShadow: "0px 0px 3px" }}
          onClick={() => navigate("/home")}
          borderBottom={page === "home" ? "1px solid" : "hidden"}
        >
          HOME
        </Heading>
        <Heading
          as="h2"
          className="navbar-h2"
          color={txt_500}
          _hover={{ color: txt_300, textShadow: "0px 0px 3px" }}
          onClick={() => navigate("/countries")}
          borderBottom={page === "exits" ? "1px solid" : "hidden"}
        >
          EXITS
        </Heading>
        <Heading
          as="h2"
          className="navbar-h2"
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
      <Image className="avatar" src={avatar} onClick={onOpen} />
      <Heading
        as="h3"
        className="name-placeholder"
        color={txt_500}
        onClick={onOpen}
      >
        {user[0].username}
      </Heading>
      {/* <Button onClick={() => console.log(user[0])}>User</Button> */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent className="modal" bg={bg_500}>
          <ModalHeader className="modal-header">
            <Image className="avatar" src={avatar} />
            <Text>splitseam</Text>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <List>
              <ListItem>Submitted exits:</ListItem>
              <ListItem>Comments:</ListItem>
              <ListItem>Settings</ListItem>
              <ListItem>Change Password</ListItem>
            </List>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Flex>
  );
}
