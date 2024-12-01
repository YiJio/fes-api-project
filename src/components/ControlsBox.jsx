// packages
import React from 'react';
import { RiArrowLeftLine, RiArrowRightLine } from 'react-icons/ri';

export const ControlsBox = () => {
	return (
		<div className='controls-box'>
			<div className='controls-box__group'>
				<div className='controls-box__text' style={{ '--order': '1' }}>
					<span className='controls-box__span'>Toggle station popover on/off</span>
				</div>
				<div className='controls-box__icon'>
					<div className='controls-box__key key--space' />
				</div>
			</div>
			<div className='controls-box__group'>
				<div className='controls-box__text' style={{ '--order': '2' }}>
					<span className='controls-box__span'>Click to toggle station popover on/off</span>
				</div>
				<div className='controls-box__icon'>
					<div className='controls-box__mouse mouse--left' />
				</div>
			</div>
			<div className='controls-box__group'>
				<div className='controls-box__text' style={{ '--order': '3' }}>
					<span className='controls-box__span'>Scroll through stations on route</span>
				</div>
				<div className='controls-box__icon'>
					<div className='controls-box__mouse mouse--wheel' />
				</div>
			</div>
			<div className='controls-box__group'>
				<div className='controls-box__text' style={{ '--order': '4' }}>
					<span className='controls-box__span'>Go to previous station</span>
				</div>
				<div className='controls-box__icon'>
					<div className='controls-box__key'><RiArrowLeftLine /></div>
				</div>
			</div>
			<div className='controls-box__group'>
				<div className='controls-box__text' style={{ '--order': '5' }}>
					<span className='controls-box__span'>Go to next station</span>
				</div>
				<div className='controls-box__icon'>
					<div className='controls-box__key'><RiArrowRightLine /></div>
				</div>
			</div>
		</div>
	)
}
