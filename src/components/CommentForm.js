import React, { useState, useEffect } from 'react';

const CommentForm = ({ props, destination, fetchData, commentsIds }) => {
	const [comment, setComment] = useState({});
	const [newComment, setNewComment] = useState({
		name: '',
		message: ''
	});

	const handleUpdate = async e => {
		e.preventDefault();
		try {
			console.log('13', commentsIds);

			const response = await fetch(
				`/api/destinations/${props.match.params.id}/addComment`,
				{
					method: 'PUT',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify(comment)
				}
			);
			const data = await response.json();
			setComment(data);
			fetchData();
		} catch (error) {
			console.error(error);
		}
	};

	const handleChange = e => {
		setComment({ ...comment, [e.target.id]: e.target.value });
	};

	return (
		<div className="CommentForm">
			<p>This is the Comment Form</p>

			{console.log(destination.name)}
			<form
				className=""
				onSubmit={handleUpdate}
				style={{ display: 'flex', flexDirection: 'column' }}
			>
				<input type="text" id="name" onChange={handleChange} />
				<input type="text" id="message" onChange={handleChange} />
				<input type="submit" value="update" />
			</form>
		</div>
	);
};

export default CommentForm;
