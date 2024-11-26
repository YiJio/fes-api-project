// packages
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
// utils
import { getStationInfo } from '../utils/get';
import { getContrastingTextColor } from '../utils/color';
// assets
import logoCR from '../assets/China_Railway_icon.svg';
import logoPRDIR from '../assets/PRDIR_icon.svg';
import imageTram from '../assets/tram.png';

const StationTransfer = ({ transfer }) => {
	// hooks
	const navigate = useNavigate();
	// variables
	let { stationLineColor, stationLine, stationLineNumber } = getStationInfo(transfer?._id);
	let bgColor = getTransferBackground(transfer);
	let fontColor = getContrastingTextColor(stationLineColor);
	let text = getTransferText(transfer);

	function isAccessible(service) {
		const test = stationLine ? true : false;
		switch(service) {
			case 'cr': return false;
			case 'prdir': return false;
			case 'gztram': return false;
			case 'gzmtr': return test;
			case 'guangfometro': return test;
			case 'fmetro': return test;
		}
	}

	function getTransferBackground(transfer) {
		switch(transfer?._service_id) {
			case 'cr': return '#e60012';
			case 'prdir': return '#009543';
			case 'gztram': return '#e60012';
			default: return stationLineColor;
		}
	}

	function getTransferText(transfer) {
		switch(transfer?._service_id) {
			case 'cr': return <img className='invert' src={logoCR} alt='China Railway logo' />;
			case 'prdir': return <img className='invert' src={logoPRDIR} alt='PRDIR logo' />;
			case 'gztram': return <img className='invert' src={imageTram} alt='Tram icon' />;
			default: return stationLineNumber;
		}
	}

	return (
		<>
			{isAccessible(transfer?._service_id) ? <Link to={`/line/${stationLine}`} className='station-transfer' style={{ background: bgColor, color: fontColor }}>
				{text}
			</Link> : <div className='station-transfer' style={{ background: bgColor, color: fontColor }}>
				{text}
			</div>}
		</>
	);
}

export default StationTransfer;