import React from 'react';
import {render, screen} from "@testing-library/react";
import ContactsComponent, {Contact} from "./contact/contacts-component";
import ContactList from "./contact/contacts-component";


describe("Contact List Tests: ", () => {

    const mockContacts: Contact[] = [{ firstName: "Brett", lastName: "C", email: "b@gmail.com", gender: "MALE"}];

    beforeEach(() => {
        // jest
        // spyOn
        // global
        // fetch
        // mockImplementation
        // return promise resolve the data we want. ok is true, json returns another promise with our data
       jest.spyOn(global, "fetch").mockImplementation(() => {
          return Promise.resolve({
              ok: true,
              json: () => Promise.resolve(mockContacts)

          } as Response)
       });
    });

    afterEach(() => {
        jest.resetAllMocks()
    })


    test("should render contacts from dummy data", async () => {
        render(<ContactList items={mockContacts} error={null} isLoaded={true}/>)

        const foundJohn = await screen.findByText((content) => content.includes("Brett"));
        expect(foundJohn).toBeInTheDocument();

    });

    // # no errors 5
    // # 6
    test("should handle failed contacts ", async () => {
        // jest.spyOn(global, "fetch").mockImplementation(() => {
        //     return Promise.reject(new Error("Error: Failed to load contacts"));
        // });

        render(<ContactList items={mockContacts} isLoaded={false} error={"failed through props"}/>)
        const foundJohn = await screen.findByText((content) => content.includes("failed through props"));
        expect(foundJohn).toBeInTheDocument();
    });






});
