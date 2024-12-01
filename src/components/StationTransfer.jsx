// packages
import React from 'react';
import { Link } from 'react-router-dom';
import { TbArrowGuide, TbArrowRotaryRight, TbArrowsDoubleSwNe, TbArrowsRight, TbDoorExit, TbStairs } from 'react-icons/tb';
// utils
import { getStationInfo } from '../utils/get';
import { isServiceAccessible } from '../utils/helper';
import { getContrastingTextColor, getLighterColor } from '../utils/color';
// components
import Tooltip from './Tooltip';
// assets
import logoCR from '../assets/China_Railway_icon.svg';
import logoPRDIR from '../assets/PRDIR_icon.svg';
import iconTram from '../assets/tram.svg';

// constants
const SHOW_SERVICES = ['gzmtr', 'guangfometro'];
const TRANSFER_METHODS = [
	{ name: 'platform', icon: <TbArrowsDoubleSwNe /> },
	{ name: 'concourse', icon: <TbStairs /> },
	{ name: 'node', icon: <TbArrowRotaryRight /> },
	{ name: 'channel', icon: <TbArrowGuide /> },
	{ name: 'parallel', icon: <TbArrowsRight /> },
	{ name: 'exit', icon: <TbDoorExit />}
];

function getNumberOrIcon(lineId, lineNumber, service) {
	switch (service) {
		case 'cr': return <img className='transfer__img invert' src={logoCR} alt='China Railway logo' />;
		case 'prdir': return <img className='transfer__img invert' src={logoPRDIR} alt='PRDIR logo' />;
		case 'gztram': return <img className='transfer__img invert' src={iconTram} alt='Tram icon' />;
		case 'fmetro': {
			if(lineId.split('-')[1] === 'tl') { return <img className='transfer__img invert' src={iconTram} alt='Tram icon' />; }
			return lineNumber;
		}
		default: return lineNumber;
	}
}

function getBgColor(lineId, lineColor, service) {
	let color = lineColor !== '' ? lineColor : '#c3c3c3';
	switch (service) {
		case 'cr': return '#e60012';
		case 'prdir': return '#009543';
		case 'gztram': return '#e60012';
		case 'fmetro': {
			if(lineId.split('-')[1] === 'tl') { return '#cd171c'; }
			return color;
		}
		default: return color;
	}
}

function getTooltipText(toStation, lineId, stationName, stationLineName, service) {
	if(service === 'fmetro' && lineId.split('-')[1] === 'tl') { return 'Transfer to Foshan Metro tram line'; }
	switch (service) {
		case 'cr': return <>Transfer to {toStation ? <u>{stationName} Railway Station</u> : 'China Railway'}</>;
		case 'prdir': return <>Transfer to {toStation ? <u>{stationName} Railway Station</u> : 'Pearl River Delta Intercity Railway'}</>;
		case 'gztram': return <>Transfer to {toStation ? <><u>{stationName}</u> on tram line</> : 'Guangzhou Tram'}</>;
		case 'fmetro': {
			if(lineId.split('-')[1] === 'tl') { return <>Transfer to {toStation ? <><u>{stationName}</u> on</> : 'Foshan Metro'} tram line</>; }
			return <>Transfer to {toStation ? <><u>{stationName}</u> on</> : ''} {stationLineName}</>;
		}
		default: return <>Transfer to {toStation ? <><u>{stationName}</u> on</> : ''} {stationLineName}</>;
	}
}

const StationTransfer = ({ transfer, currentStationService = 'gzmtr', toStation = false, position = 'top' }) => {
	// variables
	let { stationName, stationStatus, stationService, stationLine, stationLineNumber, stationLineName, stationLineColor } = getStationInfo(transfer?._station_id);
	let isNio = stationStatus !== 'in operation';
	let color = getBgColor(stationLine, stationLineColor, transfer?._service_id);
	let outlineColor = isNio ? `2px dashed ${color}` : 'none';
	let bgColor = isNio ? getLighterColor(color, 40) : color;
	let fontColor = getContrastingTextColor(color);
	let opacity = isNio ? '0.5' : '1';
	let number = getNumberOrIcon(stationLine, stationLineNumber, transfer?._service_id);

	return (
		<Tooltip position={position} text={getTooltipText(toStation, stationLine, stationName, stationLineName, transfer?._service_id)}>
			{isServiceAccessible(stationLine, transfer?._service_id) ? <Link to={toStation ? `/station/${transfer?._station_id}` : `/line/${stationLine}`} className='transfer__item--circle' style={{ outline: outlineColor, background: bgColor, color: fontColor, opacity: opacity }}>
				{number}
			</Link> : <div className='transfer__item--circle' style={{ outline: outlineColor, background: bgColor, color: fontColor, opacity: opacity, cursor: 'help' }}>
				{number}
			</div>}
		</Tooltip>
	);
}

const StationTransferMethod = ({ toStation = true, transfer }) => {
	// variables
	let { stationName, stationStatus, stationService, stationLine, stationLineNumber, stationLineName, stationLineColor } = getStationInfo(transfer?._station_id);
	let isNio = stationStatus !== 'in operation';

	return (
		<div className='transfer__group'>
			<Tooltip position='top' text={getTooltipText(toStation, stationLine, stationName, stationLineName, transfer?._service_id)}>
				<div className='transfer__item'>{stationLineNumber}</div>
			</Tooltip>
			<Tooltip position='bottom' text={'asd'}>
				<div className='transfer__method'><TbDoorExit /></div>
			</Tooltip>
		</div>
	)
}

export { StationTransfer, StationTransferMethod };