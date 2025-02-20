import React, { Component } from "react";
import { ContactShortDisplay } from "./ContactShortDisplay";
type ContactsComponentState = {
	isLoaded: boolean,
	items: any,
	error: any,

};

const ContactsComponent = ({ error, isLoaded, items , handleDelete}) => {
	if (error) {
		return <div>Error: {error.message}</div>;
	} else if (!isLoaded) {
		return <div>Loading...</div>;
	} else {
		return (
			<ul>
				{items.map((item, index) => (
					<li key={index}>
						<ContactShortDisplay contact={item}/>
						<button data-testid={"button" + index} onClick={() => handleDelete(item.id)}>delete</button>
					</li>
				))}
			</ul>
		);
	}
}
export default ContactsComponent;
