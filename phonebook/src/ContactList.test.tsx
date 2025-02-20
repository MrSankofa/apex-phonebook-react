import React from 'react';
import ContactList, {Contact} from "./contact/contacts-component";
import {act, render, screen} from "@testing-library/react";
// import {act, render, screen} from "@testing-library/react";
// import ContactsComponent, {Contact} from "./contact/contacts-component";
// import ContactList from "./contact/contacts-component";


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

// describe("Contact List Tests: ", () => {
//
//     const mockContacts: Contact[] = [{ firstName: "Brett", lastName: "C", email: "b@gmail.com", gender: "MALE"}];
//
//     beforeEach(() => {
//         // jest
//         // spyOn
//         // global
//         // fetch
//         // mockImplementation
//         // return promise resolve the data we want. ok is true, json returns another promise with our data
//         act(() => {
//            jest.spyOn(global, "fetch").mockImplementation(() => {
//               return Promise.resolve({
//                   ok: true,
//                   json: () => Promise.resolve(mockContacts)
//
//               } as Response)
//            });
//
//         })
//     });
//
//     afterEach(() => {
//         jest.resetAllMocks()
//     })
//
//
//     test("should render contacts from dummy data", async () => {
//         act(() => {
//             render(<ContactList items={mockContacts} error={null} isLoaded={true}/>)
//         })
//         const foundJohn = await screen.findByText((content) => content.includes("Brett"));
//         expect(foundJohn).toBeInTheDocument();
//
//     });
//
//     // # no errors 5
//     // # 6
//     test("should handle failed contacts ", async () => {
//         // jest.spyOn(global, "fetch").mockImplementation(() => {
//         //     return Promise.reject(new Error("Error: Failed to load contacts"));
//         // });
//
//         render(<ContactList items={mockContacts} isLoaded={false} error={"failed through props"}/>)
//         const foundJohn = await screen.findByText((content) => content.includes("failed through props"));
//         expect(foundJohn).toBeInTheDocument();
//     });
//
//
//
//
//
//
// });
