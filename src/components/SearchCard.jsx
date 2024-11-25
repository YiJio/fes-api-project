// packages
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';
import { RiGitMergeFill } from 'react-icons/ri';
// utils
import { getLineInfo } from '../utils/get';
import { getContrastingTextColor } from '../utils/color';
// components
import StationCode from './StationCode';

const SearchCardSkeleton = () => {
	return (
		// mostly make sense if the page is not autocomplete but rendering results upon submit
		<Skeleton className='search-card' count={1} height='120px' />
	);
}

const SearchCard = ({ code, stationCode, name, line, status }) => {
	// hooks
	const navigate = useNavigate();
	// variables
	let style = status === 'under construction' ? 'dashed' : 'solid';
	let color = getLineInfo(line, 'color');
	if (color === '') { color = '#d3d3d3'; }
	let lineName = getLineInfo(line, 'name');

	return (
		<div className='search-card' style={{ borderStyle: style, borderColor: color }}>
			<div className='search-card-heading'>
				<div className='search-card-name'>{name}</div>
				<StationCode code={stationCode} line={line} status={status} />
			</div>
			<div className='search-card-actions'>
				<Link to={`/line/${line}`} className='search-card-line' style={{ color: color }}>
					<RiGitMergeFill /> Routes on {lineName}
				</Link>
				<button className='search-card-button' style={{ background: color, color: getContrastingTextColor(color) }} onClick={() => navigate(`/station/${code}`)}>More information</button>
			</div>
		</div>
	);
}

export { SearchCard, SearchCardSkeleton };