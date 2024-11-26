// packages
import React from 'react';
import { Link } from 'react-router-dom';
import { RiEmotionUnhappyLine } from 'react-icons/ri';

const NotFoundPage = () => {
	return (
		<div className='not-found'>
			<h1 className='not-found-heading'>
				<span>4</span>
				<span>0</span>
				<span>4</span>
			</h1>
			<div className='not-found-paragraph'>
				<RiEmotionUnhappyLine />
				The page you are looking for does not exist!
			</div>
			<div className='not-found-paragraph'>Try <Link to='/search'>searching</Link> something.</div>
		</div>
	)
}

export default NotFoundPage;