import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';

export default function Cards(props, context) {
	const [destinations, setDestinations] = useState([]);

	const fetchData = async () => {
		const response = await fetch('/api/destinations');
		const data = await response.json();
		setDestinations(data);
		return data;
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
					<h1 className="head-title display-1">Destination Unknown</h1>
					<p className="lead">
						Random, Odd, Unknown, Non-Touristy, Behind-the-Scences...whatever
						you want to call it, you won't find these suggestions on any top-10
						travel list. Find weird and inspiring ideas here. Blah blah blah,
						write more.
					</p>
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
							</li>
						</div>
					);
				})}
			</ul>

			<Footer />
		</div>
	);
}
