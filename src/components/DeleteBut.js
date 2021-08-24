// import React from 'react';
// // import { Link } from 'react-router-dom';
//
// const DeleteBut = ({ props, toDelete, toggleForm, destination }) => {
//
//
// 	const handleDelete = async id => {
// 		try {
// 			const response = await fetch(
// 				`/api/destinations/${props.match.params.id}`,
// 				{
// 					method: 'DELETE',
// 					headers: {
// 						'Content-Type': 'application/json'
// 					}
// 				}
// 			);
// 			setDestination(destination.filter(dest => dest._id !== id));
// 		} catch (error) {
// 			console.error(error);
// 		} finally {
// 			window.location.assign('/');
// 		}
// 	};
//
// 	return (
// 		<div className="DeleteBut">
// 			<h1>HELLLLLOOOO</h1>
// 			<button
// 				onClick={() => {
// 					handleDelete(destination._id);
// 				}}
// 			>
// 				Area you sure you want to delete
// 			</button>
// 		</div>
// 	);
// };
//
// export default DeleteBut;
