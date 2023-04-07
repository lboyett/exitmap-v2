import {
  Avatar,
  AvatarBadge,
  AvatarProps,
  useColorModeValue,
  Box,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Flex,
  Button,
  Text,
  Spinner,
} from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCrown, faCamera } from "@fortawesome/free-solid-svg-icons";
import { UserContext } from "../../context/UserContext";
import { useContext, useEffect, useState } from "react";
import "./avatar-comp.css";
import FileInput from "../submit-exit-form/file-input/FileInput";
import axios from "axios";
import { getSignedUrl } from "../submit-exit-form/submit-exit-functions";

interface AvatarCompProps extends AvatarProps {
  modal?: boolean | undefined;
  userId?: string | undefined;
}

export default function AvatarComp(props: AvatarCompProps) {
  const [overlay, setOverlay] = useState(false);
  const [user, setUser] = useContext(UserContext);
  const txt_500 = useColorModeValue("txt_light.500", "txt_dark.500");
  const bg_500 = useColorModeValue("bg_light.500", "bg_dark.500");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [formData, setFormData] = useState<FormData>();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [name, setName] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  async function handleSubmit(formData: FormData, user_id: string) {
    setErrorMessage("");
    setLoading(true);
    const avatarUrl = `http://localhost:8000/images/avatars/${user_id}`;
    const file = formData.get("image") as File;
    try {
      const { signedUrl, key } = await getSignedUrl();
      await axios.put(signedUrl, file, {
        headers: {
          "Content-Type": file.type,
        },
      });
      await axios.put(avatarUrl, {
        key: key,
      });
      setLoading(false);
      onClose();
      const newUser = user;
      newUser.avatar_key = key;
      setUser(newUser);
      setAvatarUrl(`https://ik.imagekit.io/lboyett/${key}?tr=w-200`);
    } catch (err) {
      setErrorMessage("Error uploading image.");
      setLoading(false);
    }
  }

  useEffect(() => {
    if (props.userId) {
      updateUserByUserId(props.userId);
    } else {
      setAvatarUrl(
        `https://ik.imagekit.io/lboyett/${user.avatar_key}?tr=w-200`
      );
      setName(`${user.first_name} ${user.last_name}`);
      setIsAdmin(user.is_admin);
    }
  }, [user, props.userId]);

  async function updateUserByUserId(user_id: string) {
    const userUrl = `http://localhost:8000/users/${user_id}`;
    try {
      const { data } = await axios.get(userUrl);
      setAvatarUrl(
        `https://ik.imagekit.io/lboyett/${data.avatar_key}?tr=w-200`
      );
      setName(`${data.username}`);
      setIsAdmin(data.is_admin);
    } catch (err) {} //FixThis
  }

  return (
    <Avatar
      name={name}
      bg={txt_500}
      color={bg_500}
      className={`avatar ${props.className}`}
      id={props.id}
      src={avatarUrl}
      onClick={(e) => {
        if (props.onClick) props.onClick(e);
        if (props.modal) onOpen();
      }}
      onMouseEnter={() => {
        if (props.modal) {
          setOverlay(true);
        }
      }}
      onMouseLeave={() => {
        if (props.modal) {
          setOverlay(false);
        }
      }}
    >
      {isAdmin ? (
        <AvatarBadge
          border={`2px solid`}
          borderColor="white"
          borderRadius="50%"
          padding="0.3rem"
          bg={"bg_dark.500"}
          zIndex={1}
        >
          <FontAwesomeIcon icon={faCrown} color="gold" fontSize="95%" />
        </AvatarBadge>
      ) : null}

      <Box
        className="update-avatar-overlay"
        display={overlay ? "block" : "none"}
      >
        <FontAwesomeIcon
          icon={faCamera}
          color="white"
          className="camera-icon"
        />
      </Box>
      <Modal
        isOpen={isOpen}
        onClose={() => {
          setErrorMessage("");
          onClose();
        }}
      >
        <ModalOverlay />
        <ModalContent className="image-upload-modal" bg={bg_500}>
          <ModalCloseButton />
          <ModalBody>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (!formData) {
                  setErrorMessage("Please select an image.");
                  return;
                }
                handleSubmit(formData, user._id);
              }}
            >
              <FileInput
                updateForm={(formData: FormData) => {
                  setFormData(formData);
                }}
                isInvalidFileType={false}
              />
              <Flex className="upload-button-container">
                <Button type="submit">Upload</Button>
                {loading ? <Spinner /> : null}
                {errorMessage ? (
                  <Text className="image-error-message">{errorMessage}</Text>
                ) : null}
              </Flex>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Avatar>
  );
}
