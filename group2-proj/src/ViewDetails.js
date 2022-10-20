import { useState } from 'react';

import Dashboard from './Dashboard';

const ViewDetails = (props) => {
    //const [details, setDetails] = useState([]);
    const [showDashboard, setShowDashboard] = useState(false);

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
			<h1>Information of the Customer</h1>
            <h3>Display User's data here...</h3>
            <a href='#\' onClick={onViewDetails}>Back to Dashboard</a>
        </>
    ) : (
        <Dashboard/>
    )
};

export default ViewDetails;