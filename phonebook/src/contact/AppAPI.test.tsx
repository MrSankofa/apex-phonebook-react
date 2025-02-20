import React, {useState} from "react";
import {render, screen, fireEvent, waitFor, waitForElementToBeRemoved, act} from "@testing-library/react";
import App from "../App";
import ContactsComponent from "./contacts-component";

const mockContacts = [
    { id: 1, firstName: "John", lastName: "Doe", email: "john@example.com", gender: "MALE" }
];

describe("Mocked API Tests", () => {
    beforeEach(() => {
        jest.spyOn(global, "fetch").mockImplementation(() =>
            Promise.resolve({
                ok: true,
                json: () => Promise.resolve(mockContacts),
            } as Response)
        );
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    describe("App Component Tests", () => {
        test("renders learn react link", async () => {
            render(<App />);
            const linkElement = await screen.findByText(/learn react/i);
            expect(linkElement).toBeInTheDocument();
        });
    });

    describe("ContactsComponent Tests", () => {
        test("populates ContactsList with John on successful API call", async () => {
            render(<ContactsComponent items={mockContacts} isLoaded={true} error={null} handleDelete={() => {}} />);
            const foundJohn = await screen.findByText((content) => content.includes("John"));
            expect(foundJohn).toBeInTheDocument();
        });

        test("shows error message on API failure", async () => {
            jest.spyOn(global, "fetch").mockImplementation(() => Promise.reject(new Error("Failed to load Contacts")));

            render(<ContactsComponent error={{ message: "Failed to load Contacts" }} isLoaded={true} items={[]} handleDelete={() => {}} />);

            const foundError = await screen.findByText(/failed to load contacts/i);
            expect(foundError).toBeInTheDocument();
        });

        test("should delete a contact", () => {
            // Simulate component with state
            function TestComponent() {
                const [contacts, setContacts] = useState(mockContacts);

                return (
                    <ContactsComponent
                        error={null}
                        isLoaded={true}
                        items={contacts}
                        handleDelete={(id) => setContacts(contacts.filter(contact => contact.id !== id))}
                    />
                );
            }

            render(<TestComponent />);

            // Ensure the delete button is in the document
            const deleteButton = screen.getByText(/delete/i);
            expect(deleteButton).toBeInTheDocument();

            // Click delete
            fireEvent.click(deleteButton);


            expect(deleteButton).not.toBeInTheDocument();

        })

        test("should delete a contact as an integration test", (done) => {
            render(<App />);

            // Delay to allow the component to fully render
            setTimeout(() => {
                const deleteButton = screen.queryByText(/delete/i);
                expect(deleteButton).toBeInTheDocument();

                fireEvent.click(deleteButton);

                // ✅ Delay assertion to allow the UI to update
                setTimeout(() => {
                    expect(screen.queryByText(/delete/i)).toBeNull(); // ✅ Ensures it's removed
                    done(); // ✅ Marks test as complete
                }, 100);

            }, 50);
        });

    });

    describe("ContactForm Tests", () => {
        test("should add a contact", async () => {
            render(<App />);

            // Fill out the form
            act(() => {
                fireEvent.change(screen.getByTestId("firstName"), { target: { value: "Brett" } });
                fireEvent.change(screen.getByTestId("lastName"), { target: { value: "C" } });
                fireEvent.change(screen.getByTestId("email"), { target: { value: "c@gmail.com" } });
                fireEvent.change(screen.getByTestId("gender"), { target: { value: "MALE" } });
                fireEvent.click(screen.getByText("Submit"));
            });


            const foundJohn = await screen.findByTestId(/button1/i);
            expect(foundJohn).toBeInTheDocument();

        });
    });
});
