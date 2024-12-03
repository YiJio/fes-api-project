// these are functions that should (recommended) be used when there are only a few results to work with!!! not advisable for more than 10 results

// constants
const CACHE_KEY = 'dbData';

export function getLineInfo(id) {
	const lines = JSON.parse(localStorage.getItem(CACHE_KEY)).lines;
	let index = lines.findIndex(l => l._id === id);
	let lineNumber = lines[index]?.prefix.real_prefix;
	let lineName = lines[index]?.name.en;
	let lineColor = lines[index]?.color;
	return { lineNumber, lineName, lineColor };
}

export function getStationInfo(id) {
	const stations = JSON.parse(localStorage.getItem(CACHE_KEY)).stations;
	let index = stations.findIndex(s => s._id === id);
	let lineId = stations[index]?.lines_served[0];
	let { lineNumber, lineName, lineColor } = getLineInfo(lineId);
	
	let stationName = stations[index]?.name.en;
	let stationService = stations[index]?._service_id;
	let stationStatus = stations[index]?.status;
	let stationLine = lineId;
	let stationLineNumber = lineNumber;
	let stationLineName = lineName;
	let stationLineColor = lineColor;

	return { stationName, stationService, stationStatus, stationLine, stationLineNumber, stationLineName, stationLineColor };
}