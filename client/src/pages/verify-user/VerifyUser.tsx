import "./verify-user.css";
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Flex,
  Text,
  useColorModeValue,
  Heading,
  useColorMode,
  useToast,
  Spinner,
} from "@chakra-ui/react";
import { useState, useEffect, useRef } from "react";
import axios, { AxiosResponse, AxiosError } from "axios";
import { useNavigate } from "react-router";
import { useSearchParams } from "react-router-dom";

function VerifyUser() {
  const { colorMode, toggleColorMode } = useColorMode();
  const lightMode = useColorModeValue(true, false);
  const inputColorMode = lightMode ? "input-light" : "input-dark";
  const txt_300 = useColorModeValue("txt_light.300", "txt_dark.300");
  const txt_500 = useColorModeValue("txt_light.500", "txt_dark.500");
  const out_500 = useColorModeValue("out_dark.500", "out_light.500");
  const toast = useToast();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [loading, setLoading] = useState(false);
  const effectRan = useRef(false);
  const [error, setError] = useState(false);
  const [errorCode, setErrorCode] = useState(0);
  

  useEffect(() => {
    if (effectRan.current === false) {
    postUUID();
    }
    effectRan.current = true;
    console.log(error)
  }, []);

  async function postUUID() {
    const uuid = searchParams.get('uuid')
    const url = `http://localhost:8000/users/verify-user/${uuid}`;
    try {
      console.log('POSTING TO /VERIFY-USER')
      const { data } = await axios.post(
        url,
        {uuid: uuid},
      )
    } catch (err: any) {
      setError(true)
      setErrorCode(err.response.data)
    }
  }

  function navigateToLogin() {
    navigate("/login");
  }

  if (error) {
    if (errorCode === 23505) {
    return (
      <Heading className="verified-page" as={"h3"}>
        This email has already been verified.
      </Heading>
    )
    } else {
      return (
        <Heading className="verified-page" as={"h3"}>
          There was an error verifying your email.
        </Heading>
      );
    }
  } else {
  return (
    <Heading className="verified-page" as={"h3"}>
			Thanks! Your email has been verified.
			<Button onClick={navigateToLogin} marginTop={'12px'}>Proceed to ExitMap</Button>
    </Heading>
  );
  }
}

export default VerifyUser;