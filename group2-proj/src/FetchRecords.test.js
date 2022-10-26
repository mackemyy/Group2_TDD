/* eslint-disable testing-library/no-debugging-utils */
/* eslint-disable testing-library/prefer-find-by */
/* eslint-disable testing-library/no-await-sync-query */
import { render, screen, cleanup, waitFor, fireEvent, getByText } from "@testing-library/react";
import FetchRecords from "./FetchRecords";
import Dashboard from "./Dashboard";
import ViewDetails from "./ViewDetails";
import Login from "./Login";

describe("Check Login UI", () => {
	afterEach(cleanup);

	it("Has an email input field", () => {
		render(<Login/>);
		const email = screen.getByTestId("email");
		expect(email).toBeInTheDocument();
	});

	it("Simulate an email data input", () => {		
		render(<Login />);
		const email_input = screen.getByTestId("email");
		fireEvent.change(email_input, { target: { value: "eve.holt@reqres.in" }});
		expect(email_input.value).toBe("eve.holt@reqres.in");
	});

	it("Has an input field for password",()=>{
		render(<Login />);
		const password = screen.getByTestId("password");
		expect(password).toBeInTheDocument();
	});

	it("Simulate a password data input", () => {		
		render(<Login />);
		const pword_input = screen.getByTestId("password");
		fireEvent.change(pword_input, { target: { value: "cityslicka" }});
		expect(pword_input.value).toBe("cityslicka");
	});

	it("Has a login button", async () => {
		render(<Login/>);
		const loginBtn = screen.getByTestId('send-user-login');
		expect(loginBtn).toBeInTheDocument();
	});

});

describe("Check if fetching of list was successfull", () => {
	afterEach(cleanup);

	it("Has an initial no of users in the list of 0", async () => {  
		render(<FetchRecords />);
		expect(await screen.getByTestId("total-users")).toHaveTextContent("Total Students: 0"); 	
	});

	it("Has a total no of users in the list of 10", async () => {  
		render(<FetchRecords />);
		const users = await waitFor(() => screen.getAllByTestId('userID'));
		expect(users.length).toEqual(10);
	});
})

describe("Simulating retrieval of one entry", () => {
	afterEach(cleanup);

	it("Checks if a user named Leanne Graham exist", async () => {
		render(<FetchRecords/>);
		expect(await screen.findByText('Leanne Graham')).toBeInTheDocument();
	});

	it("Checks if another user named Clementina DuBuque exist", async () => {
		render(<FetchRecords/>);
		expect(await screen.findByText('Clementina DuBuque')).toBeInTheDocument();
	});
})

describe("Checking for routing buttons", () => {
	afterEach(cleanup);

	it("Has a logout button", async () => {
		render(<Dashboard/>);
		const logoutBtn = screen.getByTestId('logout-btn');
		expect(logoutBtn).toBeInTheDocument();
	});

	it("Has a back to dashboard button", async () => {
		render(<ViewDetails/>);
		const backBtn = screen.getByTestId('back-dashboard-btn');
		expect(backBtn).toBeInTheDocument();
	});

});

describe("Checking if token is given upon login...", ()=> {
	afterEach(cleanup);

	it("Check if valid user with token", async () => {   
		render(<Login />);

		const email_input = screen.getByTestId("email");
		fireEvent.change(email_input, { target: { value: "eve.holt@reqres.in" }});
		expect(email_input.value).toBe("eve.holt@reqres.in");

		const pass = screen.getByTestId("password");
		fireEvent.change(pass, { target: { value: "eve.holt@reqres.in" }});
		expect(pass.value).toBe("eve.holt@reqres.in");

		const loginBtn = screen.getByTestId('send-user-login');
		fireEvent.click(loginBtn);

		await waitFor(async () => {
		    expect(await screen.findByText('QpwL5tke4Pnpja7X4')).toBeTruthy() 
		});
	});
});