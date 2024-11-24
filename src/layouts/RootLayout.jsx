// packages
import React from 'react';
import { Outlet } from 'react-router-dom';
// components
import Header from '../components/Header';

const RootLayout = () => {
	return (
		<div className='wrapper'>
			<Header />
			<main className='main'>
				<div className='content'>
					<Outlet />
				</div>
			</main>
		</div>
	);
}

export default RootLayout;