// packages
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';
import { RiExchange2Line, RiLoader5Fill, RiMapPinFill, RiMapPin5Fill, RiMapPinTimeFill, RiTimeLine } from 'react-icons/ri';
// css
import './station.css';
// hooks
import useDbData from '../../hooks/useDbData';
// utils
import { getLineInfo } from '../../utils/get';
import { getDate } from '../../utils/helper';
import { getContrastingTextColor, getLighterColor } from '../../utils/color';
// components
import { IconMetro, IconTrain, IconTram } from '../../components/TransitSvg';
import StationCode from '../../components/StationCode';
import { StationAddress, StationLocation } from './components/StationLocation';
import StationTime from './components/StationTime';
import StationTransferList from './components/StationTransferList';

const StationPageSkeleton = () => {
	return (
		<div>Loading...</div>
	)
}

const StationPage = () => {
	const { stationId } = useParams();
	const navigate = useNavigate();
	// hooks
	const { lines, stations } = useDbData();
	// states
	const [db_station, setDbStation] = useState({});
	const [db_timings, setDbTimings] = useState([]);
	const [ui_isMobile, setUiIsMobile] = useState(true);
	const [ui_isLoading, setUiIsLoading] = useState(true);
	const [ui_color, setUiColor] = useState('');

	useEffect(() => {
		if (stationId && stations) {
			setDbStation(null);
			setUiIsLoading(true);
			let index = stations.findIndex(s => s._id == stationId);
			if (index === -1) { navigate('/not-found'); return; }
			let lineIndex = lines.findIndex(l => l._id == stations[index].lines_served[0]);
			let lineNumber = lines[lineIndex].prefix.real_prefix;
			let theStation = { ...stations[index], lineNumber };
			setDbStation(theStation);
			let timings = stations.filter(s => s.station === stations[index].station && s.timings.length > 0).map((s) => {
				let lineId = s.lines_served[0];
				let index = lines.findIndex(l => l._id == lineId);
				let lineName = lines[index].name.en;
				let color = lines[index].color;
				if (color === '') { color = '#d3d3d3'; }
				let object = { service: s._service_id, lineId, lineName, color, timings: s.timings };
				return object;
			});
			console.log(timings)
			setDbTimings(timings);
			setTimeout(() => {
				setUiColor(lines[lineIndex]?.color);
				setUiIsLoading(false);
			}, 1000);
		}
	}, [stationId, stations, lines]);

	useEffect(() => {
		console.log(db_station, ui_color)
	}, [db_station, ui_color])


	if (!lines || !stations) { return <StationPageSkeleton />; }
	if (ui_isLoading) { return <StationPageSkeleton />; }

	return (
		<div className='station'>
			<h1 className='station-title'>{db_station?.name.en}</h1>
			<div className='station-images'>
				<div className='station-images-image'><img src={db_station?.image.exterior} /></div>
				<div className='station-images-image'><img src={db_station?.image.exit} /></div>
				<div className='station-images-image'><img src={db_station?.image.concourse} /></div>
				<div className='station-images-image'><img src={db_station?.image.platform} /></div>
			</div>
			<p className='station-description'>{db_station?.description}</p>
			<table className='station-box' cellSpacing={0}>
				<tbody><tr>
					<td width='50%'>
						<div className='station-box-info'>
							<StationCode code={db_station?.station_code} color={ui_color} status={db_station.status} />
							<div className='station-box-field'>
								<strong>Name</strong>
								<big>{db_station?.name.en}</big>
							</div>
							<div className='station-box-field'>
								<strong><RiExchange2Line /> Transfers</strong>
								{db_station?.transfers.length > 0 ? <>
									<StationTransferList transfers={db_station?.transfers} />
								</> : 'N/A'}
							</div>
							<div className='station-box-field'>
								<strong><RiMapPin5Fill /> Geo-coordinates</strong>
								<div style={{ display: 'flex', gap: '8px' }}>
									<StationLocation coordinate={parseFloat(db_station?.location.longitude)} isLon={false} />
									<StationLocation coordinate={parseFloat(db_station?.location.latitude)} isLon={true} />
								</div>
							</div>
							<div className='station-box-field'>
								<strong><RiMapPinFill /> Address</strong>
								<StationAddress address={db_station?.address} />
							</div>
							<div className='station-box-field'>
								<strong><RiMapPinTimeFill /> Operational since</strong>
								{db_station?.operational_since.split('T')[0].replaceAll('-','/')}
							</div>
						</div>
					</td>
					<td width='50%'>
						<img src={db_station?.image.exit ? db_station?.image.exit : db_station?.image.platform} />
					</td>
				</tr></tbody>
			</table>
			<h2>Timetable</h2>
			<div className='station-hours'>
				<b className='station-hours-label'>Operational hours</b>
				<div className='station-hours-time'>
					<RiTimeLine strokeWidth={0.5} />
					<span>{db_station?.operational_hours.opening} - {db_station?.operational_hours.closing}</span>
				</div>
			</div>
			<div className='station-timetable'>
				{db_timings?.map((timing, index) => (
					<div key={index} className='station-time-row'>
						<div className='station-time-line' style={{ color: timing.color }}>
							{(timing.service === 'cr' || timing.service === 'prdir') && <IconTrain size='16px' color={timing.color} />}
							{(timing.service === 'gzmtr' || timing.service === 'guangfometro' || timing.service === 'fmetro') && <IconMetro size='16px' color={timing.color} />}
							{timing.service === 'gztram' && <IconTram size='16px' color={timing.color} />}
							<Link to={`/line/${timing.lineId}`}>{timing.lineName}</Link>
						</div>
						{timing.timings.map((time) => (
							<StationTime key={time._id} stations={stations} time={time} />
						))}
					</div>
				))}
			</div>
		</div>
	)
}

export default StationPage;