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
			<div class="center">
				<div class="left">
					<div class="container">
						<h1>Welcome to React Learning Center</h1>
						<img 
      src="https://img.freepik.com/free-vector/audience-segmentation-abstract-concept-illustration_335657-3745.jpg?w=740&t=st=1666622720~exp=1666623320~hmac=2a25d4a816507599a6f56f61ec4e4c7fb60e64909aea3c9219422977cf980c67" 
	  height={350}
      alt="new"
      />
					</div>
				</div>
				<div class='right'>
					<h1>Email:</h1>
					<input 
						placeholder="Enter Email"
						type="text"
						onChange={onChange}
						data-testid="email"
						name="email"
					/><br />

					<h1>Password:</h1>
					<input 
						placeholder="Enter password"
						type="password"
						onChange={onChange}
						data-testid="password"
						name="password"
					/>
					<br/><br/>
					<button
						onClick={handleUserLogin} 
						data-testid="send-user-login"
					>
						Login
					</button>
					<br/>
					<h2 data-testid="result">Server Reply: {result}</h2>
				</div>
			</div>
		</>
	) : (

		<Dashboard token={result} logout={handleLogout}/> 
	)
};

export default Login;