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
import logoCR from '../../../assets/China_Railway_icon.svg';
import logoPRDIR from '../../../assets/PRDIR_icon.svg';
import logoGZMTR from '../../../assets/Guangzhou_Metro_icon.svg';
import logoFmetro from '../../../assets/Foshan_Metro_icon.svg';
import logoGuangfo from '../../../assets/Guangfo_Metro_icon.svg';

// constants
const SERVICES = ['cr', 'prdir', 'gzmtr', 'guangfometro', 'fmetro', 'gztram'];
const RAIL_SERVICES = ['cr', 'prdir'];

const StationTransferService = ({ transfers, service }) => {
	// variables
	let tempTransfers = [];
	if (!RAIL_SERVICES.includes(service)) {
		tempTransfers = transfers.filter((transfer => transfer._service_id == service)).sort((a, b) => a._station_id.split('.')[1].localeCompare(b._station_id.split('.')[1], 'en', { numeric: true }));
	} else {
		tempTransfers = transfers.filter((transfer => transfer._service_id == service)).sort((a, b) => a._station_id.localeCompare(b._station_id));
	}

	return (<>
		{tempTransfers.map((transfer) => (
			<StationTransfer key={transfer._station_id} transfer={transfer} toStation={true} />
		))}
	</>);
}

const StationTransferIcon = ({ service }) => {
	// variables
	let size = '24px';
	let cursor = 'help';
	let typeText = 'Metro/subway';
	let logoText = 'Foshan Metro';
	let typeIcon = <IconMetro cursor={cursor} height={size} />;
	let logoIcon = <img className='transfer__logo' src={logoFmetro} alt='Foshan Metro logo' />;
	switch (service) {
		case 'cr': {
			typeText = 'Conventional & high speed rail';
			logoText = 'China Railway';
			typeIcon = <IconTrain cursor={cursor} height={size} />;
			logoIcon = <img className='transfer__logo' src={logoCR} alt='China Railway logo' />;
			break;
		}
		case 'prdir': {
			typeText = 'Conventional rail';
			logoText = 'Pearl River Delta Intercity Railway';
			typeIcon = <IconTrain cursor={cursor} height={size} />;
			logoIcon = <img className='transfer__logo' src={logoPRDIR} alt='PRDIR logo' />;
			break;
		}
		case 'gztram': {
			typeText = 'Tram/light rail';
			logoText = 'Guangzhou Tram';
			typeIcon = <IconTram cursor={cursor} height={size} />;
			logoIcon = <img className='transfer__logo' src={logoGZMTR} alt='Guangzhou Tram logo' />;
			break;
		}
		// need to do fmetro to check for trams later
		/*case 'fmetro': {
			logoText = 'Foshan Metro';
			typeIcon = <IconMetro cursor={cursor} height={size} />;
			logoIcon = <img className='transfer__logo' src={logoGZMTR} alt='Guangzhou Tram logo' />;
			break;
		}*/
		case 'guangfometro': {
			logoText = 'Guangfo Metro';
			logoIcon = <img className='transfer__logo' src={logoGuangfo} alt='Guangfo Metro logo' />;
			break;
		}
		case 'gzmtr': {
			logoText = 'Guangzhou Metro';
			logoIcon = <img className='transfer__logo' src={logoGZMTR} alt='Guangzhou Metro logo' />;
		}
	}

	return (
		<div className='station-transfer-list-icon'>
			<Tooltip text={typeText}>
				<div className='station__transfer-service__icon'>{typeIcon}</div>
			</Tooltip>
			<Tooltip text={logoText}>
				<div className='station__transfer-service__icon'>{logoIcon}</div>
			</Tooltip>
		</div>
	);
}

const StationTransferList = ({ transfers }) => {
	// variables
	const { lines } = useDbData();

	useEffect(() => {
		//let test = transfers.findIndex((t) => t.transfer_to._service_id == 'prdir');
		//console.log(test);
	}, [lines]);

	if (!lines) { return <>Loading...</>; }

	return (
		<div className='station-transfer-list'>
			{SERVICES.map((service, index) => (<React.Fragment key={index}>
				{transfers.findIndex((transfer) => transfer._service_id == service) !== -1 && <div className='station-transfer-list-row'>
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