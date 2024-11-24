// packages
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { RiArrowDownSLine, RiGitCommitLine, RiMapPinFill, RiSearchLine } from 'react-icons/ri';
// assets
import imageCantonTower from '../assets/Canton_Tower.jpg';
import imageYuyinShanfang from '../assets/Yuyin_Shanfang.jpg';
import imageHuaduDistrict from '../assets/Huadu_District.jpg';
import imageHongshengshaStation from '../assets/Hongshengsha_Station_Construction.jpg';
import { useRef } from 'react';

// important variables
const API_KEY = import.meta.env.VITE_API_KEY;

const HomePage = () => {
	// states
	const [lines, setLines] = useState([]);
	const [stations, setStations] = useState([]);
	const [filteredStations, setFilteredStations] = useState([]);
	const [isTypingLine, setIsTypingLine] = useState(false);
	const [searchLine, setSearchLine] = useState('');
	const [isTypingStation, setIsTypingStation] = useState(false);
	const [searchStation, setSearchStation] = useState('');
	// refs
	const linesRef = useRef(null);
	const stationsRef = useRef(null);
	// hooks
	const navigate = useNavigate();

	const fetchLines = async () => {
		try {
			const response = await fetch(`https://api.cantonprtapi.com/lines`, {
				method: 'GET',
				headers: { 'X-Api-Key': API_KEY, },
			});
			const data = await response.json();
			localStorage.setItem('lines', JSON.stringify(data));
			setLines(data);
		} catch (error) {
			console.error('Error fetching station data.', error);
		}
	}

	const fetchStations = async () => {
		try {
			const response = await fetch(`https://api.cantonprtapi.com/stations`, {
				method: 'GET',
				headers: { 'X-Api-Key': API_KEY, },
			});
			const data = await response.json();
			localStorage.setItem('stations', JSON.stringify(data));
			setStations(data);
		} catch (error) {
			console.error('Error fetching station data.', error);
		}
	}

	const getLineName = (line) => {
		let index = lines.findIndex(l => l._id === line);
		return lines[index]?.name.en;
	}

	useEffect(() => {
		// temporary
		let theLines = localStorage.getItem('lines');
		let theStations = localStorage.getItem('stations');
		setLines(JSON.parse(theLines));
		setStations(JSON.parse(theStations));
		if (!theLines) fetchLines();
		if (!theStations) fetchStations();
	}, []);

	useEffect(() => {
		if (searchStation) {
			let results = stations.filter((station) => station.name.en.toLowerCase().includes(searchStation.toLocaleLowerCase()));
			setFilteredStations(results);
		}
	}, [searchStation, stations]);

	useEffect(() => {
		const handleClickOutside = (e) => {
			if(linesRef.current && !linesRef.current.contains(e.target)) { setIsTypingLine(false); }
			if(stationsRef.current && !stationsRef.current.contains(e.target)) { setIsTypingStation(false); }
		}
		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		}
	}, [linesRef, stationsRef]);
	

	return (
		<div className='home'>
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
				<h1 className='home-title'>Guangzhou Metro</h1>
				<div className='home-group'>
					<div className='home-row'>
						<div className='home-field'>
							<RiGitCommitLine className='home-field-svg' />
							<input className='home-input' type='text' value={searchLine} placeholder='Search line' onChange={(e) => setSearchLine(e.target.value)} onFocus={() => setIsTypingLine(true)} />
							{searchLine !== '' || isTypingLine && (<div ref={linesRef} className='home-selections'>
								<div className='home-selections-list'>
									{lines.map((line) => (
										<Link to={`/line/${line.code}`} className='home-selections-item' key={line._id}>{line.name.en}</Link>
									))}
								</div>
							</div>)}
							<button className='home-button' onClick={() => setIsTypingLine(true)}><RiArrowDownSLine /></button>
						</div>
					</div>
					<div className='home-row'><span>OR</span></div>
					<div className='home-row'>
						<div className='home-field'>
							<RiMapPinFill className='home-field-svg' />
							<input className='home-input' type='text' value={searchStation} placeholder='Search station' onChange={(e) => setSearchStation(e.target.value)} onFocus={() => setIsTypingStation(true)} />
							{searchStation !== '' && isTypingStation && (<div ref={stationsRef} className='home-selections'>
								<div className='home-selections-list'>
									{filteredStations.length > 0 && filteredStations.map((station) => (
										<Link to={`/station/${station.code}`} className='home-selections-item' key={station._id}>{station.name.en} ({getLineName(station.lines_served[0])})</Link>
									))}
									{filteredStations.length === 0 && <div className='home-empty'>No searchStation results.</div>}
								</div>
							</div>)}
							<button className='home-button'><RiSearchLine /></button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default HomePage;