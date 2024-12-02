// packages
import React, { useEffect, useState } from 'react';
import { RiExchange2Line, RiMapPinFill, RiMoneyCnyCircleLine, RiRunFill, RiStackLine, RiWalkFill  } from 'react-icons/ri';
import { TbArrowGuide, TbArrowRotaryRight, TbArrowsDoubleSwNe, TbArrowsRight, TbDoorExit, TbStairs } from 'react-icons/tb';
// utils
import { getContrastingTextColor, getLighterColor } from '../../../utils/color';
// components
import Accordion from '../../../components/Accordion';
import StationTransferList from './StationTransferList';
import StationFares from './StationFares';

const StationTabs = ({ lines, stations, stationData, lineColor, floors }) => {
	// states
	const [ui_tab, setUiTab] = useState(0);
	// variables
	let color = lineColor !== '' ? lineColor : '#c3c3c3';
	let borderColor = getLighterColor(color, 40);
	let bgColor = getLighterColor(color, 80);
	let fontColor = getContrastingTextColor(bgColor);

	if (!lines || !stations) { return <>Loading...</>; }

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
					{/*<Accordion label='Legend'>
						<p>Station transfer methods can be one of the following:</p>
					</Accordion>*/}
					{/* transfer in schema model need to go through changes as well, so do the before method first and then use the correct component for showing transfers with transfer methods, ALSO when doing the floor layouts, may possibly just have transfers there? */}
					<StationTransferList transfers={stationData?.transfers} />
				</>}
				{ui_tab === 2 && <></>}
			</div>
		</div>
	);
}

export default StationTabs;