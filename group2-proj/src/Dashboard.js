import { useState } from "react";

import FetchRecords from "./FetchRecords";

const Dashboard = (props) => { 

	const [token, setToken] = useState(props ? props.token : ''); 
	const onLogout = (evt) => {
		const { logout } = props; 
		setToken('');
		if(logout) {  
			logout(); 
		}
	};

	return(
		<>
			<h1>Menu(navbar ni diri)</h1>
			<ul>
				<li>user {token}</li>
				<li><a href='#\' onClick={onLogout}>Logout</a></li>
			</ul>
			<h2>List of Customers</h2>
			<ul>
				{
					<FetchRecords/>
				}
			</ul>
		</>
	)
};

export default Dashboard;