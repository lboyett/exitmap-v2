import './login.css';
import axios from 'axios';
import { useContext } from 'react';
import { ExitDataContext } from '../../ExitDataContext';
import { Heading, FormControl, FormLabel, Input, Flex, Button, Text, useColorModeValue, useColorMode  } from '@chakra-ui/react';
import { EventType } from '@testing-library/react';
import { useNavigate } from 'react-router';

interface FormInputs extends HTMLFormControlsCollection {
  email: HTMLInputElement;
  password: HTMLInputElement;
}

function Login() {
	const navigate = useNavigate();
	const { colorMode, toggleColorMode } = useColorMode();
	const lightMode = useColorModeValue(true, false);
  const inputColorMode = lightMode ? "input-light" : "input-dark";
	const txt_300 = useColorModeValue("txt_light.300", "txt_dark.300");
  const txt_500 = useColorModeValue("txt_light.500", "txt_dark.500");
  const out_500 = useColorModeValue("out_dark.500", "out_light.500");

  const url = "http://localhost:8000/login";

	// async function login() {
	// 	try {
	// 		const loginRes = await axios.post(url, {
	// 			username: 'username',
	// 			password: 'password',
	// 		})
	// 	} catch (err) {
	// 		console.log('THERE IS AN ERROR')
	// 	}
	// }

	async function handleSubmit(e: React.FormEvent<HTMLFormElement>){
		e.preventDefault();
		const target = e.target as HTMLFormElement;
    const inputs = target.elements as FormInputs;
    const headers = {
      email: inputs.email.value,
      password: inputs.password.value,
    };

		try {
			const loginRes = await axios.post(url, { 
        username: inputs.email.value,
        password: inputs.password.value
       })
		} catch (err) {
			console.log('THERE IS AN ERROR')
		}
	}

	function navigateToSignup() {
    navigate('/signup')
  }

  async function populateUser() {
    const userRes = await axios.post('http://localhost:8000/populate-test-users', {
      username: 'j',
      first_name: 'j',
      last_name: 'j',
      email: 'j@j.j',
      password: 'j',
    })
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
            <Input type="email" className={inputColorMode} name="email" />
          </FormControl>

          <FormControl>
            <FormLabel>Password</FormLabel>
            <Input type="password" className={inputColorMode} name="password" />
          </FormControl>

          <Flex className="register-user-button-container">
            <Button type="submit" bg={txt_500} color={out_500}>
              Sign In
            </Button>
            <Text onClick={navigateToSignup} className="already-registered">Need an account?</Text>
          </Flex>
        </form>
        <button style={{marginTop: '12px', background: 'blue'}} onClick={populateUser}>Click this to populate the DB with a proper user</button>
      </div>
    </div> );
}

export default Login;