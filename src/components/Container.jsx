import { memo } from 'react';
/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import { between } from 'polished';

import useThemeModel from '../models/useThemeModel';
import useZoomModel from '../models/useZoomModel';

const Container = ({ children }) => {
	// 主题
	const { theme } = useThemeModel();
	// 缩放
	const { zoom } = useZoomModel();

	return (
		<div
			css={css`
				width: ${zoom ? '100%' : between('300px', '800px')};
				height: ${zoom ? '100%' : between('80vh', '80vh')};
				min-height: 630px;
				border-radius: ${zoom ? 0 : '15px'};
				transition: 0.4s;
				background: ${theme.background.base};
				box-shadow: 0 3px 40px ${theme.color.shadow};
				display: flex;
				flex-direction: column;
				color: ${theme.color.base};
				overflow: hidden;
			`}
		>
			{children}
		</div>
	);
};

export default memo(Container);
