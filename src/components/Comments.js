import React, { useState } from 'react';
import UpdateComments from '../components/UpdateComments';

const Comments = ({
	props,
	destination,
	comments,
	setComments,
	fetchData,
	checkToken,
	token,
	loggedInUser
}) => {
	// const [showComments, setShowComments] = useState(false);
	const [showMore, setShowMore] = useState(false);

	// const toggleShowComments = () => {
	// 	setShowComments(!showComments);
	// };
	// const toggleShowMore = () => {
	// 	setShowMore(!showMore);
	// };
	const toggle = (a, b) => {
		a(!b);
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
			<ul>
				{comments.map(comment => {
					return (
						<div>
							{iterateThroughDestCommentsArray(firstTwoComments(), comment) && (
								<li key={comment._id} id="comment-cards">
									<h5>{comment.message}</h5>
									<h5 className="comm-author">written by: {comment.name}</h5>
									{console.log('lenght', destination.comments.length)}
									{console.log(comments)}

									{console.log(`${destination.comments}`)}
									{console.log(`commetnt._id ${comment._id}`)}

									<UpdateComments
										commentId={comment._id}
										props={props}
										comment={comment}
									/>
								</li>
							)}
						</div>
					);
				})}
				{destination.comments.length > 2 && (
					<button
						className="view-more"
						onClick={() => {
							toggle(setShowMore, showMore);
						}}
					>
						{!showMore ? '~~ view more ~~' : '~~ close ~~'}
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
											<UpdateComments
												commentId={comment._id}
												props={props}
												comment={comment}
											/>
										</li>
									)}
								</div>
							);
						})}
					</ul>
				</>
			)}
		</div>
	);
};

export default Comments;
