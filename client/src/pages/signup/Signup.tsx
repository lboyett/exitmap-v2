import "./signup.css";
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
import ReCAPTCHA from "react-google-recaptcha";
import { useState } from "react";
import axios, { AxiosResponse, AxiosError } from "axios";
import { useNavigate } from "react-router";
import Recaptcha from "react-recaptcha";

interface FormInputs extends HTMLFormControlsCollection {
  first_name: HTMLInputElement;
  last_name: HTMLInputElement;
  username: HTMLInputElement;
  email: HTMLInputElement;
  password: HTMLInputElement;
}

function Signup() {
  const { colorMode, toggleColorMode } = useColorMode();
  const lightMode = useColorModeValue(true, false);
  const inputColorMode = lightMode ? "input-light" : "input-dark";
  const txt_300 = useColorModeValue("txt_light.300", "txt_dark.300");
  const txt_500 = useColorModeValue("txt_light.500", "txt_dark.500");
  const out_500 = useColorModeValue("out_dark.500", "out_light.500");
  const toast = useToast();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const [capState, setCapState] = useState<boolean>(false);

  const url = `${import.meta.env.VITE_SERVER_DOMAIN}/users`;
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!capState) {
      toast({
        title: "Wait a minute!",
        description: "Please check the recaptcha box.",
        status: "error",
        duration: 1500,
        isClosable: true,
      });
      return;
    }
    setLoading(true);
    const target = e.target as HTMLFormElement;
    const inputs = target.elements as FormInputs;
    const headers = {
      first_name: inputs.first_name.value,
      last_name: inputs.last_name.value,
      username: inputs.username.value,
      email: inputs.email.value,
      password: inputs.password.value,
    };
    try {
      const userRes = await axios.post(url, { headers });
      setSubmitted(true);
    } catch (err: any) {
      console.log(err);
      handleError(err.response.data.constraint);
    } finally {
      setLoading(false);
    }
  }

  function handleError(constraint: string) {
    let expression = "There was a problem with your submission!";
    switch (constraint) {
      case "users_username_key":
        expression = "That username already exists.";
        break;
      case "users_email_key":
        expression = "That email already exists in our database.";
        break;
      default:
        expression;
        break;
    }
    toast({
      title: "Wait a minute!",
      description: `${expression}`,
      status: "error",
      duration: 5000,
      isClosable: true,
    });
  }

  function validateRecaptcha(value: any) {
    setCapState(value);
  }

  function navigateToLogin() {
    navigate("/login");
  }

  if (submitted) {
    return (
      <Heading className="verified-page" as={"h3"}>
        Please check your email for the verification link.
      </Heading>
    );
  } else {
    return (
      <div className="signup-page">
        <div className={`signup-box ${inputColorMode}`}>
          <form className="signup-form" onSubmit={(e) => handleSubmit(e)}>
            <Heading
              as="h2"
              fontSize="5xl !important"
              onClick={() => {
                toggleColorMode();
              }}
            >
              Sign Up
            </Heading>

            <FormControl>
              <FormLabel>First Name</FormLabel>
              <Input
                type="text"
                className={inputColorMode}
                name="first_name"
                maxLength={20}
              />
            </FormControl>

            <FormControl>
              <FormLabel>Last Name</FormLabel>
              <Input
                type="text"
                className={inputColorMode}
                name="last_name"
                maxLength={20}
              />
            </FormControl>

            <FormControl>
              <FormLabel>Username</FormLabel>
              <Input
                type="text"
                className={inputColorMode}
                name="username"
                maxLength={16}
              />
            </FormControl>

            <FormControl>
              <FormLabel>Email</FormLabel>
              <Input
                type="email"
                className={inputColorMode}
                name="email"
                maxLength={100}
              />
            </FormControl>

            <FormControl>
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                className={inputColorMode}
                name="password"
                maxLength={100}
              />
            </FormControl>

            <ReCAPTCHA
              className="recaptcha"
              sitekey={import.meta.env.VITE_SITE}
              theme="dark"
              size="normal"
              onChange={validateRecaptcha}
            />
            {/* <Recaptcha
            sitekey={import.meta.env.VITE_SITE}
            onloadCallback={() => console.log("loaded")}
          /> */}
            {loading ? (
              <Flex justifyContent="center">
                <Spinner size="lg" />
              </Flex>
            ) : (
              <Flex className="register-user-button-container">
                <Button type="submit" bg={txt_500} color={out_500}>
                  SUBMIT
                </Button>
                <Text onClick={navigateToLogin} className="already-registered">
                  Already registered?
                </Text>
              </Flex>
            )}
          </form>
        </div>
      </div>
    );
  }
}

export default Signup;
