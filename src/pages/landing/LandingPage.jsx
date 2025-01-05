// packages
import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { RiArrowDownSLine, RiGitCommitFill, RiMapPinFill, RiSearchLine } from 'react-icons/ri';
// css
import './landing.css';
// hooks
import useDbData from '../../hooks/useDbData';
import useSearchFilter from '../../hooks/useSearchFilter';
// components
import { IconGZMTR } from '../../components/icons/SvgService';
import LandingPageSkeleton from './LandingPageSkeleton';
// assets
import imageCantonTower from '../../assets/Canton_Tower.jpg';
import imageYuyinShanfang from '../../assets/Yuyin_Shanfang.jpg';
import imageHuaduDistrict from '../../assets/Huadu_District.jpg';
import imageHongshengshaStation from '../../assets/Hongshengsha_Station_Construction.jpg';

const LandingPage = () => {
	// hooks
	const { lines, stations } = useDbData();
	const { query, setQuery, filteredLines, filteredStations, isLineDataReady, isStationDataReady } = useSearchFilter(lines, stations);
	const navigate = useNavigate();
	// states
	const [ui_isLoading, setUiIsLoading] = useState(true);
	const [ui_isTypingLine, setUiIsTypingLine] = useState(false);
	const [ui_isTypingStation, setUiIsTypingStation] = useState(false);
	// refs
	const linesRef = useRef(null);
	const stationsRef = useRef(null);

	const handleSearchStation = (e) => {
		e.preventDefault();
		navigate(`/search?q=${query}`);
	}

	const getHighlightedText = (text, highlight) => {
		const regex = new RegExp(`(${highlight})`, 'gi');
		return text.split(regex).map((part, index) => part.toLowerCase() === highlight.toLowerCase() ? (<span key={index}>{part}</span>) : (part));
	}

	useEffect(() => {
		document.title = 'Guangzhou Metro';
		setTimeout(() => {
			setUiIsLoading(false);
		}, 500);
	}, []);

	useEffect(() => {
		const handleClickOutside = (e) => {
			if (linesRef.current && !linesRef.current.contains(e.target)) { setUiIsTypingLine(false); }
			if (stationsRef.current && !stationsRef.current.contains(e.target)) { setUiIsTypingStation(false); }
		}
		document.addEventListener('mousedown', handleClickOutside);
		return () => { document.removeEventListener('mousedown', handleClickOutside); }
	}, [linesRef, stationsRef]);

	if (!lines || !stations || ui_isLoading) { return <LandingPageSkeleton />; }

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
						<IconGZMTR width='32px' height='32px' strokeWidth='4px' />
						Guangzhou Metro
					</Link>
					<div className='landing-intro__group'>
						<div className='row'>
							<div ref={linesRef} className={'field' + (ui_isTypingLine ? ' active' : '')}>
								<RiGitCommitFill />
								<div className='input input--fake' onClick={() => setUiIsTypingLine((prev) => !prev)} >Search line</div>
								{ui_isTypingLine && (<div className='selections'>
									<div className='selections__list'>
										{filteredLines.map((line) => (
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
									<input className='input' type='text' value={query} placeholder='Search station' onChange={(e) => { setQuery(e.target.value); setUiIsTypingStation(true) }} onFocus={() => setUiIsTypingStation(true)} />
									{query !== '' && ui_isTypingStation && (<div className='selections'>
										<div className='selections__list'>
											{filteredStations.length > 0 && filteredStations.map((station) => (
												<Link to={`/station/${station._id}`} className='selections__item' key={station._id}>
													{getHighlightedText(station.name.en, query)} (Line: {station.lines_served[0].toUpperCase().split('-')[2]})
												</Link>
											))}
											{filteredStations.length === 0 && <div className='empty'>No search results.</div>}
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