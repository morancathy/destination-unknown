import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import CreateForm from '../components/CreateForm';
import CommentForm from '../components/CommentForm';

export default function Home(props) {
	const [destinations, setDestinations] = useState([]);
	const [showForm, setShowForm] = useState(false);

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

	const toggleForm = () => {
		if (!showForm) {
			setShowForm(true);
		} else {
			setShowForm(false);
		}
	};

	return (
		<div className="HomePage">
			<div class="jumbotron jumbotron-fluid bg-info text-white text-center">
				<div class="container">
					<h1 class="display-1">Destination Unknown</h1>
				</div>
			</div>
			<ul className="Dest-List" class="row">
				{destinations.map(destination => {
					return (
						<div class="col-md-6 col-lg-3">
							<li
								key={destination._id}
								id="cards"
								class="card"
								style={{
									border: 'solid #964B00',
									marginTop: '20px'
								}}
							>
								<img class="card-img-top" src="" alt="Card image" />
								<div class="card-body">
									<h3 class=" card-tile">{destination.title}</h3>
									<h4 class="card-subtitle mb-2 text-muted">
										{destination.city}, {destination.country}
									</h4>
									<p class="card-text">{destination.description}</p>
									<Link to={`/${destination._id}`} comms={destination.comments}>
										<button class="btn btn-primary">Explore</button>
									</Link>
								</div>
								{console.log('43', destination.comments)}
							</li>
						</div>
					);
				})}
			</ul>

			<div
				className="toCreateForm"
				style={{
					display: 'flex',
					flexDirection: 'column',
					width: '55%',
					margin: '0 auto'
				}}
			>
				<h4 style={{ margin: '0 auto', marginTop: '30px' }}>
					Have an off-the-beaten track suggestion?
				</h4>
				<button onClick={toggleForm} style={{ margin: '0px 0px 30px 0px' }}>
					Add here!
				</button>
			</div>

			{showForm && <CreateForm fetchData={fetchData} />}

			<div class="container-fluid" style={{ background: 'pink' }}>
				<h2>Add more stuff</h2>
			</div>

			<footer class="text-center text-lg-start bg-light text-muted">
				<div
					class="text-center p-4"
					style={{ backgroundColor: 'rgba 0, 0, 0, 0.05' }}
				>
					© 2021 Copyright Moran Inc.
				</div>
			</footer>
		</div>
	);
}

// <a class="text-reset fw-bold" href="https://mdbootstrap.com/">
// 	Moran
// </a>
