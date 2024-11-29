// packages
import React, { useEffect, useState } from 'react';
import { useRef } from 'react';
import { RiArrowLeftSLine, RiArrowRightSLine } from 'react-icons/ri';

const StationImagesPages = ({ isMobile, images }) => {
	let inc = isMobile ? 1 : 2;
	let output = [];
	for (let i = 0; i < images.length; i += inc) {
		output.push(<div className='station-images-page'>
			<div className='station-images-wrapper'>
				<div className='station-images-image'><img src={images[i].image} /></div>
				<div className='station-images-caption'>{images[i].caption}</div>
			</div>
			{!isMobile && i + 1 < images.length ? <div className='station-images-wrapper'>
				<div className='station-images-image'><img src={images[i + 1].image} /></div>
				<div className='station-images-caption'>{images[i + 1].caption}</div>
			</div> : !isMobile ? <div className='station-images-wrapper'></div> : ''}
		</div>);
	}
	return output;
}

export const StationImages = ({ isMobile, setIsMobile, images }) => {
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
			let temp = [];
			if (images.exterior && images.exterior !== '') { temp.push({ image: images.exterior, caption: 'Exterior view of the station.' }); }
			if (images.exit && images.exit !== '') { temp.push({ image: images.exit, caption: 'One of the exits of the station.' }); }
			if (images.concourse && images.concourse !== '') { temp.push({ image: images.concourse, caption: 'Concourse for the current line.' }); }
			if (images.platform && images.platform !== '') { temp.push({ image: images.platform, caption: 'Platform for the current line.' }); }
			setImagesArray([...temp]);
			if (setIsMobile) {
				console.log(isMobile, 'changed')
				let num = isMobile ? temp.length - 1 : Math.ceil(temp.length / 2) - 1;
				setPage(0);
				setNumOfPages(num);
			}
		}
	}, [images, isMobile, setIsMobile]);

	useEffect(() => {
		console.log('currpage', page)
		scrollToViewport();
	}, [page, numOfPages]);

	if (!images) { return <>Loading...</>; }

	return (
		<div className='station-images-carousel'>
			<div className='station-images-actions'>
				<button className={`station-images-button ${page === 0 ? 'none' : ''}`} onClick={handlePrev}><RiArrowLeftSLine strokeWidth='1px' /></button>
			</div>
			<div ref={scrollRef} className='station-images-viewport'>
				<StationImagesPages isMobile={isMobile} images={imagesArray} />
			</div>
			<div className='station-images-actions'>
				<button className={`station-images-button ${page === numOfPages ? 'none' : ''}`} onClick={handleNext}><RiArrowRightSLine strokeWidth='1px' /></button>
			</div>
		</div>
	);
}

export default StationImages;