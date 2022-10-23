import { useEffect, useState } from 'react';

import Dashboard from './Dashboard';

const ViewDetails = (props) => {
    //const [details, setDetails] = useState([]);
    const [showDashboard, setShowDashboard] = useState(false);
    const [indivUser, setIndivUser] = useState();

    const onViewTable = (evt) => {
        const { viewTable } = props;
        setShowDashboard(true);
        setIndivUser('');
        if(viewTable) {
            viewTable();
        }
    }

    const handleIndivUser = () => {
        setIndivUser(props.indivUser);
    }
    // const fetchData = async() => {
    //     const response = await fetch(
    //         "https://jsonplaceholder.typicode.com/users/${id}"
    //     ).then((response) => response.json());

    //     setDetails(response);
    // }
   
    useEffect(() => {
        handleIndivUser();
    },);

    return !showDashboard ? (
        <>
			<h1>Information of the Customer</h1>
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
						<tr>
							<td>{indivUser.id}</td>
							<td>{indivUser.name}</td>
							<td>{indivUser.username}</td>
							<td>{indivUser.email}</td>
							<td>{indivUser.phone}</td>
						</tr>
				</tbody>
				
			</table>
            <a href='#\' onClick={onViewTable}>Back to Dashboard</a>
        </>
    ) : (
        <Dashboard/>
    )
};

export default ViewDetails;