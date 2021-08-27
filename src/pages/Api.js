import React, { useState, useEffect } from 'react';
import '../scss/api.scss';

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
		<div className="ApiPage">
			{/*    {console.log("capt:", places.results[0].images.[0].caption)}}*/}
			{Object.keys(places).length ? (
				<>
					<div className="header">
						<h3>
							{places.id}, {places.country_id}
						</h3>
						<h4>Brief Intro: {places.snippet}</h4>
						<h4>{places.intro}</h4>
					</div>

					<div className="images-all">
						{places ? (
							places.images.map((image, key) => {
								return (
									<div className="image">
										<h4>Pic:{image.caption}</h4>
										<img
											src={image.source_url}
											alt="suppose to be a pic"
											// style={{ width: '150px' }}
										/>
									</div>
								);
							})
						) : (
							<h1>....Loading</h1>
						)}
					</div>

					<div className="links">
						<a
							className="link"
							href={places.attribution[0].url}
							target="_blank"
						>
							view map
						</a>
						<a
							className="link"
							href={places.attribution[2].url}
							target="_blank"
						>
							more info
						</a>
					</div>
				</>
			) : (
				loading
			)}

			{/* {place._id ? loaded : loading}*/}
		</div>
	);
}
