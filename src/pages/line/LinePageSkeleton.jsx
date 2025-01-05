// packages
import React from 'react';
import Skeleton from 'react-loading-skeleton';
import { RiLoader5Fill } from 'react-icons/ri';
// css
import './line.css';

const LinePageSkeleton = () => {
	return (
		<div className='line'>
			<Skeleton className='line-title' count={1} height='56px' />
			<div className='route'>
				<Skeleton className='route-line' count={1} />
				<div style={{ marginTop: '80px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '100px' }}>
					<RiLoader5Fill className='loading-spinner' strokeWidth={2} />
				</div>
			</div>
		</div>
	);
}

export default LinePageSkeleton;