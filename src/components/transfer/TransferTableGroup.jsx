// packages
import React from 'react';
import { Link } from 'react-router-dom';
import { TbArrowNarrowDown, TbArrowNarrowUp, TbSeparator } from 'react-icons/tb';
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
import { METHOD_DIRECTIONS, SERVICES } from '../../data';
import { TRANSFER_METHODS } from '../../dataWithJSX';

function getNumberOrIcon(lineNumber, service, invert) {
	let size = '16px';
	switch (service) {
		case 'cr': return <IconCR color='#000000' width={size} height={size} invert={invert} />;
		case 'prdir': return <IconPRDIR color='#000000' width={size} height={size} invert={invert} />;
		case 'gztram':
		case 'ftram': return <IconTram color='#ffffff' width={size} height={size} />;
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

function getTooltipText(lineId, stationName, stationLineName, destService) {
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

const TransferTableGroup = ({ transfer, sourceLine }) => {
	// variables
	let { stationStatus, stationLine, stationName, stationLineNumber, stationLineName, stationLineColor } = getStationInfo(transfer?._station_id);
	let isNio = stationStatus !== 'in operation';
	let color = getBgColor(stationLine, stationLineColor, transfer?._service_id);
	let bgColor = isNio ? getLighterColor(color, 40) : color;
	let fontColor = getContrastingTextColor(color);
	let opacity = isNio ? '0.5' : '1';
	let number = getNumberOrIcon(stationLineNumber, transfer?._service_id, true);
	let methods = [];
	methods[0] = transfer?.method.forward === '' ? [TRANSFER_METHODS[0]] : transfer?.method?.forward.split(', ').map((method) => getFromIndex(TRANSFER_METHODS, 'name', method));
	methods[1] = transfer?.method.reverse === '' ? [TRANSFER_METHODS[0]] : transfer?.method?.reverse.split(', ').map((method) => getFromIndex(TRANSFER_METHODS, 'name', method));
	let tooltipText = <>{getTooltipText(stationLine, stationName, stationLineName, transfer?._service_id)}{isNio ? <><br /><small>(currently <b><i>not in operation</i></b> or is <b><i>under construction</i></b>)</small></> : ''}</>;

	return (
		<div className='c-transfer-table__group'>
			<div className='c-transfer-table__cell'>
				<Tooltip text={`From ${sourceLine?.name.en}`}>
					<div className='c-transfer-table__piece c-transfer-table__piece--first' style={{ background: sourceLine?.color, color: getContrastingTextColor(sourceLine?.color) }}>{sourceLine.prefix.real_prefix}</div>
				</Tooltip>
			</div>
			<div className='c-transfer-table__cell'>
				{METHOD_DIRECTIONS.map((direction, directionIndex) => (<div key={directionIndex} className='c-transfer-table__method'>
					{methods[directionIndex]?.map((method, index) => (<React.Fragment key={index}>
						<Tooltip key={index} text={method.text} position={direction.position}>
							<div className='c-transfer-table__piece c-transfer-table__piece--method'>{method.icon}</div>
						</Tooltip>
						{index !== methods[directionIndex].length - 1 && <div className='c-transfer-table__piece c-transfer-table__piece--slash'><TbSeparator /></div>}
					</React.Fragment>))}
					<Tooltip text={`${direction.name} - ${direction.text}`} position={direction.position}>
						{isServiceAccessible(stationLine, transfer?._service_id) ? <div className='c-transfer-table__piece c-transfer-table__piece--direction' style={{ background: bgColor, color: fontColor, opacity: opacity }}>{directionIndex === 0 ? <TbArrowNarrowUp /> : <TbArrowNarrowDown />}</div> : <div className='c-transfer-table__piece c-transfer-table__piece--direction' style={{ background: bgColor, color: fontColor, opacity: opacity, cursor: 'help' }}>{directionIndex === 0 ? <TbArrowNarrowUp /> : <TbArrowNarrowDown />}</div>}
					</Tooltip>
				</div>))}
			</div>
			<div className='c-transfer-table__cell'>
				<Tooltip text={tooltipText}>
					{isServiceAccessible(stationLine, transfer?._service_id) ? <Link to={`/station/${transfer?._station_id}`} className='c-transfer-table__piece c-transfer-table__piece--last' style={{ background: bgColor, color: fontColor, opacity: opacity }}>
						{number}
					</Link> : <div className='c-transfer-table__piece c-transfer-table__piece--last' style={{ background: bgColor, color: fontColor, opacity: opacity, cursor: 'help' }}>
						{number}
					</div>}
				</Tooltip>
			</div>
		</div>
	);
}

export default TransferTableGroup;