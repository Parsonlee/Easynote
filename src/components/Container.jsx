import React, { useState } from 'react';
/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import { between } from 'polished';

import Header from './header/Header';
import Body from './body/Body';

import useThemeModel from '../models/useThemeModel';
import useZoomModel from '../models/useZoomModel';

const Container = () => {
	const [sideListOn, setSideListOn] = useState(true);
	const toggleSideListOn = React.useCallback(() => {
		setSideListOn(!sideListOn);
	}, [sideListOn]);

	const { theme } = useThemeModel();
	const { zoom } = useZoomModel();

	return (
		<div
			css={css`
				width: ${zoom ? '100%' : between('576px', '992px')};
				height: ${zoom ? '100%' : between('85vh', '85vh')};
				border-radius: 15px;
				transition: 0.4s;
				background: ${theme.background.base};
				box-shadow: 0 3px 40px ${theme.color.shadow};
				display: flex;
				flex-direction: column;
				color: ${theme.color.base};
				overflow: hidden;
			`}
		>
			<Header toggleSideListOn={toggleSideListOn} />
			<Body sideListOn={sideListOn} />
		</div>
	);
};

export default Container;