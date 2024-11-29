// packages
import React from 'react';
import { Link } from 'react-router-dom';
import { TbArrowGuide, TbArrowRotaryRight, TbArrowsDoubleSwNe, TbArrowsRight, TbDoorExit, TbStairs } from 'react-icons/tb';
// utils
import { getStationInfo } from '../utils/get';
import { getTransferBackground, isServiceAccessible } from '../utils/helper';
import { getContrastingTextColor, getLighterColor } from '../utils/color';
// components
import Tooltip from './Tooltip';
// assets
import logoCR from '../assets/China_Railway_icon.svg';
import logoPRDIR from '../assets/PRDIR_icon.svg';
import iconTram from '../assets/tram.svg';

// constants
const TRANSFER_METHODS = [
	{ name: 'platform', icon: <TbArrowsDoubleSwNe /> },
	{ name: 'concourse', icon: <TbStairs /> },
	{ name: 'node', icon: <TbArrowRotaryRight /> },
	{ name: 'channel', icon: <TbArrowGuide /> },
	{ name: 'parallel', icon: <TbArrowsRight /> },
	{ name: 'exit', icon: <TbDoorExit />}
];

function getTransferText(toStation, stationName, stationLineName, transfer) {
	switch (transfer?._service_id) {
		case 'cr': return `Transfer to ${toStation ? stationName : 'China Railway'}`;
		case 'prdir': return `Transfer to ${toStation ? stationName : 'Pearl River Delta Intercity Rail'}`;
		case 'gztram': return `Transfer to ${toStation ? stationName : 'Guangzhou Tram'}`;
		case 'fmetro': return `Transfer to ${toStation ? `${stationName} on` : 'Foshan Metro'} ${stationLineName}`;
		case 'guangfometro': `Transfer to ${toStation ? `${stationName} on` : 'Guangfo Metro'} ${stationLineName}`;
		default: return `Transfer to ${toStation ? `${stationName} on` : ''} ${stationLineName}`;
	}
}

const StationTransfer = ({ transfer, toStation = false, position = 'right' }) => {
	// variables
	let { stationName, stationStatus, stationService, stationLine, stationLineNumber, stationLineName, stationLineColor } = getStationInfo(transfer?._id);
	let isNio = stationStatus !== 'in operation';
	let color = getTransferBackground(stationLineColor, transfer);
	if (color === '') { color = '#c3c3c3'; }
	let outlineColor = isNio ? `2px dashed ${color}` : 'none';
	let bgColor = getTransferBackground(color, transfer);
	if (isNio && stationService !== 'cr' && stationService !== 'prdir') bgColor = getLighterColor(color, 40);
	let fontColor = getContrastingTextColor(color);
	let opacity = isNio ? '0.5' : '1';
	let number = getTransferNumber(transfer);

	function getTransferNumber(transfer) {
		switch (transfer?._service_id) {
			case 'cr': return <img className='transfer__img invert' src={logoCR} alt='China Railway logo' />;
			case 'prdir': return <img className='transfer__imginvert' src={logoPRDIR} alt='PRDIR logo' />;
			case 'gztram': return <img className='transfer__imginvert' src={iconTram} alt='Tram icon' />;
			default: return stationLineNumber;
		}
	}

	return (
		<Tooltip position={position} text={getTransferText(toStation, stationName, stationLineName, transfer)}>
			{isServiceAccessible(stationLine, transfer?._service_id) ? <Link to={toStation ? `/station/${transfer?._id}` : `/line/${stationLine}`} className='transfer__item--circle' style={{ outline: outlineColor, background: bgColor, color: fontColor, opacity: opacity }}>
				{number}
			</Link> : <div className='transfer__item--circle' style={{ outline: outlineColor, background: bgColor, color: fontColor, opacity: opacity, cursor: 'help' }}>
				{number}
			</div>}
		</Tooltip>
	);
}

const StationTransferMethod = ({ toStation = true, transfer }) => {
	// variables
	let { stationName, stationStatus, stationService, stationLine, stationLineNumber, stationLineName, stationLineColor } = getStationInfo(transfer?.transfer_to?._id);
	let isNio = stationStatus !== 'in operation';

	return (
		<div className='transfer__group'>
			<Tooltip position='top' text={getTransferText(toStation, stationName, stationLineName, transfer.transfer_to)}>
				<div className='transfer__item'>{stationLineNumber}</div>
			</Tooltip>
			<Tooltip position='bottom' text={'asd'}>
				<div className='transfer__method'><TbDoorExit /></div>
			</Tooltip>
		</div>
	)
}

export { StationTransfer, StationTransferMethod };