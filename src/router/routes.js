import React from 'react';
import About from '../pages/About';
import Home from '../pages/Home';
import Contact from '../pages/Contact';

const routes = [
	{
		Component: Home,
		key: 'Home',
		path: '/'
	},
	{
		Component: Contact,
		key: 'Contact',
		path: '/contact'
	},
	{
		Component: About,
		key: 'About',
		path: '/about'
	}
];

export default routes;
