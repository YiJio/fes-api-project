// packages
import React, { forwardRef } from 'react';
import { Link } from 'react-router-dom';
import { RiArrowUpLine, RiArrowDownLine, RiExchange2Line } from 'react-icons/ri';
// css
import './route.css';
// utils
import { getLighterColor } from '../../utils/color';
// components
import { TransferList } from '../transfer';
import { RouteTrackMobile } from './RouteTrack';

const RouteStationMobile = ({ lineData, stationData }) => {
	// variables
	let isNio = stationData?.status !== 'in operation';
	let lineColor = lineData?.color;
	let lighterColor = getLighterColor(lineColor, 20);
	let trackColor = isNio ? `repeating-linear-gradient(0deg, var(--color-main-secondary), var(--color-main-secondary) 6px, rgb(255,255,255) 6px, rgb(255,255,255) 10px)` : lighterColor;
	let borderColor = isNio ? 'var(--color-gray-2)' : lineColor;

	return (
		<div className='c-station c-station--mobile'>
			<div className='c-station__item'>
				<div className='c-station__code' style={{ borderColor: borderColor }}>
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

const RouteRewindMobile = forwardRef(({ isFirst, lineData, stationData, onClick }, ref) => {
	// variables
	let isNio = stationData?.status !== 'in operation';
	let lineColor = lineData?.color;
	let lightestColor = getLighterColor(lineColor, 50);
	let borderColor = isNio ? 'var(--color-gray-2)' : lineColor;

	return (
		<div ref={ref} className={`c-rewind ${isFirst ? 'c-rewind--top' : 'c-rewind--bottom'}`} style={{ borderColor: lightestColor }} onClick={onClick}>
			<div className='c-rewind__arrow' style={{ borderColor: borderColor }}>
				{isFirst ? <RiArrowUpLine fontSize='16px' /> : <RiArrowDownLine fontSize='16px' />}
			</div>
			<div className='c-rewind__info'>
				To {stationData.name.en}
			</div>
			<div className='c-rewind__arrow' style={{ borderColor: borderColor }}>
				{isFirst ? <RiArrowUpLine fontSize='16px' /> : <RiArrowDownLine fontSize='16px' />}
			</div>
		</div>
	);
});

export { RouteStationMobile, RouteRewindMobile };