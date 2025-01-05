// packages
import React, { useState } from 'react';
// css
import './accordion.css';

const Accordion = ({ children, label }) => {
	// states
	const [ui_isOpen, setUiIsOpen] = useState(false);

	return (
		<div className='c-accordion'>
			<div className='c-accordion__heading' onClick={() => setUiIsOpen((prev) => !prev)}>
				<span className='c-accordion__label'>{label}</span>
			</div>
			<div className='c-accordion__content'>
				{ui_isOpen ? <div className='c-accordion__body'>{children}</div> : ''}
			</div>
		</div>
	);
}

export default Accordion;