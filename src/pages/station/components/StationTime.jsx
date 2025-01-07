// packages
import React from 'react';
import { Link } from 'react-router-dom';

const StationTime = ({ stations, time }) => {
	// variables
	const index = stations.findIndex((s) => s._id == time._dest_id);
	const station = stations[index];

	return (
		<div className='c-station-timetable__item'>
			<div className='c-station-timetable__dest'>
				<span>To <Link to={`/station/${station._id}`}>{station.name.en}</Link></span>
			</div>
			<div className='c-station-timetable__times'>
				<div className='c-station-timetable__time'>
					<strong className='c-station-timetable__badge c-station-timetable__badge--first'>first</strong>
					<span>{time.first ? time.first : '--:--'}</span>
				</div>
				<div className='c-station-timetable__time'>
					<strong className='c-station-timetable__badge c-station-timetable__badge--last'>last</strong>
					<span>{time.last}</span>
				</div>
			</div>
		</div>
	);
}

export default StationTime;