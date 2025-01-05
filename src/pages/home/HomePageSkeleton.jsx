// packages
import React from 'react';
import Skeleton from 'react-loading-skeleton';
// css
import './home.css';

const HomePageSkeleton = () => {
	return (
		<div className='home'>
			<Skeleton className='nav' count={1} />
			<div style={{ margin: '80px auto', width: '75%' }}>
				<Skeleton count={1} style={{ marginBottom: '40px' }} height='40px' />
				<div style={{ marginBottom:'20px' }}>
					<Skeleton count={2} style={{ marginBottom:'8px' }} />
				</div>
				<div><Skeleton count={1} /></div>
			</div>
		</div>
	);
}

export default HomePageSkeleton;