import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function App(props) {
	const stocks = [
		{ name: 'Apple Inc.', symbol: 'AAPL', price: 140.64 },
		{ name: 'Microsoft Corporation', symbol: 'MSFT', price: 64.98 }
	];
	return (
		<div className="AppPage">
			{stocks.map(stock => {
				const { name, symbol, price, change, dayHigh, dayLow, open } = stock;

				return <li>{name}</li>;
			})}
		</div>
	);
}
