import React, { useState, useEffect } from 'react';

export default function Api(props) {
	const [places, setPlaces] = useState({});
	
	const city = props.match.params.city || 'Sagada';

	const url = `https://www.triposo.com/api/20210615/location.json?id=${city}&fields=all&account=${acctId}&token=${apiKey}`;

	//function to fetch place data
	const getPlaces = async () => {
		try {
			const response = await fetch(url);
			const data = await response.json();
			setPlaces(data.results[0]);
		} catch (error) {
			console.log('error ', error);
		}
	};

	// useEffect to run getPlace when component mounts
	useEffect(() => {
		getPlaces();
	}, []);

	// loaded when data is fetched (if wanted, could write this inline in the return)
	const loaded = (
		<div>
			<h1>{places}</h1>
		</div>
	);

	// Function for when data doesn't exist
	const loading = <h1>Loading...</h1>;

	return (
		<>
			{Object.keys(places).length ? (
				<>
					<h3>
						{places.id}, {places.country_id}
					</h3>
					<h4>Brief Intro: {places.snippet}</h4>
					<h4>{places.intro}</h4>
				</>
			) : (
				loading
			)}

			{/* {place._id ? loaded : loading}*/}
		</>
	);
}
