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
} from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";
import NavBar from "../../components/navbar/NavBar";
import "./contact-us.css";
import { UserContext } from "../../context/UserContext";
import axios from "axios";

export default function ContactUs() {
  const [user, setUser] = useContext(UserContext);
  const lightMode = useColorModeValue(true, false);
  const inputColorMode = lightMode ? "input-light" : "input-dark";
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    const target = e.target;
    const inputs = (target as any).elements;
    const data = {
      access_key: import.meta.env.VITE_WEB3_KEY,
      name: inputs.name.value,
      email: inputs.email.value,
      subject: inputs.subject.value,
      message: inputs.message.value,
    };
    const json = JSON.stringify(data);
    try {
      const res = await axios.post("https://api.web3forms.com/submit", json, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });
      setSuccess(true);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }
  return (
    <div className="contact-us">
      <NavBar currentPage="home" />
      {success ? (
        <Box className="submit-success-div">
          <Heading as="h4">Message submitted successfully.</Heading>
          <Box>
            We will respond to your message as soon as we can. Thank you for
            your patience.
          </Box>
          <Button onClick={() => setSuccess(false)}>
            Submit another message
          </Button>
        </Box>
      ) : (
        <form
          onSubmit={(e) => {
            handleSubmit(e);
          }}
          className="contact-us-form"
        >
          <FormControl>
            <FormLabel>Name</FormLabel>
            <Input
              type="text"
              name="name"
              defaultValue={
                user.first_name
                  ? user.last_name
                    ? `${user.first_name} ${user.last_name}`
                    : user.first_name
                  : undefined
              }
              className={inputColorMode}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Email</FormLabel>
            <Input
              type="email"
              name="email"
              defaultValue={user.email}
              className={inputColorMode}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Subject</FormLabel>
            <Input type="text" name="subject" className={inputColorMode} />
          </FormControl>
          <FormControl>
            <FormLabel>Message</FormLabel>
            <Textarea
              resize={"none"}
              name="message"
              className={inputColorMode}
            />
          </FormControl>
          {loading ? <Spinner /> : <Button type="submit">Submit</Button>}
        </form>
      )}
    </div>
  );
}
