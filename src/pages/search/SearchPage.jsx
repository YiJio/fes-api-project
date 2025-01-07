// packages
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import debounce from 'lodash.debounce';
// css
import './search.css';
// hooks
import useDbData from '../../hooks/useDbData';
import useSearchFilter from '../../hooks/useSearchFilter';
// components
import Nav from '../../components/Nav';
import { SearchCard, SearchCardSkeleton } from './components/SearchCard';
// data
import { STATUSES, STRUCTURE_TYPES } from '../../data';

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

	const handleQuery = (e) => {
		setUiIsLoading(true);
		const newQuery = e.target.value;
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

	useEffect(() => {
		// if coming from search bar
		setQuery(_initialQuery);
		document.title = `${_initialQuery} | Guangzhou Metro`;
	}, [_initialQuery]);

	useEffect(() => {
		// must do this after stations are loaded
		document.title = `"${query}" | Guangzhou Metro`;
	}, [stations]);

	/*useEffect(() => {
		if(ui_query) debouncedFilter(ui_query);
		else setUiFilteredStations([]);
	}, [ui_query, debouncedFilter]);*/

	if (!lines || !stations) { return <>Loading...</>; }

	return (
		<>
			<Nav currentPage='search' lines={lines} stations={stations} />
			<h2>Search station results for "{query}"</h2>
			<input className='search-input' type='text' value={query} placeholder='Search station' onChange={handleQuery} />
			<div className='c-filters'>
				<div className='c-filters__group'>
					<span className='c-filters__label c-filters__label--include'>Include</span>
					<div className='c-filters__items'>
						<strong className='c-filters__strong'>Status</strong>
						{STATUSES.map((s) => (
							<button key={s.short} className={inclusions?.status?.includes(s.name.toLowerCase()) ? `c-status c-status--${s.short}` : `c-status-border c-status-border--${s.short}`} onClick={() => handleFilters(true, 'status', s.name.toLowerCase())}>{s.name}</button>
						))}
						<strong className='c-filters__strong'>Structure</strong>
						{STRUCTURE_TYPES.map((structure) => (
							<button key={structure} className={`c-filters__button${inclusions?.structure_type?.includes(structure.toLowerCase()) ? ' active--include' : ''}`} onClick={() => handleFilters(true, 'structure_type', structure.toLowerCase())}>{structure}</button>
						))}
					</div>
				</div>
				<div className='c-filters__group'>
					<span className='c-filters__label c-filters__label--exclude'>Exclude</span>
					<div className='c-filters__items'>
						<strong className='c-filters__strong'>Status</strong>
						{STATUSES.map((s) => (
							<button key={s.short} className={exclusions?.status?.includes(s.name.toLowerCase()) ? `c-status c-status--${s.short}` : `c-status-border c-status-border--${s.short}`} onClick={() => handleFilters(false, 'status', s.name.toLowerCase())}>{s.name}</button>
						))}
						<strong className='c-filters__strong'>Structure</strong>
						{STRUCTURE_TYPES.map((structure) => (
							<button key={structure} className={`c-filters__button${exclusions?.structure_type?.includes(structure.toLowerCase()) ? ' active--exclude' : ''}`} onClick={() => handleFilters(false, 'structure_type', structure.toLowerCase())}>{structure}</button>
						))}
					</div>
				</div>
			</div>
			{filteredStations?.length > 0 && <p><b>{filteredStations?.length}</b> results found</p>}
			<div className='l-grid l-grid--search'>
				{ui_isLoading ? <>
					<SearchCardSkeleton />
					<SearchCardSkeleton />
					<SearchCardSkeleton />
					<SearchCardSkeleton />
				</> : (<>
					{isStationDataReady && filteredStations?.length > 0 ? (
						filteredStations.map((station) => (
							<SearchCard key={station._id} lines={lines} stationData={station} lineId={station.lines_served[0]} query={query} />
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
		</>
	);
}

export default SearchPage;