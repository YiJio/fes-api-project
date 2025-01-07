// packages
import React from 'react';
import Skeleton from 'react-loading-skeleton';
// css
import './station.css';

const StationPageSkeleton = () => {
	return (
		<div className='c-station'>
			<Skeleton className='c-station-title' count={1} height='36px' />
			<div className='c-station-content'>
				<div className='c-station-content__item' style={{ marginTop:'8px', paddingTop: '20px' }}>
					<Skeleton style={{ marginBottom: '4px' }} count={10} height='12px' />
				</div>
				<div className='c-station-content__item'>
					<Skeleton count={1} height='256px' />
				</div>
			</div>
		</div>
	);
}

export default StationPageSkeleton;