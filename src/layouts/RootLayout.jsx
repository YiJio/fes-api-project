// packages
import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';

const RootLayout = () => {
	// states
	
	return (
		<main className=''>
			Root
			<Outlet />
		</main>
	);
}

export default RootLayout;