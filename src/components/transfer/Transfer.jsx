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
	let serviceColor = getFromIndex(SERVICES, 'key', service, 'color');
	switch (service) {
		case 'cr':
		case 'prdir':
		case 'gztram':
			return serviceColor;
		case 'fmetro': {
			if (lineId.split('-')[1] === 'tl') { return serviceColor; }
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

const Transfer = ({ transfer, sourceService = 'gzmtr', position = 'top' }) => {
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
			{isServiceAccessible(stationLine, transfer?._service_id) ? <Link to={`/line/${stationLine}`} className='c-transfer' style={{ outline: outlineColor, background: bgColor, color: fontColor, opacity: opacity }}>
				{number}
			</Link> : <div className='c-transfer' style={{ outline: outlineColor, background: bgColor, color: fontColor, opacity: opacity, cursor: 'help' }}>
				{number}
			</div>}
		</Tooltip>
	);
}

export default Transfer;