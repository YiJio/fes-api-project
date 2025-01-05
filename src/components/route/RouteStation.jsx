// packages
import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Popover } from 'react-tiny-popover';
import { RiExchange2Line } from 'react-icons/ri';
// css
import './route.css';
// utils
import { getContrastingTextColor, getLighterColor } from '../../utils/color';
// components
import { StationTip } from '../station';
import { TransferList, TransferStick } from '../transfer';
import { RouteTrack, RouteTrackMobile } from './RouteTrack';

const RouteStation = ({ lineData, stationData, numOfStations, lineBranches, stationIndex, isSide = false, route, activeRoute, setActiveRoute, activeCircle, setActiveCircle, isPopoverOpen, setIsPopoverOpen }) => {
	// variables
	let isActive = activeCircle === stationIndex && activeRoute === route;
	let firstLast = stationIndex === numOfStations ? 'last' : stationIndex === 0 ? 'first' : '';
	// branches should have track before it regardless of first or last
	if (activeRoute !== 'primary' && stationIndex === 0) { firstLast = 'first-branch'; }
	// only 1 station in branch -> make it last and not first
	if (activeRoute !== 'primary' && stationIndex === numOfStations) { firstLast = 'last'; }
	let isNio = stationData?.status !== 'in operation';
	// variables: color
	let lineColor = lineData?.color;
	let lighterColor = getLighterColor(lineColor, 20);
	let bgColor = isActive ? lineColor : 'var(--color-white)';
	let borderColor = isActive ? '2px solid var(--color-white)' : `4px solid ${lighterColor}`;
	let trackColor = lighterColor;
	let outlineColor = isActive ? `4px solid ${lineColor}` : 'none';
	let fontColor = isActive ? getContrastingTextColor(lineColor) : 'var(--color-black)';
	if (isNio) {
		bgColor = isActive ? 'var(--color-gray-3)' : 'var(--color-white)';
		borderColor = isActive ? '2px solid var(--color-white)' : '4px solid var(--color-gray-2)';
		trackColor = `repeating-linear-gradient(90deg, ${lighterColor}, ${lighterColor} 4px, rgb(255,255,255) 4px, rgb(255,255,255) 6px)`;
		outlineColor = isActive ? `4px solid var(--color-gray-3)` : 'none';
		fontColor = 'var(--color-black)';
	}
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
		return () => { document.removeEventListener('mousedown', handleClickOutside); };
	}, []);

	const handlePopover = () => {
		// if clicking on some other circle that is not currently active,
		// set that popover to be true to show
		// otherwise toggle on and off on currently active
		if (activeCircle !== stationIndex && activeRoute === route) { setIsPopoverOpen(true); }
		else { setIsPopoverOpen(!isPopoverOpen); }
		setActiveCircle(stationIndex);
	}

	return (
		<div className={'c-station' + (isActive ? ' active' : '')}>
			<div className='c-station__name' style={{ color: isActive ? lineData?.color : 'var(--color-black)' }} onClick={handlePopover}>
				{stationData.name.en}
			</div>
			<Popover isOpen={isPopoverOpen && isActive} positions={['bottom', 'top', 'right', 'left']} reposition={true} align='center' content={<div ref={popoverRef} className='popover-content'>
				<StationTip stationId={stationData?._id} lineNumber={lineData?.prefix.real_prefix} lineColor={lineData?.color} />
			</div>}>
				<div className='c-station__item' onClick={handlePopover}>
					<div className='c-station__code' style={{ background: bgColor, color: fontColor, outline: outlineColor, border: borderColor }}>
						<span>{stationData?.sequence}</span>
					</div>
					<RouteTrack firstLast={firstLast} status={stationData?.status} trackColor={trackColor} isSide={isSide} />
					{stationData?.branches?.length > 0 && <div className='c-fork' style={{ borderColor: lighterColor }}>
						{stationData?.branches.map((branch, i) => (<div key={i} className='c-fork__row'>
							<div className='c-fork__branch' style={{ borderColor: lighterColor }} onClick={() => setActiveRoute(branch)}>
								{lineBranches[lineBranches.findIndex(lb => lb.code === branch)].name.en}
							</div>
						</div>))}
					</div>}
				</div>
			</Popover>
			{stationData?.transfers.length !== 0 && <TransferStick transfers={stationData?.transfers} sourceService={lineData?._service_id} />}
		</div>
	);
}

const RouteStationMobile = ({ lineData, stationData }) => {
	// variables
	let isNio = stationData?.status !== 'in operation';
	let lineColor = lineData?.color;
	let lighterColor = getLighterColor(lineColor, 20);
	let trackColor = isNio ? `repeating-linear-gradient(0deg, var(--color-main-secondary), var(--color-main-secondary) 6px, rgb(255,255,255) 6px, rgb(255,255,255) 10px)` : lighterColor;

	return (
		<div className='c-station c-station--mobile'>
			<div className='c-station__item'>
				<div className='c-station__code' style={{ borderColor: lineColor }}>
					<span>{stationData?.sequence}</span>
				</div>
				<RouteTrackMobile status={stationData?.status} trackColor={trackColor} />
			</div>
			<div className='c-station__info'>
				<Link to={`/station/${stationData._id}`} className='c-station__name'>{stationData.name.en}</Link>
				<strong><RiExchange2Line strokeWidth={2} /> Transfers</strong>
				{stationData.transfers.length !== 0 ? <TransferList transfers={stationData?.transfers} sourceService={lineData?._service_id} /> : <code>N/A</code>}
			</div>
		</div>
	);
}

export { RouteStation, RouteStationMobile };