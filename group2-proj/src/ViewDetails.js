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
			<h1>Information of the Students</h1>
            <img src="data:image/jpeg;base64,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"  alt="logo" 
			height={300}
            width={300}
            className="stud"
      		/> 
            <table data-testid="detailsTable">
                <tbody>
                    <tr>
                    <th data-testid="tableHeader">ID</th>
                        <td>{userDetails.id}</td>
                    </tr>
                    <tr>
                    <th>Name</th>
                        <td data-testid="userID">{userDetails.name}</td>
                    </tr>
                    <tr>
                    <th>Username</th>
                        <td>{userDetails.username}</td>
                    </tr>
                <tr>
                    <th>Phone</th>
                        <td>{userDetails.phone}</td>
                    </tr>
                    <tr>
                    <th>Email</th>
                        <td>{userDetails.email}</td>
                    </tr>
                    <tr>
                    <th>Website</th>
                        <td>{userDetails.website}</td>
                    </tr>
                </tbody>
			</table>
            <button class="back" data-testid="back-dashboard-btn" onClick={onViewTable}>Back to Dashboard</button>
            {/* <a href='#\' data-testid="dashboardLink" onClick={onViewTable}>Back to Dashboard</a> */}

        </>
    ) : (
        <Dashboard/>
    )
};

export default ViewDetails;