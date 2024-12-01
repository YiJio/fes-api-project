// packages
import React, { useEffect } from 'react';

const CreditsPage = () => {

	useEffect(() => {
		document.title = 'Credits | Guangzhou Metro';
	}, []);

	return (
		<div className='credits'>
			<h2>Credits</h2>
		</div>
	)
}

export default CreditsPage;