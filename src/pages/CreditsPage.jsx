// packages
import React, { useEffect } from 'react';

const CreditsPage = () => {

	useEffect(() => {
		document.title = 'Credits | Guangzhou Metro';
	}, []);

	return (
		<div className='credits'>
			<h2>Credits</h2>
			<p></p>
			<strong>Data used in my Canton PRT API that was in turn used in this project:</strong>
			<ul>
				<li>Line & station data: Wikipedia, Baidu Maps</li>
				<li>Service logos: Wikipedia</li>
				<li>Station images: Chinese Wikipedia</li>
				<li>Station fares: Baidu Maps</li>
			</ul>
			<strong>Data used in this project:</strong>
			<ul>
				<li>
				<li>Landing page images: Chinese Wikipedia</li></li>
			</ul>
			<strong>Things used in this project created by me:</strong>
			<ul>
				<li>Rail transit icons (using Adobe Illustrator)</li>
				<li>The public API itself (Node.js/Express, AWS API Gateway)</li>
			</ul>
		</div>
	)
}

export default CreditsPage;