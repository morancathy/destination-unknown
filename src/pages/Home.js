import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import CreateForm from '../components/CreateForm';
// import CommentForm from '../components/CommentForm';
import Footer from '../components/Footer';

export default function Contact(props) {
	const [destinations, setDestinations] = useState([]);
	const [showForm, setShowForm] = useState(false);
	const [showUpdateBut, setShowUpdateBut] = useState(true);
	const [token, setToken] = useState('');
	const [loggedInUser, setLoggedInUser] = useState('');
	const [logInAlert, setlogInAlert] = useState(false);

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

	useEffect(() => {
		if (window.localStorage.getItem('token')) {
			setToken(window.localStorage.getItem('token'));
			setLoggedInUser(window.localStorage.getItem('loggedInUser'));
		}
	}, []);

	const toggleForm = () => {
		setShowForm(!showForm);
	};
	const toggleLogIn = () => {
		setlogInAlert(!logInAlert);
	};

	const checkToken = () => {
		if (token) {
			return true;
		} else {
			// alert('Must be logged in. (add link to log in page)');
			toggleLogIn();
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
			<div className="after-cards">
				<div className="toExplore">
					<form
						className="explore"
						// onSubmit={handleUpdate2}

						style={{ display: 'flex', flexDirection: 'row' }}
					>
						<input
							type="text"
							id="place"
							placeholder="enter city or country"
							required
						></input>
						<input
							className="explore-but"
							type="submit"
							value="Explore"
						></input>
						;
					</form>
					<Link to={'/api'}>
						{' '}
						<h4>Need inspiration?</h4>{' '}
					</Link>
				</div>

				<div className="toCreateForm">
					<div className="add-here-form">
						<button
							className="add-here"
							onClick={() => {
								checkToken() && toggleForm();
							}}
						>
							{' '}
							{!showForm ? 'Add here!' : 'close form'}
						</button>
					</div>
					<h4>Have an off-the-beaten track suggestion?</h4>
					{logInAlert && (
						<div className="alert">
							<button
								className="btn float-right"
								id="x-but"
								onClick={() => {
									toggleLogIn();
								}}
							>
								X
							</button>
							<h3>Please log in</h3>
							<Link to={'/login'}>
								<h4 className="btn btn-primary">Log In</h4>
							</Link>
						</div>
					)}
				</div>
			</div>

			{showForm && (
				<CreateForm
					fetchData={fetchData}
					loggedInUser={loggedInUser}
					toggleForm={toggleForm}
				/>
			)}

			{/*	<div className="container-fluid" style={{ background: 'pink' }}>
				<h2>Add more stuff</h2>
			</div>*/}
			<Footer />
		</div>
	);
}
