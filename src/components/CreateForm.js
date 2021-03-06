import React, { useState } from 'react';
import { useAlert } from 'react-alert';

const CreateForm = ({ fetchData, toggleForm, loggedInUser }) => {
	const [destinations, setDestinations] = useState([]);
	const image = '/img/ImagePlaceholder.jpg';
	const alert = useAlert();
	const [newDestination, setNewDestination] = useState({
		title: '',
		country: '',
		city: '',
		description: '',
		howToGetThere: '',
		img: image,
		name: `${loggedInUser}`
	});

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
			if (data.message) throw new Error(data.message);
			setDestinations([...destinations, data]);
			toggleForm();
		} catch (error) {
			alert.show('Unique title required');
		}
		fetchData();
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
						defaultValue="/img/ImagePlaceholder.jpg"
						placeholder={image}
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
					<h4 className="label description">Description: </h4>
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
						required
						readOnly="readonly"
						value={loggedInUser}
						onChange={handleChange}
					/>
				</label>
				<input className="add-but" type="submit" value="add new destination" />
			</form>
		</div>
	);
};

export default CreateForm;
