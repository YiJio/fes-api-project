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
	//console.log(lineId, lineNumber)
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
	let color = lineColor && lineColor !== '' ? lineColor : '#c3c3c3';
	//console.log(lineId, lineColor, color)
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

function getTooltipText(toStation, lineId, stationName, stationLineName, sourceService, destService) {
	//console.log('source',sourceService,'dest',destService)
	let isRail = destService === 'cr' || destService === 'prdir';
	let isSameService = destService !== sourceService;
	let stationNameText = isRail ? <u>{stationName} Railway Station</u> : <u>{stationName}</u>;
	switch (destService) {
		case 'cr': return <>Transfer to {toStation ? stationNameText : 'China Railway'}</>;
		case 'prdir': return <>Transfer to {toStation ? stationNameText : 'Pearl River Delta Intercity Railway'}</>;
		case 'gztram': return <>Transfer to {toStation ? <><u>{stationName}</u> on</> : ''}{isSameService && ' Guangzhou Tram'} tram line</>;
		case 'fmetro': {
			if(lineId.split('-')[1] === 'tl') { return <>Transfer to {toStation ? <>{stationNameText} on</> : `${isSameService && ' Foshan Metro'}`} tram line</>; }
			return <>Transfer to {toStation ? <>{stationNameText} on</> : `${isSameService ? ' Foshan Metro' : ''}`} {stationLineName}</>;
		}
		case 'guangfometro': {
			return <>Transfer to {toStation ? <>{stationNameText} on</> : `${isSameService ? ' Guangfo Metro' : ''}`} {stationLineName}</>;
		}
		default: return <>Transfer to {toStation ? <>{stationNameText} on</> : `${isSameService ? ' Guangzhou Metro' : ''}`} {stationLineName}</>;
	}
}

const StationTransfer = ({ transfer, sourceService = 'gzmtr', toStation = false, position = 'top' }) => {
	// variables
	let { stationName, stationStatus, stationLine, stationLineNumber, stationLineName, stationLineColor } = getStationInfo(transfer?._station_id);
	let isNio = stationStatus !== 'in operation';
	let color = getBgColor(stationLine, stationLineColor, transfer?._service_id);
	let outlineColor = isNio ? `2px dashed ${color}` : 'none';
	let bgColor = isNio ? getLighterColor(color, 40) : color;
	let fontColor = getContrastingTextColor(color);
	let opacity = isNio ? '0.5' : '1';
	let number = getNumberOrIcon(stationLine, stationLineNumber, transfer?._service_id);

	return (
		<Tooltip position={position} text={getTooltipText(toStation, stationLine, stationName, stationLineName, sourceService, transfer?._service_id)}>
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