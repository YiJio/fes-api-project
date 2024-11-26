// packages
import React, { useEffect, useRef, useState } from 'react';
import { RiArrowGoBackFill, RiLoader5Fill, RiShuffleLine } from 'react-icons/ri';
// utils
import { getContrastingTextColor, getLighterColor } from '../utils/color';
// components
import { RouteStation, RouteStationMobile } from '../components/RouteStation';
import RouteFork from './RouteFork';
// assets

const RouteSkeleton = () => {
	return (
		<div style={{ marginTop: '80px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '100px' }}>
			<RiLoader5Fill className='loading-spinner' strokeWidth={2} />
		</div>
	)
}

const Route = ({ line, lineStations, length, lighterColor, lightestColor }) => {
	// states
	const [ui_activeRoute, setUiActiveRoute] = useState('');
	const [ui_activeCircle, setUiActiveCircle] = useState(-1);
	const [ui_isLoading, setUiIsLoading] = useState(false);
	// refs
	const containerRef = useRef(null);
	const routeRef = useRef(null);
	const isScrollingRef = useRef(false);

	// probably just better with displaying than scrolling into view
	// because there may be more stations that get off viewport
	/*const scrollToRoute = (route) => {
		console.log('scrolling')
		const container = containerRef.current;
		const height = container.offsetHeight;
		const position = height * 520;
		console.log(height, position)
		container.scrollTo({ top: 520, behavior: 'smooth' });
	}*/

	const handleRouteChange = (route) => {
		setUiIsLoading(true);
		setUiActiveRoute(route);
		setUiActiveCircle(0);
		setTimeout(() => {
			setUiIsLoading(false);
		}, 200);
	}

	const handleScroll = (e) => {
		if (isScrollingRef.current) return;
		e.preventDefault();
		isScrollingRef.current = true;
		const scrollDelta = Math.sign(e.deltaY); // detect scroll direction (-1 or 1)
		let length = lineStations.stations.length - 1;
		if (ui_activeRoute !== 'primary') {
			let branches = lineStations.branches;
			const index = branches.findIndex((branch) => branch.code === ui_activeRoute);
			length = branches[index].stations.length - 1;
		}
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
	}

	useEffect(() => {
		// force this to make route ref not undefined
		setUiActiveRoute('primary');
		setUiActiveCircle(0);
	}, []);

	// having errors when deployed, for now void it
	// try just doing the window instead of ref
	useEffect(() => {
		console.log(ui_activeCircle)
		window.addEventListener('wheel', handleScroll, { passive: false });
		return () => { window.removeEventListener('wheel', handleScroll); };
	}, [ui_activeCircle]);

	if (ui_isLoading) { return <RouteSkeleton />; }

	return (
		<div ref={routeRef} className='route'>
			<div className='route-line' style={{ background: lighterColor }} />
			{ui_activeRoute === 'primary' && <div className='route-stations'>
				{lineStations?.stations?.map((station, index) => (
					<RouteStation key={station.code} line={line} station={station} index={index} route={'primary'} activeRoute={ui_activeRoute} setActiveRoute={handleRouteChange} activeCircle={ui_activeCircle} setActiveCircle={setUiActiveCircle} length={length} lighterColor={lighterColor} lineBranches={lineStations?.branches} />
				))}
			</div>}
			{lineStations?.branches?.map((branch) => (
				<div key={branch.code}>
					{ui_activeRoute === branch.code && <div className='route-branch'>
						<div className='route-branch-name' style={{ background: lightestColor, color: getContrastingTextColor(lightestColor) }}>
							<RiShuffleLine strokeWidth={1} />
							Branch: {branch.name.en}
						</div>
						<div className='route-branch-back' style={{ outlineColor: line.color, color: line.color }} onClick={() => handleRouteChange('primary')}>
							<RiArrowGoBackFill />
							<span>Back to route</span>
						</div>
						<div className='route-stations'>
							{branch.stations.map((station, index) => (
								<RouteStation key={station.code} line={line} station={station} index={index} route={branch.code} activeRoute={ui_activeRoute} setActiveRoute={handleRouteChange} activeCircle={ui_activeCircle} setActiveCircle={setUiActiveCircle} length={branch.stations.length - 1} lighterColor={lighterColor} />
							))}
						</div>
					</div>}
				</div>
			))}
		</div>
	);
}

const RouteMobile = ({ line, lineStations, length, lighterColor, lightestColor }) => {

	useEffect(() => {
		const temp = lineStations.branches;
		console.log(temp[0].code)
	}, [lineStations])


	return (
		<div className='route'>
			<div className='route-line' style={{ background: lighterColor }} />
			<div className='route-stations-mobile'>
				{lineStations?.stations?.map((station, index) => (
					<RouteStationMobile key={station.code} line={line} station={station} index={index} length={length} lighterColor={lighterColor} />
				))}
				{lineStations?.branches?.map((branch) => (<div key={branch.code} className='route-branch'>
					<div className='route-branch-title'>
						<div className='route-branch-line' style={{ background: lighterColor }} />
						<div className='route-branch-name' style={{ background: lightestColor, color: getContrastingTextColor(lightestColor) }}>
							<RiShuffleLine strokeWidth={1} />
							{branch.name.en}
						</div>
					</div>
					<div className='route-branch-stations'>
						<div className='route-branch-line' style={{ background: `linear-gradient(180deg, ${lightestColor} 50%, ${lighterColor} 100%)` }}>
							<RouteFork color={lighterColor} />
						</div>
						<div className='route-stations-mobile'>
							{branch.stations?.map((station, index) => (
								<RouteStationMobile key={station.code} line={line} station={station} index={index} length={branch.stations.length - 1} lighterColor={lighterColor} />
							))}
						</div>
					</div>
				</div>))}
			</div>
		</div>
	);
}

export { Route, RouteMobile };