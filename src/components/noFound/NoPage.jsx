/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { Link } from 'react-router-dom';

import useThemeModel from '../../models/useThemeModel';

const NoPage = ({redirectTo}) => {
	const { theme } = useThemeModel();

	return (
		<div
			css={css`
				font-size: 3.5rem;
				align-self: center;
				flex: 1;
				display: flex;
				align-items: center;
				color: ${theme.color.hint};
				transform: translateY(-8%);
				a {
					color: ${theme.primary.base};
					text-decoration: none;
				}
			`}
		>
			没找到你想要的,&nbsp;<Link to={`/${redirectTo}`}> 点击回首页</Link>
		</div>
	);
};

export default NoPage;
