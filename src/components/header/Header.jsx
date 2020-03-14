import React from 'react';
/** @jsx jsx */
import { css, jsx } from '@emotion/core';

import useThemeModel from '../../models/useThemeModel';

const Header = ({ children }) => {
	const { theme } = useThemeModel();

	return (
		<div
			css={css`
				padding: 0 17px;
				height: 68px;
				border-bottom: 1px solid ${theme.color.divider};
				display: flex;
				align-items: center;
				overflow: hidden;
			`}
		>
      {children}
    </div>
	);
};

export default React.memo(Header);