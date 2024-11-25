// packages
import React from 'react';
import Skeleton from 'react-loading-skeleton';
// css
import 'react-loading-skeleton/dist/skeleton.css'

const NotFoundPage = () => {
	return (
		<div style={{ display: 'flex' }}>
			<div className='station-tip'>
				<div className='station-tip-info'>
					<div className='station-tip-wrapper'>
						<div style={{ display:'flex', flexDirection:'column', gap:'4px' }}>
							<Skeleton count={1} height='24px' />
							<Skeleton count={2} />
							<Skeleton count={1} height='32px' />
						</div>
						<Skeleton count={3} height='14px' />
						<Skeleton count={1} height='40px' />
					</div>
				</div>
			</div>
			<div className='station-tip'>
				<div className='station-tip-info'>
					<div className='station-tip-wrapper'>
						<div className='station-tip-heading'>
							<div className='station-tip-row station-tip-title'>
								<div className='station-tip-name'>Xilang</div>
							</div>
							<div className='station-tip-row station-tip-location'>
								<span>
								1200 Independence Avenue SW, Washington, D.C., 20004
								</span>
							</div>
							<div className='station-tip-row'>
								<div className='station-tip-transfers'>
									<div className='station-transfer' style={{ background:'black', color:'white' }}>1</div>
								</div>
							</div>
						</div>
						<div className='station-tip-description'>The station's south entrance is at the southwest corner of Independence Avenue and 12th Street, Southwest, the street elevator is at the northwest corner of the same intersection, and the north entrance is on the south side of the Mall near Jefferson Drive, Southwest.</div>
						<button className='station-tip-button'>Read more</button>
					</div>
				</div>
				<div className='station-tip-bg'></div>
			</div>
		</div>
	)
}

export default NotFoundPage;