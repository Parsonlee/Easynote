import React from 'react'
import { faFont,faCompress,faExpand } from '@fortawesome/free-solid-svg-icons';

import ToolButton from './ToolButton';

import useZoomModel from '../../../models/useZoomModel';

const ToolBar = ({ toggleEditBar, ...props }) => {
	const { zoom, toggleZoom } = useZoomModel();

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
		</div>
	);
};

export default ToolBar;
