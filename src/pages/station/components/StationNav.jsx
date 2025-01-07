// packages
import React from 'react';
import { Link } from 'react-router-dom';
// utils
import { getStationInfo } from '../../../utils/get';
import { getContrastingTextColor, getLighterColor } from '../../../utils/color';

const StationNavName = ({ isDest, stationId }) => {
	// variables
	const { stationName } = getStationInfo(stationId);

	return (
		<>
			{isDest ? <span className='c-station-nav__dest'>To <Link to={`/station/${stationId}`}>{stationName}</Link></span> : <em>(towards <Link to={`/station/${stationId}`}>{stationName}</Link>)</em>}
		</>
	);
}

const StationNav = ({ lineColor, preceding, following }) => {
	// variables
	let color = lineColor !== '' ? lineColor : '#c3c3c3';
	let bgColor = getLighterColor(color, 80);
	let borderColor = getLighterColor(color, 40);
	let fontColor = getContrastingTextColor(bgColor);

	return (
		<div className='c-station-nav'>
			<div className='c-station-nav__group'>
				{preceding?.map((p, index) => (
					<div key={index} className='c-station-nav__item' style={{ background: bgColor, borderColor: borderColor, color: fontColor }}>
						<StationNavName isDest={true} stationId={p._station_id} />
						<StationNavName isDest={false} stationId={p._terminus_id} />
						<div className='c-station-nav__distance'>
							<span>Distance</span>
							<span>{p.distance_km} km</span>
						</div>
					</div>
				))}
			</div>
			<div className='c-station-nav__group'>
				{following?.map((p, index) => (
					<div key={index} className='c-station-nav__item' style={{ background: bgColor, borderColor: borderColor, color: fontColor }}>
						<StationNavName isDest={true} stationId={p._station_id} />
						<StationNavName isDest={false} stationId={p._terminus_id} />
						<div className='c-station-nav__distance'>
							<span>Distance</span>
							<span>{p.distance_km} km</span>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}

export default StationNav;