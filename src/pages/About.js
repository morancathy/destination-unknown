import React, { useState, useEffect } from 'react';
import Footer from '../components/Footer';

export default function About(props) {
	const [users, setUsers] = useState([]);

	useEffect(() => {
		(async () => {
			try {
				const response = await fetch('/register');
				const data = await response.json();
				setUsers(data);
			} catch (error) {
				console.error(error);
			}
		})();
	}, []);

	return (
		<div className="AboutPage">
			<div
				className="head topographic wide-container text-white text-center"
				style={{ backgroundColor: '#759168' }}
			>
				<div className="container hero-search-wrapper">
					<h1 className="head-title display-1" style={{ fontSize: '40px' }}>
						Destination Unknown
					</h1>
					<p className="lead">~ About ~</p>
				</div>
			</div>
			<div className="display">
				<ul className="user-div">
					<h2>Contributors:</h2>
					{users.map((user, index) => {
						return (
							<div>
								<li key={user._id} className="user">
									<p>{user.username}</p>
								</li>
							</div>
						);
					})}
				</ul>
				<div className="info-box">
					<h4 className="title">Home page photos:</h4>
					<p>
						<strong>Humbolt Park, Chicago, IL, USA</strong> - bottom left
					</p>
					<p>
						{' '}
						<strong>Coron Bay, Philippines</strong> - bottom right
					</p>
					<p className="disclaimer">
						<h4 className="title">API:</h4>
						Info and images in 'need inspiration' section pulled from
						www.triposo.com/api.
					</p>
					<div className="contact">
						<h4 className="title">Contact:</h4>
						<p>Cathy Diesel</p>
						<p>867-5309</p>
						<p>hunterRuck@marley.com</p>
					</div>
				</div>
			</div>
			<Footer />
		</div>
	);
}
