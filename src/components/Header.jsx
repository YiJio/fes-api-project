// packages
import React from 'react';
// assets
import logoGZMTR from '../assets/Guangzhou_Metro_icon.svg';

const Header = () => {
	return (
		<header className='header'>
			<div className='header-title'>
				<img src={logoGZMTR} alt='Guangzhou Metro logo' style={{ height:'24px' }} />
				Guangzhou Metro
			</div>
		</header>
	);
}

export default Header;