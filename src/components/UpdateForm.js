import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';

const UpdateForm = ({ props, destination, fetchData }) => {
	const [updatedDest, setUpdatedDest] = useState({});

	const handleUpdate = async e => {
		e.preventDefault();
		try {
			const response = await fetch(
				`/api/destinations/${props.match.params.id}`,
				{
					method: 'PUT',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify(updatedDest)
				}
			);
			const data = await response.json();
			setUpdatedDest(data);
			fetchData();
		} catch (error) {
			console.error(error);
		}
	};

	// const handleChange = e => {
	// 	setUpdatedDest({[e.target.id]: e.target.value });
	// };

	const handleChange = e => {
		setUpdatedDest({ [e.target.id]: e.target.value });
	};

	return (
		<div className="UpdateForm">
			<p>This is the Update Form</p>
			{console.log(destination.name)}
			<form
				className=""
				onSubmit={handleUpdate}
				style={{ display: 'flex', flexDirection: 'column' }}
			>
				<input
					type="text"
					id="title"
					defaultValue={destination.title}
					onChange={handleChange}
				/>
				<input
					type="text"
					id="country"
					defaultValue={destination.country}
					onChange={handleChange}
				/>
				<input
					type="text"
					id="city"
					defaultValue={destination.city}
					onChange={handleChange}
				/>
				<input
					type="text"
					id="description"
					defaultValue={destination.description}
					onChange={handleChange}
				/>
				<input
					type="text"
					id="howToGetThere"
					defaultValue={destination.howToGetThere}
					onChange={handleChange}
				/>
				<input
					type="img"
					id="img"
					defaultValue={destination.img}
					onChange={handleChange}
				/>
				<input
					type="text"
					id="name"
					defaultValue={destination.name}
					onChange={handleChange}
				/>
				<input type="submit" value="update" />
			</form>
		</div>
	);
};

export default UpdateForm;
