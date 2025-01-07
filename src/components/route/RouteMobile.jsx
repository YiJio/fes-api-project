// packages
import React, { useRef } from 'react';
import { RiShuffleLine } from 'react-icons/ri';
// css
import './route.css';
// utils
import { getContrastingTextColor, getLighterColor } from '../../utils/color';
// components
import SvgRouteFork from '../icons/SvgRouteFork';
import { RouteRewindMobile, RouteStationMobile } from './RouteStationMobile';

const RouteMobile = ({ lineData, lineStations, isLoop = false }) => {
	// variables
	let lighterColor = getLighterColor(lineData?.color, 20);
	let lightestColor = getLighterColor(lineData?.color, 50);
	// refs
	const topRef = useRef(null);
	const bottomRef = useRef(null);

	const executeScroll = (goToTop) => {
		if(goToTop) topRef.current.scrollIntoView();
		else bottomRef.current.scrollIntoView();
	}

	return (
		<div className='c-route'>
			<div className='c-route__separator' style={{ background: lighterColor }} />
			<div className='c-route__list c-route__list--mobile'>
				{isLoop && <RouteRewindMobile ref={topRef} isFirst={true} lineData={lineData} stationData={lineStations?.stations[lineStations?.stations.length - 1]} onClick={() => executeScroll(false)} />}
				{lineStations?.stations?.map((station) => (<React.Fragment key={station._id}>
					<RouteStationMobile lineData={lineData} stationData={station} />
					{station.branches.length > 0 && <>
						{lineStations?.branches?.filter((branch) => station.branches.includes(branch.code)).map((branch) => (<div key={branch.code} className='c-branch'>
							<div className='c-branch__title'>
								<div className='c-branch__track' style={{ background: lighterColor }} />
								<div className='c-branch__name' style={{ background: lightestColor, color: getContrastingTextColor(lightestColor) }}>
									<RiShuffleLine />
									{branch.name.en}
								</div>
							</div>
							<div className='c-branch__stations'>
								<div className='c-branch__track' style={{ background: `linear-gradient(180deg, ${lightestColor} 50%, ${lighterColor} 100%)` }}>
									<SvgRouteFork color={lighterColor} />
								</div>
								<div className='c-route__list c-route__list--mobile'>
									{branch.stations?.map((station) => (
										<RouteStationMobile key={station._id} lineData={lineData} stationData={station} />
									))}
								</div>
							</div>
						</div>))}
					</>}
				</React.Fragment>
				))}
				{isLoop && <RouteRewindMobile ref={bottomRef} isFirst={false} lineData={lineData} stationData={lineStations?.stations[0]} onClick={() => executeScroll(true)} />}
			</div>
		</div>
	);
}

export default RouteMobile;