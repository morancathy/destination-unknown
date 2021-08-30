import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Moment from 'react-moment';
import UpdateForm from '../components/UpdateForm';
import CommentForm from '../components/CommentForm';
import Footer from '../components/Footer';
import Modal from '../components/Modal';

export default function Show(props, comms) {
	const [destination, setDestination] = useState({});
	const [comments, setComments] = useState([]);
	const [showForm, setShowForm] = useState(false);
	const [showUpdateBut, setShowUpdateBut] = useState(true);
	const [token, setToken] = useState('');
	const [loggedInUser, setLoggedInUser] = useState('');
	const [modal, setModal] = useState(false);
	const history = useHistory();

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

	const fetchData = async () => {
		const response = await fetch(`/api/destinations/${props.match.params.id}`);
		const data = await response.json();
		setDestination(data); //this needs to be here, not in useeffect for update to work properly
		// fetchComment(data.comments);
		fetchComment();
		return data;
	};

	// const fetchComment = async comm => {
	const fetchComment = async () => {
		try {
			// const response = await fetch(`/api/destinations/comments/${comm}`);
			const response = await fetch(`/api/destinations/comments`);
			const data = await response.json();
			setComments(data);
		} catch (error) {
			console.error(error);
		}
	};

	const toggleForm = () => {
		setShowForm(!showForm);
	};

	const toggleUpdateBut = () => {
		setShowUpdateBut(!showUpdateBut);
	};

	const checkToken = () => {
		if (token) {
			return true;
		} else {
			setModal(!modal);
		}
	};

	return (
		<div className="ShowPage">
			{Object.keys(destination).length ? (
				<>
					<div className="showTitle">
						<h1>{destination.title}</h1>
						<h2>
							{destination.city}, {destination.country}
						</h2>
						<div className="imgDiv">
							<img src={destination.img} alt="Card image" />
						</div>
					</div>
					<div className="showDescript">
						<h4>{destination.description}</h4>
						<h5>
							<strong>How to Get There:</strong>
							<p className="getting-there">{destination.howToGetThere}</p>
						</h5>
						<p className="added-by">added by: {destination.name}</p>
						<p className="date">
							<Moment format="MMM YYYY">{destination.createdAt}</Moment>
						</p>

						{showUpdateBut && (
							<button
								className="update-but float-right"
								onClick={() => {
									checkToken() && (toggleForm(), toggleUpdateBut());
								}}
							>
								update
							</button>
						)}
						<Modal show={modal} handleClose={e => setModal(!modal)}>
							<h2>Please log in</h2>
							<div className="form-group">
								<Link to={'/login'}>
									<h4 className="show-go-to btn btn-primary">Log In</h4>
								</Link>
							</div>
						</Modal>

						{showForm && (
							<UpdateForm
								props={props}
								destination={destination}
								fetchData={fetchData}
								toggleUpdateBut={toggleUpdateBut}
								toggleForm={toggleForm}
							>
								{' '}
							</UpdateForm>
						)}

						<CommentForm
							props={props}
							destination={destination}
							fetchData={fetchData}
							checkToken={checkToken}
							comments={comments}
							loggedInUser={loggedInUser}
							setComments={setComments}
						/>
						{/*	</div>*/}
						<div className="go-back">
							<a href="javascript:history.back()">{'<-- go back'}</a>
						</div>
					</div>
				</>
			) : (
				<h1> Finding Destination... </h1>
			)}

			<Footer />
		</div>
	);
}
