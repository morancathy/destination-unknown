import React, { useState, useEffect, useRef } from 'react';
import Modal from './Modal';

const UpdateForm = ({
	props,
	destination,
	fetchData,
	toggleUpdateBut,
	toggleForm,
	setShowCommentFormComp,
	showCommentFormComp
}) => {
	const [updatedDest, setUpdatedDest] = useState({});
	const titleInput = useRef(null);
	const countryInput = useRef(null);
	const cityInput = useRef(null);
	const descriptionInput = useRef(null);
	const howToGetThereInput = useRef(null);
	const imgInput = useRef(null);
	const [modal, setModal] = useState(false);

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
			setShowCommentFormComp(!showCommentFormComp);
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

	return (
		<div className="UpdateForm" id="update-form">
			{console.log(destination.name)}
			<button
				onClick={() => {
					toggleForm(),
						toggleUpdateBut(),
						setShowCommentFormComp(!showCommentFormComp);
				}}
				className="closeBut btn btn-sm float-left"
			>
				Close
			</button>

			<button
				className="deleteBut btn btn-link btn-sm float-right"
				onClick={() => setModal(!modal)}
			>
				Delete
			</button>

			<Modal show={modal} handleClose={e => setModal(!modal)}>
				<h2>Are You Sure?</h2>
				<div className="form-group">
					<button
						className="btn btn-danger"
						onClick={() => handleDelete(destination._id)}
					>
						Yes, Delete
					</button>
				</div>
			</Modal>

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
						ref={titleInput}
					/>
				</label>
				<label>
					<h4 className="label">Country: </h4>
					<input
						type="text"
						id="country"
						defaultValue={destination.country}
						ref={countryInput}
					/>
				</label>
				<label>
					<h4 className="label">City: </h4>
					<input
						type="text"
						id="city"
						defaultValue={destination.city}
						ref={cityInput}
					/>
				</label>
				<label>
					<h4 className="label">Upload Image: </h4>
					<input
						type="img"
						id="img"
						defaultValue={destination.img}
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
						ref={howToGetThereInput}
					/>
				</div>
				<div className="entry">
					<h4 className="label description">Description: </h4>
					<textarea
						rows="7"
						cols="40"
						type="text"
						id="description"
						defaultValue={destination.description}
						ref={descriptionInput}
					/>
				</div>

				<input type="submit" value="update" />
			</form>
		</div>
	);
};

export default UpdateForm;
