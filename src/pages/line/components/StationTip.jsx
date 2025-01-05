// packages
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';
import { RiExchange2Line, RiLoader5Fill, RiMapPinFill } from 'react-icons/ri';
// hooks
import useDbData from '../../../hooks/useDbData';
// utils
import { getStatusCssName } from '../../../utils/helper';
import { getColorWithAlpha, getContrastingTextColor, getLighterColor } from '../../../utils/color';
// components
import { TransferBubble } from '../../../components/transfer';
import StationCode from '../../../components/StationCode';
import { StationAddress } from '../../../components/StationLocation';

const StationTipSkeleton = () => {
	return (
		<div className='station-tip' style={{ boxShadow: '0 8px 8px 0 rgba(0,0,0,0.25)' }}>
			<div className='station-tip__info'>
				<div className='station-tip__wrapper'>
					<div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
						<Skeleton count={1} height='24px' />
						<Skeleton count={2} />
						<Skeleton count={1} height='32px' />
					</div>
					<Skeleton count={3} height='14px' />
					<Skeleton count={1} height='40px' />
				</div>
			</div>
			<div className='station-tip__bg'>
				<RiLoader5Fill className='loading-spinner' strokeWidth={2} />
			</div>
		</div>
	)
}

const StationTip = ({ stationId, lineNumber, lineColor }) => {
	// states
	const [db_station, setDbStation] = useState({});
	const [ui_isLoading, setUiIsLoading] = useState(true);
	const [ui_background, setUiBackground] = useState('');
	// hooks
	const { stations } = useDbData();
	const navigate = useNavigate();
	// variables
	let lighterColor = getLighterColor(lineColor, 20);

	function getStyles(what) {
		const alphaColor = getColorWithAlpha(lineColor, 25);
		switch (what) {
			case 'boxShadowTip': return `0 8px 8px 0 ${alphaColor}`;
			case 'boxShadowBtn': return `0 8px 12px 0 ${alphaColor}`;
			case 'background': return `url('${ui_background}')`;
		}
	}

	useEffect(() => {
		// too many API calls, call from local storage for now
		/*const fetch = async () => {
			let station = await fetchStation(stationId);
			setDbStation(station);
			let color = getLineInfo(station.lines_served[0], 'color');
			if (color === '') { color = '#d3d3d3'; }
			setUiColor(color);
			await new Promise((resolve) => setTimeout(resolve, 1000));
			setUiIsLoading(false);
		}
		fetch();*/
		if (stations) {
			const index = stations.findIndex(station => station._id === stationId);
			const station = stations[index];
			setDbStation(station);
			setTimeout(() => {
				setUiIsLoading(false);
			}, 500);
		}
	}, [stationId, stations]);

	useEffect(() => {
		const img = new Image();
		const exit = db_station?.image?.exit;
		const platform = db_station?.image?.platform;
		let src = '';
		if (exit && exit !== '') { src = exit; }
		else if (platform !== '') { src = platform; }
		if (src !== '') {
			img.src = src;
			img.onload = () => setUiBackground(src);
		} else {
			setUiBackground('Not Available');
		}
	}, [db_station.image]);

	if (ui_isLoading) { return <StationTipSkeleton /> }

	return (
		<div className='station-tip' style={{ boxShadow: getStyles('boxShadowTip') }}>
			<div className='station-tip__info'>
				<div className='station-tip__wrapper'>
					<div className='station-tip__intro'>
						<div className='station-tip__basic'>
							<div className='station-tip__heading'>
								<div className='station-tip__title'>
									<div className='station-tip__name'>{db_station?.name?.en}</div>
									<div className={`status ${getStatusCssName(db_station?.status)}`}>{db_station?.status}</div>
								</div>
								<StationCode code={db_station?.station_code} color={lineColor} status={db_station?.status} />
							</div>
							<div className='station-tip__location'>
								<RiMapPinFill />
								<StationAddress address={db_station?.address} />
							</div>
							{db_station?.transfers.length !== 0 && (<div className='station-tip__row'>
								<TransferBubble transfers={db_station?.transfers} lineNumber={lineNumber} lineColor={lineColor} />
							</div>)}
						</div>
						<div className='station-tip__description'>{db_station?.description && db_station?.description}</div>
					</div>
					<button className='station-tip__button' style={{ boxShadow: getStyles('boxShadowBtn'), background: lighterColor, color: getContrastingTextColor(lighterColor) }} onClick={() => navigate(`/station/${stationId}`)}>Read more</button>
				</div>
			</div>
			<div className='station-tip__bg' style={{ backgroundImage: getStyles('background') }}>{ui_background === '' && <RiLoader5Fill className='loading-spinner' strokeWidth={2} />}</div>
		</div>
	);
}

export default StationTip;