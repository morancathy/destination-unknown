import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import LogIn from '../pages/LogIn';

const NavBar = props => {
	return (
		<nav className="NavBar fixed-top">
			{props.routes.map(({ key, path }) => (
				<Link className="links" key={key} to={path}>
					{key}
				</Link>
			))}

			<Link className="sign-in-btn" to={'/login'}>
				<button>
					{window.localStorage.token
						? `Hi, ${window.localStorage.loggedInUser}`
						: `Sign in`}{' '}
				</button>
			</Link>
		</nav>
	);
};

export default NavBar;
