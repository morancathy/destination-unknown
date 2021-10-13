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
