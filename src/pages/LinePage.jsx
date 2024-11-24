// packages
import React, { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
// hooks
import useDbData from '../hooks/useDbData';
// utils
import { fetchLineStations } from '../utils/fetch';
import { getContrastingTextColor, getLighterColor } from '../utils/color';
// components
import RouteStation from '../components/RouteStation';
// assets

const LinePage = () => {
	// variables
	const _path = useLocation().pathname;
	const _lineId = _path.split('/').pop();
	// hooks
	const { lines, stations } = useDbData();
	// states
	const [db_line, setDbLine] = useState({});
	const [db_lineStations, setDbLineStations] = useState({});
	const [isLoading, setIsLoading] = useState(true);
	const [uiLighterColor, setUiLighterColor] = useState('');
	const [ui_activeCircle, setUiActiveCircle] = useState(0);

	const handleScroll = () => {
		const scrollY = window.scrollY; // Current scroll position
		const documentHeight = document.body.scrollHeight - window.innerHeight; // Total scrollable height
		const scrollFraction = scrollY / documentHeight;

		// Determine the active circle based on scroll progress
		const currentCircle = Math.min(
			Math.ceil(scrollFraction * 10),
			10
		);
		console.log(currentCircle)
		setUiActiveCircle(currentCircle);
	}

	useEffect(() => {
		window.addEventListener('scroll', handleScroll);
		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	}, []);

	useEffect(() => {
		const fetch = async () => {
			let stations = await fetchLineStations(_lineId);
			setDbLineStations(stations);
			await new Promise((resolve) => setTimeout(resolve, 1000));
		}
		if (_lineId && lines) {
			let index = lines.findIndex(l => l._id == _lineId);
			setDbLine(lines[index]);
			fetch();
			setUiLighterColor(getLighterColor(lines[index]?.color, 20));
			setIsLoading(false);
		}
	}, [_lineId, lines]);

	useEffect(() => {
		console.log(db_lineStations)
	}, [db_lineStations])

	if (!lines || !stations) { return <>Loading...</>; }
	if (isLoading) { return <>Loading...</> }

	return (
		<>
			<div className='line-title' style={{ background: uiLighterColor, color: getContrastingTextColor(uiLighterColor) }}>
				<div className='line-number' style={{ background: db_line?.color, color: getContrastingTextColor(db_line.color) }}>{db_line?.prefix.real_prefix}</div>
				<div className='line-name'>{db_line?.name?.en}</div>
			</div>
			<div className='route'>
				<div className='route-line' style={{ background: uiLighterColor }} />
				<div className='route-stations'>
					{db_lineStations?.stations?.map((station, index) => (<>
						<RouteStation key={station.code} line={db_line} station={station} index={index} activeCircle={ui_activeCircle} setActiveCircle={setUiActiveCircle} length={db_lineStations.stations.length - 1} lighterColor={uiLighterColor} />
					</>))}
				</div>
			</div>
			{/*<div className='route-test'>
				<svg className='route-path' viewBox='0 0 200 400' xmlns='http://www.w3.org/2000/svg'>
					<line x1="10" y1="20" x2="90" y2="20" className="path-line" />
					<line x1="90" y1="20" x2="10" y2="80" className="path-line" />
					<line x1="10" y1="80" x2="90" y2="80" className="path-line" />
					<line x1="90" y1="80" x2="10" y2="140" className="path-line" />
					<line x1="10" y1="140" x2="90" y2="140" className="path-line" />
					{Array.from({ length: 10 }).map((_, index) => {
						console.log('active', ui_activeCircle)
						//const isActive = index + 1 <= ui_activeCircle;
						return (
							<circle
								key={index}
								cx={(index % 2 === 0 ? 10 : 90) + ""}
								cy={20 + Math.floor(index / 2) * 60}
								r="10"
								className={`path-circle ${ui_activeCircle === index ? 'active' : ''}`}
							/>
						);
					})}
				</svg>
			</div>*/}
		</>
	)
}

export default LinePage;