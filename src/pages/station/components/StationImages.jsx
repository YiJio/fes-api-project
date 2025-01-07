// packages
import React, { useEffect, useState } from 'react';
import { useRef } from 'react';
import { RiArrowLeftSLine, RiArrowRightSLine } from 'react-icons/ri';
// components
import ImagesModal from '../../../components/ImagesModal';

const StationImagesPages = ({ windowWidth, images, openModal }) => {
	let inc = windowWidth <= 1280 ? 1 : 2;
	let output = [];
	for (let i = 0; i < images.length; i += inc) {
		output.push(<div key={i} className='c-station-images__page'>
			<div className='c-station-images__wrapper'>
				<div className='c-station-images__image' onClick={() => openModal(i)}><img src={images[i].image} /></div>
				<div className='c-station-images__caption'>{images[i].caption}</div>
			</div>
			{windowWidth > 1280 && i + 1 < images.length ? <div key={i + 1} className='c-station-images__wrapper'>
				<div className='c-station-images__image' onClick={() => openModal(i + 1)}><img src={images[i + 1].image} /></div>
				<div className='c-station-images__caption'>{images[i + 1].caption}</div>
			</div> : windowWidth > 1280 ? <div className='c-station-images__wrapper'></div> : ''}
		</div>);
	}
	return output;
}

export const StationImages = ({ windowWidth, images }) => {
	// states
	const [ui_page, setUiPage] = useState(0);
	const [ui_numOfPages, setUiNumOfPages] = useState(1);
	const [ui_imagesArray, setUiImagesArray] = useState([]);
	const [ui_imageIndex, setUiImageIndex] = useState(0);
	const [ui_isModalOpen, setUiIsModalOpen] = useState(false);
	// refs
	const scrollRef = useRef();

	const scrollToViewport = () => {
		const viewport = scrollRef.current;
		if (ui_page !== -1) {
			const width = viewport.offsetWidth;
			const position = width * ui_page;
			viewport.scrollTo({ left: position, behavior: 'smooth' });
		}
	}

	const handlePrevSlide = () => {
		setUiPage((prev) => prev - 1 < 0 ? 0 : prev - 1);
	}

	const handleNextSlide = () => {
		setUiPage((prev) => prev + 1 > ui_numOfPages ? ui_numOfPages : prev + 1);
	}

	const openModal = (index) => {
		setUiImageIndex(index);
		setUiIsModalOpen(true);
	}

	useEffect(() => {
		if (images) {
			let tempImages = [];
			if (images.exterior && images.exterior !== '') { tempImages.push({ image: images.exterior, caption: 'Exterior view of the station.' }); }
			if (images.exit && images.exit !== '') { tempImages.push({ image: images.exit, caption: 'One of the exits of the station.' }); }
			if (images.concourse && images.concourse !== '') { tempImages.push({ image: images.concourse, caption: 'Concourse for the current line.' }); }
			if (images.platform && images.platform !== '') { tempImages.push({ image: images.platform, caption: 'Platform for the current line.' }); }
			setUiImagesArray([...tempImages]);
			if (windowWidth) {
				let num = windowWidth <= 1280 ? tempImages.length - 1 : Math.ceil(tempImages.length / 2) - 1;
				if (tempImages.length === 0) { num = 0; }
				setUiPage(0);
				setUiNumOfPages(num);
			}
		}
	}, [images, windowWidth]);

	useEffect(() => {
		scrollToViewport();
	}, [ui_page, ui_numOfPages]);

	if (!images) { return <>Loading...</>; }

	return (
		<>
			<div className='c-station-images'>
				<div className='c-station-images__actions'>
					<button className={`c-station-images__button ${ui_page === 0 ? 'none' : ''}`} onClick={handlePrevSlide}><RiArrowLeftSLine strokeWidth='1px' /></button>
				</div>
				<div ref={scrollRef} className='c-station-images__viewport'>
					<StationImagesPages windowWidth={windowWidth} images={ui_imagesArray} openModal={openModal} />
				</div>
				<div className='c-station-images__actions'>
					<button className={`c-station-images__button ${ui_page === ui_numOfPages ? 'none' : ''}`} onClick={handleNextSlide}><RiArrowRightSLine strokeWidth='1px' /></button>
				</div>
			</div>
			<ImagesModal images={ui_imagesArray} isOpen={ui_isModalOpen} setIsOpen={setUiIsModalOpen} imageIndex={ui_imageIndex} setImageIndex={setUiImageIndex} />
		</>
	);
}

export default StationImages;