import React, { useState, useEffect, useRef } from 'react';

const UpdateComments = ({
	props,
	commentId,
	comment,
	destinationId,
	setUpdateComments,
	updateComments,
	toggle,
	fetchData
}) => {
	const [updatedDest, setUpdatedDest] = useState({});
	const [updatedComm, setUpdatedComm] = useState({});
	const messageInput = useRef(null);
	const nameInput = useRef(null);

	// Unable to update comments in both destination and comments model.

	// const handleUpdate = async e => {
	// 	console.log(`dest id: ${e.target.dataset.destination}`);
	// 	console.log('comid', `com id: ${e.target.dataset.comment}`);
	// 	e.preventDefault();
	// 	try {
	// 		const responseDestination = await fetch(
	// 			`/api/destinations/${e.target.dataset.destination}/${e.target.dataset.comment}`,
	// 			{
	// 				method: 'PUT',
	// 				headers: {
	// 					'Content-Type': 'application/json'
	// 				},
	// 				body: JSON.stringify({
	// 					name: nameInput.current.value,
	// 					message: messageInput.current.value
	// 				})
	// 			}
	// 		);
	//
	// 		const responseComment = await fetch(
	// 			`/api/destinations/comments/${e.target.dataset.comment}`,
	// 			{
	// 				method: 'PUT',
	// 				headers: {
	// 					'Content-Type': 'application/json'
	// 				},
	// 				body: JSON.stringify({
	// 					name: nameInput.current.value,
	// 					message: messageInput.current.value
	// 				})
	// 			}
	// 		);
	//
	// 		const data = await response.json();
	// 		setUpdatedComm(data);
	// 		fetchData();
	// 		toggle(setUpdateComments, updateComments);
	// 	} catch (error) {
	// 		console.error(error);
	// 	}
	// };

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
				className="deleteComBut btn btn-link btn-sm float-right"
				data-comment={commentId}
				data-destination={destinationId}
				onClick={handleDelete}
			>
				Delete
			</button>
			{/*			{console.log('destID', destinationId)}
			{console.log('88', comment.name)}
			{console.log(props.match.params.id)}

			<form
				className=""
				data-comment={commentId}
				data-destination={destinationId}
				onSubmit={handleUpdate}
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
			</form> */}
		</div>
	);
};

export default UpdateComments;
