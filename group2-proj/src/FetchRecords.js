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

	// const handleViewDetails = () => {
	// 	setViewDetails(true);
	// }

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
						<th>Phone</th>
						<th>Action</th>
					</tr>
				</thead>
				<tbody>
					{ records.length && records.map((records, i)=> (
						<tr>
							<td>{records.id}</td>
							<td>{records.name}</td>
							<td>{records.username}</td>
							<td>{records.email}</td>
							<td>{records.phone}</td>
							{/* <td ><button onClick={handleViewDetails(records[i])}>View Details</button></td> */}
							<td><a href="#\" onClick={handleViewDetails.bind(this, records.id)}>View Details</a></td>
						</tr>
					))}
				</tbody>
				
			</table>
			{/* <h1>Users</h1>
			<ul>
			{ 	records.length && records.map((rec, i)=>(
					<li key={i} data-testid='user'>{rec.id}</li>
				))
			}
			</ul>
			<h2 data-testid="total-users">Total Users: {totalUsers}</h2> */}
			<h2 data-testid="total-users">Total Customers: {totalUsers}</h2>
		</>
	): (
		//<ViewDetails user={indivUser} viewTable={handleBackToDashboard}/>
		<ViewDetails indivUser={userID} viewTable={handleBackToDashboard}/>
		// <p>Fetching...</p>
	)
};

export default FetchRecords;