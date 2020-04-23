import React from 'react';
import {
	faFont,
	faCompress,
	faExpand,
	faPlus,
} from '@fortawesome/free-solid-svg-icons';

import ToolButton from './ToolButton';
import useZoomModel from '../../../models/useZoomModel';

const ToolBar = ({ toggleEditBar, category, toggleInput, ...props }) => {
	const { zoom, toggleZoom } = useZoomModel();

	return (
		<div {...props}>
			{category === 'note' && (
				<ToolButton
					onClick={toggleEditBar}
					icon={faFont}
					style={{ marginBottom: '14px' }}
				/>
			)}
			{category === 'todo' && (
				<ToolButton
					onClick={toggleInput}
					icon={faPlus}
					style={{ marginBottom: '14px' }}
				/>
			)}
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
