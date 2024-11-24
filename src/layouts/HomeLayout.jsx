// packages
import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';

const HomeLayout = () => {
	// states
	
	return (
		<div className='container'>
			<Outlet />
		</div>
	);
}

export default HomeLayout;