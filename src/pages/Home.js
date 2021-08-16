import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Home(props) {
	const [destinations, setDestinations] = useState([]);

	useEffect(() => {
		(async () => {
			try {
				const response = await fetch('/api/destinations');
				const data = await response.json();
				setDestinations(data);
			} catch (error) {
				console.error(error);
			}
		})();
	}, []);

	return (
		<div className="HomePage">
			This is the {props.page} page
			<ul>
				{destinations.map(destination => {
					return (
						<li key={destination._id}>
							<Link to={`/${destination._id}`}>
								<h3>{destination.title}</h3>
							</Link>
							<h4>{destination.country}</h4>
							<h4>{destination.city}</h4>
							<p>{destination.destinations}</p>
						</li>
					);
				})}
			</ul>
		</div>
	);
}
