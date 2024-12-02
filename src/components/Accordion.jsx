// packages
import React, { useState } from 'react';

const Accordion = ({ children, label }) => {
	const [ui_isOpen, setUiIsOpen] = useState(false);

	return (
		<div className='accordion'>
			<div className='accordion__heading' onClick={() => setUiIsOpen((prev) => !prev)}>{label}</div>
			<div className='accordion__content'>{ui_isOpen ? children : ''}</div>
		</div>
	);
}

export default Accordion;