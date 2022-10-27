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
			<h1 className="tableTitle">Information of the Student</h1>
            <img src="https://cdn-icons-png.flaticon.com/512/1053/1053244.png?w=360"  alt="profilepic" 
			height={225}
            width={250}
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
            <div className='centerthebutton'>
            <button className="backToDashboard" data-testid="back-dashboard-btn" onClick={onViewTable}>Back to Dashboard</button>
            </div>
            

        </>
    ) : (
        <Dashboard/>
    )
};

export default ViewDetails;