// packages
import React, { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';
import { RiLoader5Fill } from 'react-icons/ri';
// hooks
import useDbData from '../hooks/useDbData';
// utils
import { fetchLineStations } from '../utils/fetch';
import { getContrastingTextColor, getLighterColor } from '../utils/color';
// components
import { RouteStation, RouteStationMobile } from '../components/RouteStation';
// assets

const LinePageSkeleton = () => {
	return (
		<>
			<Skeleton className='line-title' count={1} height='56px' />
			<div className='route'>
				<Skeleton className='route-line' count={1} />
				<div style={{ marginTop: '80px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '100px' }}><RiLoader5Fill className='loading-spinner' strokeWidth={2} /></div>
			</div>
		</>
	);
}

const LinePage = () => {
	// variables
	//const _path = useLocation().pathname;
	//const _lineId = _path.split('/').pop();
	const { line } = useParams();
	const navigate = useNavigate();
	// hooks
	const { lines, stations } = useDbData();
	// states
	const [db_line, setDbLine] = useState({});
	const [db_lineStations, setDbLineStations] = useState(null);
	const [ui_isLoading, setUiIsLoading] = useState(true);
	const [ui_lighterColor, setUiLighterColor] = useState('');
	const [ui_activeCircle, setUiActiveCircle] = useState(0);
	// refs
	const routeRef = useRef(null);
	const isScrollingRef = useRef(false);

	const handleScroll = (e) => {
		if (isScrollingRef.current) return;
		e.preventDefault();
		isScrollingRef.current = true;
		const scrollDelta = Math.sign(e.deltaY); // detect scroll direction (-1 or 1)
		const nextCircle = Math.min(Math.max(ui_activeCircle + scrollDelta, 0), db_lineStations.stations.length - 1);
		if (nextCircle !== ui_activeCircle) {
			setUiActiveCircle(nextCircle);
			const circleHeight = window.innerHeight;
			routeRef.current.scrollTo({
				top: (nextCircle - 1) * circleHeight,
				behavior: 'auto',
			});
			setTimeout(() => {
				isScrollingRef.current = false;
			}, 200);
		} else {
			isScrollingRef.current = false;
		}
	}

	// having errors when deployed, for now void it
	/*useEffect(() => {
		const ref = routeRef.current;
		if (ref) ref.addEventListener('wheel', handleScroll, { passive: false });
		return () => {
			if (ref) ref.removeEventListener('wheel', handleScroll);
		};
	}, [routeRef.current, ui_activeCircle]);*/

	useEffect(() => {
		const fetch = async () => {
			let stations = await fetchLineStations(line);
			if (!stations) { navigate('/not-found'); return; }
			setDbLineStations(stations);
			await new Promise((resolve) => setTimeout(resolve, 1000));
		}
		if (line && lines) {
			setDbLine(null);
			setDbLineStations(null);
			setUiIsLoading(true);
			setUiLighterColor('');
			setUiActiveCircle(-1);
			//routeRef.current = true;
			setTimeout(() => { console.log('loading') }, 2000);
			let index = lines.findIndex(l => l._id == line);
			if (index === -1) { navigate('/not-found'); return; }
			setDbLine(lines[index]);
			fetch();
			setUiLighterColor(getLighterColor(lines[index]?.color, 20));
			setTimeout(() => {
				setUiIsLoading(false);
				setUiActiveCircle(0); // force this to make route ref not undefined
			}, 2000);
		}
	}, [line, lines]);

	useEffect(() => {
		console.log(db_lineStations)
	}, [db_lineStations]);

	if (!lines || !stations) { return <LinePageSkeleton />; }
	if (ui_isLoading) { return <LinePageSkeleton />; }

	return (
		<>
			<div className='line-title' style={{ background: ui_lighterColor, color: getContrastingTextColor(ui_lighterColor) }}>
				<div className='line-number' style={{ background: db_line?.color, color: getContrastingTextColor(db_line.color) }}>{db_line?.prefix.real_prefix}</div>
				<div className='line-name'>{db_line?.name?.en}</div>
			</div>
			<div ref={routeRef} className='route'>
				<div className='route-line' style={{ background: ui_lighterColor }} />
				<div className='route-stations'>
					{db_lineStations?.stations?.map((station, index) => (
						<RouteStation key={station.code} line={db_line} station={station} index={index} activeCircle={ui_activeCircle} setActiveCircle={setUiActiveCircle} length={db_lineStations.stations.length - 1} lighterColor={ui_lighterColor} />
					))}
				</div>
				<div className='route-stations-mobile'>
					{db_lineStations?.stations?.map((station, index) => (
						<RouteStationMobile key={station.code} line={db_line} station={station} index={index} length={db_lineStations.stations.length - 1} lighterColor={ui_lighterColor} />
					))}
				</div>
			</div>
		</>
	)
}

export default LinePage;