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

const LandingPage = () => {
	// states
	const [filteredStations, setFilteredStations] = useState([]);
	const [isTypingLine, setIsTypingLine] = useState(false);
	const [isTypingStation, setIsTypingStation] = useState(false);
	const [searchStation, setSearchStation] = useState('');
	// refs
	const linesRef = useRef(null);
	const stationsRef = useRef(null);
	// hooks
	const { lines, stations } = useDbData();
	const navigate = useNavigate();

	const handleSearchStation = (e) => {
		e.preventDefault();
		navigate(`/search?q=${searchStation}`);
	}

	useEffect(() => {
		if (searchStation) {
			let results = stations.filter((station) => station.name.en.toLowerCase().includes(searchStation.toLocaleLowerCase()) && (station._service_id !== 'cr' && station._service_id !== 'prdir' && station._service_id !== 'fmetro')).sort((a,b) => sortByStationNameAndLineName(a, b, lines));
			setFilteredStations(results);
		}
	}, [searchStation, stations]);

	useEffect(() => {
		const handleClickOutside = (e) => {
			if (linesRef.current && !linesRef.current.contains(e.target)) { setIsTypingLine(false); }
			if (stationsRef.current && !stationsRef.current.contains(e.target)) { setIsTypingStation(false); }
		}
		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		}
	}, [linesRef, stationsRef]);

	if (!lines || !stations) { return <>Loading...</>; }

	return (
		<div className='landing'>
			<div className='landing-full-overlay' />
			<div className='landing-left'>
				<div className='landing-images'>
					<div className='landing-col'>
						<div className='landing-image landing-mask1'>
							<img src={imageCantonTower} alt='Canton Tower' style={{ transform: 'scale(1.95)', top: '80px', left: '0' }} />
							<div className='landing-overlay landing-overlay1' />
						</div>
						<div className='landing-image landing-mask2'>
							<img src={imageYuyinShanfang} alt='Yuyin Shanfang' style={{ transform: 'scale(1.75)', top: '70px', left: '150px' }} />
							<div className='landing-overlay landing-overlay1' />
						</div>
					</div>
					<div className='landing-col'>
						<div className='landing-image landing-mask2'>
							<img src={imageHuaduDistrict} alt='Huadu District' style={{ transform: 'scale(1.875)', top: '90px', left: '10px' }} />
							<div className='landing-overlay landing-overlay2' />
						</div>
						<div className='landing-image landing-mask1'>
							<img src={imageHongshengshaStation} alt='Hongshengsha Station construction' style={{ transform: 'scale(1.975)', top: '120px', left: '-15px' }} />
							<div className='landing-overlay landing-overlay2' />
						</div>
					</div>
				</div>
			</div>
			<div className='landing-right'>
				<div className='landing-text'>
					<h1 className='landing-title'>
						<img src={logoGZMTR} alt='Guangzhou Metro logo' style={{ width: '32px' }} />
						Guangzhou Metro
					</h1>
					<div className='landing-group'>
						<div className='landing-row'>
							<div className={'landing-field' + (isTypingLine ? ' active' : '')}>
								<RiGitCommitFill className='landing-field-svg' />
								<div className='landing-input landing-input-fake' onClick={() => setIsTypingLine(true)} >Search line</div>
								{isTypingLine && (<div ref={linesRef} className='landing-selections'>
									<div className='landing-selections-list'>
										{lines.sort((a,b) => a.name.en.localeCompare(b.name.en, 'en', { numeric: true })).map((line) => (
											<Link to={`/line/${line.code}`} className='landing-selections-item' key={line._id}>{line.name.en}</Link>
										))}
									</div>
								</div>)}
								<button className='landing-button' onClick={() => setIsTypingLine(true)}><RiArrowDownSLine /></button>
							</div>
						</div>
						<div className='landing-row'><span>OR</span></div>
						<div className='landing-row'>
							<form onSubmit={handleSearchStation}>
								<div className='landing-field'>
									<RiMapPinFill className='landing-field-svg' />
									<input className='landing-input' type='text' value={searchStation} placeholder='Search station' onChange={(e) => { setSearchStation(e.target.value); setIsTypingStation(true) }} onFocus={() => setIsTypingStation(true)} />
									{searchStation !== '' && isTypingStation && (<div ref={stationsRef} className='landing-selections'>
										<div className='landing-selections-list'>
											{filteredStations.length > 0 && filteredStations.map((station) => (
												<Link to={`/station/${station.code}`} className='landing-selections-item' key={station._id}>
													{station.name.en} (Line: {station.lines_served[0].toUpperCase().split('-')[1]})
												</Link>
											))}
											{filteredStations.length === 0 && <div className='landing-empty'>No search results.</div>}
										</div>
									</div>)}
									<button className='landing-button'><RiSearchLine /></button>
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