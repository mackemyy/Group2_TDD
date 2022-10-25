/* eslint-disable testing-library/no-debugging-utils */
/* eslint-disable testing-library/prefer-find-by */
/* eslint-disable testing-library/no-await-sync-query */
import { render, screen, cleanup, waitFor, getByTestId, fireEvent } from "@testing-library/react";
import FetchRecords from "./FetchRecords";
import Dashboard from "./Dashboard";
import ViewDetails from "./ViewDetails";
import Login from "./Login";

// describe("Testing a fetch...", ()=>{
	
// 	afterEach(cleanup); //clear garbage collection side effects, for async await

// 	it("test dynamic list...", async () => {   
// 		render(<FetchRecords />);	

// 		screen.debug(); // display dom in cmd/cli

// 		// Async/await
// 		// a programming pattern that will allow async processes to behave like sync.
// 		// waitFor() - if you need to wait and check for the results of an async..await
// 	    expect(await screen.findByText('Leanne Graham')).toBeInTheDocument();
// 		await waitFor(() => expect(screen.getAllByRole('listitem').length).toBe(10));
// 	});
// });


describe("Testing results after fetch...", ()=>{
	
	afterEach(cleanup);

	it("Has an email input field in login", ()=> {
		render(<Login/>);
		const email = screen.getByTestId("email");
		expect(email).toBeInTheDocument();
	});

	it("Has an password input field in login", ()=> {
		render(<Login/>);
		const pword = screen.getByTestId("password");
		expect(pword).toBeInTheDocument();
	});

	it("Check if user Leanne Graham exists...", async () => {   
		render(<FetchRecords />);	
	    expect(await screen.findByText('Leanne Graham')).toBeInTheDocument();
	});

	it("Has a token", async () => {
		render(<Dashboard/>);
		const token = screen.getByTestId('token');
		expect(token).toBeInTheDocument();
	});

	it("Has a logout button", async () => {
		render(<Dashboard/>);
		const logoutBtn = screen.getByTestId('logout-btn');
		expect(logoutBtn).toBeInTheDocument();
	});


	it("Check total no of users in list...", async () => {  
		const users = await waitFor(() => screen.getAllByTestId('user'));
		expect(users.length).toEqual(10);
	});

	it("Check is there is back to dashboard button", async () => {
		render(<ViewDetails/>);
		const backBtn = screen.getByTestId("back-dashbaord-btn");
		expect(backBtn).toBeInTheDocument();
	});


});

describe("Testing...", ()=> {
	afterEach(cleanup)

	it("Display token", async () => {
		render(<Dashboard/>);
		const token = screen.getByTestId("token");
		fireEvent.change(token, { target: { value: "QpwL5tke4Pnpja7X4"}});
		expect(token.value).toBe("QpwL5tke4Pnpja7X4");
	});

});