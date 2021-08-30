import React, { createContext, useContext } from 'react';
import NavBar from '../components/NavBar';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import routes from './routes';
import Show from '../pages/Show';
import Contact from '../pages/Contact';
import LogIn from '../pages/LogIn';
import Api from '../pages/Api';
// const context = createContext(null);

const AppRouter = props => {
	return (
		<Router>
			<NavBar routes={routes} />
			<Switch>
				{/*<context.Provider value={'cheese'}>*/}
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
					path={'/find'}
					render={routerProps => <Api {...routerProps} />}
				></Route>
				{/*<Route
						path={'/:id/addComment'}
						render={routerProps => <Contact {...routerProps} />}
					></Route>*/}
				<Route
					path={'/:id'}
					render={routerProps => <Show {...routerProps} />}
				></Route>
				{/*	</context.Provider>*/}
			</Switch>
		</Router>
	);
};

export default AppRouter;
