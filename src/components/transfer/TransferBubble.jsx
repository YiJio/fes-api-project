// packages
import React from 'react';
import { RiExchange2Line } from 'react-icons/ri';
// css
import './transfer.css';
// utils
import { getContrastingTextColor } from '../../utils/color';
// components
import Transfer from './Transfer';

const TransferBubble = ({ transfers, lineNumber, lineColor }) => {
	return (
		<div className='c-transfer-bubble'>
			<div className='c-transfer' style={{ background: lineColor, color: getContrastingTextColor(lineColor), cursor: 'default' }}>
				{lineNumber}
			</div>
			<span className='c-transfer-bubble__icon'>
				<RiExchange2Line />
			</span>
			{transfers?.map((transfer, index) => (
				<Transfer key={index} transfer={transfer} position='top' />
			))}
		</div>
	);
}

export default TransferBubble;