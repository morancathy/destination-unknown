import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import Footer from '../components/Footer';

export default function About(props) {
	return (
		<div className="AboutPage">
			<div className="display">
				<div className="info-box">
					<p className="title">Home page photos:</p>
					<p>
						<strong>Humbolt Park, IL</strong> - bottom left
					</p>
					<p>
						{' '}
						<strong>Coron Bay, Philippines</strong> - bottom right
					</p>
					<p className="disclaimer">
						*Info and images in 'need inspiration' section pulled from
						www.triposo.com/api.
					</p>
				</div>
			</div>
			<Footer />
		</div>
	);
}
