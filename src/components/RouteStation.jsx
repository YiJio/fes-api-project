// packages
import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { Popover } from 'react-tiny-popover';
import { RiExchange2Line } from 'react-icons/ri';
// utils
import { getStationInfo } from '../utils/get';
// components
import StationTransfer from './StationTransfer';
import StationTip from './StationTip';
import { RouteCircle, RouteCircleMobile } from './RouteCircle';

const RouteStation = ({ line, station, index, activeCircle, setActiveCircle, length, lighterColor }) => {
	// states
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
		<div className={'route-station' + (activeCircle === index ? ' active' : '')}>
			<div className='route-station-name' style={{ color: activeCircle === index ? line?.color : 'var(--color-black)' }} onClick={() => setActiveCircle(index)}>{station.name.en}</div>
			<RouteCircle index={index} length={length} isActive={activeCircle === index} setActiveCircle={setActiveCircle} sequence={station.sequence} mainColor={line?.color} lighterColor={lighterColor} />
			<Popover isOpen={activeCircle === index} positions={['bottom', 'top']} align='center' content={<div>
				<StationTip stationId={station.code} lighterColor={lighterColor} />
			</div>}>
				<div className='route-station-trigger' />
			</Popover>
			{station.transfers.length !== 0 && (<div className='route-station-transfers'>
				{station.transfers.filter((transfer) => getStationInfo(transfer?.transfer_to._id, 'id')).map((transfer, index) => (
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
			<div>
				<Link to={`/station/${station._id}`} className='route-station-name'>{station.name.en}</Link>
				<strong><RiExchange2Line strokeWidth={2} /> Transfers</strong>
				{station.transfers.length !== 0 ? (<div className='route-station-transfers'>
					{station.transfers.filter((transfer) => getStationInfo(transfer?.transfer_to._id, 'id')).map((transfer, index) => (
						<StationTransfer key={index} transfer={transfer.transfer_to} />
					))}
				</div>) : <code>N/A</code>}
			</div>
		</div>
	);
}

export { RouteStation, RouteStationMobile };