import React from 'react';
import {fireEvent, render, screen} from '@testing-library/react';
import App from './App';
import ContactForm from "./contact/ContactForm";

describe("Contact Form Tests: ", () => {
  test('Basic Hello World Test: renders learn react link', () => {
    const { getByText } = render(<App />);
    const linkElement = getByText(/learn react/i);
    expect(linkElement).toBeInTheDocument();
  });


  test("Contact Form: renders gender dropdown with placeholder", () => {

    render(<ContactForm/>);

    const genderDropdown = screen.getByRole("combobox");
    const placeholderElement = screen.getByText("Select Gender");

    expect(genderDropdown).toBeInTheDocument();
    expect(genderDropdown).toHaveValue("");
    expect(placeholderElement).toBeInTheDocument();
    expect(placeholderElement).toHaveTextContent("Select Gender"); // brittle test but practicing

  });


  test("Contact Form: updates state for first name", () => {

    render(<ContactForm/>);

    // we want to assert that the state from contact form is updated when the firstName field is updated

    // const firstNameInput = screen.getByRole("textbox", {name: /First Name:/i});
    const firstNameInput = screen.getByTestId("firstName");

    fireEvent.change(firstNameInput, { target: { value: "Brett"}});

    expect(firstNameInput).toHaveValue("Brett")

  });
})

