// packages
import React from 'react';
// css
import './tooltip.css';

const Tooltip = ({ children, label, text, position = 'top', isHelp = false }) => {
	return (
		<div className={`c-tooltip${isHelp ? ' c-tooltip--help' : ''}`}>
			<span className='c-tooltip__label'>{children ? children : label}</span>
			<span className={`c-tooltip__content c-tooltip__content--${position}`}>
				<span className='c-tooltip__text'>{text}</span>
			</span>
		</div>
	);
}

export default Tooltip;