import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';

const CreateForm = props => {
	const [destinations, setDestinations] = useState([]);
	const [newDestination, setNewDestination] = useState({
		title: '',
		country: '',
		city: '',
		description: '',
		howToGetThere: '',
		img: '',
		name: ''
	});

	const handleSubmit = async e => {
		e.preventDefault();

		try {
			const response = await fetch('api/destinations', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(newDestination)
			});
			const data = await response.json();
			setDestinations([...destinations, data]);
			setNewDestination({
				title: '',
				country: '',
				city: '',
				description: '',
				howToGetThere: '',
				img: '',
				name: ''
			});
		} catch (error) {
			console.error(error);
		}
	};

	const handleChange = e => {
		setNewDestination({ ...newDestination, [e.target.id]: e.target.value });
	};

	return (
		<div className="CreateForm">
			<h3>Know an off-the-beaten track suggestion? Add here!</h3>

			<form onSubmit={handleSubmit}>
				<input
					type="text"
					id="title"
					placeholder="title"
					onChange={handleChange}
				/>
				<input
					type="text"
					id="country"
					placeholder="country"
					onChange={handleChange}
				/>
				<input
					type="text"
					id="city"
					placeholder="city"
					onChange={handleChange}
				/>
				<input
					type="text"
					id="description"
					placeholder="description"
					onChange={handleChange}
				/>
				<input
					type="text"
					id="howToGetThere"
					placeholder="how to get there"
					onChange={handleChange}
				/>
				<input
					type="img"
					id="img"
					placeholder="insert image"
					onChange={handleChange}
				/>
				<input
					type="text"
					id="name"
					placeholder="name"
					onChange={handleChange}
				/>
				<input type="submit" value="add new destination" />
			</form>
		</div>
	);
};

export default CreateForm;
