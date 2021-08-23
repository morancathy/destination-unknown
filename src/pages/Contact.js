import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import CreateForm from '../components/CreateForm';
// import CommentForm from '../components/CommentForm';
import Footer from '../components/Footer';

export default function Contact(props) {
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
				{destinations.map(destination => {
					return (
						<div>
							<li key={destination._id} id="cards" className="dest-card">
								<img className="card-image" src="" alt="Card image" />
								<div className="card-body">
									<h5>
										{destination.city}, {destination.country}
									</h5>
									<Link to={`/${destination._id}`} comms={destination.comments}>
										<h4 className="">{destination.title}</h4>
									</Link>
									<p className="">
										{destination.description.length > 100
											? `${destination.description.substring(0, 100)}...`
											: destination.description}
									</p>
								</div>
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

			<div className="container-fluid" style={{ background: 'pink' }}>
				<h2>Add more stuff</h2>
			</div>
			<Footer />
		</div>
	);
}
