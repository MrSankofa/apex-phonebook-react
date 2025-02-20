import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import App from "../App";
import ContactsComponent from "./contacts-component"; // Ensure waitFor is imported


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
   render(<ContactsComponent/>);

   const foundJohn = await screen.findByText((content) => content.includes("John"));

   expect(foundJohn).toBeInTheDocument();
});

test("shows error message on API failure", async () => {
    jest.spyOn(global, "fetch").mockImplementation(() =>
        Promise.reject(new Error("Failed to load Contacts"))
    );

    render(<ContactsComponent/>)

    const foundError = await screen.findByText((content) => content.includes("Failed to load Contacts"));


})

