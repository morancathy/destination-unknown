import React, { useState, useEffect } from 'react';
import Footer from '../components/Footer';

export default function Api(props) {
	const [entry, setEntry] = useState('');
	const [places, setPlaces] = useState({});
	const [map, setMap] = useState('');
	const [wiki, setWiki] = useState('');
	let place = [
		`Portugal`,
		`Chicago`,
		`Boracay`,
		`Nerja`,
		`Cairns`,
		`Paris`,
		`Uganda`,
		`Arusha`,
		`Florence`
	];
	let defaultPlace = `${place[Math.floor(Math.random() * place.length)]}`;
	const API = process.env.API;
	const ACCID = process.env.ACCID;

	const getPlaces = async searchTerm => {
		searchTerm = searchTerm.charAt(0).toUpperCase() + searchTerm.slice(1);
		try {
			const response = await fetch(
				`https://www.triposo.com/api/20210615/location.json?id=${searchTerm}&fields=all&account=${ACCID}&token=${API}`
			);
			const data = await response.json();
			setPlaces(data.results[0]);
			setMap(`https${data.results[0].attribution[0].url.substring(4)}`);
			setWiki(`https${data.results[0].attribution[1].url.substring(4)}`);
		} catch (error) {
			console.error(error);
			alert(
				'Destination not recognized.\nPlease check spelling and try again.'
			);
			window.location.assign('/find');
		}
	};

	useEffect(() => {
		getPlaces(defaultPlace);
	}, []);

	const handleSubmit = e => {
		e.preventDefault();
		getPlaces(entry);
		setEntry('');
	};

	const handleChange = e => {
		setEntry(event.target.value);
	};

	const text = () => {
		if (places.id === undefined) {
			return '';
		} else {
			return `enter city/country (i.e. ${places.id})`;
		}
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
						placeholder={text()}
						required
					></input>

					<input className="explore-but" type="submit" value="Explore"></input>
				</form>{' '}
			</div>

			<div className="api-div">
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
											<img src={image.source_url} alt="image" />
										</div>
									);
								})
							) : (
								<h1>....loading</h1>
							)}
						</div>

						<div className="links-div">
							<div className="link-box">
								<form className="link" action={map} target="_blank">
									<input className="link-but" type="submit" value="view map" />
								</form>
							</div>
							<div className="link-box">
								<form className="link" action={wiki} target="_blank">
									<input className="link-but" type="submit" value="more info" />
								</form>
							</div>
						</div>
					</>
				) : (
					<></>
				)}
			</div>
			<Footer />
		</div>
	);
}
