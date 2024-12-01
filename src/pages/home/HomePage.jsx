// packages
import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { RiEmotionUnhappyLine } from 'react-icons/ri';
// css
import './home.css';
// hooks
import useDbData from '../../hooks/useDbData';
// utils
import { getContrastingTextColor } from '../../utils/color';

// constants
const SHOW_SERVICES = ['gzmtr', 'guangfometro'];
const SHOW_STATUSES = ['in operation', 'under construction', 'planning'];

const HomePage = () => {
	// hooks
	const { lines, stations } = useDbData();
	const navigate = useNavigate();

	const goToRandomLine = () => {
		let max = lines.length - 1;
		let min = 0;
		let random = -1;
		do {
			random = Math.round(Math.random() * (max - min) + min);
		} while(!SHOW_SERVICES.includes(lines[random]._service_id));
		navigate(`/line/${lines[random]._id}`);
	}

	const goToRandomStation = () => {
		let max = stations.length - 1;
		let min = 0;
		let random = Math.round(Math.random() * (max - min) + min);
		navigate(`/station/${stations[random]._id}`);
	}

	useEffect(() => {
		document.title = 'Guangzhou Metro';
	}, []);	

	if (!lines || !stations) { return <>Loading...</>; }

	return (
		<div className='home'>
			<div className='home__nav'>
				<Link to='/credits' className='home__nav__item'>Credits</Link>
				<Link to='/search' className='home__nav__item'>Search</Link>
				<div className='home__nav__item' onClick={goToRandomLine}>Random line</div>
				<div className='home__nav__item' onClick={goToRandomStation}>Random station</div>
			</div>
			<div className='home__intro'>
				<div className='home__intro__title'>Welcome to the Guangzhou Metro project.</div>
				<p className='home__paragraph'>This is a project that utilizes the <b>Canton Passenger Rail Transit (PRT) API</b> that I created.</p>
				<p className='home__paragraph'>You can search for stations through the search bar and also view line routes.</p>
			</div>
			{SHOW_STATUSES.map((status, index) => (<React.Fragment key={index}>
				<h3 className='home__heading'>Lines currently {status}</h3>
				<div className='home__line-list'>
				{lines?.filter((line) => SHOW_SERVICES.includes(line._service_id) && line.status === status).sort((a, b) => a.name.en.localeCompare(b.name.en, 'en', { numeric: true })).map((line) => (
					<Link to={`/line/${line._id}`} key={line._id} className='home__line-list__item' style={{ background: line.color && line.color !== '' ? line.color : '#c3c3c3', color: line.color && line.color !== '' ? getContrastingTextColor(line.color) : 'var(--color-black)' }}>
						{line.name.en}
					</Link>
				))}
			</div>
			</React.Fragment>))}
		</div>
	)
}

export default HomePage;