// packages
import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { RiGitMergeFill } from 'react-icons/ri';
// hooks
import useDbData from '../hooks/useDbData';
// utils
import { getLineInfo } from '../utils/get';
import { getContrastingTextColor } from '../utils/color';
//

const SearchPage = () => {
	// hooks
	const { lines, stations } = useDbData();
	const _location = useLocation();
	const navigate = useNavigate();
	// variables
	const _queryParams = new URLSearchParams(_location.search);
	const _initialQuery = _queryParams.get('q') || '';
	// states
	const [ui_query, setUiQuery] = useState(_initialQuery);
	const [ui_stations, setUiStations] = useState([]);

	const handleQuery = (e) => {
		const newQuery = e.target.value;
		setUiQuery(newQuery);
		navigate(`/search?q=${encodeURIComponent(newQuery)}`, { replace: true });
		if (newQuery) {
			setUiStations(stations.filter((station) => station.name.en.toLowerCase().includes(newQuery.toLowerCase()) && (station._service_id === 'gzmtr' || station._service_id === 'guangfometro')));
		} else {
			setUiStations([]);
		}
	}

	useEffect(() => {
		if (ui_query !== '') {
			setUiStations(stations?.filter((station) => station.name.en.toLowerCase().includes(ui_query.toLowerCase()) && (station._service_id === 'gzmtr' || station._service_id === 'guangfometro')));
		}
	}, [stations]);

	if(!lines || !stations) { return <>Loading...</>; }

	return (
		<>
			<h2>Search results for "{ui_query}"</h2>
			<input className='search-input' type='text' value={ui_query} placeholder='Search station' onChange={handleQuery} />
			<div className='search-list'>
				{ui_stations?.length > 0 ? (
					ui_stations.map((station) => (
						<div key={station._id} className='search-card' style={{ borderStyle: station.status === 'under construction' ? 'dashed' : 'solid', borderColor: getLineInfo(station.lines_served[0], 'color') }}>
							<div className='search-card-heading'>
								<div className='search-card-name'>{station.name.en}</div>
								<div className='station-code'>
									<span style={{ borderColor: getLineInfo(station.lines_served[0], 'color') }}>{station.station_code.split('|')[0]}</span>
									<span style={{ borderColor: getLineInfo(station.lines_served[0], 'color') }}>{station.station_code.split('|')[1]}</span>
								</div>
							</div>
							<div className='search-card-actions'>
								<Link to={`/line/${station.lines_served[0]}`} className='search-card-line' style={{ color: getLineInfo(station.lines_served[0], 'color') }}><RiGitMergeFill /> Routes on {getLineInfo(station.lines_served[0], 'name')}</Link>
								<button className='search-card-button' style={{ background: getLineInfo(station.lines_served[0], 'color'), color: getContrastingTextColor(getLineInfo(station.lines_served[0], 'color')) }} onClick={() => navigate(`/station/${station.code}`)}>More information</button>
							</div>
						</div>
					))
				) : ui_query === '' ? (<p>Type something to search.</p>)
					: (<p>No results found.</p>)}
			</div>
		</>
	);
}

export default SearchPage;