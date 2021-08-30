import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import CreateForm from '../components/CreateForm';
import Api from './Api';
import Footer from '../components/Footer';
import Modal from '../components/Modal';

export default function Home(props, context) {
	const [destinations, setDestinations] = useState([]);
	const [token, setToken] = useState('');
	const [loggedInUser, setLoggedInUser] = useState('');
	const [place, setPlace] = useState('');
	const [showForm, setShowForm] = useState(false);
	const [modal, setModal] = useState(false);
	const [backBut, setBackBut] = useState(false);

	const siteCreator = 'Cathy M';

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

	const checkToken = () => {
		if (token) {
			return true;
		} else {
			setModal(!modal);
		}
	};

	const handleSubmit = e => {
		e.preventDefault();
		setPlace('');
	};

	const handleChange = e => {
		setPlace(event.target.value);
	};

	const toggleBackBut = () => {
		setBackBut(!backBut);
		{
			backBut && console.log('works');
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
				{destinations.map((destination, index) => {
					if (index < 8) {
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
										<Link
											to={`/${destination._id}`}
											comms={destination.comments}
										>
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
					}
				})}
			</ul>
			<h3 className="recently-added">Recently Added</h3>
			<ul className="destination-div">
				{destinations.map((destination, index) => {
					if (destination.name !== `${siteCreator}`) {
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
										<Link
											to={`/${destination._id}`}
											comms={destination.comments}
										>
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
					}
				})}
			</ul>
			<div className="text-center">
				<Link to={'/cards'}>
					<button className="view-more" onClick={toggleBackBut}>
						view all
					</button>
				</Link>
			</div>

			<div className="after-cards">
				<div className="toExplore">
					<div
						className="explore"
						style={{ display: 'flex', flexDirection: 'row' }}
					>
						<Link to={'/find'}>
							<button className="explore-but">Explore</button>
						</Link>
					</div>{' '}
					<h4>Need inspiration?</h4>{' '}
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
							{!showForm ? 'Add Here' : 'close form'}
						</button>
					</div>
					<h4>Have an off-the-beaten track suggestion?</h4>

					<Modal show={modal} handleClose={e => setModal(!modal)}>
						<h2>Please log in</h2>
						<div className="form-group">
							<Link to={'/login'}>
								<h4 className="btn btn-primary">Log In</h4>
							</Link>
						</div>
					</Modal>
				</div>
			</div>
			{showForm && (
				<CreateForm
					fetchData={fetchData}
					loggedInUser={loggedInUser}
					toggleForm={toggleForm}
				/>
			)}
			<Footer />
		</div>
	);
}
