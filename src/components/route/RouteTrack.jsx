// packages
import React from 'react';
// css
import './route.css';

const RouteTrack = ({ firstLast, status, trackColor, isSide = false }) => {

	return (
		<>
			<div className={`c-track${firstLast !== '' ? ` c-track--${firstLast}` : ''}${status !== 'in operation' ? ' c-track--nio' : ''}${isSide ? ' c-track--side' : ''}`} style={{ background: trackColor }}>
				<div className='c-track__loop-tl' style={{ background: trackColor }} />
				<div className='c-track__loop-bl' style={{ background: trackColor }} />
				<div className='c-track__loop-tr' style={{ background: trackColor }} />
				<div className='c-track__loop-br' style={{ background: trackColor }} />
				<div className='c-track__direction c-track__direction--backward'>
					<span className='c-track__arrow c-track__arrow--backward' />
					<span className='c-track__arrow c-track__arrow--backward' />
				</div>
				<div className='c-track__direction c-track__direction--forward'>
					<span className='c-track__arrow c-track__arrow--forward' />
					<span className='c-track__arrow c-track__arrow--forward' />
				</div>
			</div>
		</>
	);
}

const RouteTrackMobile = ({ status, trackColor }) => {
	return (
		<div className={`c-track c-track--mobile${status !== 'in operation' ? ' c-track--nio' : ''}`} style={{ background: trackColor }} />
	);
}

export { RouteTrack, RouteTrackMobile };