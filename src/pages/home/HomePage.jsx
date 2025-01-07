// packages
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
// hooks
import useDbData from '../../hooks/useDbData';
// utils
import { getContrastingTextColor } from '../../utils/color';
// components
import Nav from '../../components/Nav';
import HomePageSkeleton from './HomePageSkeleton';
import IconService from '../../components/IconService';

// constants
const SHOW_SERVICES = ['gzmtr', 'guangfometro', 'fmetro'];
const SHOW_STATUSES = ['in operation', 'under construction', 'planning'];

const HomePage = () => {
	// hooks
	const { lines, stations } = useDbData();
	// states
	const [ui_isLoading, setUiIsLoading] = useState(true);

	useEffect(() => {
		document.title = 'Guangzhou Metro';
		setTimeout(() => {
			setUiIsLoading(false);
		}, 50);
	}, []);

	if (!lines || !stations || ui_isLoading) { return <HomePageSkeleton />; }

	return (
		<>
			<Nav currentPage='home' lines={lines} stations={stations} />
			<div className='l-wrapper l-wrapper--intro'>
				<div className='c-title c-title--intro'>Welcome to the Guangzhou Metro project.</div>
				<p>This is a project that utilizes the <b>Canton Passenger Rail Transit (PRT) API</b> that I created. The lines and stations I chose to show in this project are from <b>Guangzhou</b> and some parts of <b>Foshan</b>.</p>
				<p>You can search for stations through the search bar and also view line routes.</p>
			</div>
			{SHOW_STATUSES.map((status, index) => (<React.Fragment key={index}>
				<h3 className='c-heading'>Lines currently {status}</h3>
				<div className='l-list l-list--lines'>
					{lines?.filter((line) => SHOW_SERVICES.includes(line._service_id) && line.status === status).sort((a, b) => a.name.en.localeCompare(b.name.en, 'en', { numeric: true })).map((line) => (
						<Link to={`/line/${line._id}`} key={line._id} className='c-item' style={{ background: line.color && line.color !== '' ? line.color : '#c3c3c3', color: line.color && line.color !== '' ? getContrastingTextColor(line.color) : 'var(--color-black)' }}>
							<IconService service={line._service_id} size='12px' color={getContrastingTextColor(line.color)} hasTooltip={false} />
							{line.name.en}
						</Link>
					))}
				</div>
			</React.Fragment>))}
		</>
	);
}

export default HomePage;