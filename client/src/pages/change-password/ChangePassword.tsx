import {
  FormControl,
  FormLabel,
  Input,
  useToast,
  useColorModeValue,
  Button,
  Spinner,
  Box,
  Heading,
  Flex,
} from "@chakra-ui/react";
import React, { useContext, useState } from "react";
import NavBar from "../../components/navbar/NavBar";
import "./change-password.css";
import { UserContext } from "../../context/UserContext";
import axios from "axios";

export default function ChangePassword() {
  const [user, setUser] = useContext(UserContext);
  const lightMode = useColorModeValue(true, false);
  const inputColorMode = lightMode ? "input-light" : "input-dark";
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const toast = useToast();

  async function handleSubmit(e: React.FormEvent) {
    console.log(user)
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");
    const target = e.target;
    const inputs = (target as any).elements;
    if (user._id === 18) {
      toast({
        title: "Sorry!",
        description: "Demo users cannot change the account password",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      setLoading(false)
      return
    }
    if (!validateForm(inputs)) {
      setLoading(false);
      return;
    }
    const data = {
      user: user._id,
      old_password: inputs.old_password.value,
      new_password: inputs.new_password.value,
    };
    const url = `${import.meta.env.VITE_SERVER_DOMAIN_NAME}/users/${
      user._id
    }/change-password`;
    try {
      await axios.put(url, data, { withCredentials: true });
      setSuccess(true);
    } catch (err: any) {
      console.log(err);
      if (err.response.status && err.response.status === 401) {
        toast({
          title: "Error",
          description: "Incorrect old password",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      } else {
        toast({
          title: "Error",
          description: "Error changing password",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    } finally {
      setLoading(false);
    }
  }

  function validateForm(inputs: any) {
    if (!inputs.old_password.value) {
      setErrorMessage("Must provide your old password.");
      return false;
    } else if (!inputs.new_password.value) {
      setErrorMessage("Must provide your new password.");
      return false;
    } else return true;
  }
  return (
    <div className="change-password">
      <NavBar currentPage="home" />
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
            <FormLabel>Old Password</FormLabel>
            <Input
              type="password"
              name="old_password"
              className={inputColorMode}
            />
          </FormControl>

          <FormControl>
            <FormLabel>New Password</FormLabel>
            <Input
              type="password"
              name="new_password"
              className={inputColorMode}
            />
          </FormControl>
          {loading ? (
            <Spinner />
          ) : (
            <Flex alignItems="center" gap="1rem">
              <Button type="submit">Submit</Button>
              <Box color="red">{errorMessage}</Box>
            </Flex>
          )}
        </form>
      )}
    </div>
  );
}
