/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import { memo } from 'react';


const MainBody = ({ children }) => {
	return (
		<div
			css={css`
				width: 100%;
				display: flex;
				height: calc(100% - 68px);
			`}
		>
			{children}
		</div>
	);
};

export default memo(MainBody);
