/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import { memo } from 'react';

import RichTextExample from './editor/RichTextExample'

const MainBody = ({ children }) => {
	return (
		<div
			css={css`
				width: 100%;
				background: #E5E5E5;
				display: flex;
				justify-content: center;
				height: calc(100% - 68px);
			`}
		>
			{children}
			<RichTextExample />
		</div>
	);
};

export default memo(MainBody);
