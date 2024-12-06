// packages
import React, { useState } from 'react';

const Accordion = ({ children, label }) => {
	// states
	const [ui_isOpen, setUiIsOpen] = useState(false);

	return (
		<div className='accordion'>
			<div className='accordion__heading' onClick={() => setUiIsOpen((prev) => !prev)}>
				<span className='accordion__label'>{label}</span>
			</div>
			<div className='accordion__content'>
				{ui_isOpen ? <div className='accordion__body'>{children}</div> : ''}
			</div>
		</div>
	);
}

export default Accordion;