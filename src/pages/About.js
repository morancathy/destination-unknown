import React, { useState, useEffect } from 'react';

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
					<h4>Contributors:</h4>
					{users.map((user, index) => {
						return (
							<li key={user._id} className="user">
								<p>{user.username}</p>
							</li>
						);
					})}
				</ul>
				<div className="not-user-div">
					<div className="info-box">
						<h4>Home page photos:</h4>
						<p>Humbolt Park, Chicago, IL, USA - bottom left</p>
						<p> Coron Bay, Philippines - bottom right</p>
					</div>
					<div className="disclaimer">
						<h4>API:</h4>
						<p>
							Info and images in 'need inspiration' section pulled from
							www.triposo.com/api.
						</p>
					</div>
					<div className="contact">
						<h4>Contact:</h4>
						<p>Cathy Diesel</p>
						<p>867-5309</p>
						<p>hunterRuck@marley.com</p>
					</div>
				</div>
			</div>
		</div>
	);
}
