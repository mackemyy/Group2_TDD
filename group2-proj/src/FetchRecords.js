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
			<table data-testid="dashboardTable">
			<h2>List of Students</h2>
				<thead>
					<tr>
						<th data-testid="tableHeader" class ="thleft">ID</th>
						<th>Name</th>
						<th>Username</th>
						<th>Email</th>
						<th class="thright">Action</th>
					</tr>
				</thead>
				<tbody>
					{ records.length && records.map((records, i)=> (
						<tr>
							<td key={i}data-testid="user">{records.id}</td>
							<td key={i}data-testid="user">{records.name}</td>
							<td key={i}data-testid="user">{records.username}</td>
							<td key={i}data-testid="user">{records.email}</td>
							<td><button data-testid="view-details-btn" onClick={handleViewDetails.bind(this, records.id)}>View Details</button></td>
							{/* <td><a href="#\" data-testid="viewDetails" onClick={handleViewDetails.bind(this, records.id)}>View Details</a></td> */}
						</tr>
					))}
				</tbody>
				
			</table>
			<h2 data-testid="total-users">Total Students: {totalUsers}</h2>
		</>
	): (
		<ViewDetails indivUser={userID} viewTable={handleBackToDashboard}/>
	)
};

export default FetchRecords;