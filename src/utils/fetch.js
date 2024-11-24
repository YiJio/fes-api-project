// important variables
const API_KEY = import.meta.env.VITE_API_KEY;

export const fetchLines = async () => {
	try {
		const response = await fetch(`https://api.cantonprtapi.com/lines`, {
			method: 'GET',
			headers: { 'X-Api-Key': API_KEY, },
		});
		const data = await response.json();
		return data;
	} catch (error) {
		console.error('Error fetching line data.', error);
	}
}

export const fetchStations = async () => {
	try {
		const response = await fetch(`https://api.cantonprtapi.com/stations`, {
			method: 'GET',
			headers: { 'X-Api-Key': API_KEY, },
		});
		const data = await response.json();
		return data;
	} catch (error) {
		console.error('Error fetching station data.', error);
	}
}

export const fetchLine = async (id) => {
	try {
		const response = await fetch(`https://api.cantonprtapi.com/lines/${id}`, {
			method: 'GET',
			headers: { 'X-Api-Key': API_KEY, },
		});
		const data = await response.json();
		return data;
	} catch (error) {
		console.error('Error fetching line data.', error);
	}
}

export const fetchLineStations = async (id) => {
	try {
		const response = await fetch(`https://api.cantonprtapi.com/stations/line/${id}`, {
			method: 'GET',
			headers: { 'X-Api-Key': API_KEY, },
		});
		const data = await response.json();
		return data;
	} catch (error) {
		console.error('Error fetching line data.', error);
	}
}