import { createModel } from 'hox';
import { useState } from 'react';

function useApp() {
	const [catagory, setCatagory] = useState(0);

	const switchCatagory = () => {
		setCatagory((catagory + 1) % 2);
	};

	return {
		catagory,
		setCatagory,
		switchCatagory
	};
}

export default createModel(useApp);
