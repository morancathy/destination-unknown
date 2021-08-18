import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import CreateForm from '../components/CreateForm';

export default function Home(props) {
	const [destinations, setDestinations] = useState([]);

	const fetchData = async () => {
		const response = await fetch('/api/destinations');
		const data = await response.json();
		return data;
	};

	useEffect(() => {
		(async () => {
			try {
				setDestinations(await fetchData());
			} catch (error) {
				console.error(error);
			}
		})();
	}, []);

	return (
		<div className="HomePage">
			<h1>Destination Unknown</h1>
			<CreateForm fetchData={fetchData} />
			<ul className="Dest-List">
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
