/* eslint-disable testing-library/no-debugging-utils */
/* eslint-disable testing-library/prefer-find-by */
/* eslint-disable testing-library/no-await-sync-query */
import { render, screen, cleanup, waitFor, fireEvent } from "@testing-library/react";
import FetchRecords from "./FetchRecords";
import Dashboard from "./Dashboard";
import ViewDetails from "./ViewDetails";
import Login from "./Login";

describe("Testing a fetch...", ()=>{
	
	afterEach(cleanup); //clear garbage collection side effects, for async await

	// it("test dynamic list...", async () => {   
	// 	render(<FetchRecords />);	

	// 	// screen.debug(); // display dom in cmd/cli

	// 	// Async/await
	// 	// a programming pattern that will allow async processes to behave like sync.
	// 	// waitFor() - if you need to wait and check for the results of an async..await
	//     // expect(await screen.findByText('Leanne Graham')).toBeInTheDocument();
	// 	await waitFor(() => expect(screen.getAllByTestId('user').length).toBe(10));
	// });
});


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


	it("Has a logout button", async () => {
		render(<Dashboard/>);
		const logoutBtn = screen.getByTestId('logout-btn');
		expect(logoutBtn).toBeInTheDocument();
	});


	it("Check total no of users in list...", async () => {  
		render(<FetchRecords />);
		const users = await waitFor(() => screen.getAllByTestId('user'));
		expect(users.length).toEqual(10);
	});

	it("Check is there is back to dashboard button", async () => {
		render(<ViewDetails/>);
		const backBtn = screen.getByTestId('back-dashboard-btn');
		expect(backBtn).toBeInTheDocument();
	});


});

describe("Checking if token is given upon login...", ()=> {
	afterEach(cleanup)

	it("Receives token", async () => {
		render(<Login/>);

		const eInput = screen.getByTestId('email');
		const pInput = screen.getByTestId('password');

		fireEvent.change(eInput, { target: { value: "eve.holt@reqres.in" }});
		expect(eInput.value).toBe("eve.holt@reqres.in");

		fireEvent.change(pInput, { target: { value: "cityslicka" }});
		expect(pInput.value).toBe("cityslicka");

		const loginBtn = screen.getByTestId("send-user-login");
		fireEvent.click(loginBtn);

		const res = screen.getByTestId('result');
		expect(res).toBeInTheDocument();

		expect(screen.getByTestId("result")).toHaveTextContent("Server Reply: QpwL5tke4Pnpja7X4");

		render(<Dashboard/>);
		const token = screen.getByTestId('token');
		expect(token).toBeInTheDocument();

		expect(screen.getByTestId("token")).toHaveTextContent("user QpwL5tke4Pnpja7X4");
	});

});