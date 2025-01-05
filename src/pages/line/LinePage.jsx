// packages
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
// css
import './line.css';
// hooks
import useDbData from '../../hooks/useDbData';
// utils
import { fetchLineStations } from '../../utils/fetch';
import { getContrastingTextColor, getLighterColor } from '../../utils/color';
// components
import ControlsBox from '../../components/controls/ControlsBox';
import { Route, RouteLoop, RouteMobile } from '../../components/route';
import LinePageSkeleton from './LinePageSkeleton';

const LinePage = () => {
	// hooks
	const { lineId } = useParams();
	const navigate = useNavigate();
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
			let lineStations = await fetchLineStations(lineId);
			if (!lineStations) { navigate('/not-found'); return; }
			if(lineStations.stations.length === 0) { navigate('/not-found'); return; }
			setDbLineStations(lineStations);
			setUiLighterColor(getLighterColor(lines[index]?.color, 20));
			setTimeout(() => {
				setUiIsLoading(false);
			}, 1000);
		}
		if (lineId && lines) {
			setDbLine(null);
			setDbLineStations(null);
			setUiIsLoading(true);
			setUiLighterColor('');
			let index = lines.findIndex(l => l._id == lineId);
			if (index === -1) { navigate('/not-found'); return; }
			setDbLine(lines[index]);
			document.title = `${lines[index].full_name.en} | Guangzhou Metro`;
			fetch(index);
		}
	}, [lineId, lines]);

	if (!lines || !stations || ui_isLoading) { return <LinePageSkeleton />; }

	return (
		<>
			<ControlsBox />
			<div className='c-line-title' style={{ background: ui_lighterColor, color: getContrastingTextColor(ui_lighterColor) }}>
				<div className='c-line-title__number' style={{ background: db_line?.color, color: getContrastingTextColor(db_line?.color) }}>{db_line?.prefix.real_prefix}</div>
				<div className='c-line-title__name'>{db_line?.name?.en}</div>
			</div>
			{!ui_isMobile ? <>
				{db_line.is_loop ? <RouteLoop lineData={db_line} lineStations={db_lineStations} numOfStations={db_lineStations?.stations.length - 1} /> : <Route lineData={db_line} lineStations={db_lineStations} numOfStations={db_lineStations?.stations.length - 1} />}
			</> : <>
				<RouteMobile lineData={db_line} lineStations={db_lineStations} numOfStations={db_lineStations?.stations.length - 1} />
			</>}
		</>
	);
}

export default LinePage;