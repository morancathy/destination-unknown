import React, { useState, useEffect } from 'react';
import Footer from '../components/Footer';

export default function Api(props) {
	const [entry, setEntry] = useState('');
	const [places, setPlaces] = useState({});
	const API = process.env.API;
	const ACCID = process.env.ACCID;
	// const city = props.match.params.city || 'Sagada';

	// const url = `https://www.triposo.com/api/20210615/location.json?id=${searchTerm}&fields=all&account=${ACCID}&token=${API}`;

	//function to fetch place data
	const getPlaces = async searchTerm => {
		try {
			const response = await fetch(
				`https://www.triposo.com/api/20210615/location.json?id=${searchTerm}&fields=all&account=${ACCID}&token=${API}`
			);
			const data = await response.json();
			// setPlaces({ ...data });
			setPlaces(data.results[0]);
		} catch (error) {
			console.log('error ', error);
		}
	};

	// useEffect to run getPlace when component mounts
	useEffect(() => {
		getPlaces('Sagada');
	}, []);

	const handleSubmit = e => {
		e.preventDefault();
		getPlaces(entry);
		setEntry('');
	};

	const handleChange = e => {
		setEntry(event.target.value);
	};

	return (
		<div className="ApiPage">
			<div className="toExplore">
				<form
					className="explore"
					onSubmit={handleSubmit}
					style={{ display: 'flex', flexDirection: 'row' }}
				>
					<input
						type="text"
						id="entry"
						value={entry}
						onChange={handleChange}
						placeholder="enter city name"
						required
					></input>

					<input className="explore-but" type="submit" value="Explore"></input>
				</form>{' '}
			</div>

			{Object.keys(places).length ? (
				<>
					<div className="header">
						<h3>
							{places.id}, {places.country_id}
						</h3>
						<p>{places.intro}</p>
					</div>

					<div className="images-all">
						{places ? (
							places.images.map((image, key) => {
								return (
									<div className="image" key={key}>
										<h4>{image.caption}</h4>
										<img src={image.source_url} alt="suppose to be a pic" />
									</div>
								);
							})
						) : (
							<h1>....Loading</h1>
						)}
					</div>

					<div className="links-div">
						<div className="link-box">
							<form
								className="link"
								action={places.attribution[0].url}
								target="_blank"
							>
								<input className="link-but" type="submit" value="view map" />
							</form>
						</div>
						<div className="link-box">
							<form
								className="link"
								action={places.attribution[2].url}
								target="_blank"
							>
								<input className="link-but" type="submit" value="more info" />
							</form>
						</div>
					</div>
				</>
			) : (
				<h3>....Loading</h3>
			)}
			<Footer />
		</div>
	);
}
// <a
// 	className="link"
// 	href={places.attribution[0].url}
// 	target="_blank"
// >
// 	view map
// </a>