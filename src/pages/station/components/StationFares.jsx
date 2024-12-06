// packages
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { RiCornerDownLeftLine, RiLoader5Fill, RiMapPinFill } from 'react-icons/ri';
// hooks
import useSearchFilter from '../../../hooks/useSearchFilter';
// utils
import { fetchFare } from '../../../utils/fetch';
import { getContrastingTextColor } from '../../../utils/color';

export const StationFares = ({ lines, stations, stationData }) => {
	// hooks
	const { query, setQuery, filteredStations, isStationDataReady } = useSearchFilter(lines, stations, 2, { initialExclusions: { station: [stationData.station] } });
	// states
	const [ui_isLoading, setUiIsLoading] = useState(false);
	const [ui_isSelectionOpen, setUiIsSelectionOpen] = useState(false);
	const [ui_fareStation, setUiFareStation] = useState(null);
	const [db_fareData, setDbFareData] = useState({});
	// refs
	const selectionsRef = useRef(null);

	const getHighlightedText = (text, highlight) => {
		const regex = new RegExp(`(${highlight})`, 'gi');
		return text.split(regex).map((part, index) => part.toLowerCase() === highlight.toLowerCase() ? (<span key={index}>{part}</span>) : (part));
	}

	const handleSetFare = (station) => {
		setDbFareData({}); // clear things first
		setQuery(station.name.en);
		setUiFareStation(station);
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
		const handleClickOutside = (e) => {
			if (selectionsRef.current && !selectionsRef.current.contains(e.target)) { setUiIsSelectionOpen(false); }
		}
		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		}
	}, [selectionsRef]);

	return (
		<div className='station-fares'>
			<span className='station-fares__text'>From <b>{stationData.name.en}</b> to:</span>
			<div className='station-fares__search'>
				<div ref={selectionsRef} className='field'>
					<RiMapPinFill />
					<input className='input' type='text' value={query} placeholder='Search station' onChange={(e) => setQuery(e.target.value)} onFocus={() => setUiIsSelectionOpen(true)} />
					{ui_isSelectionOpen && <div className={`selections ${filteredStations.length === 0 ? 'selections--empty' : ''}`}>
						<div className='selections__list'>
							{isStationDataReady && filteredStations.length > 0 && filteredStations.map((station) => (
								<div className='selections__item' key={station._id} onClick={() => handleSetFare(station)}>{getHighlightedText(station.name.en, query)}</div>
							))}
							{isStationDataReady && filteredStations.length === 0 && <div className='empty'>No stations.</div>}
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
							<td>{db_fareData.stops}</td>
						</tr>
					</tbody>
				</table>}
				{db_fareData == undefined && <>No available fare data between <b>{stationData.name.en}</b> and <b>{query}</b>.</>}
			</>}</div>
		</div>
	);
}

export default StationFares;