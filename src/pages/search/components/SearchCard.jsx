// packages
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';
import { RiGitMergeFill } from 'react-icons/ri';
// utils
import { getContrastingTextColor } from '../../../utils/color';
// components
import StationCode from '../../../components/StationCode';

const SearchCardSkeleton = () => {
	return (
		// mostly make sense if the page is not autocomplete but rendering results upon submit
		<Skeleton className='search-card' style={{ border: 'none' }} count={1} width='200px' height='120px' />
	);
}

const SearchCard = ({ lines, stationId, stationCode, stationName, lineId, stationStatus, query }) => {
	// hooks
	const navigate = useNavigate();
	// variables
	let index = lines.findIndex(l => l._id === lineId);
	let lineName = lines[index]?.name?.en || 'Line';
	let style = stationStatus !== 'in operation' ? 'dashed' : 'solid';
	let color = lines[index]?.color || '#c3c3c3';
	if (color === '') { color = '#c3c3c3'; }

	const getHighlightedText = (text, highlight) => {
		const regex = new RegExp(`(${highlight})`, 'gi');
		return text.split(regex).map((part, index) => part.toLowerCase() === highlight.toLowerCase() ? (<span key={index} style={{ background:'var(--color-yellow)' }}>{part}</span>) : (part));
	}

	return (
		<div className='search-card' style={{ borderStyle: style, borderColor: color }}>
			<div className='search-card__heading'>
				<div className='search-card__name'>{getHighlightedText(stationName, query)}</div>
				<StationCode code={stationCode} color={color} status={stationStatus} />
			</div>
			<div className='search-card__actions'>
				<Link to={`/line/${lineId}`} className='search-card__line' style={{ color: color }}>
					<RiGitMergeFill /> Routes on {lineName}
				</Link>
				<button className='search-card__button' style={{ background: color, color: getContrastingTextColor(color) }} onClick={() => navigate(`/station/${stationId}`)}>More information</button>
			</div>
		</div>
	);
}

export { SearchCard, SearchCardSkeleton };