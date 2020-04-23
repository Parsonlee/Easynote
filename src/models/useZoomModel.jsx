import { createModel } from 'hox';
import { useState } from 'react';

function useZoom() {
	const [zoom, setZoom] = useState(
		document.body.clientWidth < 970 ? true : false
	);

	const toggleZoom = () => {
		setZoom(!zoom);
	};

	return {
		zoom,
		toggleZoom,
	};
}

export default createModel(useZoom);
