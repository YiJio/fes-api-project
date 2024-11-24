// packages
import React from 'react';
import { Outlet } from 'react-router-dom';

const HomeLayout = () => {
	return (
		<div className='container'>
			<Outlet />
		</div>
	);
}

export default HomeLayout;