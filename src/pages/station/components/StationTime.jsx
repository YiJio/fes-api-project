// packages
import React from 'react';
import { Link } from 'react-router-dom';

const StationTime = ({ stations, time }) => {
	const index = stations.findIndex((s) => s._id == time._dest_id);
	const station = stations[index];

	return (
		<div className='station-time-item'>
			<div className='station-time-text'>
				<div className='station-time-dest'>To <Link to={`/station/${station._id}`}>{station.name.en}</Link></div>
			</div>
			<div className='station-time-item'>
				<div className='station-time-times'>
					<div className='station-time-text'>
						<strong className='first'>first</strong>
						<span>{time.first}</span>
					</div>
					<div className='station-time-text'>
						<strong className='last'>last</strong>
						<span>{time.last}</span>
					</div>
				</div>
			</div>
		</div>
	);
}

export default StationTime;