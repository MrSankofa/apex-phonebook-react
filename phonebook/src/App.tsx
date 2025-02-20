import React, {useEffect, useState} from "react";
import "./App.css";
import ContactsComponent from "./contact/contacts-component";
import ContactForm from "./contact/ContactForm";

type Contact = {
    firstName: string;
    lastName: string;
    email: string;
    gender: "MALE" | "FEMALE";
    id: number
}

function App() {
    // TODO: how do you specify the types for these
    const [savedContact, setSavedContact] = useState(null);
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);

    const [contacts, setContacts] = useState([]);

    useEffect(() => {
        fetch("http://localhost:3001/contacts")
            .then(res => {
                return res.json();
            })
            .then((payload) => {
                setContacts(payload);
                setIsLoaded(true);
            })
            .catch( error => setError({message: error || "Server Error"}));
    }, [])


    const handleSuccessAdd = (newContact: Contact) => {
        setContacts(prev => [...prev, newContact]);
    }

    const deleteContact = (targetId: number) => {
        console.log("attempting to delete id: ", targetId)
        console.log("State before delete: ", contacts);
        setContacts( prev => prev.filter( contact => contact.id !== targetId));
        console.log("State after delete: ", contacts);
    }

    return (
        <div className="App">
            {error}
            <h1>learn react</h1>
            <ContactForm
                onError={setError}
                onSuccess={handleSuccessAdd}
                contact={savedContact}
            />
            <ContactsComponent items={contacts} error={error} isLoaded={isLoaded} handleDelete={deleteContact}/>
        </div>
    );
}
export default App;
