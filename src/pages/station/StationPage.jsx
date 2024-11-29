// packages
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';
import { RiTimeLine } from 'react-icons/ri';
// css
import './station.css';
// hooks
import useDbData from '../../hooks/useDbData';
// components
import { IconMetro, IconTrain, IconTram } from '../../components/TransitSvg';
import StationBox from './components/StationBox';
import StationImages from './components/StationImages';
import StationTabs from './components/StationTabs';
import StationTime from './components/StationTime';

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
		const handleResize = () => {
			const isMobile = window.innerWidth <= 768;
			setUiIsMobile(isMobile);
		}
		window.addEventListener('resize', handleResize);
		handleResize();
		return () => { window.removeEventListener('resize', handleResize); }
	}, []);

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
			// will have to do other services later?
			let timings = stations.filter(s => s.station === stations[index].station && s.timings.length > 0 && (s._service_id === 'gzmtr' || s._service_id === 'guangfometro')).map((s) => {
				let lineId = s.lines_served[0];
				console.log(lineId)
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
			{ui_isMobile && <StationImages isMobile={ui_isMobile} setIsMobile={setUiIsMobile} images={db_station?.image} />}
			<div className='station-content'>
				<p className='station-description'>{db_station?.description}</p>
				<StationBox stationData={db_station} lineColor={ui_color} />
			</div>
			{/*<StationTabs transfers={db_station?.transfers} />*/}
			{!ui_isMobile && <>
				<h2>Views</h2>
				<StationImages isMobile={ui_isMobile} setIsMobile={setUiIsMobile} images={db_station?.image} />
			</>}
			<h2>Times</h2>
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
							{(timing.service === 'cr' || timing.service === 'prdir') && <IconTrain width='20px' height='16px' color={timing.color} />}
							{(timing.service === 'gzmtr' || timing.service === 'guangfometro' || timing.service === 'fmetro') && <IconMetro width='20px' height='16px' color={timing.color} />}
							{timing.service === 'gztram' && <IconTram width='20px' height='16px' color={timing.color} />}
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