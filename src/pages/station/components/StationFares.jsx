// packages
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { RiCornerDownLeftLine, RiLoader5Fill, RiMapPinFill } from 'react-icons/ri';
// utils
import { fetchFare } from '../../../utils/fetch';
import { sortByStationNameAndLineName } from '../../../utils/helper';
import { getContrastingTextColor } from '../../../utils/color';
// components

// constants
const SHOW_SERVICES = ['gzmtr', 'guangfometro'];

export const StationFares = ({ lines, stations, stationData }) => {
	// states
	const [ui_isSelectionOpen, setUiIsSelectionOpen] = useState(false);
	const [ui_searchStation, setUiSearchStation] = useState('');
	const [ui_filteredStations, setUiFilteredStations] = useState([]);
	const [ui_fareStation, setUiFareStation] = useState(null);
	const [ui_isLoading, setUiIsLoading] = useState(false);
	const [db_fareData, setDbFareData] = useState({});
	// refs
	const selectionsRef = useRef(null);

	const filterStations = (search) => {
		let results = [];
		results = stations.filter((station, index) => {
			if (station.station === stationData.station) return false;
			// make it only unique
			return (stations.findIndex((s) => s.station == station.station) === index && station.name.en.toLowerCase().includes(search.toLocaleLowerCase()) && SHOW_SERVICES.includes(station._service_id));
		}).sort((a, b) => sortByStationNameAndLineName(a, b, lines));
		setUiFilteredStations(results);
	}

	const handleSetFare = (station) => {
		//console.log('to', station)
		setDbFareData({}); // clear things first
		setUiFareStation(station);
		setUiSearchStation(station.name.en);
		setUiIsSelectionOpen(false);
	}

	const handleGetFare = async () => {
		if (!isFetchDisabled) {
			let src = stationData.name.zh;
			let dest = ui_fareStation.name.zh;
			setUiIsLoading(true);
			let fareData = await fetchFare(src, dest);
			if (fareData) {
				let index = stations.findIndex((s) => s.name.zh == fareData.destination);
				fareData.source = stationData.name.en;
				fareData.destination = stations[index].name.en;
				setDbFareData(fareData);
			} else {
				setDbFareData(undefined);
			}
			setTimeout(() => {
				setUiIsLoading(false);
			}, 1000);
		}
	}

	const isFetchDisabled = useMemo(() => {
		if (ui_fareStation && db_fareData)
			return ui_fareStation?.name.en === db_fareData?.destination
	}, [ui_fareStation, db_fareData]);

	useEffect(() => {
		if (stations) { filterStations(''); }
		//if (stationData) { console.log(stationData) }
	}, [lines, stations, stationData]);

	useEffect(() => {
		const handleClickOutside = (e) => {
			if (selectionsRef.current && !selectionsRef.current.contains(e.target)) { setUiIsSelectionOpen(false); }
		}
		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		}
	}, [selectionsRef]);

	useEffect(() => {
		if (ui_searchStation) { filterStations(ui_searchStation); }
	}, [ui_searchStation]);

	if (!lines || !stations) { return <>Loading...</>; }

	return (
		<div className='station-fares'>
			<span className='station-fares__text'>From <b>{stationData.name.en}</b> to:</span>
			<div className='station-fares__search'>
				<div ref={selectionsRef} className='field'>
					<RiMapPinFill />
					<input className='input' type='text' value={ui_searchStation} placeholder='Search station' onChange={(e) => setUiSearchStation(e.target.value)} onFocus={() => setUiIsSelectionOpen(true)} />
					{ui_isSelectionOpen && <div className={`selections ${ui_filteredStations.length === 0 ? 'selections--empty' : ''}`}>
						<div className='selections__list'>
							{ui_filteredStations.length > 0 && ui_filteredStations.map((station) => (
								<div className='selections__item' key={station._id} onClick={() => handleSetFare(station)}>{station.name.en}</div>
							))}
							{ui_filteredStations.length === 0 && <div className='empty'>No stations.</div>}
						</div>
					</div>}
					<button className='button' onClick={handleGetFare} disabled={ui_isLoading || isFetchDisabled || !ui_fareStation}><RiCornerDownLeftLine /></button>
				</div>
			</div>
			<div>{ui_isLoading ? <div className='empty'>
				<RiLoader5Fill className='loading-spinner' strokeWidth={2} fontSize='20px' />
				<span>Checking for fare data... (real-time data may take a while)</span>
			</div> : <>
				{db_fareData?.destination && <table className='station-fares__table'>
					<thead>
						<tr><th>Line(s)</th><th>Fare</th><th>Est. Time</th><th>Stops</th></tr>
					</thead>
					<tbody>
						<tr>
							<td>{db_fareData?.lines?.length > 0 ? <div className='station-fares__lines'>
								{db_fareData?.lines.map((line) => (<Link to={`/line/${line}`} className='line-icon' style={{ background: lines[lines.findIndex((l) => l._id == line)].color || '#c3c3c3', color: getContrastingTextColor(lines[lines.findIndex((l) => l._id == line)].color) }}>
									{line.split('-')[2].toUpperCase()}
								</Link>))}</div> : ''}</td>
							<td>￥{db_fareData.fare}</td>
							<td>{db_fareData.time} mins</td>
							<td>{db_fareData.stations}</td>
						</tr>
					</tbody>
				</table>}
				{db_fareData == undefined && <>No available fare data between <b>{stationData.name.en}</b> and <b>{ui_searchStation}</b>.</>}
			</>}</div>
		</div>
	);
}

export default StationFares;