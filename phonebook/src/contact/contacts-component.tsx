import React, { Component } from "react";
import { ContactShortDisplay } from "./ContactShortDisplay";
type ContactsComponentState = {
	isLoaded: boolean,
	items: any,
	error: any,

};

export type Contact = {
	firstName: string;
	lastName: string;
	gender: "MALE" | "FEMALE";
	email: string;
}

const ContactList = ({items, error, isLoaded}) => {

	if (error) {
		return <div>Error: {error}</div>;
	} else if (!isLoaded) {
		return <div>Loading...</div>;
	} else {
		return (
			<ul>
				{items.map((item, index) => (
					<li key={index}>
						<ContactShortDisplay contact={item} />
					</li>
				))}
			</ul>
		);
	}
}

export default ContactList;
