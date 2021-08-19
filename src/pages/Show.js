import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import UpdateForm from '../components/UpdateForm';
import CommentForm from '../components/CommentForm';

export default function Show(props, comms) {
	const [destination, setDestination] = useState({});
	const [comments, setComments] = useState([]);
	const [showForm, setShowForm] = useState(false);
	const [showCommentForm, setShowCommentForm] = useState(false);

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
		fetchComment(data.comments);
		return data;
	};

	const fetchComment = async comm => {
		try {
			console.log('cathy', comm);
			const response = await fetch(`/api/destinations/comments/${comm}`);
			const data = await response.json();
			setComments(data);
		} catch (error) {
			console.error(error);
		}
	};

	const handleDelete = async id => {
		try {
			const response = await fetch(
				`/api/destinations/${props.match.params.id}`,
				{
					method: 'DELETE',
					headers: {
						'Content-Type': 'application/json'
					}
				}
			);
			setDestination(destination.filter(dest => dest._id !== id));
		} catch (error) {
			console.error(error);
		} finally {
			window.location.assign('/home');
		}
	};

	const toggleForm = () => {
		if (!showForm) {
			setShowForm(true);
		} else {
			setShowForm(false);
		}
	};
	const toggleCommentForm = () => {
		if (!showCommentForm) {
			setShowCommentForm(true);
		} else {
			setShowCommentForm(false);
		}
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

	return (
		<div className="ShowPage">
			{Object.keys(destination).length ? (
				<>
					<h1>{destination.title}</h1>
					<h2>{destination.country}</h2>
					<h3>{destination.city}</h3>
					<h4>Description: {destination.description}</h4>
					<h4>How to Get There: {destination.howToGetThere}</h4>
					<h3>{destination.img}</h3>
					<h5>Added by: {destination.name}</h5>
					<p>{destination.createdAt}</p>
					{console.log('86', destination.comments)}
					{console.log('87', comments)}

					<button onClick={toggleForm}>Update</button>

					{showForm && (
						<UpdateForm
							destination={destination}
							props={props}
							fetchData={fetchData}
						>
							{' '}
						</UpdateForm>
					)}

					<button onClick={() => handleDelete(destination._id)}>Delete</button>

					{destination.comments.length ? (
						<div className="comment-box">
							<h5>comments: {comments.message}</h5>
							<h5>written by: {comments.name}</h5>
						</div>
					) : (
						<></>
					)}

					<Link to={`/${destination._id}/addComment`}>
						<p>Make a Comment</p>
					</Link>

					<button onClick={toggleCommentForm}>Comment</button>

					{showCommentForm && (
						<CommentForm
							commentsIds={destination.comments}
							destination={destination}
							props={props}
							fetchData={fetchData}
						>
							{' '}
						</CommentForm>
					)}
				</>
			) : (
				<h1> Finding Destination... </h1>
			)}
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
