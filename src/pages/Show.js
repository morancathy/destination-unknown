import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import moment from 'moment';
import UpdateForm from '../components/UpdateForm';
import CommentForm from '../components/CommentForm';
import Modal from '../components/Modal';

export default function Show(props, comms) {
	const [destination, setDestination] = useState({});
	const [comments, setComments] = useState([]);
	const [showForm, setShowForm] = useState(false);
	const [showUpdateBut, setShowUpdateBut] = useState(true);
	const [showCommentFormComp, setShowCommentFormComp] = useState(true);
	const [token, setToken] = useState('');
	const [loggedInUser, setLoggedInUser] = useState('');
	const [modal, setModal] = useState(false);
	const [modalText, setModalText] = useState('Please log in');
	const history = useHistory();

	useEffect(() => {
		(async () => {
			window.scrollTo(0, 0);
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
		try {
			const response = await fetch(
				`/api/destinations/${props.match.params.id}`
			);
			const data = await response.json();
			setDestination(data); //this needs to be here, not in useeffect for update to work properly
			fetchComment();
			return data;
		} catch (error) {
			console.error(error);
		}
	};

	const fetchComment = async () => {
		try {
			const response = await fetch(`/api/destinations/comments`);
			const data = await response.json();
			setComments(data.reverse());
		} catch (error) {
			console.error(error);
		}
	};

	const toggleUpdate = () => {
		setShowForm(!showForm);
		setShowUpdateBut(!showUpdateBut);
		setShowCommentFormComp(!showCommentFormComp);
	};

	const checkToken = () => {
		if (token) {
			return true;
		}
		setModal(!modal);
	};

	const checkTokenUpdate = entry => {
		if (token) {
			if (setText(entry)) {
				return true;
			}
		}
		setModal(!modal);
	};

	const setText = entry => {
		if (loggedInUser === entry.name) {
			return true;
		} else {
			setModalText('Only creater of the entry is allowed to edit.');
			return false;
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
							{moment(destination.createdAt).format('MMMM DD, YYYY')}
						</p>

						{showUpdateBut && (
							<a href="#update-form">
								<button
									className="update-but float-right"
									onClick={() => {
										checkTokenUpdate(destination) && toggleUpdate();
									}}
								>
									update
								</button>
							</a>
						)}
						<Modal show={modal} handleClose={e => setModal(!modal)}>
							<h4 className="modal-text">{modalText}</h4>
							<div className="form-group">
								<Link to={'/login'}>
									<p className="show-go-to btn btn-primary">Log In</p>
								</Link>
							</div>
						</Modal>

						{showForm && (
							<UpdateForm
								props={props}
								destination={destination}
								fetchData={fetchData}
								toggleUpdate={toggleUpdate}
							>
								{' '}
							</UpdateForm>
						)}

						{showCommentFormComp && (
							<CommentForm
								props={props}
								destination={destination}
								comments={comments}
								fetchData={fetchData}
								checkToken={checkToken}
								checkTokenUpdate={checkTokenUpdate}
								loggedInUser={loggedInUser}
							/>
						)}
						<div className="go-back">
							<a href="javascript:history.back()">{'<-- go back'}</a>
						</div>
					</div>
				</>
			) : (
				<h1> Finding Destination... </h1>
			)}
		</div>
	);
}
