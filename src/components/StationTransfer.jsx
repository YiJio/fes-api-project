// packages
import React from 'react';
import { Link } from 'react-router-dom';
import { RiArrowRightLine, RiWalkFill } from 'react-icons/ri';
import { TbArrowGuide, TbArrowRotaryRight, TbArrowsDoubleSwNe, TbArrowsRight, TbCircleOff, TbDoorExit, TbQuestionMark, TbSlash, TbStairs } from 'react-icons/tb';
// utils
import { getStationInfo } from '../utils/get';
import { isServiceAccessible } from '../utils/helper';
import { getContrastingTextColor, getLighterColor } from '../utils/color';
// components
import Tooltip from './Tooltip';
import { IconCR, IconPRDIR } from './ServiceSvg';
import { IconTram } from './TransitSvg';

// constants
const SHOW_SERVICES = ['gzmtr', 'guangfometro'];
const TRANSFER_METHODS = [
	{ name: 'tba', icon: <TbQuestionMark />, text: 'To be available (under construction)' },
	{ name: 'cross platform', icon: <TbArrowsDoubleSwNe />, text: 'Walk across platform to cross transfer' },
	{ name: 'parallel platform', icon: <TbArrowsRight />, text: 'Walk across platform to parallel transfer' },
	{ name: 'concourse', icon: <TbStairs />, text: 'Go to concourse to transfer' },
	{ name: 'node', icon: <TbArrowRotaryRight />, text: 'Use elevator / escalator / stairs to a concourse to transfer' },
	{ name: 'channel', icon: <TbArrowGuide />, text: 'Walk the designated channel passageway to transfer' },
	{ name: 'exit', icon: <TbDoorExit />, text: 'Exit station to transfer' },
	{ name: 'termination', icon: <TbCircleOff />, text: 'The transfer line is the terminal, go to other direction to transfer' },
];

function getNumberOrIcon(lineId, lineNumber, service, invert) {
	//console.log(lineId, lineNumber)
	switch (service) {
		case 'cr': return <IconCR color='#000000' invert={invert} />;
		case 'prdir': return <IconPRDIR color='#000000' invert={invert} />;
		case 'gztram': return <IconTram color='#ffffff' />;
		case 'fmetro': {
			if (lineId.split('-')[1] === 'tl') { return <IconTram color='#ffffff' invert={invert} />; }
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
			if (lineId.split('-')[1] === 'tl') { return '#cd171c'; }
			return color;
		}
		default: return color;
	}
}

function getTooltipText(lineId, stationLineName, sourceService, destService) {
	//console.log('source',sourceService,'dest',destService)
	let isSameService = destService !== sourceService;
	switch (destService) {
		case 'cr': return 'Transfer to China Railway';
		case 'prdir': return 'Transfer to Pearl River Delta Intercity Railway';
		case 'gztram': return <>Transfer to{isSameService && ' Guangzhou Tram'} tram line</>;
		case 'fmetro': {
			if (lineId.split('-')[1] === 'tl') { return <>Transfer to{isSameService && ' Foshan Metro'} tram line</>; }
			return <>Transfer to{isSameService && ' Foshan Metro'} {stationLineName}</>;
		}
		case 'guangfometro': {
			return <>Transfer to{isSameService && ' Guangfo Metro'} {stationLineName}</>;
		}
		default: return <>Transfer to{isSameService && ' Guangzhou Metro'} {stationLineName}</>;
	}
}

function getTooltipText2(lineId, stationName, stationLineName, destService) {
	let isRail = destService === 'cr' || destService === 'prdir';
	let stationNameText = isRail ? <u>{stationName} Railway Station</u> : <u>{stationName}</u>;
	switch (destService) {
		case 'cr': case 'prdir': return <>To {stationNameText}</>;
		case 'gztram': return <>To {stationNameText} tram line</>;
		case 'fmetro': {
			if (lineId.split('-')[1] === 'tl') { return <>To {stationNameText} on tram line</>; }
			return <>To {stationNameText} on {stationLineName}</>;
		}
		default: return <>To {stationNameText} on {stationLineName}</>;
	}
}

