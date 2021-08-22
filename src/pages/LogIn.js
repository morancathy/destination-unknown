import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const LogIn = props => {
	const [token, setToken] = useState('');
	const [user, setUser] = useState({
		username: '',
		password: ''
	});
	const [loggedInUser, setLoggedInUser] = useState('');
	const [toggle, setToggle] = useState(false);

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
			alert('Username / password invalid');
		}
	};

	const handleRegister = async e => {
		e.preventDefault();
		try {
			const response = await fetch('/register', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(user)
			});
			const data = await response.json();
			setToken(data.token);
			setLoggedInUser(data.user.username);
			setToken(data.token);
			setLoggedInUser(data.user.username);
			window.localStorage.setItem('token', data.token);
			window.localStorage.setItem('loggedInUser', data.user.username);
		} catch (error) {
			console.error(error);
			alert('Username already taken');
		}
	};

	useEffect(() => {
		if (window.localStorage.getItem('token')) {
			setToken(window.localStorage.getItem('token'));
			setLoggedInUser(window.localStorage.getItem('loggedInUser'));
		}
	}, []);

	const displayForm = () => {};

	return (
		<div className="LogIn">
			{!token ? (
				<>
					<form className="loginForm" onSubmit={handleLogin}>
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
						<input className="btn btn-primary" type="submit" value="Log In" />
					</form>

					<button
						className="btn btn-success"
						onClick={() => {
							setToggle(!toggle);
							displayForm();
						}}
					>
						Create New Account
					</button>
					{toggle && (
						<form onSubmit={handleRegister}>
							<input
								type="text"
								id="username"
								value={user.username}
								onChange={handleChange}
							/>
							<input
								type="password"
								id="password"
								value={user.password}
								onChange={handleChange}
							/>
							<input type="submit" value="Submit" />
						</form>
					)}
				</>
			) : (
				<div>hello {loggedInUser}</div> //disable the log in button and display Hello user name
			)}
		</div>
	);
};

export default LogIn;
