// packages
import React, { useEffect, useState } from 'react';
import { RiExchange2Line, RiMoneyCnyCircleLine, RiStackLine } from 'react-icons/ri';
import { TbArrowGuide, TbArrowRotaryRight, TbArrowsDoubleSwNe, TbArrowsRight, TbDoorExit, TbStairs } from 'react-icons/tb';
// components
import StationTransferList from './StationTransferList';

const StationTabs = ({ transfers, fares, floors }) => {
	const [ui_tab, setUiTab] = useState(0);

	return (
		<div className='tabs'>
			<div className='tabs__tab-list'>
				{transfers?.length > 0 && <div className={`tabs__tab-list__tab ${ui_tab === 0 ? 'active' : ''}`} onClick={() => setUiTab(0)}>
					<RiExchange2Line strokeWidth='1px' /> Transfers
				</div>}
				{fares?.length > 0 && <div className={`tabs__tab-list__tab ${ui_tab === 1 ? 'active' : ''}`} onClick={() => setUiTab(1)}>
					<RiMoneyCnyCircleLine strokeWidth='1px' /> Fares
				</div>}
				{floors?.length > 0 && <div className={`tabs__tab-list__tab ${ui_tab === 2 ? 'active' : ''}`} onClick={() => setUiTab(2)}>
					<RiStackLine strokeWidth='1px' /> Floors
				</div>}
			</div>
			<div className='tabs__tab-content'>
				{ui_tab === 0 && <>
					{/*<div className='show-hide'>
						<div className='show-hide__heading'>Legend</div>
						<p>Station transfer methods can be one of the following:</p>
					</div>*/}
					{/* transfer in schema model need to go through changes as well, so do the before method first and then use the correct component for showing transfers with transfer methods, ALSO when doing the floor layouts, may possibly just have transfers there? */}
					<StationTransferList transfers={transfers} />
				</>}
			</div>
		</div>
	);
}

export default StationTabs;