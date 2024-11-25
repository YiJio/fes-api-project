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

	function isAccessible(service) {
		const test = getStationInfo(transfer?._id, 'line') ? true : false;
		switch(service) {
			case 'cr': return false;
			case 'prdir': return false;
			case 'gztram': return false;
			case 'gzmtr': return test;
		}
	}

	function getTransferBackground(transfer) {
		switch(transfer?._service_id) {
			case 'cr': return '#e60012';
			case 'prdir': return '#009543';
			case 'gztram': return '#e60012';
			default: return getStationInfo(transfer?._id, 'color');
		}
	}

	function getTransferText(transfer) {
		switch(transfer?._service_id) {
			case 'cr': return <img className='invert' src={logoCR} alt='China Railway logo' />;
			case 'prdir': return <img className='invert' src={logoPRDIR} alt='PRDIR logo' />;
			case 'gztram': return <img className='invert' src={imageTram} alt='Tram icon' />;
			default: return getStationInfo(transfer?._id, 'lineNumber');
		}
	}

	return (
		<>
			{isAccessible(transfer?._service_id) ? <Link to={`/line/${getStationInfo(transfer?._id, 'line')}`} className='station-transfer' style={{ background: getTransferBackground(transfer), color: getContrastingTextColor(getStationInfo(transfer?._id, 'color')) }}>
				{getTransferText(transfer)}
			</Link> : <div className='station-transfer' style={{ background: getTransferBackground(transfer), color: getContrastingTextColor(getStationInfo(transfer?._id, 'color')) }}>
				{getTransferText(transfer)}
			</div>}
		</>
	);
}

export default StationTransfer;