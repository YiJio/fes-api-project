// packages
import React from 'react';
import { RiArrowLeftLine, RiArrowRightLine } from 'react-icons/ri';
// css
import './controls.css';

const ControlsBox = () => {
	return (
		<div className='c-controls-box'>
			<div className='c-controls-box__group'>
				<div className='c-controls-box__text' style={{ '--order': '1' }}>
					<span className='c-controls-box__span'>Toggle station popover on/off</span>
				</div>
				<div className='c-controls-box__icon'>
					<div className='c-key c-key--space' />
				</div>
			</div>
			<div className='c-controls-box__group'>
				<div className='c-controls-box__text' style={{ '--order': '2' }}>
					<span className='c-controls-box__span'>Click to toggle station popover on/off</span>
				</div>
				<div className='c-controls-box__icon'>
					<div className='c-mouse c-mouse--left' />
				</div>
			</div>
			<div className='c-controls-box__group'>
				<div className='c-controls-box__text' style={{ '--order': '3' }}>
					<span className='c-controls-box__span'>Scroll through stations on route</span>
				</div>
				<div className='c-controls-box__icon'>
					<div className='c-mouse c-mouse--wheel' />
				</div>
			</div>
			<div className='c-controls-box__group'>
				<div className='c-controls-box__text' style={{ '--order': '4' }}>
					<span className='c-controls-box__span'>Go to previous station</span>
				</div>
				<div className='c-controls-box__icon'>
					<div className='c-key'><RiArrowLeftLine /></div>
				</div>
			</div>
			<div className='c-controls-box__group'>
				<div className='c-controls-box__text' style={{ '--order': '5' }}>
					<span className='c-controls-box__span'>Go to next station</span>
				</div>
				<div className='c-controls-box__icon'>
					<div className='c-key'><RiArrowRightLine /></div>
				</div>
			</div>
		</div>
	);
}

export default ControlsBox;