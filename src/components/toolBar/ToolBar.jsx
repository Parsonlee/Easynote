import React from 'react';
import { faFont,faMoon,faSun,faCompress,faExpand } from '@fortawesome/free-solid-svg-icons';

import ToolButton from './ToolButton';

import useThemeModel from '../../models/useThemeModel';
import useZoomModel from '../../models/useZoomModel';

const ToolBar = ({ toggleEditBar, ...props }) => {
	const { theme, setThemeMode } = useThemeModel();
	const { zoom, toggleZoom } = useZoomModel();

	let ifDark = false;
	if (theme.mode === 'dark') {
		ifDark = true;
	} else if (theme.mode === 'default') {
		ifDark = false;
	}

	return (
		<div {...props}>
			<ToolButton
				onClick={toggleEditBar}
				icon={faFont}
				style={{ marginBottom: '14px' }}
			/>
			<ToolButton
				onClick={toggleZoom}
				icon={zoom ? faCompress : faExpand}
				variant='default'
				style={{ marginBottom: '14px' }}
			/>
			<ToolButton
				icon={ifDark ? faSun : faMoon}
				varian='default'
				onClick={() =>
					ifDark ? setThemeMode('default') : setThemeMode('dark')
				}
			/>
		</div>
	);
};

export default ToolBar;
