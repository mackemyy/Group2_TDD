import { useEffect, useState } from 'react';

import ViewDetails from './ViewDetails';

const FetchRecords = () => {
	const [records, setRecords] = useState([]);
	const [totalUsers, setTotalUsers] = useState(0);
	const [showViewDetails, setViewDetails] = useState(false);
	const [userID, setUserID] = useState('');

	const fetchData = async () => {
		const response = await fetch(
			"https://jsonplaceholder.typicode.com/users"
	  	).then((response) => response.json());
	  	setRecords(response);
	  	setTotalUsers(response.length);
	};

	const handleBackToDashboard = () => {
		setViewDetails(false);
	}

	const handleViewDetails = (userID) => {
		setViewDetails(true);
		setUserID(userID);
	}


	useEffect(()=>{
		fetchData();	
	},[]);

	return !showViewDetails ? (
		<>
			<h2>List of Students</h2>
			<table data-testid="dashboardTable">
				<thead>
					<tr>
						<th data-testid="tableHeader" className="thleft">ID</th>
						<th>Name</th>
						<th>Username</th>
						<th>Email</th>
						<th className="thright">Action</th>
					</tr>
				</thead>
				<tbody>
					{ records.length && records.map((records, i)=> (
						<tr key={i}>
							<td data-testid="userID">{records.id}</td>
							<td data-testid="name">{records.name}</td>
							<td data-testid="username">{records.username}</td>
							<td data-testid="email">{records.email}</td>
							<td><button data-testid="view-details-btn" onClick={handleViewDetails.bind(this, records.id)} className="btnDetails">View Details</button></td>
						</tr>
					))}
				</tbody>
				
			</table>
			<h2 data-testid="total-users">Total Students: {totalUsers}</h2>
		</>
	) : 
	(
		<ViewDetails indivUser={userID} viewTable={handleBackToDashboard}/>
	)
};

export default FetchRecords;