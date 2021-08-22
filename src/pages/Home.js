import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import CreateForm from '../components/CreateForm';
// import CommentForm from '../components/CommentForm';
import Footer from '../components/Footer';

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
			<div
				class="topographic wide-container bg-info text-white text-center"
				style={{ backgroundColor: '' }}
			>
				<div class="container hero-search-wrapper">
					<h1 class="display-1">Destination Unknown</h1>
					<p class="lead">
						Random, Odd, Unknown, Non-Touristy, Behind-the-Scences...whatever
						you want to call it, you won't find these suggestions on any top-10
						travel list. Find weird and inspiring ideas here. Blah blah blah,
						write more.
					</p>
				</div>
			</div>
			<ul
				className="Dest-List"
				class="row"
				style={{
					padding: '20px 10px',
					border: '1px solid orange',
					margin: '0px 19%'
				}}
			>
				{destinations.map(destination => {
					return (
						<div
							class="col-md-6 col-lg-3"
							style={{ padding: '20px 10px', border: '1px solid red' }}
						>
							<li
								key={destination._id}
								id="cards"
								class="card"
								style={{
									border: 'solid #964B00',
									marginTop: '20px',
									padding: '20px 10px',
									border: '1px solid pink',
									height: '90%'
								}}
							>
								<img class="card-img-top" src="" alt="Card image" />
								<div class="card-body">
									<h4
										class="card-subtitle mb-2 text-muted"
										style={{
											color: '#1b624f',
											fontSize: '15px',
											fontWeight: '600',
											lineHeight: '1em',
											letteSpacing: '0.12em',
											textTransform: 'uppercase'
										}}
									>
										{destination.city}, {destination.country}
									</h4>
									<h3
										class=" card-tile"
										style={{
											fontSize: '39px',
											color: '#382c14',
											lineHeight: '1.42'
										}}
									>
										{destination.title}
									</h3>
									<p
										class="card-text"
										style={{
											display: 'block',
											textOverflow: 'ellipsis'
										}}
									>
										{destination.description.length > 100
											? `${destination.description.substring(0, 100)}...`
											: destination.description}
									</p>
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
			<Footer />
		</div>
	);
}

// <a class="text-reset fw-bold" href="https://mdbootstrap.com/">
// 	Moran
// </a>
