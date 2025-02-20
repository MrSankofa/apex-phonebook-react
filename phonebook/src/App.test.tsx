import React from 'react';
import {render, screen} from '@testing-library/react';
import App from './App';
import ContactForm from "./contact/ContactForm";


test('renders learn react link', () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});


test("renders gender dropdown with placeholder", () => {

  render(<ContactForm/>);

  const genderDropdown = screen.getByRole("combobox");
  const placeholderElement = screen.getByText("Select Gender");

  expect(genderDropdown).toBeInTheDocument();
  expect(genderDropdown).toHaveValue("");
  expect(placeholderElement).toBeInTheDocument();
  expect(placeholderElement).toHaveTextContent("Select Gender"); // brittle test but practicing

});
