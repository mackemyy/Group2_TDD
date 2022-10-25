import { useState } from "react";
import './Dashboard.css';
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
			<div class = "header">
				{/* <h1>Menu</h1> */}
				<ul class = "navbar">
					<li class = "list">Home</li>
                    <li class = "list">News</li>
                    <li class = "list">Contact</li>
				</ul>
				<ul>
				<li class = "user">user {token} <a href='#\' onClick={onLogout}>Logout</a></li> 
				</ul>
			</div>
			<h2>List of Customers</h2>
			<ul class="listname">
				{
					<FetchRecords/>
				}
			</ul>
		</>
	)
};

export default Dashboard;