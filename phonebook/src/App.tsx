import React, { useEffect, useState } from "react";
import "./App.css";
import ContactsComponent from "./contact/contacts-component";
import ContactForm from "./contact/ContactForm";

type Contact = {
    firstName: string;
    lastName: string;
    email: string;
    gender: "MALE" | "FEMALE";
    id: number;
};

function App() {
    const [contacts, setContacts] = useState<Contact[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [isLoaded, setIsLoaded] = useState(false);

    // Fetch contacts on mount
    useEffect(() => {
        const fetchContacts = async () => {
            try {
                const res = await fetch("http://localhost:3001/contacts");
                if (!res.ok) throw new Error("Failed to fetch contacts");
                const data = await res.json();
                setContacts(data);
            } catch (error) {
                setError(error.message || "Server Error");
            } finally {
                setIsLoaded(true);
            }
        };

        fetchContacts();
    }, []);

    const handleSuccessAdd = (newContact: Contact) => {
        setContacts((prev) => [...prev, newContact]);
    };

    const deleteContact = (targetId: number) => {
        console.log("Attempting to delete id:", targetId);

        setContacts((prev) => {
            const updatedContacts = prev.filter((contact) => contact.id !== targetId);
            console.log("Updated Contacts:", updatedContacts); // Log after state updates
            return updatedContacts;
        });
    };

    return (
        <div className="App">
            {error && <p style={{ color: "red" }}>{error}</p>}
            <h1>Learn React</h1>
            <ContactForm onError={setError} onSuccess={handleSuccessAdd} />
            <ContactsComponent items={contacts} error={error} isLoaded={isLoaded} handleDelete={deleteContact} />
        </div>
    );
}

export default App;
