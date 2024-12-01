// packages
import React, { useEffect, useState } from 'react';
import { useRef } from 'react';
import { RiArrowLeftSLine, RiArrowRightSLine } from 'react-icons/ri';

const StationImagesPages = ({ windowWidth, images }) => {
	let inc = windowWidth <= 1280 ? 1 : 2;
	let output = [];
	for (let i = 0; i < images.length; i += inc) {
		output.push(<div key={i} className='station-images__page'>
			<div className='station-images__wrapper'>
				<div className='station-images__image'><img src={images[i].image} /></div>
				<div className='station-images__caption'>{images[i].caption}</div>
			</div>
			{windowWidth > 1280 && i + 1 < images.length ? <div key={i + 1} className='station-images__wrapper'>
				<div className='station-images__image'><img src={images[i + 1].image} /></div>
				<div className='station-images__caption'>{images[i + 1].caption}</div>
			</div> : windowWidth > 1280 ? <div className='station-images__wrapper'></div> : ''}
		</div>);
	}
	return output;
}

export const StationImages = ({ windowWidth, images }) => {
	// states
	const [page, setPage] = useState(0);
	const [numOfPages, setNumOfPages] = useState(1);
	const [imagesArray, setImagesArray] = useState([]);
	// refs
	const scrollRef = useRef();

	const scrollToViewport = () => {
		const viewport = scrollRef.current;
		if (page !== -1) {
			const width = viewport.offsetWidth;
			const position = width * page;
			viewport.scrollTo({ left: position, behavior: 'smooth' });
		}
	}

	const handlePrev = () => {
		setPage((prev) => prev - 1 < 0 ? 0 : prev - 1);
	}

	const handleNext = () => {
		setPage((prev) => prev + 1 > numOfPages ? numOfPages : prev + 1);
	}

	useEffect(() => {
		if (images) {
			let tempImages = [];
			if (images.exterior && images.exterior !== '') { tempImages.push({ image: images.exterior, caption: 'Exterior view of the station.' }); }
			if (images.exit && images.exit !== '') { tempImages.push({ image: images.exit, caption: 'One of the exits of the station.' }); }
			if (images.concourse && images.concourse !== '') { tempImages.push({ image: images.concourse, caption: 'Concourse for the current line.' }); }
			if (images.platform && images.platform !== '') { tempImages.push({ image: images.platform, caption: 'Platform for the current line.' }); }
			setImagesArray([...tempImages]);
			if (windowWidth) {
				let num = windowWidth <= 1280 ? tempImages.length - 1 : Math.ceil(tempImages.length / 2) - 1;
				if(tempImages.length === 0) { num = 0; }
				setPage(0);
				setNumOfPages(num);
			}
		}
	}, [images, windowWidth]);

	useEffect(() => {
		scrollToViewport();
	}, [page, numOfPages]);

	if (!images) { return <>Loading...</>; }

	return (
		<div className='station-images'>
			<div className='station-images__actions'>
				<button className={`station-images__button ${page === 0 ? 'none' : ''}`} onClick={handlePrev}><RiArrowLeftSLine strokeWidth='1px' /></button>
			</div>
			<div ref={scrollRef} className='station-images__viewport'>
				<StationImagesPages windowWidth={windowWidth} images={imagesArray} />
			</div>
			<div className='station-images__actions'>
				<button className={`station-images__button ${page === numOfPages ? 'none' : ''}`} onClick={handleNext}><RiArrowRightSLine strokeWidth='1px' /></button>
			</div>
		</div>
	);
}

export default StationImages;