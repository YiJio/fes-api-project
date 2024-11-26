// packages
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';
import { RiLoader5Fill } from 'react-icons/ri';
// hooks
import useDbData from '../hooks/useDbData';
// utils
import { fetchLineStations } from '../utils/fetch';
import { getContrastingTextColor, getLighterColor } from '../utils/color';
// components
import { Route, RouteMobile } from '../components/Route';
// assets

const LinePageSkeleton = () => {
	return (
		<>
			<Skeleton className='line-title' count={1} height='56px' />
			<div className='route'>
				<Skeleton className='route-line' count={1} />
				<div style={{ marginTop: '80px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '100px' }}>
					<RiLoader5Fill className='loading-spinner' strokeWidth={2} />
				</div>
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
	const [ui_isMobile, setUiIsMobile] = useState(true);
	const [ui_isLoading, setUiIsLoading] = useState(true);
	const [ui_lighterColor, setUiLighterColor] = useState('');

	useEffect(() => {
		const handleResize = () => {
			const isMobile = window.innerWidth <= 600;
			setUiIsMobile(isMobile);
		}
		window.addEventListener('resize', handleResize);
		handleResize();
		return () => { window.removeEventListener('resize', handleResize); }
	}, []);

	useEffect(() => {
		const fetch = async (index) => {
			let lineStations = await fetchLineStations(line);
			if (!lineStations) { navigate('/not-found'); return; }
			console.log(lineStations)
			if(lineStations.stations.length === 0) { navigate('/not-found'); return; }
			setDbLineStations(lineStations);
			setUiLighterColor(getLighterColor(lines[index]?.color, 20));
			setTimeout(() => {
				setUiIsLoading(false);
			}, 1000);
		}
		if (line && lines) {
			setDbLine(null);
			setDbLineStations(null);
			setUiIsLoading(true);
			setUiLighterColor('');
			let index = lines.findIndex(l => l._id == line);
			if (index === -1) { navigate('/not-found'); return; }
			setDbLine(lines[index]);
			fetch(index);
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
			{!ui_isMobile ? <>
				<Route line={db_line} lineStations={db_lineStations} length={db_lineStations.stations.length - 1} lighterColor={ui_lighterColor} lightestColor={getLighterColor(db_line?.color, 50)} />
			</> : <>
				<RouteMobile line={db_line} lineStations={db_lineStations} length={db_lineStations.stations.length - 1} lighterColor={ui_lighterColor} lightestColor={getLighterColor(db_line?.color, 50)} />
			</>}
		</>
	)
}

export default LinePage;