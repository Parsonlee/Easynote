import React from 'react';
/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import SideList from './sideList/SideList';
import Content from './Content';

const Body = ({ sideListOn }) => {
	return (
		<div
			css={css`
				width: 100%;
				display: flex;
				height: calc(100% - 68px);
			`}
		>
			<SideList sideListOn={sideListOn} />
			<Content />
		</div>
	);
};

export default React.memo(Body);
