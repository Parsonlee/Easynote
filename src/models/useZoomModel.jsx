import { createModel } from 'hox';
import { useState } from 'react';

function useZoom() {
	const [zoom, setZoom] = useState(window.screen.width < 576 ? true : false);

	const toggleZoom = () => {
		setZoom(!zoom);
	};

	return {
		zoom,
		toggleZoom,
	};
}

export default createModel(useZoom);
