import React from 'react';
import {act, fireEvent, getByTestId, render, screen} from '@testing-library/react';

import ContactForm from "./contact/ContactForm";

describe("Contact Form Tests: ", () => {


    test("should have a placeholder for the gender dropdown", () => {
        const { getByTestId } = render(<ContactForm />);
        const genderDropdown = getByTestId(/genderDropdown/i);
        expect(genderDropdown).toBeInTheDocument();
    });

    test("should be able to input data into fields", () => {
        const { getByTestId } = render(<ContactForm />);
        const firstName = getByTestId(/firstName/i);
        const lastName = getByTestId(/lastName/i);
        const genderDropdown = getByTestId(/genderDropdown/i);
        const email = getByTestId(/email/i);

        expect(firstName).toBeInTheDocument();
        expect(lastName).toBeInTheDocument();
        expect(genderDropdown).toBeInTheDocument();
        expect(email).toBeInTheDocument();

        act(() => {
            fireEvent.change(firstName, { target: { value: "Brett"}})
            fireEvent.change(lastName, { target: { value: "C"}})
            fireEvent.change(genderDropdown, { target: { value: "MALE"}})
            fireEvent.change(email, { target: { value: "c@gmail.com"}})
        });

      expect(firstName).toHaveValue("Brett")
      expect(lastName).toHaveValue("C")
      expect(genderDropdown).toHaveValue("MALE")
      expect(email).toHaveValue("c@gmail.com")
    })
})
