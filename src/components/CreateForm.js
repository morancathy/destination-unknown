import React, { useState, useEffect } from 'react';

const CreateForm = ({ fetchData, toggleForm, loggedInUser }) => {
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
	const image = '/img/ImagePlaceholder.jpg';

	const handleSubmit = async e => {
		e.preventDefault();

		try {
			const response = await fetch('/api/destinations', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(newDestination)
			});
			const data = await response.json();
			setDestinations([...destinations, data]);
			fetchData();
			toggleForm();
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
			<form
				className=""
				onSubmit={handleSubmit}
				style={{ display: 'flex', flexDirection: 'column' }}
			>
				<label>
					<h4 className="label">Title: </h4>
					<input
						type="text"
						id="title"
						placeholder="title"
						required
						onChange={handleChange}
					/>
				</label>
				<label>
					<h4 className="label">Country: </h4>
					<input
						type="text"
						id="country"
						placeholder="country"
						required
						onChange={handleChange}
					/>
				</label>
				<label>
					<h4 className="label">City: </h4>
					<input
						type="text"
						id="city"
						placeholder="city"
						required
						onChange={handleChange}
					/>
				</label>
				<label>
					<h4 className="label">Upload Image: </h4>
					<input
						type="text"
						id="img"
						// defaultValue="/img/ImagePlaceholder.jpg"
						placeholder="insert image"
						onChange={handleChange}
					/>
				</label>
				<div className="entry">
					<h4 className="label">Getting There:</h4>
					<textarea
						rows="2"
						type="text"
						id="howToGetThere"
						required
						placeholder="how to get there"
						onChange={handleChange}
					/>
				</div>
				<div className="entry">
					<h4 className="label">Description: </h4>
					<textarea
						rows="7"
						cols="40"
						type="text"
						id="description"
						required
						placeholder="description"
						onChange={handleChange}
					/>
				</div>
				<label>
					<h4 className="label">Entry by: </h4>
					<input
						type="text"
						id="name"
						// readOnly="readonly"
						// defaultValue={loggedInUser}
						onChange={handleChange}
					/>
				</label>
				<input className="add-but" type="submit" value="add new destination" />
			</form>
			{console.log(loggedInUser)}
		</div>
	);
};

export default CreateForm;
