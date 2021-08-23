import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import UpdateForm from '../components/UpdateForm';
import CommentForm from '../components/CommentForm';
import Comments from '../components/Comments';
import Footer from '../components/Footer';

export default function Show(props, comms) {
	const [destination, setDestination] = useState({});
	const [comments, setComments] = useState([]);
	const [showComments, setShowComments] = useState(false);
	const [showForm, setShowForm] = useState(false);
	const [showUpdateBut, setShowUpdateBut] = useState(true);

	useEffect(() => {
		(async () => {
			try {
				fetchData();
			} catch (error) {
				console.error(error);
			}
		})();
	}, []);

	const fetchData = async () => {
		const response = await fetch(`/api/destinations/${props.match.params.id}`);
		const data = await response.json();
		setDestination(data); //this needs to be here, not in useeffect for update to work properly
		// fetchComment(data.comments);
		fetchComment();
		return data;
	};

	// const fetchComment = async comm => {
	const fetchComment = async () => {
		try {
			// console.log('cathy', comm);
			// const response = await fetch(`/api/destinations/comments/${comm}`);
			const response = await fetch(`/api/destinations/comments`);
			const data = await response.json();
			setComments(data);
		} catch (error) {
			console.error(error);
		}
	};

	const toggleForm = () => {
		if (!showForm) {
			setShowForm(true);
		} else {
			setShowForm(false);
		}
	};

	const toggleUpdateBut = () => {
		setShowUpdateBut(!showUpdateBut);
	};
	const toggleShowComments = () => {
		setShowComments(!showComments);
	};

	// const displayComments = (para) => {
	// 	for (let i = 0; i < para; i++) {
	// 		return (
	// 			<div className="comment-box">
	// 				<h5>comments: {comments.[i].message}</h5>
	// 				<h5>written by: {comments.[i].name}</h5>
	// 			</div>
	// 		);
	// 	}
	// };

	const searchComments = (destCommId, commId) => {
		// if (destCommId === commId) {
		console.log(`75 ${destCommId}`);
		console.log(`76 ${commId}`);
		return true;
		// }
	};

	// const iterateThroughDestCommentsArray = () => {
	// 	for (let i = 0; i < destination.comments.length; i++) {
	// 		console.log('dests comments', destination.comments[i]);
	// 		for (let a = 0; a < comments.length; a++) {
	// 			if (destination.comments[i] === comments[a]._id) {
	// 				console.log('matching', comments[a]._id);
	// 				return comments[a]._id;
	// 			}
	// 		}
	// 	}
	// };
	const iterateThroughDestCommentsArray = comId => {
		for (let i = 0; i < destination.comments.length; i++) {
			console.log('dests comments', destination.comments[i]);
			console.log('comId', comId._id);
			if (destination.comments[i] === comId._id) {
				console.log('matching', comId._id);
				return true;
			}
		}
	};

	return (
		<div className="ShowPage">
			{Object.keys(destination).length ? (
				<>
					<div className="showTitle">
						<h1>{destination.title}</h1>
						<h2>
							{destination.city}, {destination.country}
						</h2>
						<div className="imgDiv">
							<img src=".../public/img/smoothie.png" alt="Card image" />
						</div>
					</div>
					<div className="showDescript">
						<h4>{destination.description}</h4>
						<h5>
							<strong>How to Get There:</strong>
							<p className="getting-there">{destination.howToGetThere}</p>
						</h5>
						<p className="added-by">added by: {destination.name}</p>
						<p className="date">{destination.createdAt}</p>

						{console.log('96comments', comments)}

						<div className="commentDiv">
							{destination.comments.length ? (
								<div className="comment-box">
									<button
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
													{console.log(
														`destination.comments: ${destination.comments}`
													)}
													{console.log(`comment._id: ${comment._id}`)}
													{iterateThroughDestCommentsArray(comment) && (
														<li key={comment._id} id="comment-cards">
															{/*	<p>id: {comment._id}</p>
															<p>destinationcomments: {destination.comments}</p>}*/}
															<h5>{comment.message}</h5>
															<h5>written by: {comment.name}</h5>
														</li>
													)}
												</div>
											);
										})}
									</ul>
								</div>
							) : (
								<CommentForm
									commentsIds={destination.comments}
									destination={destination}
									props={props}
									fetchData={fetchData}
								/>
							)}

							{showComments && <Comments props={props}> </Comments>}
						</div>

						{showUpdateBut && (
							<button
								onClick={() => {
									toggleForm();
									toggleUpdateBut();
								}}
							>
								Update
							</button>
						)}

						{showForm && (
							<UpdateForm
								destination={destination}
								props={props}
								fetchData={fetchData}
								toggleUpdateBut={toggleUpdateBut}
								toggleForm={toggleForm}
							>
								{' '}
							</UpdateForm>
						)}
					</div>
				</>
			) : (
				<h1> Finding Destination... </h1>
			)}
			<Footer />
		</div>
	);
}

// {destination.comments.length ? (
// 	<ul>
// 		{comments.map(comment => {
// 			return (
// 				<li key={comment._id}>
// 					<div className="comment-box">
// 						<h5>comments: {comment.message}</h5>
// 						<h5>written by: {comment.name}</h5>
// 					</div>
// 				</li>
// 			);
// 		})}
// 	</ul>
// ) : (
// 	<></>
// )}

// {destination.comments.length ? (
// 	<div className="comment-box">
// 		<h5>comments: {comments.message}</h5>
// 		<h5>written by: {comments.name}</h5>
// 	</div>
// ) : (
// 	<></>
// )}

// const fetchComment = async comm => {
// 	try {
// 		console.log('cathy', comm);
// 		for (let i = 0; i < comm.length; i++) {
// 			const response = await fetch(`/api/destinations/comments/${i}`);
// 			const data = await response.json();
// 			setComments(data);
// 		}
// 	} catch (error) {
// 		console.error(error);
// 	}
// };

// <div className="comments">
// 	<h5>{comments.message}</h5>
// 	<h5>written by: {comments.name}</h5>
// </div>

// searchComments(
// 	comment._id,
// 	destination.comments
// )

// {`${comment._id}` === `${destination.comments}` && (
// 	<li key={comment._id} id="comment-cards">
// 		<p>id: {comment._id}</p>
// 		<p>destinationcomments: {destination.comments}</p>
// 		<h5>{comment.message}</h5>
// 		<h5>written by: {comment.name}</h5>
// 	</li>
// )}
