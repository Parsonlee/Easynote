import { createModel } from 'hox';
import { useState } from 'react';
import { themeConfig, palette } from '../constants/config';

function useTheme() {
	const [theme, setTheme] = useState(themeConfig.default);

	const setThemeMode = themeKey => {
		setTheme(themeConfig[themeKey]);
	};

	return {
		theme,
		palette,
		setThemeMode
	};
}

export default createModel(useTheme);