const StationTransfer = ({ transfer, sourceService = 'gzmtr', position = 'top' }) => {
	// variables
	let { stationStatus, stationLine, stationLineNumber, stationLineName, stationLineColor } = getStationInfo(transfer?._station_id);
	let isNio = stationStatus !== 'in operation';
	let color = getBgColor(stationLine, stationLineColor, transfer?._service_id);
	let outlineColor = isNio ? `2px dashed ${color}` : 'none';
	let bgColor = isNio ? getLighterColor(color, 40) : color;
	let fontColor = getContrastingTextColor(color);
	let opacity = isNio ? '0.5' : '1';
	let number = getNumberOrIcon(stationLine, stationLineNumber, transfer?._service_id, true);

	return (
		<Tooltip position={position} text={getTooltipText(stationLine, stationLineName, sourceService, transfer?._service_id)}>
			{isServiceAccessible(stationLine, transfer?._service_id) ? <Link to={`/line/${stationLine}`} className='transfer__item transfer__item--circle' style={{ outline: outlineColor, background: bgColor, color: fontColor, opacity: opacity }}>
				{number}
			</Link> : <div className='transfer__item transfer__item--circle' style={{ outline: outlineColor, background: bgColor, color: fontColor, opacity: opacity, cursor: 'help' }}>
				{number}
			</div>}
		</Tooltip>
	);
}

const StationTransferMethod = ({ transfer, sourceLine }) => {
	// variables
	let { stationStatus, stationLine, stationName, stationLineNumber, stationLineName, stationLineColor } = getStationInfo(transfer?._station_id);
	let isNio = stationStatus !== 'in operation';
	let color = getBgColor(stationLine, stationLineColor, transfer?._service_id);
	let bgColor = isNio ? getLighterColor(color, 40) : color;
	let fontColor = getContrastingTextColor(color);
	let opacity = isNio ? '0.5' : '1';
	let number = getNumberOrIcon(stationLine, stationLineNumber, transfer?._service_id, true);
	let methods = transfer?.method.forward === '' ? [TRANSFER_METHODS[0]] : transfer?.method?.forward.split(', ').map((method) => {
		let index = TRANSFER_METHODS.findIndex((m) => m.name == method);;
		return TRANSFER_METHODS[index];
	});
	console.log(methods)
	let tooltipText = <>{getTooltipText2(stationLine, stationName, stationLineName, transfer?._service_id)}{isNio ? <><br/><small>(currently <b><i>not in operation</i></b> or is <b><i>under construction</i></b>)</small></> : ''}</>;

	return (
		<div className='transfer__group'>
			<Tooltip text={`From ${sourceLine?.name.en}`}>
				<div className='transfer__item transfer__item--first' style={{ background: sourceLine?.color, color: getContrastingTextColor(sourceLine?.color) }}>{sourceLine.prefix.real_prefix}</div>
			</Tooltip>
			{methods?.map((method, index) => (<React.Fragment key={index}>
				<Tooltip key={index} text={method.text}>
					<div className='transfer__item transfer__item--method'>{method.icon}</div>
				</Tooltip>
				{index !== methods.length - 1 && <div className='transfer__item transfer__item--slash'><TbSlash /></div>}
			</React.Fragment>))}
			<Tooltip text={tooltipText}>
				{isServiceAccessible(stationLine, transfer?._service_id) ? <Link to={`/station/${transfer?._station_id}`} className='transfer__item transfer__item--last' style={{ background: stationLineColor, color: fontColor, opacity: opacity }}>
					{number}
				</Link> : <div className='transfer__item transfer__item--last' style={{ background: bgColor, color: fontColor, opacity: opacity, cursor: 'help' }}>
					{number}
				</div>}
			</Tooltip>
		</div>
	);
}

export { StationTransfer, StationTransferMethod };