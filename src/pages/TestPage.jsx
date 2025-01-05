// packages
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';
import RouteLoop from '../components/route/RouteLoop';
import useDbData from '../hooks/useDbData';
import useSearchFilter from '../hooks/useSearchFilter';
import { getLighterColor } from '../utils/color';
import { fetchLineStations } from '../utils/fetch';

const TestPage = () => {
	const lineId = 'gz-ml-11';
	const { lines, stations } = useDbData();
	const navigate = useNavigate();
	// states
	const [db_line, setDbLine] = useState({});
	const [db_lineStations, setDbLineStations] = useState(null);
	const [ui_isMobile, setUiIsMobile] = useState(true);
	const [ui_isLoading, setUiIsLoading] = useState(true);
	const [ui_lighterColor, setUiLighterColor] = useState('');
	/*const { query, setQuery, filteredStations, isStationDataReady } = useSearchFilter(lines, stations, 2, { initialExclusions: { station: ['xilang', 'guangzhoudongzhan'] } });

	const getHighlightedText = (text, highlight) => {
		const regex = new RegExp(`(${highlight})`, 'gi');
		return text.split(regex).map((part, index) => part.toLowerCase() === highlight.toLowerCase() ? (<span key={index} style={{ background:'yellow' }}>{part}</span>) : (part));
	}*/

	useEffect(() => {
		const fetch = async (index) => {
			let lineStations = await fetchLineStations(lineId);
			setDbLineStations(lineStations);
			setUiLighterColor(getLighterColor(lines[index]?.color, 20));
			setTimeout(() => {
				setUiIsLoading(false);
			}, 1000);
		}
		if (lines) {
			setDbLine(null);
			setDbLineStations(null);
			setUiIsLoading(true);
			setUiLighterColor('');
			let index = lines.findIndex(l => l._id == lineId);
			setDbLine(lines[index]);
			document.title = `${lines[index].full_name.en} | Guangzhou Metro`;
			fetch(index);
		}
	}, [lines]);

	return (
		<div>
			{/*<span>Current station: Xilang and Guangzhou East</span>
			<input type='text' style={{ border:'1px solid black' }} value={query} onChange={(e) => setQuery(e.target.value)} />
			<ul>
				{filteredStations.map((station, index) => (
					<li key={index}>{getHighlightedText(station.name.en, query)}</li>
				))}
				</ul>*/}
				{console.log(db_lineStations)}
				<RouteLoop lineData={db_line} lineStations={db_lineStations} numOfStations={db_lineStations?.stations.length - 1} />
		</div>
	);
}

export default TestPage;