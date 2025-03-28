// packages
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { RiTimeLine } from 'react-icons/ri';
// css
import './station.css';
// hooks
import useDbData from '../../hooks/useDbData';
// components
import { IconMetro, IconTrain, IconTram } from '../../components/icons/SvgTransit';
import IconService from '../../components/IconService';
import { StationBox, StationImages, StationNav, StationTabs, StationTime } from './components';
import StationPageSkeleton from './StationPageSkeleton';

// constants
const SHOW_SERVICES = ['gzmtr', 'guangfometro'];

const StationPage = () => {
	// hooks
	const { stationId } = useParams();
	const navigate = useNavigate();
	const { lines, stations } = useDbData();
	// states
	const [db_line, setDbLine] = useState({});
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
			let currLine = lines[lineIndex];
			setDbLine(currLine);
			setDbStation(theStation);
			document.title = `${theStation.name.en} - ${currLine.name.en} | Guangzhou Metro`;
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
				let object = { service: s._service_id, lineId, lineNumber, lineName, color, timings: s.timings };
				return object;
			});
			setDbTimings(timings);
			setTimeout(() => {
				setUiColor(currLine?.color);
				setUiIsLoading(false);
			}, 1000);
		}
	}, [stationId, stations, lines]);

	if (!lines || !stations || ui_isLoading) { return <StationPageSkeleton />; }

	return (
		<>
			<h1 className='c-title c-title--station'>
				{db_station?.name.en}
				<IconService service={db_station?._service_id} offset={8} />
				{(db_station?._operator_id && db_station?._service_id !== db_station?._operator_id) && <IconService service={db_station?._operator_id} isOperator />}
			</h1>
			{ui_windowWidth <= 768 && <StationImages windowWidth={ui_windowWidth} images={db_station?.image} />}
			<div className='c-station-content'>
				<div className='c-station-content__item'>
					<div className='c-station-description'>
						<ReactMarkdown children={db_station?.description} />
					</div>
					<StationTabs lines={lines} stations={stations} stationData={db_station} lineData={db_line} />
				</div>
				<div className='c-station-content__item'>
					<StationBox stationData={db_station} lineColor={ui_color} />
					<StationNav stations={stations} lineColor={ui_color} preceding={db_station?.navigation?.preceding} following={db_station?.navigation?.following} />
				</div>
			</div>
			<div className='c-station-content'>
				{ui_windowWidth > 768 && <div className='c-station-content__item'>
					<h2>Views</h2>
					<StationImages windowWidth={ui_windowWidth} images={db_station?.image} />
				</div>}
				<div className='c-station-content__item c-station-content__item--last'>
					<h2>Times</h2>
					<div className='c-station-hours'>
						<b className='c-station-hours__label'>Operational hours</b>
						<div className='c-station-hours__time'>
							<RiTimeLine strokeWidth={0.5} />
							<span>{db_station?.operational_hours?.opening} – {db_station?.operational_hours?.closing[0] === '0' ? <>{db_station?.operational_hours?.closing}<sup>+1</sup></> : <>{db_station?.operational_hours?.closing}</>}</span>
						</div>
					</div>
					<div className='c-station-timetable'>
						{db_timings?.sort((a, b) => a.lineName.localeCompare(b.lineName, 'en', { numeric: true })).map((timing, index) => (<div key={index} className='l-row'>
							<div className='c-station-timetable__line' style={{ color: timing.color }}>
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
		</>
	);
}

export default StationPage;