import React from "react";
export default function ContactForm(props) {
	const [firstName, setFirstName] = React.useState("");
	const [lastName, setLastName] = React.useState("");
	const [gender, setGender] = React.useState("");
	const [email, setEmail] = React.useState("");
	const handleSubmit = event => {
		event.preventDefault();
		console.log(`
      email: ${email}
      firstName: ${firstName}
      lastName: ${lastName}
      gender: ${gender}`);
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
					// clear the form
					setFirstName("");
					setLastName("");
					setEmail("");
					setGender("");

					// update the ContactsComponent List

					props.onSuccess(result);
				},
				error => {
					props.onError(error);
				}
			);
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
					data-testid="firstName"
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
					data-testid="lastName"
				/>
			</label>

			<label>
				Gender:
				<select
					name="gender"
					value={gender}
					onChange={e => setGender(e.target.value)}
					required
                    placeholder={"gender"}
					data-testid="gender"
				>
					<option value="" disabled> Select Gender</option>
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
					data-testid="email"
				/>
			</label>

			<button>Submit</button>
		</form>
	);
}
