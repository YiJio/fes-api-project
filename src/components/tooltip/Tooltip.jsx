// packages
import React from 'react';
// css
import './tooltip.css';

const Tooltip = ({ children, label, text, position = 'top', offset = 0, isHelp = false }) => {
	// variables
	const top = position === 'bottom' && (28 + offset) + 'px';
	const right = position === 'left' && (24 + offset) + 'px';
	const bottom = position === 'top' && (28 + offset) + 'px';
	const left = position === 'right' && (24 + offset) + 'px';

	return (
		<div className={`c-tooltip${isHelp ? ' c-tooltip--help' : ''}`}>
			<span className='c-tooltip__label'>{children ? children : label}</span>
			<span className={`c-tooltip__content c-tooltip__content--${position}`} style={{ top: top, right: right, bottom: bottom, left: left }}>
				<span className='c-tooltip__text'>{text}</span>
			</span>
		</div>
	);
}

export default Tooltip;