import {
  FormControl,
  FormLabel,
  Input,
  Textarea,
  useColorModeValue,
  Button,
  Spinner,
  Box,
  Heading,
  Flex,
  useToast
} from "@chakra-ui/react";
import React, { useContext, useState } from "react";
import NavBar from "../../components/navbar/NavBar";
import "./reset-password.css";
import { UserContext } from "../../context/UserContext";
import axios, { AxiosResponse} from "axios";
import { useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

interface FormInputs extends HTMLFormControlsCollection {
  password: HTMLInputElement;
  confirmPassword: HTMLInputElement;
}

export default function ChangePassword() {
  const [user, setUser] = useContext(UserContext);
  const lightMode = useColorModeValue(true, false);
  const inputColorMode = lightMode ? "input-light" : "input-dark";
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [errorMessage, setErrorMessage] = useState("");
  const toast = useToast();
  const navigate = useNavigate();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const uuid = searchParams.get('uuid')
    const url = `http://localhost:8000/reset-password/${uuid}`;
    const target = e.target as HTMLFormElement;
    const inputs = target.elements as FormInputs;
    if (inputs.password.value !== inputs.confirmPassword.value) {
      toast({
        title: "Error",
        description: "The passwords do not match",
        status: "error",
        duration: 1000,
        isClosable: true,
      });
      return
    }
    try {
      const response = (await axios.post(url, {
        password: inputs.password.value
      })) as AxiosResponse;
      toast({
        title: "Thanks!",
        description: "You have successfully changed your password.",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
      navigate("/login")
    } catch (err: any) {
      if (err.response.status === 404) {
        toast({
          title: "Error",
          description: "Please click the password reset link sent to your email.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
      console.log(err)
    }
  }

  // function validateForm(inputs: any) {
  //   if (!inputs.old_password.value) {
  //     setErrorMessage("Must provide your old password.");
  //     return false;
  //   } else if (!inputs.new_password.value) {
  //     setErrorMessage("Must provide your new password.");
  //     return false;
  //   } else return true;
  // }

  return (
    <div className="reset-password">
      {success ? (
        <Box className="submit-success-div">
          <Heading as="h4">Password changed successfully.</Heading>
        </Box>
      ) : (
        <form
          onSubmit={(e) => {
            handleSubmit(e);
          }}
          className="contact-us-form"
        >
          <FormControl>
            <FormLabel>New Password</FormLabel>
            <Input
              type="password"
              name="password"
              className={inputColorMode}
            />
          </FormControl>

          <FormControl>
            <FormLabel marginTop={'8px'}>Confirm Password</FormLabel>
            <Input
              type="password"
              name="confirmPassword"
              className={inputColorMode}
            />
          </FormControl>
          {loading ? (
            <Spinner />
          ) : (
            <Flex alignItems="center" gap="1rem">
              <Button type="submit" marginTop={'12px'}>Submit</Button>
              <Box color="red">{errorMessage}</Box>
            </Flex>
          )}
        </form>
      )}
    </div>
  );
}
