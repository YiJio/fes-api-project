// packages
import React from 'react';

const Tooltip = ({ children, label, text, position = 'top', isHelp = false }) => {
	return (
		<div className={`tooltip ${isHelp ? 'tooltip--help' : ''}`}>
			<span className='tooltip__label'>{children ? children : label}</span>
			<span className={`tooltip__content ${position}`}>
				<span className='tooltip__text'>{text}</span>
			</span>
		</div>
	);
}

export default Tooltip;