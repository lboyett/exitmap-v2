import "./login.css";
import axios from "axios";
import { useContext } from "react";
import { ExitDataContext } from "../../context/ExitDataContext";
import {
  Heading,
  FormControl,
  FormLabel,
  Input,
  Flex,
  Button,
  Text,
  useColorModeValue,
  useColorMode,
} from "@chakra-ui/react";
import { EventType } from "@testing-library/react";
import { useNavigate } from "react-router";
import { UserContext } from "../../context/UserContext";

interface FormInputs extends HTMLFormControlsCollection {
  email: HTMLInputElement;
  password: HTMLInputElement;
}

function Login() {
  const navigate = useNavigate();
  const [userContext, setUserContext] = useContext(UserContext);
  const { colorMode, toggleColorMode } = useColorMode();
  const lightMode = useColorModeValue(true, false);
  const inputColorMode = lightMode ? "input-light" : "input-dark";
  const txt_300 = useColorModeValue("txt_light.300", "txt_dark.300");
  const txt_500 = useColorModeValue("txt_light.500", "txt_dark.500");
  const out_500 = useColorModeValue("out_dark.500", "out_light.500");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    const url = "http://localhost:8000/login";
    e.preventDefault();
    const target = e.target as HTMLFormElement;
    const inputs = target.elements as FormInputs;
    try {
      const { data } = await axios.post(
        url,
        {
          email: inputs.email.value,
          password: inputs.password.value,
        },
        { withCredentials: true }
      );
      setUserContext(data);
    } catch (err: any) {
      console.log(err);
      if (err.response && err.response.data) console.log(err.response.data);
    }
  }

  function navigateToSignup() {
    navigate("/signup");
  }

  async function populateUser() {
    const userRes = await axios.post(
      "http://localhost:8000/populate-test-users",
      {
        username: "j",
        first_name: "j",
        last_name: "j",
        email: "j@j.j",
        password: "j",
        token: localStorage.getItem("token"),
      }
    );
  }

  return (
    <div className="login-page">
      <div className={`login-box ${inputColorMode}`}>
        <form className="login-form" onSubmit={(e) => handleSubmit(e)}>
          <Heading
            as="h2"
            fontSize="5xl !important"
            onClick={() => {
              toggleColorMode();
            }}
          >
            Login
          </Heading>

          <FormControl>
            <FormLabel>Email</FormLabel>
            <Input
              type="email"
              className={inputColorMode}
              name="email"
              required
            />
          </FormControl>

          <FormControl>
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              className={inputColorMode}
              name="password"
              required
            />
          </FormControl>

          <Flex className="register-user-button-container">
            <Button type="submit" bg={txt_500} color={out_500}>
              Sign In
            </Button>
            <Text onClick={navigateToSignup} className="already-registered">
              Need an account?
            </Text>
          </Flex>
        </form>
        <Button
          onClick={async () => {
            try {
              await axios.get("http://localhost:8000/test-authorization", {
                withCredentials: true,
              });
            } catch (err) {
              console.log(err);
            }
          }}
        >
          Make a get request
        </Button>
      </div>
    </div>
  );
}

export default Login;
