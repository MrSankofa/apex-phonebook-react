import React, { Component } from "react";
import { ContactShortDisplay } from "./ContactShortDisplay";

export type Contact = {
	firstName: string;
	lastName: string;
	email: string;
	gender: "MALE" | "FEMALE";
	id: number;
}
type ContactsComponentState = {
	isLoaded: boolean,
	items: Contact[],
	error: string,
	handleDeleteContact: (targetId: number) => void;
	handleUpdateContact: (targetContact: Contact) => void;

};


const ContactsComponent = ({items, error, isLoaded, handleDeleteContact, handleUpdateContact}: ContactsComponentState) => {

	if (error) {
		return <div>Error: {error}</div>;
	} else if (!isLoaded) {
		return <div>Loading...</div>;
	} else {
		return (
			<ul>
				{items.map((item, index) => (
					<li style={{listStyle: 'none'}} key={index}>
						<ContactShortDisplay contact={item} />
						<button onClick={() => handleUpdateContact(item)}>Update</button>
						<button onClick={() => handleDeleteContact(item.id)}>Delete</button>
					</li>
				))}
			</ul>
		);
	}
}
export default ContactsComponent;
