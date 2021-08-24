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
	const [showMore, setShowMore] = useState(false);

	const toggleShowComments = () => {
		setShowComments(!showComments);
	};
	const toggleShowMore = () => {
		setShowMore(!showMore);
	};

	const iterateThroughDestCommentsArray = (array, comId) => {
		for (let i = 0; i < array.length; i++) {
			if (array[i] === comId._id) {
				return true;
			}
		}
	};

	const firstTwoComments = () => {
		return destination.comments.slice(0, 2);
	};

	const overTwoComments = () => {
		return destination.comments.slice(2);
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
							{iterateThroughDestCommentsArray(firstTwoComments(), comment) && (
								<li key={comment._id} id="comment-cards">
									<h5>{comment.message}</h5>
									<h5 className="comm-author">written by: {comment.name}</h5>
									{console.log('lenght', destination.comments.length)}
								</li>
							)}
						</div>
					);
				})}
				{destination.comments.length > 2 && (
					<button
						onClick={() => {
							toggleShowMore();
						}}
					>
						...view more
					</button>
				)}
			</ul>

			{showMore && (
				<>
					<ul>
						{comments.map(comment => {
							return (
								<div>
									{iterateThroughDestCommentsArray(
										overTwoComments(),
										comment
									) && (
										<li key={comment._id} id="comment-cards">
											<h5>{comment.message}</h5>
											<h5 className="comm-author">
												written by: {comment.name}
											</h5>
										</li>
									)}
								</div>
							);
						})}
					</ul>
				</>
			)}

			{showComments && (
				<CommentForm
					props={props}
					fetchData={fetchData}
					checkToken={checkToken}
					// token={token}
					// loggedInUser={loggedInUser}
				>
					{' '}
				</CommentForm>
			)}
		</div>
	);
};

export default Comments;
