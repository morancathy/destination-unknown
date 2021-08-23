import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import UpdateForm from '../components/UpdateForm';
import CommentForm from '../components/CommentForm';
import Comments from '../components/Comments';
import Footer from '../components/Footer';

export default function Show(props, comms) {
	const [destination, setDestination] = useState({});
	const [comments, setComments] = useState([]);
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
						{showUpdateBut && (
							<button
								className="update-but float-right"
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
						{console.log('96comments', comments)}

						{/*<div className="commentDiv">*/}
						{destination.comments.length ? (
							<Comments
								props={props}
								destination={destination}
								comments={comments}
							>
								{' '}
							</Comments>
						) : (
							<CommentForm
								commentsIds={destination.comments}
								destination={destination}
								props={props}
								fetchData={fetchData}
							/>
						)}
						{/*	</div>*/}
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
