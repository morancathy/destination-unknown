import React, { useState, useEffect, useRef } from 'react';

const UpdateComments = ({
	props,
	commentId,
	comment,
	setUpdateComments,
	updateComments,
	toggle,
	fetchData
}) => {
	const [updatedDest, setUpdatedDest] = useState({});
	const [updatedComm, setUpdatedComm] = useState({});
	const messageInput = useRef(null);
	const nameInput = useRef(null);

	// `/api/destinations/comments/${props.match.params.id}`,
	const handleUpdate = async id => {
		e.preventDefault();
		try {
			const response = await fetch(`/api/destinations/comments/${id}`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					name: nameInput.current.value,
					message: messageInput.current.value
				})
			});
			const data = await response.json();
			setUpdatedComm(data);
			fetchData();
			toggle(setUpdateComments, updateComments);
			// console.log(updateComments);
		} catch (error) {
			console.error(error);
		}
	};

	const handleDelete = async id => {
		try {
			const response = await fetch(`/api/destinations/comments/${id}`, {
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json'
				}
			});
			setComments(comment.filter(comm => comm._id !== id));
		} catch (error) {
			console.error(error);
		} finally {
			window.location.assign('/');
		}
	};

	return (
		<div className="UpdateComments">
			<button
				className="deleteComBut btn btn-link btn-sm float-right"
				onClick={() => {
					handleDelete(commentId);
				}}
			>
				Delete
			</button>
			{/*console.log('destComm', destinationComments)*/}
			{console.log('88', comment.name)}
			{console.log(props.match.params.id)}

			<form
				className=""
				onSubmit={() => {
					handleUpdate(commenId);
				}}
				style={{ display: 'flex', flexDirection: 'column' }}
			>
				<label>
					<h4 className="label">Name: </h4>
					<input
						type="text"
						id="name"
						defaultValue={comment.name}
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
						defaultValue={comment.message}
						ref={messageInput}
					/>
				</div>

				<input className="update" type="submit" value="update" />
			</form>
		</div>
	);
};

export default UpdateComments;
