import { useState } from "react";

import Dashboard from './Dashboard';

const Login = () => {
	const [showDashboard, setShowDashboard] = useState(false);

	const [user, setUser] = useState({
		email: '',
		password: ''
	});

	const [result, setResult] = useState('');


	const onChange = (evt) => {
		const value = evt.target.value;
		const name = evt.target.name;
		setUser({
			...user,
			[name]: value 
		});
	};

	const sendLogin = async (user) => {
		console.log(user);

		const url = 'https://reqres.in/api/login';
		const params = {
			"email": user.email,
			"password": user.password
		}

		fetch(url, {
		  method: 'POST',
		  headers: {
		    'Content-Type': 'application/json',
		  },
		  body: JSON.stringify(params), 
		})
		.then((response) => response.json())
		.then((data) => {
		  	if(data && data.token) {
		  		setResult(data.token);
		  		setShowDashboard(true);
		  	}else{
		  		setResult('Error login. Please verify.')
		  	}
		})
		.catch((error) => {
		  console.error('Error:', error);
		});
	};

	const handleUserLogin = () => {
		sendLogin(user);
	};

	const handleLogout = () => {
		setShowDashboard(false);
		setResult('');
	};

	return !showDashboard ? ( 
		<>
			<input 
				placeholder="Enter Email"
				type="text"
				onChange={onChange}
				data-testid="email"
				name="email"
			/><br />
			<input 
				placeholder="Enter password"
				type="password"
				onChange={onChange}
				data-testid="password"
				name="password"
			/>
			<br/>
			<button
				onClick={handleUserLogin} 
				data-testid="send-user-login"
			>
				Login
			</button>
			<br/>
			<h2 data-testid="result">Server Reply: {result}</h2>
		</>
	) : (

		<Dashboard token={result} logout={handleLogout}/> 
	)
};

export default Login;