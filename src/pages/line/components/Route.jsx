// packages
import React, { useEffect, useRef, useState } from 'react';
import { RiArrowGoBackFill, RiLoader5Fill, RiShuffleLine } from 'react-icons/ri';
// utils
import { getRouteLengths } from '../../../utils/helper';
import { getContrastingTextColor, getLighterColor } from '../../../utils/color';
// components
import SvgRouteFork from '../../../components/SvgRouteFork';
import { RouteStation, RouteStationMobile } from './RouteStation';

const RouteSkeleton = () => {
	return (
		<div style={{ marginTop: '80px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '100px' }}>
			<RiLoader5Fill className='loading-spinner' strokeWidth={2} />
		</div>
	);
}

const Route = ({ lineData, lineStations, numOfStations }) => {
	// states
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
		<div ref={routeRef} className='route'>
			<div className='route__separator' style={{ background: lighterColor }} />
			{ui_activeRoute === 'primary' && <div className='route__list'>
				{lineStations?.stations?.map((station, index) => (
					<RouteStation key={station._id} lineData={lineData} stationData={station} numOfStations={numOfStations} lineBranches={lineStations?.branches} stationIndex={index} route={'primary'} activeRoute={ui_activeRoute} setActiveRoute={handleRouteChange} activeCircle={ui_activeCircle} setActiveCircle={setUiActiveCircle} isPopoverOpen={ui_isPopoverOpen} setIsPopoverOpen={setUiIsPopoverOpen} />
				))}
			</div>}
			{lineStations?.branches?.map((branch) => (<React.Fragment key={branch.code}>
				{ui_activeRoute === branch.code && <div className='route-branch'>
					<div className='route-branch__name' style={{ background: lightestColor, color: getContrastingTextColor(lightestColor) }}>
						<RiShuffleLine strokeWidth={1} />
						Branch: {branch.name.en}
					</div>
					<div className='route-branch__back' style={{ outlineColor: lineData.color, color: lineData.color }} onClick={() => handleRouteChange('primary')}>
						<RiArrowGoBackFill />
						<span>Back to route</span>
					</div>
					<div className='route__list'>
						{branch.stations.map((station, index) => (
							<RouteStation key={station.code} lineData={lineData} stationData={station} numOfStations={branch.stations.length - 1} stationIndex={index} route={branch.code} activeRoute={ui_activeRoute} setActiveRoute={handleRouteChange} activeCircle={ui_activeCircle} setActiveCircle={setUiActiveCircle} isPopoverOpen={ui_isPopoverOpen} setIsPopoverOpen={setUiIsPopoverOpen} />
						))}
					</div>
				</div>}
			</React.Fragment>))}
		</div>
	);
}

const RouteMobile = ({ lineData, lineStations }) => {
	// variables
	let lighterColor = getLighterColor(lineData?.color, 20);
	let lightestColor = getLighterColor(lineData?.color, 50);

	return (
		<div className='route'>
			<div className='route__separator' style={{ background: lighterColor }} />
			<div className='route__list route__list--mobile'>
				{lineStations?.stations?.map((station) => (<React.Fragment key={station._id}>
					<RouteStationMobile lineData={lineData} stationData={station} />
					{station.branches.length > 0 && <>
						{lineStations?.branches?.filter((branch) => station.branches.includes(branch.code)).map((branch) => (<div key={branch.code} className='route-branch'>
							<div className='route-branch__title'>
								<div className='route-branch__line' style={{ background: lighterColor }} />
								<div className='route-branch__name' style={{ background: lightestColor, color: getContrastingTextColor(lightestColor) }}>
									<RiShuffleLine />
									{branch.name.en}
								</div>
							</div>
							<div className='route-branch__stations'>
								<div className='route-branch__line' style={{ background: `linear-gradient(180deg, ${lightestColor} 50%, ${lighterColor} 100%)` }}>
									<SvgRouteFork color={lighterColor} />
								</div>
								<div className='route__list route__list--mobile'>
									{branch.stations?.map((station) => (
										<RouteStationMobile key={station._id} lineData={lineData} stationData={station} />
									))}
								</div>
							</div>
						</div>))}
					</>}
				</React.Fragment>
				))}
			</div>
		</div>
	);
}

export { Route, RouteMobile };