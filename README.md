# apex-phonebook-react

cd into phonebook

use the commands in two separate terminals respectively:

npm start
npm run server


1. Write some test for placeholder for the gender dropdown
2. Update the dropdown to have a placeholder
3. Test that the contactForm will update state as expected
4. mock fetch and return data to test contact list on success calls
5. mock fetch and return data to test contact list on failed calls
6. Refactor the contacts component, app, and contact form
   7. Lift the state out of the contacts form, it should only render the contacts given it
   8. the app should have state for the contacts
   9. the contact form no longer needs the savedContacts prop
   10. on success save, update the props given to the contacts list, make sure the form is cleared on save, and persists on failure
11. Add the delete functionality to the contacts list
12. Add update functionality to the contacts list
13. Add form validation to create contacts
14. Add context API for global theme state
15. Practice converting contacts component from a class to a functional component
16. Bonus: Convert App from a functional component to a class
17. Complete the other exercises
