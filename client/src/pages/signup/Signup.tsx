import "./signup.css";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  Textarea,
  Select,
  Checkbox,
  CheckboxGroup,
  Stack,
  Button,
  Flex,
  Box,
  Text,
  useColorModeValue,
  Heading,
  useColorMode,
	useToast,
} from "@chakra-ui/react";
import ReCAPTCHA from "react-google-recaptcha";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";

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

  const [capState, setCapState] = useState<boolean>(false);

  const url = "http://localhost:8000/users"
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
			return
		}
    const target = e.target as HTMLFormElement;
    const inputs = target.elements as FormInputs;
    const headers = {
      first_name: inputs.first_name.value,
      last_name: inputs.last_name.value,
      username: inputs.username.value,
      email: inputs.email.value,
      password: inputs.password.value,
    }
    axios.post(url, { headers });
    navigate('/home')
  }

  function validateRecaptcha(value: any) {
    setCapState(value);
  }

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
          <Input type="text" className={inputColorMode} name="first_name" />
          </FormControl>

          <FormControl>
          <FormLabel>Last Name</FormLabel>
          <Input type="text" className={inputColorMode} name="last_name" />
          </FormControl>

          <FormControl>
          <FormLabel>Username</FormLabel>
          <Input type="text" className={inputColorMode} name="username" />
          </FormControl>

          <FormControl>
          <FormLabel>Email</FormLabel>
          <Input type="email" className={inputColorMode} name="email" />
          </FormControl>

          <FormControl>
          <FormLabel>Password</FormLabel>
          <Input type="password" className={inputColorMode} name="password" />
          </FormControl>

          <ReCAPTCHA
            className="recaptcha"
						theme='dark'
            sitekey={import.meta.env.VITE_GOOGLE_RECAPTCHA_KEY}
            onChange={validateRecaptcha}
          />
          <Flex className="register-user-button-container">
            <Button type="submit" bg={txt_500} color={out_500}>
              SUBMIT
            </Button>
            <Text className='already-registered'>Already registered?</Text>
          </Flex>
        </form>
      </div>
    </div>
  );
}

export default Signup;
