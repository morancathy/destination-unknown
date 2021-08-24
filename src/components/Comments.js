import React, { useState } from 'react';
import CommentForm from './CommentForm';

const Comments = ({
	props,
	destination,
	comments,
	fetchData,
	checkToken,
	token,
	loggedInUser
}) => {
	const [showComments, setShowComments] = useState(false);

	const toggleShowComments = () => {
		setShowComments(!showComments);
	};

	const iterateThroughDestCommentsArray = comId => {
		for (let i = 0; i < destination.comments.length; i++) {
			// console.log('dests comments', destination.comments[i]);
			// console.log('comId', comId._id);
			if (destination.comments[i] === comId._id) {
				// console.log('matching', comId._id);
				return true;
			}
		}
	};

	return (
		<div className="Comments">
			<button
				className="comment-but"
				onClick={() => {
					toggleShowComments();
				}}
			>
				{!showComments ? 'Comments' : 'Close'}
			</button>
			<ul>
				{comments.map(comment => {
					return (
						<div>
							{iterateThroughDestCommentsArray(comment) && (
								<li key={comment._id} id="comment-cards">
									{/*	<p>id: {comment._id}</p>
                      <p>destinationcomments: {destination.comments}</p>}*/}
									<h5>{comment.message}</h5>
									<h5 className="comm-author">written by: {comment.name}</h5>
								</li>
							)}
						</div>
					);
				})}
			</ul>

			{showComments && (
				<CommentForm
					props={props}
					fetchData={fetchData}
					checkToken={checkToken}
					token={token}
					loggedInUser={loggedInUser}
				>
					{' '}
				</CommentForm>
			)}
		</div>
	);
};

export default Comments;
