// packages
import React from 'react';

const Tooltip = ({ children, label, text, position = 'right', isHelp = false }) => {
	return (
		<div className={`tooltip ${isHelp ? 'help' : ''}`}>
			<span className='tooltip-label'>{children ? children : label}</span>
			<span className={`tooltip-content ${position}`}>
				<span className='tooltip-text'>{text}</span>
			</span>
		</div>
	);
}

export default Tooltip;