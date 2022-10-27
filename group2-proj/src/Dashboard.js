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
			<div className = "header">
				<div className = "navbar">
					<li className = "title">React Learning Center</li>
					<li><button className ="button"
						onClick={onLogout} 
						data-testid="logout-btn"
					>
						Logout
					</button></li>
				</div>
				<div className="token" data-testid="token">User Token: {token} </div> 
			</div>
			<ul className="listname">
				{
					<FetchRecords/>
				}
			</ul>
		</>
	)
};

export default Dashboard;