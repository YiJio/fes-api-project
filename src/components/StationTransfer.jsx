// packages
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
// utils
import { getStationInfo } from '../utils/get';
import { getTransferBackground, isServiceAccessible } from '../utils/helper';
import { getContrastingTextColor } from '../utils/color';
// components
import Tooltip from './Tooltip';
// assets
import logoCR from '../assets/China_Railway_icon.svg';
import logoPRDIR from '../assets/PRDIR_icon.svg';
import iconTram from '../assets/tram.svg';

const StationTransfer = ({ transfer, position = 'right' }) => {
	// hooks
	const navigate = useNavigate();
	// variables
	let { stationLine, stationLineNumber, stationLineName, stationLineColor } = getStationInfo(transfer?._id);
	let bgColor = getTransferBackground(stationLineColor, transfer);
	let fontColor = getContrastingTextColor(stationLineColor);
	let number = getTransferNumber(transfer);
	let text = getTransferText(transfer);

	function getTransferText(transfer) {
		switch(transfer?._service_id) {
			case 'cr': return 'Transfer to China Railway';
			case 'prdir': return 'Transfer to Pearl River Delta Intercity Rail';
			case 'gztram': return 'Transfer to Guangzhou Tram';
			case 'fmetro': return `Transfer to Foshan Metro ${stationLineName}`;
			case 'guangfometro': `Transfer to Guangfo Metro ${stationLineName}`;
			default: return `Transfer to ${stationLineName}`;
		}
	}

	function getTransferNumber(transfer) {
		switch(transfer?._service_id) {
			case 'cr': return <img className='invert' src={logoCR} alt='China Railway logo' />;
			case 'prdir': return <img className='invert' src={logoPRDIR} alt='PRDIR logo' />;
			case 'gztram': return <img className='invert' src={iconTram} alt='Tram icon' />;
			default: return stationLineNumber;
		}
	}

	return (
		<Tooltip position={position} text={text}>
			{isServiceAccessible(stationLine, transfer?._service_id) ? <Link to={`/line/${stationLine}`} className='station-transfer' style={{ background: bgColor, color: fontColor }}>
				{number}
			</Link> : <div className='station-transfer' style={{ background: bgColor, color: fontColor }}>
				{number}
			</div>}
		</Tooltip>
	);
}

export default StationTransfer;