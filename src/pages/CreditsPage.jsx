// packages
import React, { useEffect } from 'react';

const CreditsPage = () => {

	useEffect(() => {
		document.title = 'Credits | Guangzhou Metro';
	}, []);

	return (
		<div className='credits'>
			<h2>Credits (About)</h2>
			<p>This project was made possible while using the public API that I created, the <b>Canton Passenger Rail Transit (PRT) API</b>. Though it is a public API, it is only public through accessing endpoints and not the actual codebase itself. Currently, the API code is deployed on my VPS but the endpoints are exposed on AWS API Gateway, which requires an API key to use the data. The data is stored in a MongoDB database.</p>
			<p>As of December 3rd, 2024, the GitHub repository explaining the API is not yet finished, which will also come in with a documentation for it. So far the data for the API contains Guangzhou (and some of Foshan) lines and stations, but it will be expanded to encompass the Canton region of Shenzhen and Dongguan.</p>
			<p>The below outlines sources of data used in both the API and this project.</p>
			<h3>Used in API</h3>
			<ul>
				<li>Line & station data: Wikipedia, Baidu Maps</li>
				<li>Service logos: Wikipedia</li>
				<li>Station images: Wikipedia (Chinese)</li>
				<li>Station fares: Baidu Maps</li>
			</ul>
			<h3>Used in project specifically</h3>
			<ul>
				<li>The public API</li>
				<li>Landing page images: Chinese Wikipedia</li>
			</ul>
			<h3>Created by me</h3>
			<ul>
				<li>The website (React + Vite)</li>
				<li>Rail transit icons (Adobe Illustrator)</li>
				<li>The public API itself (Node.js/Express, AWS API Gateway)</li>
			</ul>
		</div>
	)
}

export default CreditsPage;