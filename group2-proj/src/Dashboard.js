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
				<div class = "navbar">
					<li class = "title">React Learning Center</li>
					<li><button class ="button"
						onClick={onLogout} 
						data-testid="logout-btn"
					>
						Logout
					</button></li>
				</div>
				<div class = "username" data-testid="token">User Token:  {token} </div> 
			</div>
			<ul class="listname">
				{
					<FetchRecords/>
				}
			</ul>
		</>
	)
};

export default Dashboard;