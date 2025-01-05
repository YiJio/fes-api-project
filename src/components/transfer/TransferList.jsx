// packages
import React from 'react';
// css
import './transfer.css';
// components
import Transfer from './Transfer';

const TransferList = ({ transfers, sourceService }) => {
	return (
		<div className='c-transfer-list'>
			{transfers?.map((transfer, index) => (
				<Transfer key={index} transfer={transfer} sourceService={sourceService} position='right' />
			))}
		</div>
	);
}

export default TransferList;