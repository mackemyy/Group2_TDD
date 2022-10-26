import { useEffect, useState } from 'react';
import './ViewDetails.css';
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
			<h1>Information of the Student</h1>
            <img src="https://o.remove.bg/downloads/46122c04-ad3b-4f26-9b85-79ae61db875f/image_2022-10-26_153632351-removebg-preview.png"  alt="profilepic" 
			height={250}
            width={350}
            className="stud"
      		/> 
            <table data-testid="detailsTable" className='studDetailTable'>
                <tbody>
                    <tr>
                    <th data-testid="tableHeader" >ID</th>
                        <td>{userDetails.id}</td>
                    </tr>
                    <tr>
                    <th >Name</th>
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