import React, { useState, useEffect } from 'react';

const CommentForm = ({ props, destination, fetchData }) => {
	const [comment, setComment] = useState({});
	const [newComment, setNewComment] = useState({
		name: '',
		message: ''
	});
	const [showCommentForm, setShowCommentForm] = useState(false);

	const handleUpdate = async e => {
		e.preventDefault();
		try {
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
			toggleCommentForm();
		} catch (error) {
			console.error(error);
		}
	};

	const handleChange = e => {
		setComment({ ...comment, [e.target.id]: e.target.value });
	};
	const toggleCommentForm = () => {
		setShowCommentForm(!showCommentForm);
	};

	return (
		<div className="CommentForm">
			<button className="comment-button2" onClick={toggleCommentForm}>
				{' '}
				{!showCommentForm ? 'Make a Comment' : 'x'}
			</button>

			{showCommentForm && (
				<form
					className="comment-form"
					onSubmit={handleUpdate}
					style={{ display: 'flex', flexDirection: 'column' }}
				>
					<input
						type="text"
						id="message"
						placeholder="comment"
						required
						onChange={handleChange}
					/>
					<input
						type="text"
						id="name"
						placeholder="name"
						required
						onChange={handleChange}
					/>
					<input
						className="add-commment-but"
						type="submit"
						value="Add Comment"
					/>
				</form>
			)}
		</div>
	);
};

export default CommentForm;

// {console.log(destination.name)}
