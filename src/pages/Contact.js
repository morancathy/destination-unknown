import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import Footer from '../components/Footer';

export default function Contact(props) {
	return (
		<div className="ContactPage">
			<div className="display">
				<div className="info-box">
					<h3>Cathy Diesel</h3>
					<p>867-5309</p>
					<p>hunterRuck@marley.com</p>
				</div>
			</div>
			<Footer />
		</div>
	);
}
