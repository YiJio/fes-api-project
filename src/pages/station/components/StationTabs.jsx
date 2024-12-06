// packages
import React, { useState } from 'react';
import { RiExchange2Line, RiMoneyCnyCircleLine, RiStackLine  } from 'react-icons/ri';
import { TbArrowAutofitContent, TbArrowRotaryRight, TbArrowsDoubleSwNe, TbArrowsRight, TbCircleOff, TbDoorExit, TbQuestionMark, TbStairs } from 'react-icons/tb';
// utils
import { getContrastingTextColor, getLighterColor } from '../../../utils/color';
// components
import Accordion from '../../../components/Accordion';
import StationFares from './StationFares';
import StationTransferList from './StationTransferList';

// constants
const TRANSFER_METHODS = [
	{ name: 'tba', icon: <TbQuestionMark />, text: 'To be available (under construction)' },
	{ name: 'cross platform', icon: <TbArrowsDoubleSwNe />, text: 'Walk across platform to cross transfer' },
	{ name: 'parallel platform', icon: <TbArrowsRight />, text: 'Walk across platform to parallel transfer' },
	{ name: 'concourse', icon: <TbStairs />, text: 'Go to concourse to transfer' },
	{ name: 'node', icon: <TbArrowRotaryRight />, text: 'Use elevator / escalator / stairs to a concourse to transfer' },
	{ name: 'channel', icon: <TbArrowAutofitContent />, text: 'Walk the designated channel passageway to transfer' },
	{ name: 'exit', icon: <TbDoorExit />, text: 'Exit station to transfer' },
	{ name: 'termination', icon: <TbCircleOff />, text: 'The transfer line is the terminal, go to other direction to transfer' },
];

const StationTabs = ({ lines, stations, stationData, lineData, floors }) => {
	// states
	const [ui_tab, setUiTab] = useState(0);
	// variables
	let color = lineData?.color !== '' ? lineData?.color : '#c3c3c3';
	let borderColor = getLighterColor(color, 40);
	let bgColor = getLighterColor(color, 80);
	let fontColor = getContrastingTextColor(bgColor);

	return (
		<div className='tabs'>
			<div className='tabs__list'>
				<div className={`tabs__tab ${ui_tab === 0 ? 'active' : ''}`} style={{ borderStyle: ui_tab === 0 ? 'solid' : 'dashed', borderColor: borderColor, background: ui_tab === 0 ? bgColor : 'var(--color-white)', color: ui_tab === 0 ? fontColor : 'var(--color-black)' }} onClick={() => setUiTab(0)}>
					<RiMoneyCnyCircleLine strokeWidth='1px' /> Fares
				</div>
				{stationData?.transfers?.length > 0 && <div className={`tabs__tab ${ui_tab === 1 ? 'active' : ''}`} style={{ borderStyle: ui_tab === 1 ? 'solid' : 'dashed', borderColor: borderColor, background: ui_tab === 1 ? bgColor : 'var(--color-white)', color: ui_tab === 1 ? fontColor : 'var(--color-black)' }} onClick={() => setUiTab(1)}>
					<RiExchange2Line strokeWidth='1px' /> Transfers
				</div>}
				{floors?.length > 0 && <div className={`tabs__tab ${ui_tab === 2 ? 'active' : ''}`} style={{ borderStyle: ui_tab === 2 ? 'solid' : 'dashed', borderColor: borderColor, background: ui_tab === 2 ? bgColor : 'var(--color-white)', color: ui_tab === 2 ? fontColor : 'var(--color-black)' }} onClick={() => setUiTab(2)}>
					<RiStackLine strokeWidth='1px' /> Floors
				</div>}
			</div>
			<div className='tabs__content'>
				{ui_tab === 0 && <StationFares lines={lines} stations={stations} stationData={stationData} />}
				{ui_tab === 1 && <>
					<Accordion label='Legend'>
						<p>Station transfer methods can be one of the following:</p>
						<ul>
							{TRANSFER_METHODS.map((method, index) => (
								<li key={index}><b>{method.icon} {method.name}</b> - {method.text.toLowerCase()}</li>
							))}
						</ul>
					</Accordion>
					<StationTransferList transfers={stationData?.transfers} sourceLine={lineData} methodsDict={TRANSFER_METHODS} />
				</>}
				{ui_tab === 2 && <></>}
			</div>
		</div>
	);
}

export default StationTabs;