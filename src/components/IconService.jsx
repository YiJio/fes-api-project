// packages
import React from 'react';
// utils
import { getFromIndex } from '../utils/helper';
// components
import { IconCR, IconDGRT, IconFMETRO, IconGF, IconGZMTR, IconPRDIR, IconSZMC } from './icons';
import Tooltip from './tooltip/Tooltip';
// data
import { SERVICES } from '../data';

const IconService = ({ color, size = '24px', service, isOperator = false, hasTooltip = true, position = 'top', offset }) => {

	function getIcon() {
		let icon;
		switch (service) {
			case 'cr': icon = <IconCR color={color} width={size} height={size} />; break;
			case 'prdir': icon = <IconPRDIR color={color} width={size} height={size} />; break;
			case 'gzmtr':
			case 'gztram': icon = <IconGZMTR color={color} width={size} height={size} />; break;
			case 'fmetro': icon = <IconFMETRO color={color} width={size} height={size} />; break;
			case 'guangfometro': icon = <IconGF color={color} width={size} height={size} />; break;
			case 'szmc': icon = <IconSZMC color={color} width={size} height={size} />; break;
			case 'dgrt': icon = <IconDGRT color={color} width={size} height={size} />; break;
			case 'gdic': icon = <IconGZMTR color={color} width={size} height={size} />; break;
		}
		let theService = getFromIndex(SERVICES, 'key', service);
		return hasTooltip ? <Tooltip text={`${isOperator ? 'Operator: ' : ''}${theService.name}`} position={position} offset={offset}>{icon}</Tooltip> : icon;
	}

	return (
		<span className='c-icon'>{getIcon()}</span>
	);
}

export default IconService;