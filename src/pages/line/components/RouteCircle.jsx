// packages
import React from 'react';
// utils
import { getContrastingTextColor, getLighterColor } from '../../../utils/color';

const RouteCircle = ({ stationIndex, numOfStations, activeRoute, setActiveRoute, isActive, status, sequence, lineColor, branches, lineBranches }) => {
	// variables
	let firstLast = stationIndex === numOfStations ? 'last' : stationIndex === 0 ? 'first' : '';
	// branches should have track before it regardless of first or last
	if(activeRoute !== 'primary' && stationIndex === 0) { firstLast = 'first-branch'; }
	// only 1 station in branch -> make it last and not first
	if(activeRoute !== 'primary' && stationIndex === numOfStations) { firstLast = 'last'; }
	let isNio = status !== 'in operation';
	// variables: color
	let lighterColor = getLighterColor(lineColor, 20);
	let bgColor = isActive ? lineColor : 'var(--color-white)';
	let borderColor = isActive ? '2px solid var(--color-white)' : `4px solid ${lighterColor}`;
	let trackColor = lighterColor;
	let outlineColor = isActive ? `4px solid ${lineColor}` : 'none';
	let fontColor = isActive ? getContrastingTextColor(lineColor) : 'var(--color-black)';
	if(isNio) {
		bgColor = isActive ? 'var(--color-gray-3)' : 'var(--color-white)';
		borderColor = isActive ? '2px solid var(--color-white)' : '4px solid var(--color-gray-2)';
		trackColor = `repeating-linear-gradient(90deg, ${lighterColor}, ${lighterColor} 4px, rgb(255,255,255) 4px, rgb(255,255,255) 6px)`;
		outlineColor = isActive ? `4px solid var(--color-gray-3)` : 'none';
		fontColor = 'var(--color-black)';
	}

	return (
		<div className='route-station__circle'>
			<div className='route-station__code' style={{ background: bgColor, color: fontColor, outline: outlineColor, border: borderColor }}>
				<span>{sequence}</span>
			</div>
			<div className={`route-station__track ${firstLast} ${status !== 'in operation' ? 'nio' : ''}`} style={{ background: trackColor }} />
			{branches?.length > 0 && <div className='route-station__fork' style={{ borderColor: lighterColor }}>
				{branches.map((branch, i) => (<div key={i} style={{ display: 'flex' }}>
					<div className='route-station__fork-branch' style={{ borderColor: lighterColor }} onClick={() => setActiveRoute(branch)}>
						{lineBranches[lineBranches.findIndex(lb => lb.code === branch)].name.en}
					</div>
				</div>))}
			</div>}
		</div>
	);
}

const RouteCircleMobile = ({ sequence, lineColor }) => {

	return (
		<div className='route-station__code' style={{ borderColor: lineColor }}>
			<span>{sequence}</span>
		</div>
	);
}

export { RouteCircle, RouteCircleMobile };