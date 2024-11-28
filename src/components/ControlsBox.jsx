// packages
import React from 'react';
import { RiArrowLeftLine, RiArrowRightLine } from 'react-icons/ri';

export const ControlsBox = () => {
	return (
		<div className='controls-box'>
			<div className='controls-box-group'>
				<div className='controls-box-text' style={{ '--order': '1' }}>
					<span>Toggle station popover on/off</span>
				</div>
				<div className='controls-box-icon'>
					<div className='controls-box-key key-space' />
				</div>
			</div>
			<div className='controls-box-group'>
				<div className='controls-box-text' style={{ '--order': '2' }}>
					<span>Click to toggle station popover on/off</span>
				</div>
				<div className='controls-box-icon'>
					<div className='controls-box-mouse mouse-left' />
				</div>
			</div>
			<div className='controls-box-group'>
				<div className='controls-box-text' style={{ '--order': '3' }}>
					<span>Scroll through stations on route</span>
				</div>
				<div className='controls-box-icon'>
					<div className='controls-box-mouse mouse-wheel' />
				</div>
			</div>
			<div className='controls-box-group'>
				<div className='controls-box-text' style={{ '--order': '4' }}>
					<span>Go to previous station</span>
				</div>
				<div className='controls-box-icon'>
					<div className='controls-box-key'><RiArrowLeftLine /></div>
				</div>
			</div>
			<div className='controls-box-group'>
				<div className='controls-box-text' style={{ '--order': '5' }}>
					<span>Go to next station</span>
				</div>
				<div className='controls-box-icon'>
					<div className='controls-box-key'><RiArrowRightLine /></div>
				</div>
			</div>
		</div>
	)
}
