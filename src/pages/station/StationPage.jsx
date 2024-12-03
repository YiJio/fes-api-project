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

// constants
const SHOW_SERVICES = ['gzmtr', 'guangfometro'];

const StationPageSkeleton = () => {
	return (
		<div className='station'>
			<Skeleton className='station-title' count={1} height='36px' />
			<div className='station-content'>
				<div className='station-content__item' style={{ paddingTop:'20px' }}>
					<Skeleton style={{ marginBottom:'4px' }} count={10} height='12px' />
				</div>
				<div className='station-content__item'>
					<Skeleton count={1} height='240px' />
				</div>
			</div>
		</div>
	);
}

const StationPage = () => {
	const { stationId } = useParams();
	const navigate = useNavigate();
	// hooks
	const { lines, stations } = useDbData();
	// states
	const [db_station, setDbStation] = useState({});
	const [db_timings, setDbTimings] = useState([]);
	const [ui_windowWidth, setUiWindowWidth] = useState(1600);
	const [ui_isLoading, setUiIsLoading] = useState(true);
	const [ui_color, setUiColor] = useState('');

	useEffect(() => {
		const handleResize = () => {
			const width = window.innerWidth;
			setUiWindowWidth(width);
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
			let currStation = stations[index];
			let lineIndex = lines.findIndex(l => l._id == currStation.lines_served[0]);
			let lineNumber = lines[lineIndex].prefix.real_prefix;
			let theStation = { ...currStation, lineNumber };
			setDbStation(theStation);
			document.title = `${theStation.name.en} - ${lines[lineIndex].name.en} | Guangzhou Metro`;
			let timings = stations.filter((s) => {
				if (!SHOW_SERVICES.includes(s._service_id)) { return false; }
				if (s._id === currStation._id) { return true; }
				let index = currStation.transfers.findIndex((t) => t._station_id == s._id);
				return index !== -1;
			}).map((s) => {
				let lineId = s.lines_served[0];
				let index = lines.findIndex(l => l._id == lineId);
				let lineName = lines[index].name.en;
				let color = lines[index].color;
				if (color === '') { color = '#c3c3c3'; }
				let object = { service: s._service_id, lineId, lineName, color, timings: s.timings };
				return object;
			});
			setDbTimings(timings);
			setTimeout(() => {
				setUiColor(lines[lineIndex]?.color);
				setUiIsLoading(false);
			}, 1000);
		}
	}, [stationId, stations, lines]);

	useEffect(() => {
		//console.log(db_station, ui_color)
	}, [db_station, ui_color]);

	if (!lines || !stations) { return <StationPageSkeleton />; }
	if (ui_isLoading) { return <StationPageSkeleton />; }

	return (
		<div className='station'>
			<h1 className='station-title'>{db_station?.name.en}</h1>
			{ui_windowWidth <= 768 && <StationImages windowWidth={ui_windowWidth} images={db_station?.image} />}
			<div className='station-content'>
				<div className='station-content__item'>
					<p className='station-description'>{db_station?.description}</p>
					<StationTabs lines={lines} stations={stations} stationData={db_station} lineColor={ui_color} />
				</div>
				<StationBox stationData={db_station} lineColor={ui_color} />
			</div>
			<div className='station-content'>
				{ui_windowWidth > 768 && <div className='station-content__item'>
					<h2>Views</h2>
					<StationImages windowWidth={ui_windowWidth} images={db_station?.image} />
				</div>}
				<div className='station-content__item'>
					<h2>Times</h2>
					<div className='station-hours'>
						<b className='station-hours__label'>Operational hours</b>
						<div className='station-hours__time'>
							<RiTimeLine strokeWidth={0.5} />
							<span>{db_station?.operational_hours.opening} - {db_station?.operational_hours.closing}</span>
						</div>
					</div>
					<div className='station-timetable'>
						{db_timings?.map((timing, index) => (<div key={index} className='row'>
							<div className='station-timetable__line' style={{ color: timing.color }}>
								{(timing.service === 'cr' || timing.service === 'prdir') && <IconTrain width='20px' height='16px' color={timing.color} />}
								{(timing.service === 'gzmtr' || timing.service === 'guangfometro' || timing.service === 'fmetro') && <IconMetro width='20px' height='16px' color={timing.color} />}
								{timing.service === 'gztram' && <IconTram width='20px' height='16px' color={timing.color} />}
								<Link to={`/line/${timing.lineId}`}>{timing.lineName}</Link>
							</div>
							{timing.timings.map((time, index) => (
								<StationTime key={index} stations={stations} time={time} />
							))}
						</div>))}
					</div>
				</div>
			</div>
		</div>
	)
}

export default StationPage;