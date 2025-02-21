import React, {useEffect, useState} from "react";
import {Contact} from "./contacts-component";


type ContactFormProps = {
	onSuccess: (contact: Contact) => void;
	onError: (error: any) => void;
	editContact?: Contact | null
	onEdit: (targetContact: Contact) => void;
}


export default function ContactForm({onSuccess, onError, editingContact, onEdit}) {
	const [firstName, setFirstName] = React.useState("");
	const [lastName, setLastName] = React.useState("");
	const [gender, setGender] = React.useState("");
	const [email, setEmail] = React.useState("");
	const [id, setId] = useState<number | null>(null);

	useEffect(() => {
		if(editingContact) {
			setFirstName(editingContact.firstName);
			setLastName(editingContact.lastName);
			setGender(editingContact.gender);
			setEmail(editingContact.email)
			setId(editingContact.id)
		}
	}, [editingContact])

	const handleSubmit = event => {
		event.preventDefault();
		console.log(`
      email: ${email}
      firstName: ${firstName}
      lastName: ${lastName}
      gender: ${gender}`);


		if(!editingContact) {
			fetch("http://localhost:3001/contacts", {
				method: "POST",
				mode: "cors",
				cache: "no-cache",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify({ firstName, lastName, email, gender })
			})
				.then(res => res.json())
				.then(
					result => {
						onSuccess(result);
					},
					error => {
						onError(error);
					}
				);
		} else {
			fetch(`http://localhost:3001/contacts/${editingContact.id}`, {
				method: id ? "PUT" : "POST",
				mode: "cors",
				cache: "no-cache",
				headers: { "Content-Type": "application/json"},
				body: JSON.stringify({id, firstName, lastName, email, gender})
			})
				.then( res => res.json())
				.then( result => {
					onEdit(result);
				})
				.catch( error => {
					onError(error);
				})



		}


	};
	return (
		<form onSubmit={handleSubmit}>
			<h1>Create Contact</h1>

			<label>
				First Name:
				<input
					name="firstName"
					type="text"
					value={firstName}
					onChange={e => setFirstName(e.target.value)}
					required
				/>
			</label>
			<label>
				Last Name:
				<input
					name="lastName"
					type="text"
					value={lastName}
					onChange={e => setLastName(e.target.value)}
					required
				/>
			</label>

			<label>
				Gender:
				<select
					name="gender"
					value={gender}
					onChange={e => setGender(e.target.value)}
					required
				>
					<option key="" />
					{["MALE", "FEMALE"].map(gender => (
						<option key={gender}>{gender}</option>
					))}
				</select>
			</label>

			<label>
				Email:
				<input
					name="email"
					type="email"
					value={email}
					onChange={e => setEmail(e.target.value)}
					required
				/>
			</label>

			<button>Submit</button>
		</form>
	);
}
