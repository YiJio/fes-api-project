// packages
import React from 'react';
import { Link } from 'react-router-dom';
// assets
import logoGZMTR from '../assets/Guangzhou_Metro_icon.svg';

const Header = () => {
	return (
		<header className='header'>
			<Link to='/search' className='header-title'>
				<img src={logoGZMTR} alt='Guangzhou Metro logo' style={{ height:'24px' }} />
				Guangzhou Metro
			</Link>
		</header>
	);
}

export default Header;