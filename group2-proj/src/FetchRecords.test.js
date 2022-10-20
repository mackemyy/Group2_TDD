/* eslint-disable testing-library/no-debugging-utils */
/* eslint-disable testing-library/prefer-find-by */
/* eslint-disable testing-library/no-await-sync-query */
import { render, screen, cleanup, waitFor } from "@testing-library/react";
import FetchRecords from "./FetchRecords";

describe("Testing a fetch...", ()=>{
	
	afterEach(cleanup); //clear garbage collection side effects, for async await

	it("test dynamic list...", async () => {   
		render(<FetchRecords />);	

		screen.debug(); // display dom in cmd/cli

		// Async/await
		// a programming pattern that will allow async processes to behave like sync.
		// waitFor() - if you need to wait and check for the results of an async..await
	    expect(await screen.findByText('Leanne Graham')).toBeInTheDocument();
		await waitFor(() => expect(screen.getAllByRole('listitem').length).toBe(10));
	});
});


describe("Testing results after fetch...", ()=>{
	
	afterEach(cleanup);

	it("Check if a certain user exists...", async () => {   
		render(<FetchRecords />);	
	    expect(await screen.findByText('Leanne Graham')).toBeInTheDocument();
	});

	it("Check initial no of users in list...", async () => {  
		render(<FetchRecords />);
		expect(await screen.getByTestId("total-users")).toHaveTextContent("Total Users: 0"); 	
	});

	it("Check total no of users in list...", async () => {  
		render(<FetchRecords />);
		// li tag/element has a role of listitem
		// https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/listitem_role

		// using getAllByRole()
		const items = await waitFor(() => screen.getAllByRole('listitem'));
		expect(items.length).toEqual(10);

		// using getAllByTestId()
		const users = await waitFor(() => screen.getAllByTestId('user'));
		expect(users.length).toEqual(10);
	});
});