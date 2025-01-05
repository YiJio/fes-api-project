// packages
import React from 'react';
// css
import './transfer.css';
// components
import TransferTableLines from './TransferTableLines';
import TransferTableService from './TransferTableService';

// constants
const SERVICES = ['cr', 'prdir', 'gzmtr', 'guangfometro', 'fmetro', 'gztram'];

const TransferTable = ({ transfers, sourceService, sourceLine }) => {

	return (
		<div className='c-transfer-table'>
			{SERVICES.map((service, index) => (<React.Fragment key={index}>
				{console.log(service, transfers, transfers?.findIndex((transfer) => transfer?._service_id == service))}
				{transfers?.findIndex((transfer) => transfer._service_id == service) !== -1 && <div className='c-transfer-table__row'>
					<TransferTableService service={service} />
					<TransferTableLines transfers={transfers} service={service} sourceService={sourceService} sourceLine={sourceLine} />
				</div>}
			</React.Fragment>))}
		</div>
	);
}

export default TransferTable;