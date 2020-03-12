import React, { useState } from 'react';
/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTasks } from '@fortawesome/free-solid-svg-icons';

import useThemeModel from '../../models/useThemeModel'

const AppSwitch = () => {
	const { theme } = useThemeModel();
	const [active, setActive] = useState(0);

	return (
		<div
			css={css`
				margin: 0 auto;
				min-width: 100px;
				height: 36px;
				background: ${theme.background.backface};
				border-radius: 50px;
				display: flex;
				justify-content: center;
				align-items: center;
				font-size: 14px;
				color: ${theme.color.caption};
				.note,
				.todo {
					display: flex;
					justify-content: center;
					align-items: center;
					padding: 0 16px;
					height: 100%;
					border-radius: 50px;
					cursor: pointer;
				}
				.active {
					padding: 0 24px;
					color: ${theme.button.color};
					background: ${theme.button.background};
				}
			`}
		>
			<div
				onClick={() => setActive(0)}
				className={`note ${active === 0 ? 'active' : null}`}
			>
				{active === 0 ? '笔记' : <FontAwesomeIcon icon={faEdit} />}
			</div>
			<div
				onClick={() => setActive(1)}
				className={`todo ${active === 1 ? 'active' : null}`}
			>
				{active === 1 ? '待办' : <FontAwesomeIcon icon={faTasks} />}
			</div>
		</div>
	);
};

export default AppSwitch;
