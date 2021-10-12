import React, { useState } from 'react';
import UpdateComments from '../components/UpdateComments';

const Comments = ({
	props,
	destination,
	comments,
	fetchData,
	checkToken,
	checkTokenUpdate
}) => {
	// const [showMore, setShowMore] = useState(false);
	const [showComments, setShowComments] = useState(true);
	const [updateComments, setUpdateComments] = useState(false);
	const [commentToUpdate, setCommentToUpdate] = useState({});

	const showUpdateCommentForm = id => {
		toggleUpdateForm();
		setCommentToUpdate(id);
	};

	const toggleUpdateForm = () => {
		setUpdateComments(!updateComments);
		setShowComments(!showComments);
	};

	const iterateThroughDestCommentsArray = (array, comId) => {
		for (let i = 0; i < array.length; i++) {
			if (array[i] === comId._id) {
				return true;
			}
		}
	};

	// const firstTwoComments = () => {
	// 	console.log('30', destination.comments[1], destination.comments[0]);
	// 	return destination.comments.slice(0, 2);
	// };
	//
	// const overTwoComments = () => {
	// 	return destination.comments.slice(2);
	// };

	return (
		<div className="Comments">
			<ul>
				{showComments && (
					<>
						{comments.map(comment => {
							return (
								<div key={comment._id}>
									{iterateThroughDestCommentsArray(
										destination.comments,
										comment
									) && (
										<li id="comment-cards">
											<button
												className="edit-comment-but2"
												onClick={() => {
													checkTokenUpdate(comment) &&
														showUpdateCommentForm(comment);
												}}
											>
												{!updateComments && (
													<div>
														<h5 className="comm-author">{comment.name}</h5>
														<h5 className="message">{comment.message}</h5>
														<h5 className="date">
															{' '}
															{moment(comment.createdAt).format('MMM DD, YY')}
														</h5>
													</div>
												)}
											</button>
										</li>
									)}
								</div>
							);
						})}
					</>
				)}
				{/*						I want to show only up to 2 comments, then a "show more button" for the rest...not working...yet
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
											<button
												className="edit-comment-but2"
												onClick={() => {
													toggle(setUpdateComments, updateComments);
												}}
											>
												<h5 className="comm-author">
													written by: {comment.name}
												</h5>

												<h5 className="message">{comment.message}</h5>
											</button>

											{updateComments && (
												<UpdateComments
													commentId={comment._id}
													destinationId={destination._id}
													props={props}
													comment={comment}
													setUpdateComments={setUpdateComments}
													toggle={toggle}
													updateComments={updateComments}
													fetchData={fetchData}
												/>
											)}
										</li>
									)}
								</div>
							);
						})}
					</ul>
				</>
			)}
			*/}

				{updateComments && (
					<UpdateComments
						props={props}
						fetchData={fetchData}
						destinationId={destination._id}
						commentToUpdate={commentToUpdate}
						toggleUpdateForm={toggleUpdateForm}
					/>
				)}
			</ul>
		</div>
	);
};

export default Comments;
// comment={comment}
// {/*commentId={comment._id}*/}
// put this right before UpdateComments, and after button
// {console.log('des.com.length', destination.comments.length)}
// {console.log('com.length', comments.length)}
