import React, { useState, useRef } from 'react';
import Modal from './Modal';

const UpdateComments = ({
	props,
	fetchData,
	destinationId,
	commentToUpdate,
	toggleUpdateForm
}) => {
	const [updatedDest, setUpdatedDest] = useState({});
	const [updatedComm, setUpdatedComm] = useState({});
	const [modal, setModal] = useState(false);
	const messageInput = useRef(null);
	const nameInput = useRef(null);

	const handleUpdate = async e => {
		e.preventDefault();

		try {
			const responseComment = await fetch(
				`/api/destinations/comments/${e.target.dataset.comment}`,
				{
					method: 'PUT',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify({
						name: nameInput.current.value,
						message: messageInput.current.value
					})
				}
			);
			const data = await responseComment.json();
			setUpdatedComm(data);
			toggleUpdateForm();
		} catch (error) {
			console.error(error);
		}
		fetchData();
	};

	const handleDelete = async e => {
		try {
			const responseDestination = await fetch(
				`/api/destinations/${e.target.dataset.destination}/${e.target.dataset.comment}`,
				{
					method: 'DELETE',
					headers: { 'Content-Type': 'application/json' }
				}
			);

			const responseComment = await fetch(
				`/api/destinations/comments/${e.target.dataset.comment}`,
				{
					method: 'DELETE',
					headers: { 'Content-Type': 'application/json' }
				}
			);
			setComments(comment.filter(comm => comm._id !== id));
		} catch (error) {
			console.error(error);
		} finally {
			window.location.assign(`/${destinationId}`);
		}
	};

	return (
		<div className="UpdateComments">
			<button
				onClick={() => {
					toggleUpdateForm();
				}}
				className="closeBut btn btn-sm float-left"
			>
				Close
			</button>
			<button
				className="deleteComBut btn btn-link btn-sm float-right"
				onClick={() => setModal(!modal)}
			>
				Delete
			</button>

			<Modal show={modal} handleClose={e => setModal(!modal)}>
				<h2>Are You Sure?</h2>
				<div className="form-group">
					<button
						className="btn btn-danger"
						data-comment={commentToUpdate._id}
						data-destination={destinationId}
						onClick={handleDelete}
					>
						Yes, Delete
					</button>
				</div>
			</Modal>

			<form
				className=""
				data-comment={commentToUpdate._id}
				data-destination={destinationId}
				onSubmit={handleUpdate}
				style={{ display: 'flex', flexDirection: 'column' }}
			>
				<label>
					<h4 className="label">Name: </h4>
					<input
						type="text"
						id="name"
						readOnly="readonly"
						defaultValue={commentToUpdate.name}
						ref={nameInput}
					/>
				</label>
				<div className="entry">
					<h4 className="label">Message: </h4>
					<textarea
						rows="5"
						cols="40"
						type="text"
						id="message"
						defaultValue={commentToUpdate.message}
						ref={messageInput}
					/>
				</div>
				<input className="update" type="submit" value="update" />
			</form>
		</div>
	);
};

export default UpdateComments;
