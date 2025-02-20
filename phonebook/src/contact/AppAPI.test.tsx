import React from "react";
import {act, fireEvent, render, screen, waitFor, waitForElementToBeRemoved} from "@testing-library/react";
import App from "../App";
import ContactsComponent from "./contacts-component"; // Ensure waitFor is imported


describe("Mocked API Tests", () => {
    beforeEach(() => {
        jest.spyOn(global, "fetch").mockImplementation(() =>
            Promise.resolve({
                ok: true,
                json: () =>
                    Promise.resolve([
                        { id: 1, firstName: "John", lastName: "Doe", email: "john@example.com", gender: "MALE" },
                    ]),
            } as Response)
        );
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    test("renders learn react link", async () => {
        render(<App />);

        const linkElement = await screen.findByText(/learn react/i);
        expect(linkElement).toBeInTheDocument();
    });

    test("Confirm that ContactsList is Populated with John on successful call", async () => {
       render(<ContactsComponent items={[
           { id: 1, firstName: "John", lastName: "Doe", email: "john@example.com", gender: "MALE" },
       ]} isLoaded={true} error={null} handleDelete={()=> {}}/>);

       const foundJohn = await screen.findByText((content) => content.includes("John"));

       expect(foundJohn).toBeInTheDocument();
    });

    test("shows error message on API failure", async () => {
        // jest.spyOn(global, "fetch").mockImplementation(() =>
        //     Promise.reject(new Error("Failed to load Contacts"))
        // );

        render(<ContactsComponent error={{message: "Failed to load Contacts"}} isLoaded={false} items={[]} handleDelete={()=> {}}/>)

        const foundError = await screen.findByText((content) => content.includes("Failed to load Contacts"));

        expect(foundError).toBeInTheDocument();

    });

    // integration test unless you mock the response and check that it was called
    test("should add a contact", async () => {
        render(<App/>);

        const addButton = await screen.findByText("Submit")
        const firstNameInput = screen.getByTestId("firstName");
        const lastNameInput = screen.getByTestId("lastName");
        const emailInput = screen.getByTestId("email");
        const genderDropdown = screen.getByRole("combobox");

        act(() => {
            fireEvent.change(firstNameInput, { target: { value: "Brett"}});
            fireEvent.change(lastNameInput, { target: { value: "C"}});
            fireEvent.change(emailInput, { target: { value: "c@gmail.com"}});
            fireEvent.change(genderDropdown, { target: { value: "MALE"}});
            addButton.click();
        });

        expect(firstNameInput).toBeInTheDocument();
        expect(lastNameInput).toBeInTheDocument();
        expect(emailInput).toBeInTheDocument();
        expect(genderDropdown).toBeInTheDocument();

        expect(global.fetch).toBeCalled()

    });

    test("should delete a contact", async () => {
        render(<App/>)

        // const findDeleteButton = await screen.findByTestId("button0");
        const findDeleteButton = await screen.findByText("delete");
        expect(findDeleteButton).toBeInTheDocument();

        findDeleteButton.click();



        setTimeout(() => {
            expect(findDeleteButton).toBeNull();
        }, 100)

    });
});



