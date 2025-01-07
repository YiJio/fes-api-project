export const SERVICES = [
	{ key: 'cr', name: 'China Railway', type: 'Conventional & high speed rail', color: '#e60012', },
	{ key: 'prdir', name: 'Pearl River Delta Intercity Railway', type: 'Conventional rail', color: '#009543', },
	{ key: 'gzmtr', name: 'Guangzhou Metro', type: 'Metro/subway', color: '#be1120', },
	{ key: 'gztram', name: 'Guangzhou Tram', type: 'Tram/light rail', color: '#be1120', },
	{ key: 'gdic', name: 'Guangdong Intercity', type: '', color: '#be1120', },
	{ key: 'fmetro', name: 'Foshan Metro', type: 'Metro/subway', color: '#cd171c', },
	{ key: 'ftram', name: 'Foshan Metro (tram)', type: 'Tram/light rail', color: '#cd171c', },
	{ key: 'guangfometro', name: 'Guangfo Metro', type: 'Metro/subway', color: '#cc3b3d', },
	{ key: 'szmc', name: 'Shenzhen Metro', type: 'Metro/subway', color: '#13a034', },
	{ key: 'sztram', name: 'Shenzhen Tram', type: 'Tram/light rail', color: '#13a034', },
	{ key: 'dgrt', name: 'Dongguan Rail Transit', type: 'Metro/subway', color: '#98c53d', }
];

export const STATUSES = [
	{ name: 'In operation', short: 'io', },
	{ name: 'Under construction', short: 'uc', },
	{ name: 'Planning', short: 'p', },
	{ name: 'Not in operation', short: 'nio', },
	{ name: 'Out of service', short: 'ofs', },
];

export const STRUCTURE_TYPES = ['Elevated', 'Surface', 'Underground'];

export const METHOD_DIRECTIONS = [
	{ name: 'Forward', text: 'Head in the same direction as the transfer', position: 'top' },
	{ name: 'Reverse', text: 'Head in the opposite direction as the transfer', position: 'bottom' }
];