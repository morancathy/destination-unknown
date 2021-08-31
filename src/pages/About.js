import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';

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
			<div className="display">
				<div className="info-box">
					<p className="title">Home page photos:</p>
					<p>
						<strong>Humbolt Park, Chicago, IL, USA</strong> - bottom left
					</p>
					<p>
						{' '}
						<strong>Coron Bay, Philippines</strong> - bottom right
					</p>
					<p className="disclaimer">
						*Info and images in 'need inspiration' section pulled from
						www.triposo.com/api.
					</p>
				</div>
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
			</div>
			<Footer />
		</div>
	);
}
