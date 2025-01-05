// packages
import React from 'react';
// css
import './transfer.css';
// components
import Transfer from './Transfer';

const TransferStick = ({ transfers, sourceService }) => {
	return (
		<div className='c-transfer-stick'>
			<div className='c-transfer-stick__line' />
			{transfers?.map((transfer, index) => (
				<Transfer key={index} transfer={transfer} sourceService={sourceService} position='right' />
			))}
		</div>
	);
}

export default TransferStick;