import React from 'react';
import About from '../pages/About';
import Home from '../pages/Home';
import Contact from '../pages/Contact';
import Cards from '../pages/Cards';

const routes = [
	{
		Component: Home,
		key: 'Home',
		path: '/'
	},
	{
		Component: Cards,
		key: 'Destination List',
		path: '/cards'
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
