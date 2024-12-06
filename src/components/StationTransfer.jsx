// packages
import React from 'react';
import { Link } from 'react-router-dom';
import { TbArrowAutofitContent, TbArrowNarrowDown, TbArrowNarrowUp, TbArrowRotaryRight, TbArrowsDoubleSwNe, TbArrowsRight, TbCircleOff, TbDoorExit, TbQuestionMark, TbSeparator, TbStairs } from 'react-icons/tb';
// utils
import { getStationInfo } from '../utils/get';
import { isServiceAccessible } from '../utils/helper';
import { getContrastingTextColor, getLighterColor } from '../utils/color';
// components
import Tooltip from './Tooltip';
import { IconCR, IconPRDIR } from './SvgService';
import { IconTram } from './SvgTransit';

// constants
const SHOW_SERVICES = ['gzmtr', 'guangfometro'];
const METHOD_DIRECTIONS = [
	{ name: 'Forward', text: 'Head in the same direction as the transfer', position: 'top' },
	{ name: 'Reverse', text: 'Head in the opposite direction as the transfer', position: 'bottom' }
];

function getNumberOrIcon(lineId, lineNumber, service, invert) {
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
		case 'gztram': return <>To {stationNameText} on tram line</>;
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

const StationTransferMethod = ({ transfer, sourceLine, methodsDict }) => {
	// variables
	let { stationStatus, stationLine, stationName, stationLineNumber, stationLineName, stationLineColor } = getStationInfo(transfer?._station_id);
	let isNio = stationStatus !== 'in operation';
	let color = getBgColor(stationLine, stationLineColor, transfer?._service_id);
	let bgColor = isNio ? getLighterColor(color, 40) : color;
	let fontColor = getContrastingTextColor(color);
	let opacity = isNio ? '0.5' : '1';
	let number = getNumberOrIcon(stationLine, stationLineNumber, transfer?._service_id, true);
	let methods = [];
	methods[0] = transfer?.method.forward === '' ? [methodsDict[0]] : transfer?.method?.forward.split(', ').map((method) => {
		let index = methodsDict.findIndex((m) => m.name == method);;
		return methodsDict[index];
	});
	methods[1] = transfer?.method.reverse === '' ? [methodsDict[0]] : transfer?.method?.reverse.split(', ').map((method) => {
		let index = methodsDict.findIndex((m) => m.name == method);;
		return methodsDict[index];
	});
	let tooltipText = <>{getTooltipText2(stationLine, stationName, stationLineName, transfer?._service_id)}{isNio ? <><br /><small>(currently <b><i>not in operation</i></b> or is <b><i>under construction</i></b>)</small></> : ''}</>;

	return (
		<div className='transfer__group'>
			<div className='transfer__item--tip'>
				<Tooltip text={`From ${sourceLine?.name.en}`}>
					<div className='transfer__item transfer__item--first' style={{ background: sourceLine?.color, color: getContrastingTextColor(sourceLine?.color) }}>{sourceLine.prefix.real_prefix}</div>
				</Tooltip>
			</div>
			<div>
				{METHOD_DIRECTIONS.map((direction, directionIndex) => (<div key={directionIndex} style={{ display: 'flex', justifyContent:'flex-end' }}>
					{methods[directionIndex]?.map((method, index) => (<React.Fragment key={index}>
						<Tooltip key={index} text={method.text} position={direction.position}>
							<div className='transfer__item transfer__item--method'>{method.icon}</div>
						</Tooltip>
						{index !== methods[directionIndex].length - 1 && <div className='transfer__item transfer__item--slash'><TbSeparator /></div>}
					</React.Fragment>))}
					<Tooltip text={`${direction.name} - ${direction.text}`} position={direction.position}>
						{isServiceAccessible(stationLine, transfer?._service_id) ? <div className='transfer__item transfer__item--direction' style={{ background: bgColor, color: fontColor, opacity: opacity }}>{directionIndex === 0 ? <TbArrowNarrowUp /> : <TbArrowNarrowDown />}</div> : <div className='transfer__item transfer__item--direction' style={{ background: bgColor, color: fontColor, opacity: opacity, cursor: 'help' }}>{directionIndex === 0 ? <TbArrowNarrowUp /> : <TbArrowNarrowDown />}</div>}
					</Tooltip>
				</div>))}
			</div>
			<div className='transfer__item--tip'>
				<Tooltip text={tooltipText}>
					{isServiceAccessible(stationLine, transfer?._service_id) ? <Link to={`/station/${transfer?._station_id}`} className='transfer__item transfer__item--last' style={{ background: bgColor, color: fontColor, opacity: opacity }}>
					{number}
					</Link> : <div className='transfer__item transfer__item--last' style={{ background: bgColor, color: fontColor, opacity: opacity, cursor: 'help' }}>
						{number}
					</div>}
				</Tooltip>
			</div>
		</div>
	);
}

export { StationTransfer, StationTransferMethod };