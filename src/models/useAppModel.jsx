import { createModel } from 'hox';
import { useState } from 'react';

function useApp() {
	const [category, setCategory] = useState(0);

	const switchCategory = () => {
		setCategory((category + 1) % 2);
	};

	return {
		category,
		setCategory,
		switchCategory
	};
}

export default createModel(useApp);
