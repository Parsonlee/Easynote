import { useState } from 'react';
import { createModel } from 'hox';

function useZoom() {
	const [zoom, setZoom] = useState(false);

	const toggleZoom = () => setZoom(!zoom);
	return { zoom, toggleZoom };
}

export default createModel(useZoom);
