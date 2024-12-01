// packages
import React from 'react';
import { Link } from 'react-router-dom';

const StationTime = ({ stations, time }) => {
	// variables
	const index = stations.findIndex((s) => s._id == time._dest_id);
	const station = stations[index];

	return (
		<div className='station-timetable__item'>
			<div className='station-timetable__dest'>
				<span>To <Link to={`/station/${station._id}`}>{station.name.en}</Link></span>
			</div>
			<div className='station-timetable__times'>
				<div className='station-timetable__time'>
					<strong className='station-timetable__badge station-timetable__badge--first'>first</strong>
					<span>{time.first}</span>
				</div>
				<div className='station-timetable__time'>
					<strong className='station-timetable__badge station-timetable__badge--last'>last</strong>
					<span>{time.last}</span>
				</div>
			</div>
		</div>
	);
}

export default StationTime;