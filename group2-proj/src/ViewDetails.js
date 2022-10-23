import { useEffect, useState } from 'react';

import Dashboard from './Dashboard';

const ViewDetails = (props) => {
    //const [details, setDetails] = useState([]);
    const [showDashboard, setShowDashboard] = useState(false);
    const [indivUser, setIndivUser] = useState(props ? props.indivUser : []);
    //onst [indivUser, setIndivUser] = useState();

    const onViewTable = (evt) => {
        const { viewTable } = props;
        setShowDashboard(false);
        if(viewTable) {
            viewTable();
        }
    }

    const fetchData = async () => {
        const response = await fetch(
            "https://jsonplacehold.typicode.com/users/1"
        ).then((response) => response.json());
        setIndivUser(response);
    }

    

    // const handleIndivUser = () => {
    //     setIndivUser(props.indivUser);
    // }
    // const fetchData = async() => {
    //     const response = await fetch(
    //         "https://jsonplaceholder.typicode.com/users/${id}"
    //     ).then((response) => response.json());

    //     setDetails(response);
    // }
   
    useEffect(() => {
        fetchData();
    },);

    return !showDashboard ? (
        <>
			<h1>Information of the Customer</h1>
            <table>
                <tr>
                    <th>Details</th>
                    <th>Values</th>
                </tr>
                <tr>
                    <td>ID</td>
                    <td>{indivUser.id}</td>
                </tr>
                <tr>
                    <td>Name</td>
                    <td>{indivUser.name}</td>
                </tr>
                <tr>
                    <td>Username</td>
                    <td>{indivUser.username}</td>
                </tr>
                <tr>
                    <td>Address</td>
                    <td>{indivUser.address}</td>
                </tr>
                <tr>
                    <td>Website</td>
                    <td>{indivUser.website}</td>
                </tr>
                <tr>
                    <td>Company</td>
                    <td>{indivUser.company}</td>
                </tr>
				
			</table>
            <a href='#\' onClick={onViewTable}>Back to Dashboard</a>
        </>
    ) : (
        <Dashboard/>
    )
};

export default ViewDetails;