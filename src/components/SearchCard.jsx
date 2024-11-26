// packages
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';
import { RiGitMergeFill } from 'react-icons/ri';
// utils
import { getContrastingTextColor } from '../utils/color';
// components
import StationCode from './StationCode';

const SearchCardSkeleton = () => {
	return (
		// mostly make sense if the page is not autocomplete but rendering results upon submit
		<Skeleton className='search-card' style={{ border: 'none' }} count={1} width='200px' height='120px' />
	);
}

const SearchCard = ({ lines, code, stationCode, name, line, status }) => {
	// hooks
	const navigate = useNavigate();
	// variables
	let index = lines.findIndex(l => l._id === line);
	let lineName = lines[index]?.name?.en || 'Line';
	let style = status === 'under construction' ? 'dashed' : 'solid';
	let color = lines[index]?.color || '#d3d3d3';
	if (color === '') { color = '#d3d3d3'; }

	return (
		<div className='search-card' style={{ borderStyle: style, borderColor: color }}>
			<div className='search-card-heading'>
				<div className='search-card-name'>{name}</div>
				<StationCode code={stationCode} color={color} status={status} />
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