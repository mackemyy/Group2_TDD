import { useEffect, useState } from 'react';

import Dashboard from './Dashboard';

const ViewDetails = (props) => {
    const [showDashboard, setShowDashboard] = useState(false);
    const [indivUser] = useState(props ? props.indivUser : '');
    const [userDetails, setUserDetails] = useState([]);

    const onViewTable = (evt) => {
        const { viewTable } = props;
        setShowDashboard(false);
        if(viewTable) {
            viewTable();
        }
    }

    const fetchData = async () => {
        const response = await fetch(
            "https://jsonplaceholder.typicode.com/users/"+indivUser
        ).then((response) => response.json());
        setUserDetails(response);
    }
   
    useEffect(() => {
        fetchData();
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
						<th>Address</th>
						<th>Website</th>
						<th>Company</th>
                    </tr>
                </thead>
                <tbody>
                { userDetails.length && userDetails.map((userDetails) => (
                    <tr>
                        <td>{userDetails.id}</td>
                        <td>{userDetails.name}</td>
                        <td>{userDetails.username}</td>
                        <td>{userDetails.address}</td>
                        <td>{userDetails.website}</td>
                        <td>{userDetails.company}</td>
                    </tr>
                    ))}
                </tbody>
			</table>
            <p>{indivUser}</p>
            <a href='#\' onClick={onViewTable}>Back to Dashboard</a>

        </>
    ) : (
        <Dashboard/>
    )
};

export default ViewDetails;