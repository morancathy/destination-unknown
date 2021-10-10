import React, { useState } from 'react';
import Comments from '../components/Comments';

const CommentForm = ({
	props,
	destination,
	comments,
	fetchData,
	checkToken,
	checkTokenUpdate,
	loggedInUser
}) => {
	const [newComment, setNewComment] = useState({
		name: `${loggedInUser}`,
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
					body: JSON.stringify(newComment)
				}
			);
			const data = await response.json();
			setNewComment(data);
			setShowCommentForm(!showCommentForm);
			setNewComment({
				name: `${loggedInUser}`,
				message: ''
			});
		} catch (error) {
			console.error(error);
		}
		fetchData();
	};

	const handleChange = e => {
		setNewComment({ ...newComment, [e.target.id]: e.target.value });
	};

	return (
		<>
			<div className="CommentForm">
				<button
					className="comment-button2"
					onClick={() => {
						checkToken() && setShowCommentForm(!showCommentForm);
					}}
				>
					{!showCommentForm ? 'add comment' : 'close'}
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
							required
							readOnly="readonly"
							value={loggedInUser}
							onChange={handleChange}
						/>
						<input
							className="add-commment-but"
							type="submit"
							value="Add Comment"
						/>
					</form>
				)}
				{destination.comments.length ? (
					<Comments
						props={props}
						destination={destination}
						comments={comments}
						fetchData={fetchData}
						checkToken={checkToken}
						checkTokenUpdate={checkTokenUpdate}
					>
						{' '}
					</Comments>
				) : (
					<></>
				)}
			</div>
		</>
	);
};

export default CommentForm;
