import React, {useEffect, useState} from "react";
import "./App.css";
import ContactsComponent, {Contact} from "./contact/contacts-component";
import ContactForm from "./contact/ContactForm";
function App() {
    const [savedContact, setSavedContact] = useState(null);
    const [error, setError] = useState(null);

    const [contacts, setContacts] = useState([]);
    const [isLoaded, setIsLoader] = useState(false);



    useEffect(() => {
        fetch("http://localhost:3001/contacts")
            .then(res => res.json())
            .then(
                result => {
                    console.log(result);
                    setContacts(prev => result);
                    setIsLoader(true)
                }
            ).catch( error => {
                setError(error);
            });
    }, [])

    const handleAddContact = (targetContact: Contact) => {
        setContacts(prev => [...prev, targetContact]);

        targetContact.id = Date.now();

        fetch(`http://localhost:3001/contacts/${targetContact.id}`, {
            method: "PUT",
            mode: "cors",
            cache: "no-cache",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(targetContact)
        })
            .then(res => res.json())
            .then(
                result => {
                    setContacts(prev => [...prev, result])
                },
                error => {
                    setError("Server Error")
                }
            );
    }

    const handleDeleteContact = (targetId: number) => {

        fetch(`http://localhost:3001/contacts/${targetId}`, {
            method: "DELETE",
            mode: "cors",
            cache: "no-cache",
            headers: {
                "Content-Type": "application/json"
            },
        })
            .then(res => res.json())
            .then(
                result => {
                    setContacts(prev => prev.filter( contact => contact.id !== targetId));
                },
                error => {
                    setError("Server Error")
                }
            );
    }

    const handleUpdateContact = (targetContact: Contact) => {
        // first make the request
            // update state on success
                // we need to find the matching contact in the state

        console.log("handle the contact you want to update: ", targetContact)
      setSavedContact(targetContact)
                // replace that contact with the target
            // return error and do nothing on fail


    }

    const onEdit = (editedContact: Contact) => {
        // find the contact in state
          // update the contact

        setContacts(prev => prev.map( contact => {
            if(contact.id === editedContact.id) {
                return editedContact
            }

            return contact;
        }));
    }

    return (
        <div className="App">
            {error}
            <ContactForm
                onError={setError}
                onSuccess={handleAddContact}
                editingContact={savedContact}
                onEdit={onEdit}

            />
            <ContactsComponent
                items={contacts}
                error={error}
                isLoaded={isLoaded}
                handleDeleteContact={handleDeleteContact}
                handleUpdateContact={handleUpdateContact}
            />
        </div>
    );
}
export default App;
