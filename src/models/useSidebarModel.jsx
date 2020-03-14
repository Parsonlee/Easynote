import { createModel } from 'hox';
import { useState } from 'react';

function useSidebar() {
	const [showSidebar, setShowSidebar] = useState(true);

	const toggleSidebar = () => {
		setShowSidebar(!showSidebar);
	};

	return {
		showSidebar,
		toggleSidebar
	};
}

export default createModel(useSidebar);
