export function getFromIndex(array, fieldCheck, value, returnField = null) {
	const index = array.findIndex((a) => a[fieldCheck] == value);
	if (returnField) return array[index][returnField];
	return array[index];
}

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

export function getStationsSplit(stations) {
	let numStations = stations.length;
	let counts = { top: 0, right: 0, bottom: 0, left: 0 };
	let maxMidpoint = 15;
	let midpoint = numStations % 2 === 0 ? Math.floor(numStations / 2) - 1 : Math.floor(numStations / 2);
	midpoint = midpoint > maxMidpoint ? maxMidpoint : midpoint;
	if (numStations === 1) {
		throw new Error('Number of stations cannot be 1!');
	} else if (numStations === 2) {
		counts = { top: 2, right: 0, bottom: 0, left: 0 };
	} else if (numStations === 3) {
		counts = { top: 1, right: 1, bottom: 1, left: 0 };
	} else {
		let topBottom = midpoint;
		let leftover = numStations - (2 * midpoint);
		let right = leftover === 1 ? 1 : Math.round(leftover / 2);
		let left = leftover - right;
		counts = { top: topBottom, right, bottom: topBottom, left };
	}
	let topStations = stations?.slice(0, counts.top);
	let rightStations = stations?.slice(counts.top, counts.top + counts.right);
	let bottomStations = stations?.slice(counts.top + counts.right, counts.left === 0 ? numStations.length : counts.top + counts.right + counts.bottom);
	let leftStations = counts.left !== 0 ? stations?.slice(counts.top + counts.right + counts.bottom) : [];
	return { topStations, rightStations, bottomStations, leftStations };
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

export function isServiceAccessible(lineId, service) {
	let test = lineId ? true : false;
	// disable tram lines
	if (lineId && lineId.split('-')[1] === 'tl') { test = false; }
	switch (service) {
		case 'cr': return false;
		case 'prdir': return false;
		case 'gzmtr': return test;
		case 'guangfometro': return test;
		case 'fmetro': return test;
	}
}

export function getStatusCssName(status) {
	let temp = status.split(' ');
	let name = 'c-status--';
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