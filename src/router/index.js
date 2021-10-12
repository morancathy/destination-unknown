import React, { createContext, useContext } from 'react';
import { transitions, positions, Provider as AlertProvider } from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';

import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import routes from './routes';
import Show from '../pages/Show';
import LogIn from '../pages/LogIn';
import Api from '../pages/Api';
import Cards from '../pages/Cards';

const AppRouter = props => {
	const options = {
		timeout: 4000,
		position: 'middle',
		offset: '30px',
		transition: transitions.SCALE
	};

	const AlertTemplate = ({ options, message }) => (
		<div className="alert">{message}</div>
	);

	return (
		<Router>
			<AlertProvider template={AlertTemplate} {...options}>
				<NavBar routes={routes} />
				<Switch>
					{routes.map(({ Component, key, path }) => (
						<Route
							key={key}
							path={path}
							exact
							component={() => <Component page={key} />}
						></Route>
					))}
					<Route
						path={'/login'}
						render={routerProps => <LogIn {...routerProps} />}
					></Route>
					<Route
						path={'/cards'}
						render={routerProps => <Cards {...routerProps} />}
					></Route>
					<Route
						path={'/find'}
						render={routerProps => <Api {...routerProps} />}
					></Route>
					<Route
						path={'/:id'}
						render={routerProps => <Show {...routerProps} />}
					></Route>
				</Switch>
				<Footer />
			</AlertProvider>
		</Router>
	);
};

export default AppRouter;
