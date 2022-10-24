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
			<table>
				<thead>
					<tr>
						<th>ID</th>
						<th>Name</th>
						<th>Username</th>
						<th>Email</th>
						<th>Action</th>
					</tr>
				</thead>
				<tbody>
					{ records.length && records.map((records, i)=> (
						<tr>
							<td data-testid="userID">{records.id}</td>
							<td data-testid="name">{records.name}</td>
							<td data-testid="username">{records.username}</td>
							<td data-testid="userEmail">{records.email}</td>
							<td><a href="#\" data-testid="viewDetailsLink" onClick={handleViewDetails.bind(this, records.id)}>View Details</a></td>
						</tr>
					))}
				</tbody>
				
			</table>
			<h2 data-testid="total-users">Total Customers: {totalUsers}</h2>
		</>
	): (
		<ViewDetails indivUser={userID} viewTable={handleBackToDashboard}/>
	)
};

export default FetchRecords;