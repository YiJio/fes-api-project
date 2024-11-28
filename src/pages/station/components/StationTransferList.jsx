// packages
import React, { useEffect } from 'react';
// hooks
import useDbData from '../../../hooks/useDbData';
// utils
import { sortByServiceIdAndLineName } from '../../../utils/helper';
// components
import Tooltip from '../../../components/Tooltip';
import { IconMetro, IconTrain, IconTram } from '../../../components/TransitSvg';
import StationTransfer from '../../../components/StationTransfer';
// assets

// constants
const SERVICES = ['cr', 'prdir', 'gzmtr', 'guangfometro', 'gztram'];

const StationTransferList = ({ transfers }) => {
	// variables
	const { lines } = useDbData();

	function getTransferIcon(service) {
		let size = '24px';
		let text = '';
		let icon = '';
		switch (service) {
			case 'cr': text = 'China Railway'; icon = <IconTrain size={size} />; break;
			case 'prdir': text = 'Pearl River Delta Intercity Railway'; icon = <IconTrain size={size} />; break;
			case 'gztram': text = 'Guangzhou Tram'; icon = <IconTram size={size} />; break;
			case 'fmetro': text = 'Foshan Metro'; icon = <IconMetro size={size} />; break;
			case 'guangfometro': text = 'Guangfo Metro'; icon = <IconMetro size={size} />; break;
			default: text = 'Guangzhou Metro'; icon = <IconMetro size={size} />;
		}
		return <Tooltip position='top' text={text}>{icon}</Tooltip>
	}

	useEffect(() => {
		let test = transfers.findIndex((t) => t.transfer_to._service_id == 'prdir');
		console.log(test);
	}, [lines])

	if (!lines) { return <>Loading...</>; }

	return (
		<div className='station-transfer-list'>
			{SERVICES.map((service, index) => (<React.Fragment key={index}>
				{transfers.findIndex((t) => t.transfer_to._service_id == service) !== -1 && <div className='station-transfer-list-row'>
					<div className='station-transfer-list-icon'>{getTransferIcon(service)}</div>
					<div className='station-transfer-list-lines'>
						{transfers.filter((transfer => transfer.transfer_to._service_id == service)).sort((a, b) => a.transfer_to._id.split('.')[1].localeCompare(b.transfer_to._id.split('.')[1], 'en', { numeric: true })).map((transfer) => (
							<StationTransfer transfer={transfer.transfer_to} position='top' />
						))}
					</div>
				</div>}
			</React.Fragment>))}
			{/*transfers.sort((a, b) => sortByServiceIdAndLineName(a.transfer_to, b.transfer_to, lines)).map((transfer, index) => (
				<div key={index}>
					<div className='station-transfer-list-icon'>{getTransferIcon(transfer.transfer_to._service_id)}</div>
					<StationTransfer transfer={transfer.transfer_to} />
				</div>
			))*/}
		</div>
	)
}

export default StationTransferList;