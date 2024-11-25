// packages
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { RiGitMergeFill } from 'react-icons/ri';
// utils
import { getLineInfo } from '../utils/get';
import { getContrastingTextColor } from '../utils/color';
// components
import StationCode from './StationCode';

const SearchCard = ({ code, stationCode, name, line, status }) => {
	// hooks
	const navigate = useNavigate();
	// variables
	let style = status === 'under construction' ? 'dashed' : 'solid';
	let color = getLineInfo(line, 'color');
	if (color === '') { color = '#d3d3d3'; }
	let lineName = getLineInfo(line, 'name');

	return (
		<div key={code} className='search-card' style={{ borderStyle: style, borderColor: color }}>
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

export default SearchCard;