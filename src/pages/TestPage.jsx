// packages
import React from 'react';
import Skeleton from 'react-loading-skeleton';
import useDbData from '../hooks/useDbData';
import useSearchFilter from '../hooks/useSearchFilter';

const TestPage = () => {
	const { lines, stations } = useDbData();
	const { query, setQuery, filteredStations, isStationDataReady } = useSearchFilter(lines, stations, 2, { initialExclusions: { station: ['xilang', 'guangzhoudongzhan'] } });

	const getHighlightedText = (text, highlight) => {
		const regex = new RegExp(`(${highlight})`, 'gi');
		return text.split(regex).map((part, index) => part.toLowerCase() === highlight.toLowerCase() ? (<span key={index} style={{ background:'yellow' }}>{part}</span>) : (part));
	}

	return (
		<div>
			<span>Current station: Xilang and Guangzhou East</span>
			<input type='text' style={{ border:'1px solid black' }} value={query} onChange={(e) => setQuery(e.target.value)} />
			<ul>
				{filteredStations.map((station, index) => (
					<li key={index}>{getHighlightedText(station.name.en, query)}</li>
				))}
			</ul>
		</div>
	)
}

export default TestPage;