import React, { useState, useEffect } from 'react';
import Comments from '../components/Comments';

const CommentForm = ({
	props,
	destination,
	comments,
	fetchData,
	checkToken,
	token,
	loggedInUser
}) => {
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
		<>
			<div className="CommentForm">
				<button
					className="comment-button2"
					onClick={() => {
						checkToken() && toggleCommentForm();
					}}
				>
					{!showCommentForm ? 'add comment' : 'close'}
				</button>
				{console.log('incommentform.js', showCommentForm)}
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
				{destination.comments.length && (
					<Comments
						props={props}
						destination={destination}
						comments={comments}
						fetchData={fetchData}
						checkToken={checkToken}
						token={token}
						loggedInUser={loggedInUser}
					>
						{' '}
					</Comments>
				)}
			</div>
		</>
	);
};

export default CommentForm;
