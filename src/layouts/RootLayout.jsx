// packages
import React from 'react';
import { Outlet } from 'react-router-dom';

const RootLayout = () => {
	return (
		<div className='container'>
			<Outlet />
		</div>
	);
}

export default RootLayout;