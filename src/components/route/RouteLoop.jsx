// packages
import React, { useEffect, useRef, useState } from 'react';
import { RiLoader5Fill } from 'react-icons/ri';
// css
import './route.css';
// utils
import { getRouteLengths, getStationsSplit } from '../../utils/helper';
import { getLighterColor } from '../../utils/color';
// components
import RouteStation from './RouteStation';

const RouteSkeleton = () => {
	return (
		<div style={{ marginTop: '80px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '100px' }}>
			<RiLoader5Fill className='loading-spinner' strokeWidth={2} />
		</div>
	);
}

const RouteLoop = ({ lineData, lineStations, numOfStations }) => {
	// states
	const [ui_loopStations, setUiLoopStations] = useState({ top: [], right: [], bottom: [], left: [] });
	const [ui_activeRoute, setUiActiveRoute] = useState('');
	const [ui_activeCircle, setUiActiveCircle] = useState(-1);
	const [ui_isPopoverOpen, setUiIsPopoverOpen] = useState(true);
	const [ui_isLoading, setUiIsLoading] = useState(false);
	// refs
	const routeRef = useRef(null);
	const isScrollingRef = useRef(false);
	// variables
	let lighterColor = getLighterColor(lineData?.color, 20);
	let lightestColor = getLighterColor(lineData?.color, 50);

	const handleRouteChange = (route) => {
		//console.log('route changing')
		setUiIsLoading(true);
		setUiActiveRoute(route);
		setUiActiveCircle(0);
		setUiIsPopoverOpen(true);;
		setTimeout(() => {
			setUiIsLoading(false);
		}, 200);
	}

	const handleScroll = (e) => {
		if (isScrollingRef.current) return;
		e.preventDefault();
		isScrollingRef.current = true;
		const scrollDelta = Math.sign(e.deltaY); // detect scroll direction (-1 or 1)
		let length = getRouteLengths(ui_activeRoute, lineStations);
		const nextCircle = Math.min(Math.max(ui_activeCircle + scrollDelta, 0), length);
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
		setUiIsPopoverOpen(true);
	}

	const handleKeyUp = (e) => {
		switch (e.code) {
			case 'Space': setUiIsPopoverOpen((prev) => !prev); break;
			case 'ArrowLeft': {
				setUiActiveCircle((prev) => ui_activeCircle - 1 > 0 ? prev - 1 : 0);
				setUiIsPopoverOpen(true);
				break;
			}
			case 'ArrowRight': {
				let length = getRouteLengths(ui_activeRoute, lineStations);
				setUiActiveCircle((prev) => ui_activeCircle + 1 < length ? prev + 1 : length);
				setUiIsPopoverOpen(true);
				break;
			}
		}
	}

	useEffect(() => {
		// force this to make route ref not undefined
		setUiActiveRoute('primary');
		setUiActiveCircle(0);
	}, []);

	useEffect(() => {
		if (lineStations) {
			setUiIsLoading(true);
			const { topStations, rightStations, bottomStations, leftStations } = getStationsSplit(lineStations.stations);
			setUiLoopStations({ top: topStations, right: rightStations, bottom: bottomStations, left: leftStations });
			setUiIsLoading(false);
		}
	}, [lineStations]);

	useEffect(() => {
		// having errors when deployed, for now void it
		// try just doing the window instead of ref
		window.addEventListener('wheel', handleScroll, { passive: false });
		document.addEventListener('keyup', handleKeyUp);
		return () => {
			document.removeEventListener('keyup', handleKeyUp);
			window.removeEventListener('wheel', handleScroll);
		};
	}, [ui_activeCircle]);

	if (ui_isLoading) { return <RouteSkeleton />; }

	return (
		<div ref={routeRef} className='c-route'>
			<div className='c-route__separator' style={{ background: lighterColor }} />
			{ui_activeRoute === 'primary' && <div className='c-route__list c-route__list--loop'>
				<div className='c-route__row c-route__row--top'>
					{ui_loopStations?.top?.map((station, index) => <RouteStation key={station._id} lineData={lineData} stationData={station} numOfStations={numOfStations} numOfStationsRow={ui_loopStations.top.length} lineBranches={lineStations?.branches} stationIndex={index} route={'primary'} activeRoute={ui_activeRoute} setActiveRoute={handleRouteChange} activeCircle={ui_activeCircle} setActiveCircle={setUiActiveCircle} isPopoverOpen={ui_isPopoverOpen} setIsPopoverOpen={setUiIsPopoverOpen} />)}
				</div>
				<div className='c-route__side c-route__side--left'>
					{ui_loopStations?.left?.map((station, index) => <RouteStation key={station._id} lineData={lineData} stationData={station} numOfStations={numOfStations} numOfStationsRow={ui_loopStations.top.length + ui_loopStations.right.length} lineBranches={lineStations?.branches} stationIndex={index + ui_loopStations.top.length + ui_loopStations.right.length + ui_loopStations.bottom.length} isSide={true} route={'primary'} activeRoute={ui_activeRoute} setActiveRoute={handleRouteChange} activeCircle={ui_activeCircle} setActiveCircle={setUiActiveCircle} isPopoverOpen={ui_isPopoverOpen} setIsPopoverOpen={setUiIsPopoverOpen} />)}
				</div>
				<div className='c-route__side c-route__side--right'>
					{ui_loopStations?.right?.map((station, index) => <RouteStation key={station._id} lineData={lineData} stationData={station} numOfStations={numOfStations} numOfStationsRow={ui_loopStations.top.length + ui_loopStations.right.length + ui_loopStations.bottom.length} lineBranches={lineStations?.branches} stationIndex={index + ui_loopStations.top.length} isSide={true} route={'primary'} activeRoute={ui_activeRoute} setActiveRoute={handleRouteChange} activeCircle={ui_activeCircle} setActiveCircle={setUiActiveCircle} isPopoverOpen={ui_isPopoverOpen} setIsPopoverOpen={setUiIsPopoverOpen} />)}
				</div>
				<div className='c-route__row c-route__row--bottom'>
					{ui_loopStations?.bottom?.map((station, index) => <RouteStation key={station._id} lineData={lineData} stationData={station} numOfStations={numOfStations} numOfStationsRow={ui_loopStations.top.length + ui_loopStations.right.length + ui_loopStations.bottom.length + ui_loopStations.left.length}lineBranches={lineStations?.branches} stationIndex={index + ui_loopStations.top.length + ui_loopStations.right.length} route={'primary'} activeRoute={ui_activeRoute} setActiveRoute={handleRouteChange} activeCircle={ui_activeCircle} setActiveCircle={setUiActiveCircle} isPopoverOpen={ui_isPopoverOpen} setIsPopoverOpen={setUiIsPopoverOpen} />)}
				</div>
			</div>}
		</div>
	);
}

export default RouteLoop;