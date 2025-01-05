// packages
import React from 'react';
import Skeleton from 'react-loading-skeleton';

const CreditsPageSkeleton = () => {
	return (
		<div className='credits'>
			<Skeleton className='nav' count={1} />
			<div style={{ margin: '16px 0' }}>
				<Skeleton count={1} style={{ marginBottom: '16px' }} height='32px' />
				<div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
					<Skeleton count={3} style={{ marginBottom: '8px' }} />
					<Skeleton count={3} style={{ marginBottom: '8px' }} />
				</div>
			</div>
		</div>
	);
}

export default CreditsPageSkeleton;