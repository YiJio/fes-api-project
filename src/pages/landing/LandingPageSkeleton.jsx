// packages
import React from 'react';
import { RiLoader5Fill } from 'react-icons/ri';
// css
import './landing.css';

const LandingPageSkeleton = () => {
	return (
		<div className='empty' style={{ height:'100vh', fontSize: '100px' }}>
			<RiLoader5Fill className='loading-spinner' strokeWidth={2} />
		</div>
	);
}

export default LandingPageSkeleton;