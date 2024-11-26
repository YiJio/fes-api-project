// these are functions that should (recommended) be used when there are only a few results to work with!!! not advisable for more than 10 results

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
	let { lineNumber, lineColor } = getLineInfo(lineId);
	
	let stationId = stations[index]?._id;
	let stationName = stations[index]?.name.en;
	let stationLine = lineId;
	let stationLineNumber = lineNumber;
	let stationLineColor = lineColor;

	return { stationId, stationName, stationLine, stationLineNumber, stationLineColor };
}