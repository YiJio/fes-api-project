// packages
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { RiEmotionUnhappyLine } from 'react-icons/ri';
// css
import './notfound.css';

const NotFoundPage = () => {

	useEffect(() => {
		document.title = '404 | Guangzhou Metro';
	}, []);

	return (
		<div className='not-found'>
			<h1 className='not-found__heading'>
				<span>4</span>
				<span>0</span>
				<span>4</span>
			</h1>
			<div className='not-found__paragraph'>
				<RiEmotionUnhappyLine />
				The page you are looking for does not exist!
			</div>
			<div className='not-found__paragraph'>Try something else to <Link to='/search'>search</Link>.</div>
		</div>
	);
}

export default NotFoundPage;