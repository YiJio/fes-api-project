// packages
import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { RiArrowDownSLine, RiGitCommitFill, RiMapPinFill, RiSearchLine } from 'react-icons/ri';
// hooks
import useDbData from '../hooks/useDbData';
// assets
import logoGZMTR from '../assets/Guangzhou_Metro_icon.svg';
import imageCantonTower from '../assets/Canton_Tower.jpg';
import imageYuyinShanfang from '../assets/Yuyin_Shanfang.jpg';
import imageHuaduDistrict from '../assets/Huadu_District.jpg';
import imageHongshengshaStation from '../assets/Hongshengsha_Station_Construction.jpg';

const HomePage = () => {
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
			let results = stations.filter((station) => station.name.en.toLowerCase().includes(searchStation.toLocaleLowerCase()) && (station._service_id !== 'cr' && station._service_id !== 'prdir'));
			results = results.sort((a,b) => a.name.en.localeCompare(b.name.en, 'en', { numeric: true }));
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
		<div className='home'>
			<div className='home-full-overlay' />
			<div className='home-left'>
				<div className='home-images'>
					<div className='home-col'>
						<div className='home-image home-mask1'>
							<img src={imageCantonTower} alt='Canton Tower' style={{ transform: 'scale(1.95)', top: '80px', left: '0' }} />
							<div className='home-overlay home-overlay1' />
						</div>
						<div className='home-image home-mask2'>
							<img src={imageYuyinShanfang} alt='Yuyin Shanfang' style={{ transform: 'scale(1.75)', top: '70px', left: '150px' }} />
							<div className='home-overlay home-overlay1' />
						</div>
					</div>
					<div className='home-col'>
						<div className='home-image home-mask2'>
							<img src={imageHuaduDistrict} alt='Huadu District' style={{ transform: 'scale(1.875)', top: '90px', left: '10px' }} />
							<div className='home-overlay home-overlay2' />
						</div>
						<div className='home-image home-mask1'>
							<img src={imageHongshengshaStation} alt='Hongshengsha Station construction' style={{ transform: 'scale(1.975)', top: '120px', left: '-15px' }} />
							<div className='home-overlay home-overlay2' />
						</div>
					</div>
				</div>
			</div>
			<div className='home-right'>
				<div className='home-text'>
					<h1 className='home-title'>
						<img src={logoGZMTR} alt='Guangzhou Metro logo' style={{ width: '32px' }} />
						Guangzhou Metro
					</h1>
					<div className='home-group'>
						<div className='home-row'>
							<div className={'home-field' + (isTypingLine ? ' active' : '')}>
								<RiGitCommitFill className='home-field-svg' />
								<div className='home-input home-input-fake' onClick={() => setIsTypingLine(true)} >Search line</div>
								{isTypingLine && (<div ref={linesRef} className='home-selections'>
									<div className='home-selections-list'>
										{lines.sort((a,b) => a.name.en.localeCompare(b.name.en, 'en', { numeric: true })).map((line) => (
											<Link to={`/line/${line.code}`} className='home-selections-item' key={line._id}>{line.name.en}</Link>
										))}
									</div>
								</div>)}
								<button className='home-button' onClick={() => setIsTypingLine(true)}><RiArrowDownSLine /></button>
							</div>
						</div>
						<div className='home-row'><span>OR</span></div>
						<div className='home-row'>
							<form onSubmit={handleSearchStation}>
								<div className='home-field'>
									<RiMapPinFill className='home-field-svg' />
									<input className='home-input' type='text' value={searchStation} placeholder='Search station' onChange={(e) => { setSearchStation(e.target.value); setIsTypingStation(true) }} onFocus={() => setIsTypingStation(true)} />
									{searchStation !== '' && isTypingStation && (<div ref={stationsRef} className='home-selections'>
										<div className='home-selections-list'>
											{filteredStations.length > 0 && filteredStations.map((station) => (
												<Link to={`/station/${station.code}`} className='home-selections-item' key={station._id}>
													{station.name.en} (Line: {station.lines_served[0].toUpperCase().split('-')[1]}{/*getLineInfo(station.lines_served[0], 'name')*/})
												</Link>
											))}
											{filteredStations.length === 0 && <div className='home-empty'>No search results.</div>}
										</div>
									</div>)}
									<button className='home-button'><RiSearchLine /></button>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default HomePage;