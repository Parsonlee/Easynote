import React from 'react';
/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';

import useThemeModel from '../../../models/useThemeModel';
import useModalModel from '../../../models/useModalModel';

const SideListItemDel = ({ deleteItem, id, ...props }) => {
	const { theme } = useThemeModel();
	const { openModal } = useModalModel();

	const handleClick = e => {
		e.stopPropagation();
		// openModal({ title: '删除', description: '删除不可恢复' });
		deleteItem(id);
	};

	return (
		<div
			onClick={handleClick}
			css={css`
				padding: 2px 8px;
				background: ${theme.background.backdrop};
				color: #eb5757;
				box-shadow: 0 2px 10px ${theme.color.shadow};
				border-radius: 4px;
			`}
			{...props}
		>
			<FontAwesomeIcon icon={faTrashAlt} />
		</div>
	);
};

export default SideListItemDel;
