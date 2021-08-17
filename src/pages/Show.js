import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Show(props) {
	const [destination, setDestination] = useState({});

	useEffect(() => {
		(async () => {
			try {
				const response = await fetch(
					`/api/destinations/${props.match.params.id}`
				);
				const data = await response.json();
				setDestination(data);
			} catch (error) {
				console.error(error);
			}
		})();
	}, []);

	// useEffect(() => {
	// 	(async () => {
	// 		try {
	// 			const response = await fetch(
	// 				`/api/destinations/${props.match.params.id}/addComment`
	// 			);
	// 			const data = await response.json();
	// 			setDestination(data);
	// 		} catch (error) {
	// 			console.error(error);
	// 		}
	// 	})();
	// }, []);

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
					<h5>Created by: {destination.name}</h5>
					<h5>Comments: {destination.comments}</h5>

					<button onClick={() => handleDelete(destination._id)}>Delete</button>

					<Link to={`/${destination._id}/comment`}>
						<p>Make a Comment</p>
					</Link>
				</>
			) : (
				<h1> Finding Destination... </h1>
			)}
		</div>
	);
}

// <Link to={`/${destination._id}/update`}>
//   <button>Update</button>
// </Link>
