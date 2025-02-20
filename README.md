# apex-phonebook-react

cd into phonebook

use the commands in two separate terminals respectively:

npm start
npm run server


1. Write some test for placeholder for the gender dropdown Good, had to use data-testid
2. Update the dropdown to have a placeholder Good
3. Test that the contactForm will update state as expected
   4. remember how to do the change event for input fields
   5. remember how to get content 
4. mock fetch and return data to test contact list on success calls
   5. how to mock the fetch

```typescript
 jest.spyOn(global, "fetch").mockImplementation(() =>
            Promise.resolve({
                ok: true,
                json: () => Promise.resolve(mockContacts),
            } as Response)
        );
```
   6. also the afterEach jest.restoreAllMocks
   7.  make sure you don't forget to use async await for the screen

5. mock fetch and return data to test contact list on failed calls
   6. remember to use the jest.spyOn the same way just use promise.reject instead of Promise resoolve
6. Refactor the contacts component, app, and contact form
   7. Lift the state out of the contacts form, it should only render the contacts given it
   8. the app should have state for the contacts
   9. the contact form no longer needs the savedContacts prop
   10. on success save, update the props given to the contacts list, make sure the form is cleared on save, and persists on failure
11. Add the create functionality to the contacts list
12. Add the delete functionality to the contacts list
12. Add update functionality to the contacts list
13. Add form validation to create contacts
14. Add context API for global theme state
15. Practice converting contacts component from a class to a functional component
16. Bonus: Convert App from a functional component to a class
17. Complete the other exercises

Note:
data-test-id helps selecting elements to test.
