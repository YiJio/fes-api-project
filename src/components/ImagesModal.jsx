// packages
import React, { useEffect, useRef, useState } from 'react';
import { RiArrowLeftSLine, RiArrowRightSLine, RiCloseFill } from 'react-icons/ri';

const ImagesModal = ({ images, isOpen, setIsOpen, imageIndex, setImageIndex, }) => {
	// states
	const [ui_isDraggingCss, setUiIsDraggingCss] = useState(false);
	const [ui_isDragging, setUiIsDragging] = useState(false);
	const [ui_startX, setStartX] = useState(0);
	// refs
	const modalRef = useRef();
	const viewportRef = useRef();

	const scrollToViewport = () => {
		const viewport = viewportRef.current;
		if (imageIndex !== -1) {
			const width = viewport.offsetWidth;
			const position = width * imageIndex;
			viewport.scrollTo({ left: position, behavior: 'smooth' });
		}
	}

	const handleMouseDown = (e) => {
		setUiIsDraggingCss(true);
		setUiIsDragging(true);
		setStartX(e.clientX || e.touches[0].clientX);
	}

	const handleMouseMove = (e) => {
		if (!ui_isDragging) return;
		const moveX = e.clientX || e.touches[0].clientX;
		const diff = ui_startX - moveX;
		if (Math.abs(diff) > 50) {
			if (diff > 0) { setImageIndex((prev) => (prev + 1) % images.length); }
			else if (diff < 0) { setImageIndex((prev) => prev === 0 ? images.length - 1 : prev - 1); }
			setUiIsDragging(false);
		}
	}

	const handleMouseUp = () => { setUiIsDraggingCss(false); setUiIsDragging(false); }

	const resetModal = () => {
		setIsOpen(false);
		setImageIndex(-1);
	}

	const handlePrevModal = () => {
		setImageIndex((prev) => prev === 0 ? images.length - 1 : prev - 1);
	}

	const handleNextModal = () => {
		setImageIndex((prev) => (prev + 1) % images.length);
	}

	useEffect(() => {
		const handleClickOutside = (e) => {
			if (modalRef.current && !modalRef.current.contains(e.target)) {
				setIsOpen(false);
			}
		};
		document.addEventListener('mousedown', handleClickOutside);
		return () => { document.removeEventListener('mousedown', handleClickOutside); };
	}, []);

	useEffect(() => {
		if (viewportRef.current) scrollToViewport();
	}, [viewportRef.current, imageIndex, setImageIndex]);

	return (
		<div className={`c-modal ${isOpen ? 'active' : ''}`}>
			<button className='c-modal__close' onClick={resetModal}><RiCloseFill strokeWidth='1px' /></button>
			<div ref={modalRef} className='c-modal__content'>
				<div className='c-modal__control' onClick={handlePrevModal}>
					<RiArrowLeftSLine strokeWidth='1px' />
				</div>
				<div ref={viewportRef} className={`c-modal__viewport ${ui_isDraggingCss ? 'dragging' : 'drag'}`} onMouseDown={handleMouseDown} onMouseMove={handleMouseMove} onMouseUp={handleMouseUp} onMouseLeave={handleMouseUp} onTouchStart={handleMouseDown} onTouchMove={handleMouseMove} onTouchEnd={handleMouseUp}>
					{images?.map((image, index) => (<div key={index} className={`c-modal__image${imageIndex === index ? ' active' : ''}`}>
						<img src={image.image} alt={image.caption} />
						{imageIndex === index && <>
							<div className='c-modal__caption'>
								<span>{image.caption}</span>
							</div>
							<div className='c-modal__caption c-modal__caption--mobile'>
								<span>{image.caption}</span>
							</div>
						</>}
					</div>))}
				</div>
				<div className='c-modal__control' onClick={handleNextModal}>
					<RiArrowRightSLine strokeWidth='1px' />
				</div>
				<div className='c-modal__indicator'>{imageIndex + 1}/{images.length}</div>
			</div>
		</div>
	);
}

export default ImagesModal;