import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const LogIn = props => {
	const [token, setToken] = useState('');
	const [user, setUser] = useState({
		username: '',
		password: ''
	});
	const [loggedInUser, setLoggedInUser] = useState('');

	const handleChange = e => {
		setUser({ ...user, [e.target.id]: e.target.value });
	};

	const handleLogin = async e => {
		e.preventDefault();
		try {
			const response = await fetch('/login', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(user)
			});
			const data = await response.json();
			setToken(data.token);
			setLoggedInUser(data.user.username);
			window.localStorage.setItem('token', data.token);
			window.localStorage.setItem('loggedInUser', data.user.username);
		} catch (error) {
			console.error(error);
		}
	};

	useEffect(() => {
		if (window.localStorage.getItem('token')) {
			setToken(window.localStorage.getItem('token'));
			setLoggedInUser(window.localStorage.getItem('loggedInUser'));
		}
	}, []);

	return (
		<div className="LogIn">
			{!token ? (
				<>
					<form onSubmit={handleLogin}>
						<input
							type="text"
							id="username"
							value={user.username}
							onChange={handleChange}
						/>
						<input
							type="text"
							id="password"
							value={user.password}
							onChange={handleChange}
						/>
						<input type="submit" value="Log In" />
					</form>
				</>
			) : (
				<div>hello</div>
			)}
		</div>
	);
};

export default LogIn;
