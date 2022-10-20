import { useEffect, useState } from 'react';

const FetchRecords = () => {

	const [records, setRecords] = useState([]);
	const [totalUsers, setTotalUsers] = useState(0);

	const fetchData = async () => {
		const response = await fetch(
			"https://jsonplaceholder.typicode.com/users"
	  	).then((response) => response.json());
		//
	  	setRecords(response);
	  	setTotalUsers(response.length);
	};


	useEffect(()=>{
		fetchData();	
	},[]);

	return(
		records ? (
			<>
				<h1>Users</h1>
				<ul>
				{ 	records.length && records.map((rec, i)=>(
						<li key={i} data-testid='user'>{rec.name}</li>
					))
				}
				</ul>
				<h2 data-testid="total-users">Total Users: {totalUsers}</h2>
			</>
		): (
			<p>Fetching...</p>
		)		
	);
};

export default FetchRecords;