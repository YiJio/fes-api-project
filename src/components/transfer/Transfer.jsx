// packages
import React from 'react';
import { Link } from 'react-router-dom';
// css
import './transfer.css';
// utils
import { getStationInfo } from '../../utils/get';
import { getFromIndex, isServiceAccessible } from '../../utils/helper';
import { getContrastingTextColor, getLighterColor } from '../../utils/color';
// components
import { IconCR, IconPRDIR } from '../icons/SvgService';
import { IconTram } from '../icons/SvgTransit';
import Tooltip from '../tooltip/Tooltip';
// data
import { SERVICES } from '../../data';

function getNumberOrIcon(lineNumber, service, invert) {
	switch (service) {
		case 'cr': return <IconCR color='#000000' invert={invert} />;
		case 'prdir': return <IconPRDIR color='#000000' invert={invert} />;
		case 'gztram':
		case 'ftram': return <IconTram color='#ffffff' />;
		default: return lineNumber;
	}
}

function getBgColor(lineColor, service) {
	let color = lineColor && lineColor !== '' ? lineColor : '#c3c3c3';
	let serviceColor = getFromIndex(SERVICES, 'key', service, 'color');
	switch (service) {
		case 'cr':
		case 'prdir':
		case 'gztram':
		case 'ftram':
			return serviceColor;
		default: return color;
	}
}

function getTooltipText(stationLineName, sourceService, destService) {
	let theService = getFromIndex(SERVICES, 'key', destService);
	let isSameService = <> {destService !== sourceService && theService.name}</>;
	switch (destService) {
		case 'cr':
		case 'prdir': return <>Transfer to {theService.name}</>;
		case 'gztram':
		case 'ftram': return <>Transfer to{isSameService} tram line</>;
		case 'fmetro':
		case 'guangfometro':
		default: return <>Transfer to{isSameService} {stationLineName}</>;
	}
}

const Transfer = ({ transfer, sourceService = 'gzmtr', position = 'top' }) => {
	// variables
	let { stationStatus, stationLine, stationLineNumber, stationLineName, stationLineColor } = getStationInfo(transfer?._station_id);
	let isNio = stationStatus !== 'in operation';
	let color = getBgColor(stationLineColor, transfer?._service_id);
	let outlineColor = isNio ? `2px dashed ${color}` : 'none';
	let bgColor = isNio ? getLighterColor(color, 40) : color;
	let fontColor = getContrastingTextColor(color);
	let opacity = isNio ? '0.5' : '1';
	let number = getNumberOrIcon(stationLineNumber, transfer?._service_id, true);

	return (
		<Tooltip position={position} text={getTooltipText(stationLineName, sourceService, transfer?._service_id)}>
			{isServiceAccessible(stationLine, transfer?._service_id) ? <Link to={`/line/${stationLine}`} className='c-transfer' style={{ outline: outlineColor, background: bgColor, color: fontColor, opacity: opacity }}>
				{number}
			</Link> : <div className='c-transfer' style={{ outline: outlineColor, background: bgColor, color: fontColor, opacity: opacity, cursor: 'help' }}>
				{number}
			</div>}
		</Tooltip>
	);
}

export default Transfer;