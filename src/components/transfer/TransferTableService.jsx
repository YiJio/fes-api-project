// packages
import React from 'react';
// css
import './transfer.css';
// utils
import { getFromIndex } from '../../utils/helper';
// components
import Tooltip from '../tooltip/Tooltip';
import { IconCR, IconFMETRO, IconGF, IconGZMTR, IconPRDIR } from '../icons/SvgService';
import { IconMetro, IconTrain, IconTram } from '../icons/SvgTransit';
// data
import { SERVICES } from '../../data';

const TransferTableService = ({ service }) => {
	// variables
	let size = '24px';
	let cursor = 'help';
	let theService = getFromIndex(SERVICES, 'key', service);
	let typeIcon = <IconMetro cursor={cursor} height={size} />;
	let logoIcon = <IconGZMTR cursor={cursor} />;
	switch (service) {
		case 'cr': {
			typeIcon = <IconTrain cursor={cursor} height={size} />;
			logoIcon = <IconCR cursor={cursor} />;
			break;
		}
		case 'prdir': {
			typeIcon = <IconTrain cursor={cursor} height={size} />;
			logoIcon = <IconPRDIR cursor={cursor} />;
			break;
		}
		case 'gztram': {
			typeIcon = <IconTram cursor={cursor} height={size} />;
			logoIcon = <IconGZMTR cursor={cursor} />;
			break;
		}
		case 'guangfometro': logoIcon = <IconGF cursor={cursor} />; break;
		case 'fmetro': logoIcon = <IconFMETRO cursor={cursor} />; break;
		case 'ftram': {
			typeIcon = <IconTram cursor={cursor} height={size} />;
			logoIcon = <IconFMETRO cursor={cursor} />;
			break;
		}
	}

	return (
		<div className='c-transfer-table__service'>
			<Tooltip text={theService.type}>
				<div className='c-transfer-table__icon'>{typeIcon}</div>
			</Tooltip>
			<Tooltip text={theService.name}>
				<div className='c-transfer-table__icon'>{logoIcon}</div>
			</Tooltip>
		</div>
	);
}

export default TransferTableService;