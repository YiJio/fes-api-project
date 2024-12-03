// packages
import { useState, useMemo, useEffect } from 'react';
// utils
import { sortByStationNameAndLineName } from '../utils/helper';

const useSearchFilter = (lines, stations, sort = 1, options = {}) => {
	// constants
	const SHOW_SERVICES = ['gzmtr', 'guangfometro'];
	// states
	const [query, setQuery] = useState('');
	const [inclusions, setInclusions] = useState(options.initialInclusions || {});
	const [exclusions, setExclusions] = useState(options.initialExclusions || {});
	const [isLineDataReady, setIsLineDataReady] = useState(false);
	const [isStationDataReady, setIsStationDataReady] = useState(false);

	const filteredLines = useMemo(() => {
		//if(!isLineDataReady) { return []; }
		if (lines) {
			let results = lines;
			results = results.filter((line) => SHOW_SERVICES.includes(line._service_id)).sort((a, b) => a.name.en.localeCompare(b.name.en, 'en', { numeric: true }));
			return results;
		}
	}, [lines]);

	const filteredStations = useMemo(() => {
		if (!stations) { return []; }
		// otherwise can proceed with empty or not
		if (!query && !Object.keys(inclusions).length && !Object.keys(exclusions).length) { return []; }
		// this is necessary if want to have no data displayed when no query,
		// because when a filter is selected, this can instead display results
		if (query === '' && sort !== 2) { return []; }
		let results = stations;
		// filter results with the main query
		// match with station name and only show stations from services shown
		results = results.filter((station) => station.name.en.toLowerCase().includes(query.toLowerCase()) && SHOW_SERVICES.includes(station._service_id));
		if (sort === 1) {
			// sort by station name and line number
			results = results.sort((a, b) => sortByStationNameAndLineName(a, b, lines));
		} else if (sort === 2) {
			// sort by just name and no duplicates
			results = results.filter((station, index) => results.findIndex((s) => s.station == station.station) === index).sort((a, b) => a.name.en.localeCompare(b.name.en));
		}
		// apply inclusions
		Object.keys(inclusions).forEach((key) => {
			// may have multiple selections for the key
			if (inclusions[key]?.length > 0) { results = results.filter((item) => inclusions[key].includes(item[key])); }
		});
		// apply exclusions
		Object.keys(exclusions).forEach((key) => {
			// may have multiple selections for the key
			if (exclusions[key]?.length > 0) { results = results.filter((item) => !exclusions[key].includes(item[key])); }
		});
		return results;
	}, [query, inclusions, exclusions, lines, stations]);

	// may just get rid of this, doesn't seem to be working all the time
	useEffect(() => {
		if (lines && lines.length > 0) { setIsLineDataReady(true); }
		if (stations && stations.length > 0) { setIsStationDataReady(true); }
	}, [lines, stations]);

	return { query, setQuery, inclusions, setInclusions, exclusions, setExclusions, filteredLines, filteredStations, isLineDataReady, isStationDataReady };
}

export default useSearchFilter;