// packages
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';
import { RiGitMergeFill } from 'react-icons/ri';
// utils
import { getFromIndex } from '../../../utils/helper';
import { getContrastingTextColor } from '../../../utils/color';
// components
import { IconElevated, IconSurface, IconUnderground } from '../../../components/icons/SvgStructure';
import IconService from '../../../components/IconService';
import { StationCode } from '../../../components/station';
import Tooltip from '../../../components/tooltip/Tooltip';

const SearchCardSkeleton = () => {
	return (
		// mostly make sense if the page is not autocomplete but rendering results upon submit
		<Skeleton className='c-search-card' style={{ border: 'none' }} count={1} width='200px' height='120px' />
	);
}

const SearchCard = ({ lines, stationData, lineId, query }) => {
	// hooks
	const navigate = useNavigate();
	// variables
	let lineData = getFromIndex(lines, '_id', lineId);
	let lineName = lineData?.name?.en || 'Line';
	let style = stationData?.status !== 'in operation' ? 'dashed' : 'solid';
	let color = lineData?.color || '#c3c3c3';
	if (color === '') { color = '#c3c3c3'; }

	const getHighlightedText = (text, highlight) => {
		const regex = new RegExp(`(${highlight})`, 'gi');
		return text.split(regex).map((part, index) => part.toLowerCase() === highlight.toLowerCase() ? (<span key={index} style={{ background: 'var(--color-yellow)' }}>{part}</span>) : (part));
	}

	return (
		<div className='c-search-card' style={{ borderStyle: style, borderColor: color }}>
			<div className='c-search-card__heading'>
				<div className='c-search-card__name'>{getHighlightedText(stationData?.name.en, query)}</div>
				<div className='l-list'>
					<IconService service={stationData?._service_id} size='16px' position='top' />
					<StationCode code={stationData?.station_code} color={color} status={stationData?.status} />
				</div>
			</div>
			<div className='c-search-card__actions'>
				<Link to={`/line/${lineId}`} className='c-search-card__line' style={{ color: color }}>
					<Tooltip text={stationData?.structure_type === 'elevated' ? 'Elevated' : stationData?.structure_type === 'surface' ? 'Surface' : 'Underground'}>{stationData?.structure_type === 'elevated' ? <IconElevated height='14px' strokeColor={color} /> : stationData?.structure_type === 'surface' ? <IconSurface height='14px' strokeColor={color} /> : <IconUnderground height='14px' strokeColor={color} />}</Tooltip>
					<RiGitMergeFill /> Routes on {lineName}
				</Link>
				<button className='c-search-card__button' style={{ background: color, color: getContrastingTextColor(color) }} onClick={() => navigate(`/station/${stationData?._id}`)}>More information</button>
			</div>
		</div>
	);
}

export { SearchCard, SearchCardSkeleton };