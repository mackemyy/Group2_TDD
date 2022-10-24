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
            <table data-testid="detailsTable">
                <thead>
                    <tr>
                        <th data-testid="tableHeader">ID</th>
						<th>Name</th>
						<th>Username</th>
                        <th>Phone</th>
                        <th>Email</th>
						<th>Website</th>
                        {/* <th>Address</th> */}
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td data-testid="userID">{userDetails.id}</td>
                        <td>{userDetails.name}</td>
                        <td>{userDetails.username}</td>
                        <td>{userDetails.phone}</td>
                        <td>{userDetails.email}</td>
                        <td>{userDetails.website}</td>
                        {/* <td>{userDetails.address.street}</td> */}
                    </tr>
                </tbody>
			</table>
            <a href='#\' data-testid="dashboardLink" onClick={onViewTable}>Back to Dashboard</a>

        </>
    ) : (
        <Dashboard/>
    )
};

export default ViewDetails;