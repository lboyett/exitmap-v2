import './login.css';
import axios from 'axios';
import { useContext } from 'react';
import { ExitDataContext } from '../../ExitDataContext';

function Login() {
  const url = "http://localhost:8000/login";
	const { exitDataContext, setExitDataContext } = useContext(ExitDataContext);

	async function login() {
		try {
			const loginRes = await axios.post(url, {
				username: 'username',
				password: 'password',
			})
		} catch (err) {
			console.log('THERE IS AN ERROR')
		}
	}

	return ( 
	<div className="login">
		<button className='auth-test' onClick={() => login()}>TEST AUTHENTICATION</button>
		<button className='auth-test' onClick={() => setExitDataContext('hey')}>{exitDataContext}</button>
		Login</div> );
}

export default Login;