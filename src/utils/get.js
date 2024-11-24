const CACHE_KEY = 'dbData';

export function getLineInfo(line, what) {
	const lines = JSON.parse(localStorage.getItem(CACHE_KEY)).lines;
	//let lines = JSON.parse(localStorage.getItem('lines'));
	let index = lines.findIndex(l => l._id === line);
	switch(what) {
		case 'number': return lines[index]?.prefix.real_prefix;
		case 'name': return lines[index]?.name.en;
		case 'color': return lines[index]?.color;
	}
	return null;
}

export function getStationInfo(station, what) {
	const stations = JSON.parse(localStorage.getItem(CACHE_KEY)).stations;
	//let stations = JSON.parse(localStorage.getItem('stations'));
	let index = stations.findIndex(s => s._id === station);
	let lineId = stations[index]?.lines_served[0];
	switch(what) {
		case 'name': return stations[index]?.name.en;
		case 'line': return lineId;
		case 'lineNumber': return getLineInfo(lineId, 'number');
		case 'color': return getLineInfo(lineId, 'color');
	}
	return null;
}