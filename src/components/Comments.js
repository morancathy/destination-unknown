import React, { useState } from 'react';
import UpdateComments from '../components/UpdateComments';

const Comments = ({
	props,
	destination,
	comments,
	setComments,
	fetchData,
	checkToken
}) => {
	const [showMore, setShowMore] = useState(false);
	const [updateComments, setUpdateComments] = useState(false);

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

	return (
		<div className="Comments">
			<ul>
				{comments.map(comment => {
					return (
						<div>
							{iterateThroughDestCommentsArray(
								destination.comments,
								comment
							) && (
								<li key={comment._id} id="comment-cards">
									<button
										className="edit-comment-but2"
										onClick={() => {
											checkToken() && toggle(setUpdateComments, updateComments);
										}}
									>
										{!updateComments ? (
											<div>
												<h5 className="comm-author">{comment.name}</h5>
												<h5 className="message">{comment.message}</h5>
											</div>
										) : (
											<h5 className="close">close</h5>
										)}
									</button>
									{console.log('des.com.length', destination.comments.length)}
									{console.log('com.length', comments.length)}

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
		</div>
	);
};

export default Comments;
