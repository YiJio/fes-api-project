// packages
import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import debounce from 'lodash.debounce';
// hooks
import useDbData from '../hooks/useDbData';
// components
import SearchCard from '../components/SearchCard';
import { useMemo } from 'react';
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
	const [ui_filterStatus, setUiFilterStatus] = useState({ inOperation: false, underConstruction: false, planning: false });
	const [ui_filteredStations, setUiFilteredStations] = useState([]);

	const handleQuery = (e) => {
		const newQuery = e.target.value;
		setUiQuery(newQuery);
		if (newQuery && newQuery.length > 3) {
			const filtered = stations?.filter((station) => {
				const matches = station.name.en.toLowerCase().includes(newQuery.toLowerCase());
				const service = station._service_id === 'gzmtr' || station._service_id === 'guangfometro';
				//const status = (!ui_filterStatus.inOperation || station.status === 'in operation') && (!ui_filterStatus.underConstruction || station.status === 'under construction') && (!ui_filterStatus.planning || station.status === 'planning');
				return matches && service;
			});
			setUiFilteredStations(filtered);
		} else { setUiFilteredStations([]); }
		/*navigate(`/search?q=${encodeURIComponent(newQuery)}`, { replace: true });
		if (newQuery) {
			setUiFilteredStations(stations.filter((station) => station.name.en.toLowerCase().includes(newQuery.toLowerCase()) && (station._service_id === 'gzmtr' || station._service_id === 'guangfometro')));
		} else {
			setUiFilteredStations([]);
		}*/
	}

	/*const handleFilters = (field, value) => {
		//let temp = ui_filterStatus;
		//temp[field] = value;
		if(field === 'status')
			setUiFilterStatus((prev) => ({ ...prev, [value]: !prev[value] }));
	}

	const handleSearch = (search) => {
		const filtered = stations?.filter((station) => {
			const matches = search && station.name.en.toLowerCase().includes(search.toLowerCase());
			const service = station._service_id === 'gzmtr' || station._service_id === 'guangfometro';
			const status = (!ui_filterStatus.inOperation || station.status === 'in operation') && (!ui_filterStatus.underConstruction || station.status === 'under construction') && (!ui_filterStatus.planning || station.status === 'planning');
			return matches && service && status;
		});
		setUiFilteredStations(filtered);
	}*/

	/*const debouncedFilter = useMemo(() =>
		debounce((value) => handleSearch(value), 300), [stations, ui_filterStatus]
	);*/

	useEffect(() => {
		if (ui_query !== '' && ui_query.length > 3) {
			//setUiFilteredStations(stations?.filter((station) => station.name.en.toLowerCase().includes(ui_query.toLowerCase()) && (station._service_id === 'gzmtr' || station._service_id === 'guangfometro')));
			const filtered = stations?.filter((station) => {
				const matches = station.name.en.toLowerCase().includes(ui_query.toLowerCase());
				const service = station._service_id === 'gzmtr' || station._service_id === 'guangfometro';
				//const status = (!ui_filterStatus.inOperation || station.status === 'in operation') && (!ui_filterStatus.underConstruction || station.status === 'under construction') && (!ui_filterStatus.planning || station.status === 'planning');
				return matches && service;
			});
			setUiFilteredStations(filtered);
		}
	}, [stations]);

	/*useEffect(() => {
		if(ui_query) debouncedFilter(ui_query);
		else setUiFilteredStations([]);
	}, [ui_query, debouncedFilter]);*/


	if (!lines || !stations) { return <>Loading...</>; }

	return (
		<>
			<h2>Search station results for "{ui_query}"</h2>
			<input className='search-input' type='text' value={ui_query} placeholder='Search station' onChange={handleQuery} />
			{/*<div className='search-filters'>
				<div className='search-filter-group'>
					<div className={'search-filter-option' + ui_filterStatus.inOperation ? ' active' : ''} onClick={() => handleFilters('status', 'inOperation')}>In operation</div>
					<div className={'search-filter-option' + ui_filterStatus.underConstruction ? ' active' : ''} onClick={() => handleFilters('status', 'underConstruction')}>Under construction</div>
					<div className={'search-filter-option' + ui_filterStatus.planning ? ' active' : ''} onClick={() => handleFilters('status', 'planning')}>Planning</div>
				</div>
			</div>*/}
			<div className='search-list'>
				{ui_filteredStations?.length > 0 ? (
					ui_filteredStations.map((station) => (
						<SearchCard key={station._id} code={station._id} stationCode={station.station_code} name={station.name.en} line={station.lines_served[0]} status={station.status} />
					))
				) : ui_query === '' ? (<p>Type something to search.</p>)
					: (<div>
						<p>No results found. It could be one of the following reasons:</p>
						<ul>
							<li>either your search term is too short to return something specific, or</li>
							<li>there is simply no search term, or</li>
							<li>the search term does not match any station name.</li>
						</ul>
					</div>)}
			</div>
		</>
	);
}

export default SearchPage;