import "./forgot-password.css";
import axios from "axios";
import { useContext, useState } from "react";
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
  Spinner,
  useToast,
} from "@chakra-ui/react";
import { EventType } from "@testing-library/react";
import { useNavigate } from "react-router";
import { UserContext } from "../../context/UserContext";

interface FormInputs extends HTMLFormControlsCollection {
  email: HTMLInputElement;
  password: HTMLInputElement;
}

function ForgotPassword() {
  const navigate = useNavigate();
  const [userContext, setUserContext] = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const { colorMode, toggleColorMode } = useColorMode();
  const lightMode = useColorModeValue(true, false);
  const inputColorMode = lightMode ? "input-light" : "input-dark";
  const txt_500 = useColorModeValue("txt_light.500", "txt_dark.500");
  const toast = useToast();
  const out_500 = useColorModeValue("out_dark.500", "out_light.500");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    setLoading(true);
    const url = "http://localhost:8000/forgot-password";
    e.preventDefault();
    const target = e.target as HTMLFormElement;
    const inputs = target.elements as FormInputs;
    try {
      const { data } = await axios.post(
        url,
        {email: inputs.email.value},
      )
    } catch (err: any) {
    } finally {
    }
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
    <div className="forgot-password-page">
      <div className={`forgot-password-box ${inputColorMode}`}>
        <form className="forgot-password-form" onSubmit={(e) => handleSubmit(e)}>
          <Heading
            as="h2"
            fontSize="5xl !important"
            onClick={() => {
              toggleColorMode();
            }}
          >
            Forgot password?
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

          <Flex className="register-user-button-container">
            {loading ? (
              <Spinner />
            ) : (
              <>
                <Button type="submit" className="reset-password" bg={txt_500} color={out_500}>
                  Reset password
                </Button>
              </>
            )}
          </Flex>
        </form>
      </div>
    </div>
  );
}

export default ForgotPassword;
