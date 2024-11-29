// packages
import React, { useEffect } from 'react';
import { TbDoorExit } from 'react-icons/tb';
// hooks
import useDbData from '../../../hooks/useDbData';
// utils
import { sortByServiceIdAndLineName } from '../../../utils/helper';
// components
import Tooltip from '../../../components/Tooltip';
import { IconMetro, IconTrain, IconTram } from '../../../components/TransitSvg';
import { StationTransfer, StationTransferMethod } from '../../../components/StationTransfer';
// assets

// constants
const SERVICES = ['cr', 'prdir', 'gzmtr', 'guangfometro', 'gztram'];

const StationTransferService = ({ transfers, service }) => {
	// variables
	let tempTransfers = [];
	if(service !== 'cr' && service !== 'prdir') {
		tempTransfers = transfers.filter((transfer => transfer.transfer_to._service_id == service)).sort((a, b) => a.transfer_to._id.split('.')[1].localeCompare(b.transfer_to._id.split('.')[1], 'en', { numeric: true }));
	} else {
		tempTransfers = transfers.filter((transfer => transfer.transfer_to._service_id == service)).sort((a, b) => a.transfer_to._id.localeCompare(b.transfer_to._id));
	}

	return (<>
		{tempTransfers.map((transfer) => (
			<StationTransfer key={transfer.transfer_to._id} transfer={transfer.transfer_to} />
		))}
	</>);
}

const StationTransferIcon = ({ service }) => {
	// variables
	let size = '24px';
	let text = '';
	let icon = '';
	let cursor = 'help';

	switch (service) {
		case 'cr': text = 'China Railway'; icon = <IconTrain cursor={cursor} height={size} />; break;
		case 'prdir': text = 'Pearl River Delta Intercity Railway'; icon = <IconTrain cursor={cursor} height={size} />; break;
		case 'gztram': text = 'Guangzhou Tram'; icon = <IconTram cursor={cursor} height={size} />; break;
		case 'fmetro': text = 'Foshan Metro'; icon = <IconMetro cursor={cursor} height={size} />; break;
		case 'guangfometro': text = 'Guangfo Metro'; icon = <IconMetro cursor={cursor} height={size} />; break;
		default: text = 'Guangzhou Metro'; icon = <IconMetro cursor={cursor} height={size} />;
	}

	return (
		<div className='station-transfer-list-icon'>
			<Tooltip position='top' text={text}>{icon}</Tooltip>
		</div>
	);
}

const StationTransferList = ({ transfers }) => {
	// variables
	const { lines } = useDbData();

	useEffect(() => {
		//let test = transfers.findIndex((t) => t.transfer_to._service_id == 'prdir');
		//console.log(test);
	}, [lines])

	if (!lines) { return <>Loading...</>; }

	return (
		<div className='station-transfer-list'>
			{SERVICES.map((service, index) => (<React.Fragment key={index}>
				{transfers.findIndex((t) => t.transfer_to._service_id == service) !== -1 && <div className='station-transfer-list-row'>
					<StationTransferIcon service={service} />
					<div className='station-transfer-list-lines transfer__list'>
						<StationTransferService transfers={transfers} service={service} />
					</div>
				</div>}
			</React.Fragment>))}
		</div>
	)
}

export default StationTransferList;