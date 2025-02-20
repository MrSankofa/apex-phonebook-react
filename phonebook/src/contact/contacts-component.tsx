import React, { Component } from "react";
import { ContactShortDisplay } from "./ContactShortDisplay";
import contactsData from '../db.json';
type ContactsComponentState = {
	isLoaded: boolean,
	items: any,
	error: any,

};
class ContactsComponent extends Component<{}, ContactsComponentState> {
	constructor(props) {
		super(props);
		this.state = {
			error: null,
			isLoaded: false,
			items: []
		};
	}
	componentDidMount() {
		fetch("http://localhost:3001/contacts")
			.then(res => {
				return res.json()
			})
			.then(
				result => {
					console.log(result);
					this.setState({
						isLoaded: true,
						items: result || []
					});
				},
				error => {
					this.setState({
						isLoaded: true,
						error
					});
				}
			);
	}
	render() {
		const { error, isLoaded, items } = this.state;
		if (error) {
			return <div>Error: {error.message}</div>;
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
}
export default ContactsComponent;
