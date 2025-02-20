import React, {useEffect, useState} from "react";
import "./App.css";

import ContactForm from "./contact/ContactForm";
import ContactList from "./contact/contacts-component";
function App() {

    const [contacts, setContacts] = useState([]);
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        fetch("http://localhost:3001/contacts")
            .then(res => res.json())
            .then(
                result => {
                    console.log(result);
                    setContacts(prev => result || []);
                    setIsLoaded(true);
                    setError(null);
                }
            ).catch( error => {
                setError(error);
        });
    }, []);

    // TODO: don't forget to make the request to the api
    const handleSuccessAddContact = () => {}

    // TODO: don't forget to make the request to the api
    const handleDeleteContact = () => {}

    return (
        <div className="App">
            {error}
            <h1>learn react</h1>
            <ContactForm
                onError={setError}
                onSuccess={handleSuccessAddContact}
            />
            <ContactList items={contacts} error={error} isLoaded={isLoaded} />
        </div>
    );
}
export default App;
