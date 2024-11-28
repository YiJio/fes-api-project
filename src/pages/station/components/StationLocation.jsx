// packages
import React, { useEffect } from 'react';
// utils
import { convertDDToDMS } from '../../../utils/helper';

const StationLocation = ({ coordinate, isLon }) => {
	// variables
	const { dir, deg, min, sec } = convertDDToDMS(coordinate, isLon);

	return (
		<span>
			{deg}°{min}′{sec}″{dir}
		</span>
	);
}

const StationAddress = ({ address }) => {

	return (
		<span>
			{address?.town.en && <>{address?.town.en}, </>}
			{address?.subdistrict.en && <>{address?.subdistrict.en}, </>}
			{address?.county.en && <>{address?.county.en}, </>}
			{address?.town.en && <>{address?.town.en}, </>}
			{address?.district.en && <>{address?.district.en}, </>}
			{address?.city.en && <>{address?.city.en}, </>}
			{address?.province.en}
		</span>
	);
}

export { StationLocation, StationAddress };