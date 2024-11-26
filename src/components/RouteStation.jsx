// packages
import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Popover } from 'react-tiny-popover';
import { RiExchange2Line } from 'react-icons/ri';
// components
import StationTransfer from './StationTransfer';
import StationTip from './StationTip';
import { RouteCircle, RouteCircleMobile } from './RouteCircle';

const RouteStation = ({ line, station, index, route, activeRoute, setActiveRoute, activeCircle, setActiveCircle, length, lighterColor, lineBranches }) => {
	// variables
	let isActive = activeCircle === index && activeRoute === route;
	// refs
	const popoverRef = useRef(null);	

	// popover should be opened by default, so this is unnecessary
	/*useEffect(() => {
		const handleClickOutside = (e) => {
			if (popoverRef.current && !popoverRef.current.contains(e.target)) {
				setUiIsPopoverOpen(false);
			}
		};
		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, []);*/

	return (
		<div className={'route-station' + (isActive ? ' active' : '')}>
			<div className='route-station-name' style={{ color: isActive ? line?.color : 'var(--color-black)' }} onClick={() => setActiveCircle(index)}>
				{station.name.en}
			</div>
			<RouteCircle index={index} length={length} setActiveRoute={setActiveRoute} isActive={isActive} setActiveCircle={setActiveCircle} sequence={station.sequence} mainColor={line?.color} lighterColor={lighterColor} branches={station.branches} lineBranches={lineBranches} />
			<Popover isOpen={isActive} positions={['bottom', 'top']} align='center' content={<div>
				<StationTip stationId={station.code} lineNumber={line?.prefix.real_prefix} mainColor={line?.color} lighterColor={lighterColor} />
			</div>}>
				<div className='route-station-trigger' />
			</Popover>
			{station.transfers.length !== 0 && (<div className='route-station-transfers'>
				<div className='route-station-transfer-line' />
				{station.transfers.map((transfer, index) => (
					<StationTransfer key={index} transfer={transfer.transfer_to} />
				))}
			</div>)}
		</div>
	);
}

const RouteStationMobile = ({ line, station, index, length, lighterColor }) => {

	return (
		<div className='route-station-mobile'>
			<div className='route-line' style={{ background: lighterColor }}>
				<RouteCircleMobile index={index} length={length} sequence={station.sequence} mainColor={line?.color} lighterColor={lighterColor} />
			</div>
			<div className='route-station-info'>
				<Link to={`/station/${station._id}`} className='route-station-name'>{station.name.en}</Link>
				<strong><RiExchange2Line strokeWidth={2} /> Transfers</strong>
				{station.transfers.length !== 0 ? (<div className='route-station-transfers'>
					{station.transfers.map((transfer, index) => (
						<StationTransfer key={index} transfer={transfer.transfer_to} />
					))}
				</div>) : <code>N/A</code>}
			</div>
		</div>
	);
}

export { RouteStation, RouteStationMobile };