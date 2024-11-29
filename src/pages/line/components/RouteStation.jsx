// packages
import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Popover } from 'react-tiny-popover';
import { RiExchange2Line } from 'react-icons/ri';
// utils
import { getLighterColor } from '../../../utils/color';
// components
import { StationTransfer } from '../../../components/StationTransfer';
import StationTip from './StationTip';
import { RouteCircle, RouteCircleMobile } from './RouteCircle';

const RouteStation = ({ lineData, stationData, numOfStations, lineBranches, stationIndex, route, activeRoute, setActiveRoute, activeCircle, setActiveCircle, isPopoverOpen, setIsPopoverOpen }) => {
	// variables
	let isActive = activeCircle === stationIndex && activeRoute === route;
	// refs
	const popoverRef = useRef(null);	

	// popover should be opened by default, so this is unnecessary
	useEffect(() => {
		const handleClickOutside = (e) => {
			if (popoverRef.current && !popoverRef.current.contains(e.target)) {
				setIsPopoverOpen(false);
			}
		};
		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, []);

	const handlePopover = () => {
		// if clicking on some other circle that is not currently active,
		// set that popover to be true to show
		// otherwise toggle on and off on currently active
		if(activeCircle !== stationIndex && activeRoute === route) { setIsPopoverOpen(true); }
		else { setIsPopoverOpen(!isPopoverOpen); }
		setActiveCircle(stationIndex);
	}

	return (
		<div className={'route-station' + (isActive ? ' active' : '')}>
			<div className='route-station-name' style={{ color: isActive ? lineData?.color : 'var(--color-black)' }} onClick={handlePopover}>
				{stationData.name.en}
			</div>
			<RouteCircle stationIndex={stationIndex} numOfStations={numOfStations} activeRoute={activeRoute} setActiveRoute={setActiveRoute} isActive={isActive} status={stationData.status} sequence={stationData.sequence} lineColor={lineData?.color} branches={stationData.branches} lineBranches={lineBranches} />
			<Popover ref={popoverRef} isOpen={isPopoverOpen && isActive} positions={['bottom', 'top']} align='center' content={<div>
				<StationTip stationId={stationData.code} lineNumber={lineData?.prefix.real_prefix} lineColor={lineData?.color} />
			</div>}>
				<div className='route-station-trigger' onClick={handlePopover} />
			</Popover>
			{stationData.transfers.length !== 0 && (<div className='route-station-transfers transfer__list'>
				<div className='route-station-transfer-line' />
				{stationData.transfers.map((transfer, i) => (
					<StationTransfer key={i} transfer={transfer.transfer_to} />
				))}
			</div>)}
		</div>
	);
}

const RouteStationMobile = ({ lineData, stationData }) => {
	// variables
	let lighterColor = getLighterColor(lineData?.color, 20);

	return (
		<div className='route-station-mobile'>
			<div className='route-line' style={{ background: lighterColor }}>
				<RouteCircleMobile sequence={stationData.sequence} lineColor={lineData?.color} />
			</div>
			<div className='route-station-info'>
				<Link to={`/station/${stationData._id}`} className='route-station-name'>{stationData.name.en}</Link>
				<strong><RiExchange2Line strokeWidth={2} /> Transfers</strong>
				{stationData.transfers.length !== 0 ? (<div className='route-station-transfers transfer__list'>
					{stationData.transfers.map((transfer, i) => (
						<StationTransfer key={i} transfer={transfer.transfer_to} position='bottom' />
					))}
				</div>) : <code>N/A</code>}
			</div>
		</div>
	);
}

export { RouteStation, RouteStationMobile };