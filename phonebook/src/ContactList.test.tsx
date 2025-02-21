import React from 'react';
import ContactList, {Contact} from "./contact/contacts-component";
import {act, render, screen} from "@testing-library/react";

describe("Contact List Tests: ", () => {
        const mockContacts: Contact[] = [{ firstName: "Brett", lastName: "C", email: "b@gmail.com", gender: "MALE"}];



    test("should render contacts from dummy data", async () => {
        global.fetch = jest.fn(() => {
            return Promise.resolve({
                ok: true,
                json: async () => mockContacts
            });
        }) as Mock;

        await act( async () => {
           render(<ContactList items={mockContacts} error={null} isLoaded={true}/>)
        });

        const foundBrett = await screen.findByText(content => content.includes("Brett"));

        expect(foundBrett).toBeInTheDocument();
    });

    test("Should handle api failed requests", async () => {
        await act( async () => {
            global.fetch = jest.fn(() => {
                return Promise.reject(new Error("Failed from mocked fetch"))
            })
           render(<ContactList isLoaded={false} items={mockContacts} error={"failed to load from props"}/>)

           const underTest = await screen.findByText(content => content.includes("failed to load from props"));

           expect(underTest).toBeInTheDocument();
        });
    })

});
