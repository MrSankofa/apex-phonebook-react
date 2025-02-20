import React from "react";
import ContactsComponent, {Contact} from "./contact/contacts-component";

import {act, render} from "@testing-library/react";
import {screen} from "@testing-library/react";
import App from "./App";


describe("Contact List Tests", () => {
  const mockContacts: Contact[] = [
    { firstName: "Brett", lastName: "C", email: "b@gmail.com", gender: "MALE" }
  ];

  beforeEach(() => {
    global.fetch = jest.fn(() =>
        Promise.resolve({
          ok: true,
          json: async () => mockContacts, // Ensure this matches the expected format
        })
    ) as Mock;

  });

  afterEach(() => {
    jest.restoreAllMocks(); // Clean up mocks after each test
  });

    test('renders learn react link', async () => {
      await act(async () => {
        render(<App />);
      })
      const linkElement = screen.getByText(/learn react/i);
      expect(linkElement).toBeInTheDocument();
    });

  test("should render contacts from mock data", async () => {
    await act(async () => {
      render(<ContactsComponent items={mockContacts} error={null} isLoaded={true}/>);
    });

    // Wait for the data to be fetched and rendered
    expect(await screen.getByText(content => content.includes("Brett"))).toBeInTheDocument()
  });

    test("should be able to add a contact to state", async () => {
      await act( async () => {
        render(<App/>);
      });

      // const findBrett = screen.findByText((content) => content.includes("brett"));
    });
});



