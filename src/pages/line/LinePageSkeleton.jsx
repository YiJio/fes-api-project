// packages
import React from 'react';
import Skeleton from 'react-loading-skeleton';
import { RiLoader5Fill } from 'react-icons/ri';
// css
import './line.css';

const LinePageSkeleton = () => {
	return (
		<>
			<Skeleton className='c-line-title' count={1} height='56px' />
			<div className='c-route'>
				<Skeleton className='c-route__separator' count={1} style={{ marginTop:'0', display:'flex' }} />
				<div style={{ marginTop: '80px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '100px' }}>
					<RiLoader5Fill className='loading-spinner' strokeWidth={2} />
				</div>
			</div>
		</>
	);
}

export default LinePageSkeleton;