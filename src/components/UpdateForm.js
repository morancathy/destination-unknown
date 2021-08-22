import React, { useState, useEffect, useRef } from 'react';

const UpdateForm = ({
	props,
	destination,
	fetchData,
	toggleUpdateBut,
	toggleForm
}) => {
	const [updatedDest, setUpdatedDest] = useState({});
	const titleInput = useRef(null);
	const countryInput = useRef(null);
	const cityInput = useRef(null);
	const descriptionInput = useRef(null);
	const howToGetThereInput = useRef(null);
	const imgInput = useRef(null);

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
					body: JSON.stringify({
						// updatedDest
						title: titleInput.current.value,
						country: countryInput.current.value,
						city: cityInput.current.value,
						description: descriptionInput.current.value,
						howToGetThere: howToGetThereInput.current.value,
						img: imgInput.current.value
					})
				}
			);
			const data = await response.json();
			setUpdatedDest(data);
			fetchData();
			toggleUpdateBut();
			toggleForm();
		} catch (error) {
			console.error(error);
		}
	};

	const handleDelete = async id => {
		try {
			const response = await fetch(
				`/api/destinations/${props.match.params.id}`,
				{
					method: 'DELETE',
					headers: {
						'Content-Type': 'application/json'
					}
				}
			);
			setDestination(destination.filter(dest => dest._id !== id));
		} catch (error) {
			console.error(error);
		} finally {
			window.location.assign('/');
		}
	};
	// const handleChange = e => {
	// 	setUpdatedDest({ [e.target.id]: e.target.value });
	// };

	return (
		<div className="UpdateForm">
			{console.log(destination.name)}
			<button
				className="deleteBut btn btn-link btn-sm float-right"
				onClick={() => handleDelete(destination._id)}
			>
				Delete
			</button>
			<form
				className=""
				onSubmit={handleUpdate}
				style={{ display: 'flex', flexDirection: 'column' }}
			>
				<label>
					<h4 className="label">Title: </h4>
					<input
						type="text"
						id="title"
						defaultValue={destination.title}
						// onChange={handleChange}
						ref={titleInput}
					/>
				</label>
				<label>
					<h4 className="label">Country: </h4>
					<input
						type="text"
						id="country"
						defaultValue={destination.country}
						// onChange={handleChange}
						ref={countryInput}
					/>
				</label>
				<label>
					<h4 className="label">City: </h4>
					<input
						type="text"
						id="city"
						defaultValue={destination.city}
						// onChange={handleChange}
						ref={cityInput}
					/>
				</label>
				<label>
					<h4 className="label">Upload Image: </h4>
					<input
						type="img"
						id="img"
						defaultValue={destination.img}
						// onChange={handleChange}
						ref={imgInput}
					/>
				</label>
				<div className="entry">
					<h4 className="label">Getting There:</h4>
					<textarea
						rows="2"
						type="text"
						id="howToGetThere"
						defaultValue={destination.howToGetThere}
						// onChange={handleChange}
						ref={howToGetThereInput}
					/>
				</div>
				<div className="entry">
					<h4 className="label">Description: </h4>
					<textarea
						rows="7"
						cols="40"
						type="text"
						id="description"
						defaultValue={destination.description}
						// onChange={handleChange}
						ref={descriptionInput}
					/>
				</div>

				<input type="submit" value="update" />
			</form>
		</div>
	);
};

export default UpdateForm;
