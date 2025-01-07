// packages
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { RiSearchLine } from 'react-icons/ri';
// components
import { IconGZMTR } from './icons/SvgService';

const Header = () => {
	// states
	const [ui_searchTerm, setUiSearchTerm] = useState('');
	// hooks
	const navigate = useNavigate();

	const handleSearchStation = (e) => {
		e.preventDefault();
		setUiSearchTerm('');
		navigate(`/search?q=${encodeURIComponent(ui_searchTerm)}`, { replace: true });
	}

	return (
		<header className='l-header'>
			<div className='l-wrapper l-wrapper--header'>
				<Link to='/home' className='c-title c-title--header'>
					<IconGZMTR width='24px' height='24px' />
					Guangzhou Metro
				</Link>
				<div className='c-search'>
					<form onSubmit={handleSearchStation} className='c-search__field'>
						<input className='c-search__input' type='text' value={ui_searchTerm} placeholder='Search a station...' onChange={(e) => setUiSearchTerm(e.target.value)} />
						<button className='c-search__button'><RiSearchLine /></button>
					</form>
				</div>
			</div>
		</header>
	);
}

export default Header;