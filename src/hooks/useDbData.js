// packages
import { useState, useEffect } from 'react';
// utils
import { fetchLine, fetchLines, fetchStations } from '../utils/fetch';

function useDbData() {
	// constants
	const CACHE_KEY = 'dbData';
	const CACHE_EXPIRY = 24 * 60 * 60 * 1000;
	// states
	const [lines, setLines] = useState(null);
	const [stations, setStations] = useState(null);

	const isCacheValid = (timestamp) => {
		return Date.now() - timestamp < CACHE_EXPIRY;
	}

	const fetchData = async() => {
		try {
			const [linesData, stationsData] = await Promise.all([
				fetchLines(),
				fetchStations(),
			]);
			const cachedData = {
				lines: linesData,
				stations: stationsData.filter((station) => station._service_id === 'gzmtr' || station._service_id === 'guangfometro'),
				timestamp: Date.now(),
			}
			localStorage.setItem(CACHE_KEY, JSON.stringify(cachedData));
			setLines(linesData);
			setStations(stationsData);
		} catch(error) {
			console.error('Error fetching data: ', error);
		}
	}

	useEffect(() => {
		const cachedData = JSON.parse(localStorage.getItem(CACHE_KEY));
		if(cachedData && isCacheValid(cachedData.timestamp)) {
			setLines(cachedData.lines);
			setStations(cachedData.stations);
		} else {
			fetchData();
		}
	}, []);
	
	return { lines, stations };

}

export default useDbData;