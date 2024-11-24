// packages
import React, { useEffect, useRef, useState } from 'react';
import { Popover } from 'react-tiny-popover';
// utils
import { getStationInfo } from '../utils/get';
import { getContrastingTextColor } from '../utils/color';
// assets
import logoCR from '../assets/China_Railway_icon.svg';
import logoPRDIR from '../assets/PRDIR_icon.svg';
import imageTram from '../assets/tram.png';

const RouteStation = ({ line, station, index, activeCircle, setActiveCircle, length, lighterColor }) => {
	// states
	const [ui_isPopoverOpen, setUiIsPopoverOpen] = useState(false);
	// refs
	const popoverRef = useRef(null);

	function getActiveColor(color, index, what) {
		if (activeCircle === index) {
			if (what === 'background') { return 'var(color-white)'; }
			else if (what === 'color') { return 'var(color-black)'; }
			else { return `8px solid ${color}`; }
		} else {
			if (what === 'background') { return color; }
			else if (what === 'color') { return getContrastingTextColor(color); }
			else { return 'none'; }
		}
	}

	function getTransferBackground(transfer) {
		if (transfer?._service_id === 'cr') { return '#e60012'; }
		else if (transfer?._service_id === 'prdir') { return '#009543'; }
		else if (transfer?._service_id === 'gztram') { return '#e60012'; }
		else { return getStationInfo(transfer?._id, 'color'); }
	}

	function getTransferText(transfer) {
		if (transfer?._service_id === 'cr') { return <img className='invert' src={logoCR} alt='China Railway logo' />; }
		else if (transfer?._service_id === 'prdir') { return <img className='invert' src={logoPRDIR} alt='PRDIR logo' />; }
		else if (transfer?._service_id === 'gztram') { return <img className='invert' src={imageTram} alt='Tram icon' />; }
		else { return getStationInfo(transfer?._id, 'lineNumber'); }
	}

	useEffect(() => {
		const handleClickOutside = (e) => {
			if (popoverRef.current && !popoverRef.current.contains(e.target)) {
				setUiIsPopoverOpen(false);
			}
		};
		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, []);

	return (
		<div key={station.code} className={'route-station' + (activeCircle === index ? ' active' : '')} onClick={() => setActiveCircle(index)}>

			<Popover isOpen={ui_isPopoverOpen} positions={['bottom']} align='center' content={<div className='station-tip' ref={popoverRef}>
				To be done
			</div>}>
				<div className='route-station-code' style={{ background: getActiveColor(lighterColor, index, 'background'), color: getActiveColor(lighterColor, index, 'color'), border: getActiveColor(line?.color, index, 'border') }} onClick={() => setUiIsPopoverOpen(!ui_isPopoverOpen)}>
					<span>{station.sequence}</span>
					<div className={'route-station-code-line' + (index === 0 ? ' first' : index === length ? ' last' : '')} style={{ background: lighterColor }} />
				</div>
			</Popover>

			<div className='route-station-name' style={{ color: activeCircle === index ? line?.color : 'var(--color-black)' }}>{station.name.en}</div>
			{station.transfers.length !== 0 && (<div className='route-station-transfers'>
				{station.transfers.map((transfer, index) => (<div key={index} className='route-station-transfer' style={{ background: getTransferBackground(transfer.transfer_to), color: getContrastingTextColor(getStationInfo(transfer.transfer_to?._id, 'color')) }}>
					{getTransferText(transfer.transfer_to)}
				</div>))}
			</div>)}
		</div>
	);
}

export default RouteStation;