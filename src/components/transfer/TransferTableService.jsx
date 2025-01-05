// packages
import React from 'react';
// css
import './transfer.css';
// components
import Tooltip from '../tooltip/Tooltip';
import { IconCR, IconFMETRO, IconGF, IconGZMTR, IconPRDIR } from '../icons/SvgService';
import { IconMetro, IconTrain, IconTram } from '../icons/SvgTransit';

const TransferTableService = ({ service }) => {
	// variables
	let size = '24px';
	let cursor = 'help';
	let typeText = 'Metro/subway';
	let logoText = 'Foshan Metro';
	let typeIcon = <IconMetro cursor={cursor} height={size} />;
	let logoIcon = <IconFMETRO cursor={cursor} />;
	switch (service) {
		case 'cr': {
			typeText = 'Conventional & high speed rail';
			logoText = 'China Railway';
			typeIcon = <IconTrain cursor={cursor} height={size} />;
			logoIcon = <IconCR cursor={cursor} />;
			break;
		}
		case 'prdir': {
			typeText = 'Conventional rail';
			logoText = 'Pearl River Delta Intercity Railway';
			typeIcon = <IconTrain cursor={cursor} height={size} />;
			logoIcon = <IconPRDIR cursor={cursor} />;
			break;
		}
		case 'gztram': {
			typeText = 'Tram/light rail';
			logoText = 'Guangzhou Tram';
			typeIcon = <IconTram cursor={cursor} height={size} />;
			logoIcon = <IconGZMTR cursor={cursor} />;
			break;
		}
		// need to do fmetro to check for trams later
		/*case 'fmetro': {
			logoText = 'Foshan Metro';
			typeIcon = <IconMetro cursor={cursor} height={size} />;
			logoIcon = <IconMetro cursor={cursor} />;
			break;
		}*/
		case 'guangfometro': {
			logoText = 'Guangfo Metro';
			logoIcon = <IconGF cursor={cursor} />;
			break;
		}
		case 'gzmtr': {
			logoText = 'Guangzhou Metro';
			logoIcon = <IconGZMTR cursor={cursor} />;
		}
	}

	return (
		<div className='c-transfer-table__service'>
			<Tooltip text={typeText}>
				<div className='c-transfer-table__icon'>{typeIcon}</div>
			</Tooltip>
			<Tooltip text={logoText}>
				<div className='c-transfer-table__icon'>{logoIcon}</div>
			</Tooltip>
		</div>
	);
}

export default TransferTableService;