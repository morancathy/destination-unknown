import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import UpdateForm from '../components/UpdateForm';
import CommentForm from '../components/CommentForm';
import Footer from '../components/Footer';

export default function Show(props, comms) {
	const [destination, setDestination] = useState({});
	const [comments, setComments] = useState([]);
	const [showCommentForm, setShowCommentForm] = useState(false);
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
	const toggleUpdateBut = () => {
		setShowUpdateBut(!showUpdateBut);
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
					<div className="showTitle">
						<h1>{destination.title}</h1>
						<h2>
							{destination.city}, {destination.country}
						</h2>
						<img src=".../public/img/smoothie.png" alt="Card image" />
					</div>
					<div id="showDescript">
						<h4>{destination.description}</h4>
						<h5>
							<strong>How to Get There:</strong>
							<p className="getting-there">{destination.howToGetThere}</p>
						</h5>
						<p className="added-by">added by: {destination.name}</p>
						<p className="date">{destination.createdAt}</p>

						{console.log('86', destination.comments)}
						{console.log('87', comments)}

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

						{destination.comments.length ? (
							<div className="comment-box">
								<h5>comments: {comments.message}</h5>
								<h5>written by: {comments.name}</h5>
							</div>
						) : (
							<></>
						)}

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
