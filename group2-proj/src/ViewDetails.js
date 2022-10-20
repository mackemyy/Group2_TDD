import { useEffect, useState } from 'react';

import Dashboard from './Dashboard';

const ViewDetails = (props) => {
    const [details, setDetails] = useState([]);
    const [showDashboard, setShowDashboard] = useState(false);
    const [token, setToken] = useState(props ? props.token : ''); // check if props exists. if ys, store the token 
	const onLogout = (evt) => {
		const { logout } = props; // deconstruct the object props and extract only the logout method
		setToken('');
		if(logout) {  // check if prop logout exist
			logout(); // if yes, trigger handleLogout method in Login component
		}
	};

    const onViewDetails = (evt) => {
        const { viewDetails } = props;
        if(viewDetails) {
            viewDetails();
        }
    }
    // const fetchData = async() => {
    //     const response = await fetch(
    //         "https://jsonplaceholder.typicode.com/users/${id}"
    //     ).then((response) => response.json());

    //     setDetails(response);
    // }
   
    // useEffect(() => {
    //     fetchData();
    // }, []);

    return !showDashboard ? (
        <>
        <h1>Menu(navbar ni diri)</h1>
			<ul>
				<li>user {token}</li>
				<li><a href='#\' onClick={onLogout}>Logout</a></li>
			</ul>
			<h2>Information of the Customer</h2>
            <h3>Display User's data here...</h3>
            
        <a href='#\' onClick={onViewDetails}>Back to Dashboard</a>
        </>
    ) : (
        <Dashboard/>
    )
};

export default ViewDetails;