// packages
import React, { useEffect, useState, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import debounce from 'lodash.debounce';
// css
import './search.css';
// hooks
import useDbData from '../../hooks/useDbData';
import useSearchFilter from '../../hooks/useSearchFilter';
// utils
import { sortByStationNameAndLineName } from '../../utils/helper';
// components
import { SearchCard, SearchCardSkeleton } from './components/SearchCard';
//

// constants
const STATUSES = [
	{ name: 'In operation', short: 'io', },
	{ name: 'Under construction', short: 'uc', },
	{ name: 'Planning', short: 'p', },
];
const SHOW_SERVICES = ['gzmtr', 'guangfometro'];

const SearchPage = () => {
	// hooks
	const { lines, stations } = useDbData();
	const { query, setQuery, inclusions, setInclusions, exclusions, setExclusions, filteredStations, isStationDataReady } = useSearchFilter(lines, stations);
	const _location = useLocation();
	// variables
	const _queryParams = new URLSearchParams(_location.search);
	const _initialQuery = _queryParams.get('q') || '';
	// states
	const [ui_isLoading, setUiIsLoading] = useState(false);
	const [ui_query, setUiQuery] = useState(_initialQuery);
	const [ui_filterStatus, setUiFilterStatus] = useState({ inOperation: false, underConstruction: false, planning: false });
	const [ui_filteredStations, setUiFilteredStations] = useState([]);


	const filterStations = () => {
		if (ui_query !== '') {
			let filtered = stations?.filter((station) => {
				const matches = station.name.en.toLowerCase().includes(ui_query.toLowerCase());
				const service = SHOW_SERVICES.includes(station._service_id);
				//const status = (!ui_filterStatus.inOperation || station.status === 'in operation') && (!ui_filterStatus.underConstruction || station.status === 'under construction') && (!ui_filterStatus.planning || station.status === 'planning');
				return matches && service;
			}).sort((a, b) => sortByStationNameAndLineName(a, b, lines));
			setUiFilteredStations(filtered);
		} else { setUiFilteredStations([]); }
	}

	const handleQuery = (e) => {
		setUiIsLoading(true);
		const newQuery = e.target.value;
		//setUiQuery(newQuery);
		setQuery(newQuery);
		setTimeout(() => {
			setUiIsLoading(false);
		}, 200);
	}

	const handleFilters = (isIncluding, key, value) => {
		if (isIncluding) {
			setInclusions((prev) => {
				const current = prev[key] || [];
				if (current.includes(value)) {
					return { ...prev, [key]: current.filter((v) => v !== value) };
				} else {
					return { ...prev, [key]: [...current, value] };
				}
			});
		} else {
			setExclusions((prev) => {
				const current = prev[key] || [];
				if (current.includes(value)) {
					return { ...prev, [key]: current.filter((v) => v !== value) };
				} else {
					return { ...prev, [key]: [...current, value] };
				}
			});
		}
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
		// if coming from search bar
		//setUiQuery(_initialQuery);
		setQuery(_initialQuery);
		document.title = `${_initialQuery} | Guangzhou Metro`;
	}, [_initialQuery]);

	useEffect(() => {
		// must do this after every query update
		filterStations(ui_query);
	}, [ui_query]);

	useEffect(() => {
		// must do this after stations are loaded
		if (query !== '') {
			document.title = `${query} | Guangzhou Metro`;
			//filterStations();
		}
	}, [stations]);

	/*useEffect(() => {
		if(ui_query) debouncedFilter(ui_query);
		else setUiFilteredStations([]);
	}, [ui_query, debouncedFilter]);*/

	if (!lines || !stations) { return <>Loading...</>; }

	return (
		<div className='search'>
			<h2>Search station results for "{query}"</h2>
			<input className='search-input' type='text' value={query} placeholder='Search station' onChange={handleQuery} />
			<div className='search-options'>
				<div className='search-options__group'>
					<span className='search-options__label'>Include</span>
					{STATUSES.map((s) => (
						<button key={s.short} className={inclusions?.status?.includes(s.name.toLowerCase()) ? `status status--${s.short}` : `status__border status__border--${s.short}`} onClick={() => handleFilters(true, 'status', s.name.toLowerCase())}>{s.name}</button>
					))}
				</div>
				<div className='search-options__group'>
					<span className='search-options__label'>Exclude</span>
					{STATUSES.map((s) => (
						<button key={s.short} className={exclusions?.status?.includes(s.name.toLowerCase()) ? `status status--${s.short}` : `status__border status__border--${s.short}`} onClick={() => handleFilters(false, 'status', s.name.toLowerCase())}>{s.name}</button>
					))}
				</div>
			</div>
			{/*<div className='search-filters'>
				<div className='search-filter-group'>
					<div className={'search-filter-option' + ui_filterStatus.inOperation ? ' active' : ''} onClick={() => handleFilters('status', 'inOperation')}>In operation</div>
					<div className={'search-filter-option' + ui_filterStatus.underConstruction ? ' active' : ''} onClick={() => handleFilters('status', 'underConstruction')}>Under construction</div>
					<div className={'search-filter-option' + ui_filterStatus.planning ? ' active' : ''} onClick={() => handleFilters('status', 'planning')}>Planning</div>
				</div>
			</div>*/}
			<div className='search__list'>
				{ui_isLoading ? <>
					<SearchCardSkeleton />
					<SearchCardSkeleton />
					<SearchCardSkeleton />
					<SearchCardSkeleton />
				</> : (<>
					{isStationDataReady && filteredStations?.length > 0 ? (
						filteredStations.map((station) => (
							<SearchCard key={station._id} lines={lines} stationId={station._id} stationCode={station.station_code} stationName={station.name.en} lineId={station.lines_served[0]} stationStatus={station.status} query={query} />
						))
					) : query === '' ? (<p>Type something to search.</p>)
						: (<div>
							<p>No results found. It could be one of the following reasons:</p>
							<ul>
								<li>your search term is too short to return something specific, or</li>
								<li>there is simply no search term, or</li>
								<li>the search term does not match any station name, or</li>
								<li>there are no stations with the selected filters.</li>
							</ul>
						</div>)}
				</>)}
			</div>
		</div>
	);
}

export default SearchPage;