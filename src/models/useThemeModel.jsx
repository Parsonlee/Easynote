import { useState } from 'react';
import { createModel } from 'hox';
import { themeConfig } from '../constants/config';

function useTheme() {
	const [theme, setTheme] = useState(themeConfig.default);

	const setThemeMode = themeKey => {
		setTheme(themeConfig[themeKey]);
	};

	return { theme, setThemeMode };
}

export default createModel(useTheme);
