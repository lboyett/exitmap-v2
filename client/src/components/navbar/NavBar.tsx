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
import axios, { AxiosResponse } from "axios";
import Exit from "../../type-definitions/exit";
import { UserContext } from "../../context/UserContext";
import format from "date-fns/format";
import AvatarComp from "../avatar/AvatarComp";

type CurrentPage = "home" | "exits" | "submit" | "admin";
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
  const bg_400 = useColorModeValue("bg_light.400", "bg_dark.400");
  const out_500 = useColorModeValue("out_light.500", "out_dark.500");
  const lightMode = useColorModeValue(true, false);
  const [userExits, setUserExits] = useState<Exit[]>([]);
  const [userComments, setUserComments] = useState<[]>([]);
  const [user, setUser] = useContext(UserContext);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    (async () => {
      try {
        await getUserExits(user._id);
        await getUserComments(user._id);
      } catch (err) {
        console.log(err);
      }
    })();
  }, [user]);

  async function getUserExits(id: number) {
    if (!id) return;
    const url = `${
      import.meta.env.VITE_SERVER_DOMAIN_NAME
    }/exits/by-user-id/${id}`;
    const { data } = (await axios.get(url, {
      withCredentials: true,
    })) as AxiosResponse;
    setUserExits(data);
  }
  async function getUserComments(id: number) {
    if (!id) return;
    const url = `${
      import.meta.env.VITE_SERVER_DOMAIN_NAME
    }/comments/by-user-id/${id}`;
    const { data } = (await axios.get(url, {
      withCredentials: true,
    })) as AxiosResponse;
    setUserComments(data);
  }

  async function logoutUser() {
    setErrorMessage("");
    const url = `${import.meta.env.VITE_SERVER_DOMAIN_NAME}/logout`;
    try {
      await axios.get(url, { withCredentials: true });
      navigate("/login");
      window.location.reload();
    } catch (err: any) {
      setErrorMessage("There is an error. Please contact us or try again.");
    }
  }
  return (
    <Flex
      className="navbar"
      bg={lightMode ? bg_400 : bg_500}
      borderBottom={lightMode ? "1px solid" : "none"}
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
            {user.is_admin ? (
              <MenuItem
                bg={bg_500}
                _hover={{ color: txt_300, textShadow: "0px 0px 3px" }}
                onClick={() => navigate("/admin")}
              >
                <Text borderBottom={page === "admin" ? "1px solid" : "hidden"}>
                  ADMIN
                </Text>
              </MenuItem>
            ) : null}
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
        {user.is_admin ? (
          <Heading
            as="h2"
            className="navbar-h2"
            color={txt_500}
            _hover={{ color: txt_300, textShadow: "0px 0px 3px" }}
            onClick={() => navigate("/admin")}
            borderBottom={page === "admin" ? "1px solid" : "hidden"}
          >
            ADMIN
          </Heading>
        ) : null}
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
      <AvatarComp onClick={onOpen} />
      <Heading
        as="h3"
        className="name-placeholder"
        color={txt_500}
        onClick={() => onOpen()}
      >
        {user.username}
      </Heading>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent className="modal" bg={bg_500}>
          <ModalHeader className="modal-header">
            <AvatarComp id="modal-avatar" modal={true} />
            <Text>{user.username}</Text>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <List>
              <ListItem>Submitted exits: {userExits.length}</ListItem>
              <ListItem>Comments: {userComments.length}</ListItem>
              <ListItem>
                User Since:{" "}
                {user && user.created_at
                  ? format(new Date(user.created_at), "d MMMM yyyy")
                  : null}
              </ListItem>
              <ListItem
                className="modal-link"
                onClick={() => {
                  onClose();
                  navigate("/change-password");
                }}
              >
                Change Password
              </ListItem>
              <ListItem
                className="modal-link"
                onClick={() => {
                  onClose();
                  navigate("/contact-us");
                }}
              >
                Contact Us
              </ListItem>
              <Flex>
                <ListItem
                  className="logout"
                  onClick={() => {
                    logoutUser();
                  }}
                >
                  Logout
                </ListItem>
                {errorMessage ? (
                  <Text color="red" ml="1rem">
                    {errorMessage}
                  </Text>
                ) : null}
              </Flex>
            </List>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Flex>
  );
}
