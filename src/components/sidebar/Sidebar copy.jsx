import { memo } from 'react';
/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { between } from 'polished';
import { motion, AnimatePresence } from 'framer-motion';
import { useParams, useHistory } from 'react-router-dom';

import SideItem from './SidebarItem copy';
import useDataModel from '../../models/useDataModel';
import useThemeModel from '../../models/useThemeModel';

const Side = ({ show, category }) => {
	const { theme } = useThemeModel();
	const { deleteByContentId, todo } = useDataModel();
	const params = useParams();
	const history = useHistory();

	// 动画
	const variants = {
		show: {
			width: between('90px', '170px'),
			x: '0',
			transition: {
				ease: 'easeOut',
				duration: 0.3,
			},
		},
		hide: {
			width: 0,
			x: '0',
			transition: {
				ease: 'circOut',
				duration: 0.4,
			},
		},
	};

	const handleClickDelBtn = (contentId) => {
		deleteByContentId(contentId, 'todo');
		history.push('/todo');
	};

	return (
		<motion.div
			css={css`
				height: 100%;
				z-index: 1;
				background: ${theme.background.backdrop};
				overflow-y: auto;
				overflow-x: hidden;
				&::-webkit-scrollbar {
					width: 2px;
					z-index: 999;
					display: ${show ? 'block' : 'none'};
				}
				&::-webkit-scrollbar-thumb {
					z-index: 999;
					border-radius: 10px;
					background: ${theme.color.shadow};
				}
			`}
			variants={variants}
			animate={show ? 'show' : 'hide'}
		>
			<AnimatePresence initial={false}>
				{todo.map((item, i) => {
					return (
						item.category === category && (
							<SideItem
								key={i}
								title={item.title}
								updateTime={item.updateTime}
								active={item.contentId.toString() === params.contentId}
								onTap={() => history.push(`/${category}/${item.contentId}`)}
								onClickDelBtn={() => handleClickDelBtn(item.contentId)}
							/>
						)
					);
				})}
			</AnimatePresence>
		</motion.div>
	);
};

export default memo(Side);
