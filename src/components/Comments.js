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
	//
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
				{/*{comments.reverse().map(comment => {*/}
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
				{/*
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
			</ul>
		</div>
	);
};

export default Comments;
