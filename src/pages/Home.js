import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Home(props) {
	const [countries, setCountries] = useState([]);

	useEffect(() => {
		(async () => {
			try {
				const response = await fetch('/api/countries');
				const data = await response.json();
				setCountries(data);
			} catch (error) {
				console.error(error);
			}
		})();
	}, []);

	return (
		<div className="HomePage">
			This is the {props.page} page
			<ul>
				{countries.map(country => {
					return (
						<li key={country._id}>
							<Link to={`/${country._id}`}>
								<h3>{country.country}</h3>
							</Link>
							<p>{country.destinations}</p>
						</li>
					);
				})}
			</ul>
		</div>
	);
}
