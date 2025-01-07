// packages
import React from 'react';
import { Outlet } from 'react-router-dom';
// components
import Header from '../components/Header';

const MainLayout = () => {
	return (
		<div className='l-wrapper'>
			<Header />
			<main className='l-main'>
				<div className='l-content'>
					<Outlet />
				</div>
			</main>
		</div>
	);
}

export default MainLayout;