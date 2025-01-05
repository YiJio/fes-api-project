// packages
import React from 'react';
// css
import './station.css';

const StationCode = ({ code, color, status }) => {
	// variables
	let theCode = code.split('|');
	if(theCode.length === 1) {
		theCode[0] = '?';
		theCode[1] = '?';
	}
	let borderColor = color;
	if(borderColor === '') { borderColor = 'var(--color-gray-3)'; }
	let bgColor = status === 'in operation' ? 'transparent' : 'var(--color-gray-0)';
	let opacity = status === 'in operation' ? '1' : '0.5';

	return (
		<div className='c-station-code'>
			<span style={{ borderColor: borderColor, background: bgColor, opacity: opacity }}>{theCode[0]}</span>
			<span style={{ borderColor: borderColor, background: bgColor, opacity: opacity }}>{theCode[1]}</span>
		</div>
	);
}

export default StationCode;