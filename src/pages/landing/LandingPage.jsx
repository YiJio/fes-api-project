// packages
import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { RiArrowDownSLine, RiGitCommitFill, RiMapPinFill, RiSearchLine } from 'react-icons/ri';
// css
import './landing.css';
// hooks
import useDbData from '../../hooks/useDbData';
// utils
import { sortByStationNameAndLineName } from '../../utils/helper';
// assets
import logoGZMTR from '../../assets/Guangzhou_Metro_icon.svg';
import imageCantonTower from '../../assets/Canton_Tower.jpg';
import imageYuyinShanfang from '../../assets/Yuyin_Shanfang.jpg';
import imageHuaduDistrict from '../../assets/Huadu_District.jpg';
import imageHongshengshaStation from '../../assets/Hongshengsha_Station_Construction.jpg';

// constants
const SHOW_SERVICES = ['gzmtr', 'guangfometro'];

const LandingPage = () => {
	// states
	const [ui_lines, setUiLines] = useState([]);
	const [ui_filteredStations, setUiFilteredStations] = useState([]);
	const [ui_isTypingLine, setUiIsTypingLine] = useState(false);
	const [ui_isTypingStation, setUiIsTypingStation] = useState(false);
	const [ui_searchStation, setUiSearchStation] = useState('');
	// refs
	const linesRef = useRef(null);
	const stationsRef = useRef(null);
	// hooks
	const { lines, stations } = useDbData();
	const navigate = useNavigate();

	const handleSearchStation = (e) => {
		e.preventDefault();
		navigate(`/search?q=${ui_searchStation}`);
	}

	const filterStations = (search) => {
		let results = [];
		if (search === '') {
			results = stations.filter((station) => SHOW_SERVICES.includes(station._service_id)).sort((a, b) => sortByStationNameAndLineName(a, b, lines));
		} else {
			results = stations.filter((station) => station.name.en.toLowerCase().includes(search.toLocaleLowerCase()) && SHOW_SERVICES.includes(station._service_id)).sort((a, b) => sortByStationNameAndLineName(a, b, lines));
		}
		setUiFilteredStations(results);
	}

	useEffect(() => {
		document.title = 'Guangzhou Metro';
	}, []);

	useEffect(() => {
		if (lines) {
			let results = lines.filter((line) => SHOW_SERVICES.includes(line._service_id)).sort((a, b) => a.name.en.localeCompare(b.name.en, 'en', { numeric: true }));
			setUiLines(results);
		}
		if (stations) { filterStations(''); }
	}, [stations, lines]);

	useEffect(() => {
		const handleClickOutside = (e) => {
			if (linesRef.current && !linesRef.current.contains(e.target)) { setUiIsTypingLine(false); }
			if (stationsRef.current && !stationsRef.current.contains(e.target)) { setUiIsTypingStation(false); }
		}
		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		}
	}, [linesRef, stationsRef]);

	useEffect(() => {
		if (ui_searchStation) { filterStations(ui_searchStation); }
	}, [ui_searchStation]);

	if (!lines || !stations) { return <>Loading...</>; }
	

	return (
		<div className='landing'>
			<div className='landing__full-overlay' />
			<div className='landing__left'>
				<div className='landing-images'>
					<div className='col'>
						<div className='landing-images__wrapper landing-images__mask--1'>
							<img src={imageCantonTower} alt='Canton Tower' className='landing-images__image' style={{ transform: 'scale(1.95)', top: '80px', left: '0' }} />
							<div className='landing-images__overlay landing-images__overlay--1' />
						</div>
						<div className='landing-images__wrapper landing-images__mask--2'>
							<img src={imageYuyinShanfang} alt='Yuyin Shanfang' className='landing-images__image' style={{ transform: 'scale(1.75)', top: '70px', left: '150px' }} />
							<div className='landing-images__overlay landing-images__overlay--1' />
						</div>
					</div>
					<div className='col'>
						<div className='landing-images__wrapper landing-images__mask--2'>
							<img src={imageHuaduDistrict} alt='Huadu District' className='landing-images__image' style={{ transform: 'scale(1.875)', top: '90px', left: '10px' }} />
							<div className='landing-images__overlay landing-images__overlay--2' />
						</div>
						<div className='landing-images__wrapper landing-images__mask--1'>
							<img src={imageHongshengshaStation} alt='Hongshengsha Station construction' className='landing-images__image' style={{ transform: 'scale(1.975)', top: '120px', left: '-15px' }} />
							<div className='landing-images__overlay landing-images__overlay--2' />
						</div>
					</div>
				</div>
			</div>
			<div className='landing__right'>
				<div className='landing-intro'>
					<Link to='/home' className='landing-intro__title'>
						<img src={logoGZMTR} alt='Guangzhou Metro logo' style={{ width: '32px' }} />
						Guangzhou Metro
					</Link>
					<div className='landing-intro__group'>
						<div className='row'>
							<div ref={linesRef} className={'field' + (ui_isTypingLine ? ' active' : '')}>
								<RiGitCommitFill />
								<div className='input input--fake' onClick={() => setUiIsTypingLine((prev) => !prev)} >Search line</div>
								{ui_isTypingLine && (<div className='selections'>
									<div className='selections__list'>
										{ui_lines.map((line) => (
											<Link to={`/line/${line._id}`} className='selections__item' key={line._id}>{line.name.en}</Link>
										))}
									</div>
								</div>)}
								<button className='button' onClick={() => setUiIsTypingLine((prev) => !prev)}><RiArrowDownSLine /></button>
							</div>
						</div>
						<div className='row'><span>OR</span></div>
						<div className='row'>
							<form onSubmit={handleSearchStation}>
								<div ref={stationsRef} className='field'>
									<RiMapPinFill />
									<input className='input' type='text' value={ui_searchStation} placeholder='Search station' onChange={(e) => { setUiSearchStation(e.target.value); setUiIsTypingStation(true) }} onFocus={() => setUiIsTypingStation(true)} />
									{ui_searchStation !== '' && ui_isTypingStation && (<div className='selections'>
										<div className='selections__list'>
											{ui_filteredStations.length > 0 && ui_filteredStations.map((station) => (
												<Link to={`/station/${station._id}`} className='selections__item' key={station._id}>
													{station.name.en} (Line: {station.lines_served[0].toUpperCase().split('-')[2]})
												</Link>
											))}
											{ui_filteredStations.length === 0 && <div className='empty'>No search results.</div>}
										</div>
									</div>)}
									<button className='button'><RiSearchLine /></button>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default LandingPage;