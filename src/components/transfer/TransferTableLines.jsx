// packages
import React from 'react';
// css
import './transfer.css';
// components
import TransferTableGroup from './TransferTableGroup';

// constants
const RAIL_SERVICES = ['cr', 'prdir'];

const TransferTableLines = ({ transfers, service, sourceService, sourceLine }) => {
	// variables
	let tempTransfers = [];
	if (!RAIL_SERVICES.includes(service)) {
		tempTransfers = transfers?.filter((transfer => transfer._service_id == service)).sort((a, b) => a._station_id.split('.')[1].localeCompare(b._station_id.split('.')[1], 'en', { numeric: true }));
	} else {
		tempTransfers = transfers?.filter((transfer => transfer._service_id == service)).sort((a, b) => a._station_id.localeCompare(b._station_id));
	}

	return (
		<div className='c-transfer-table__lines'>
			{tempTransfers?.map((transfer) => (
				<TransferTableGroup key={transfer._station_id} transfer={transfer} sourceLine={sourceLine} />
			))}
		</div>
	);
}

export default TransferTableLines;