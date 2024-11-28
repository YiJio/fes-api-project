export function convertDMSToDD(degrees, minutes, seconds, direction) {
	var dd = degrees + minutes / 60 + seconds / (60 * 60);
	if (direction == "S" || direction == "W") {
		dd = dd * -1;
	}
	return dd;
}

export function convertDDToDMS(D, lng) {
	return {
		dir: D < 0 ? (lng ? "W" : "S") : lng ? "E" : "N",
		deg: 0 | (D < 0 ? (D = -D) : D),
		min: 0 | (((D += 1e-9) % 1) * 60),
		sec: (0 | (((D * 60) % 1) * 6000)) / 100,
	};
}

export function sortByStationNameAndLineName(a, b, lines) {
	if (a.name.en < b.name.en) return -1;
	if (a.name.en > b.name.en) return 1;
	let indexA = lines.findIndex((l) => l._id == a.lines_served[0]);
	let indexB = lines.findIndex((l) => l._id == b.lines_served[0]);
	return lines[indexA]?.name.en.localeCompare(lines[indexB]?.name.en, 'en', { numeric: true });
}

export function sortByServiceIdAndLineName(a, b, lines) {
	// for transfers only
	if (a._service_id < b._service_id) return -1;
	if (a._service_id > b._service_id) return 1;
	let indexA = lines.findIndex((l) => l.prefix.db_prefix == a._id.split('.')[1]);
	let indexB = lines.findIndex((l) => l.prefix.db_prefix == b._id.split('.')[1]);
	return lines[indexA]?.name.en.localeCompare(lines[indexB]?.name.en, 'en', { numeric: true });
}

export function getRouteLengths(activeRoute, lineStations) {
	let length = lineStations?.stations?.length - 1;
	if (activeRoute !== 'primary') {
		let branches = lineStations?.branches;
		const index = branches.findIndex((branch) => branch.code === activeRoute);
		length = branches[index]?.stations?.length - 1;
	}
	return length;
}

export function isServiceAccessible(line, service) {
	const test = line ? true : false;
	switch (service) {
		case 'cr': return false;
		case 'prdir': return false;
		case 'gztram': return false;
		case 'gzmtr': return test;
		case 'guangfometro': return test;
		case 'fmetro': return test;
	}
}

export function getTransferBackground(lineColor, transfer) {
	switch (transfer?._service_id) {
		case 'cr': return '#e60012';
		case 'prdir': return '#009543';
		case 'gztram': return '#e60012';
		default: return lineColor;
	}
}

export function getStatusCssName(status) {
	let temp = status.split(' ');
	let name = 'status-';
	temp.forEach((word) => name += word[0]);
	return name;
}

export function getDate(dateString) {
	let date = new Date(dateString);
	let month = date.getMonth();
	let day = date.getDate();
	let year = date.getFullYear();
	return { month, day, year };
}