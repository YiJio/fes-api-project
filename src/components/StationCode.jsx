// packages
import React from 'react';
// utils
import { getLineInfo } from '../utils/get';

const StationCode = ({ code, line, status }) => {
	// variables
	let theCode = code.split('|');
	if(theCode.length === 1) {
		theCode[0] = '?';
		theCode[1] = '?';
	}
	let bordercolor = getLineInfo(line, 'color');
	if(bordercolor === '') { bordercolor = 'var(--color-gray-3)'; }
	let bgColor = status === 'in operation' ? 'transparent' : 'var(--color-gray-0)';
	let opacity = status === 'in operation' ? '1' : '0.5';

	return (
		<div className='station-code'>
			<span style={{ borderColor: bordercolor, background: bgColor, opacity: opacity }}>{theCode[0]}</span>
			<span style={{ borderColor: bordercolor, background: bgColor, opacity: opacity }}>{theCode[1]}</span>
		</div>
	);
}

export default StationCode;