import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Cards(props, context) {
	const [destinations, setDestinations] = useState([]);

	const fetchData = async () => {
		try {
			const response = await fetch('/api/destinations');
			const data = await response.json();
			setDestinations(data.reverse());
			return data;
		} catch (error) {
			console.error(error);
		}
	};

	useEffect(() => {
		(async () => {
			try {
				fetchData();
			} catch (error) {
				console.error(error);
			}
		})();
	}, []);

	return (
		<div className="HomePage">
			<div
				className="head topographic wide-container text-white text-center"
				style={{ backgroundColor: '#759168' }}
			>
				<div className="container hero-search-wrapper">
					<h1 className="head-title display-1" style={{ fontSize: '40px' }}>
						Destination Unknown
					</h1>
					<p className="lead">~ Full Destination List ~</p>
				</div>
			</div>
			<ul className="destination-div">
				{destinations.map((destination, index) => {
					return (
						<div>
							<li key={destination._id} id="cards" className="dest-card">
								<img
									className="card-image"
									src={destination.img}
									alt="Card image"
								/>
								<div className="card-body">
									<h5>
										{destination.city}, {destination.country}
									</h5>
									<Link to={`/${destination._id}`} comms={destination.comments}>
										<h4 className="">{destination.title}</h4>
									</Link>
									<p className="">
										{destination.description.length > 200
											? `${destination.description.substring(0, 200)}...`
											: destination.description}
									</p>
								</div>
								<p className="added-by">~ {destination.name}</p>
							</li>
						</div>
					);
				})}
			</ul>
		</div>
	);
}
