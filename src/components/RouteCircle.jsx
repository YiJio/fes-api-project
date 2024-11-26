// packages
import React from 'react';
// utils
import { getContrastingTextColor } from '../utils/color';

const RouteCircle = ({ index, length, setActiveRoute, isActive, setActiveCircle, sequence, mainColor, lighterColor, branches, lineBranches }) => {
	// variables
	let background = isActive ? mainColor : 'var(--color-white)';
	let border = isActive ? '2px solid var(--color-white)' : `4px solid ${lighterColor}`;
	let outline = isActive ? `4px solid ${mainColor}` : 'none';
	let color = isActive ? getContrastingTextColor(mainColor) : 'var(--color-black)';

	return (
		<div className='route-station-circle'>
			<div className='route-station-code' style={{ background: background, color: color, outline: outline, border: border }} onClick={() => setActiveCircle(index)}>
				<span>{sequence}</span>
			</div>
			<div className={'route-station-track' + (index === 0 ? ' first' : index === length ? ' last' : '')} style={{ background: lighterColor }} />
			{branches?.length > 0 && <div className='route-station-fork' style={{ borderColor: lighterColor }}>
				{branches.map((branch, index) => (<div key={index} style={{ display: 'flex' }}>
					<div className='route-station-fork-branch' style={{ borderColor: lighterColor }} onClick={() => setActiveRoute(branch)}>
						{lineBranches[lineBranches.findIndex(lb => lb.code === branch)].name.en}
					</div>
				</div>))}
			</div>}
		</div>
	);
}

const RouteCircleMobile = ({ index, length, sequence, mainColor, lighterColor }) => {
	// variables

	return (
		<div className='route-station-code' style={{ borderColor: mainColor }}>
			<span>{sequence}</span>
			<div className={'route-station-code-line' + (index === 0 ? ' first' : index === length ? ' last' : '')} style={{ background: lighterColor }} />
		</div>
	);
}

export { RouteCircle, RouteCircleMobile };