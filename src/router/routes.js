import React from 'react';
import About from '../pages/About';
import Home from '../pages/Home';
import Cards from '../pages/Cards';

const routes = [
	{
		Component: Home,
		key: 'Home',
		path: '/'
	},
	{
		Component: Cards,
		key: 'Full Destination List',
		path: '/cards'
	},
	{
		Component: About,
		key: 'About',
		path: '/about'
	}
];

export default routes;
