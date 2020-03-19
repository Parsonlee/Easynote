/** @jsx jsx */
import { css, jsx } from '@emotion/core';

export const Button = ({ active, ...props }) => (
	<span
		{...props}
		css={css`
			cursor: pointer;
			color: ${active ? 'black' : '#aaa'};
		`}
	/>
);

export const Menu = props => (
	<div
		{...props}
		css={css`
			& > * {
				display: inline-block;
			}
			& > * + * {
				margin-left: 15px;
			}
		`}
	/>
);

export const Toolbar = props => (
	<Menu
		{...props}
		css={css`
			width: 100%;
			padding: 2px 4px;
			margin: 0 auto;
			border-bottom: 2px solid #eee;
		`}
	/>
);
