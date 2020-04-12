import { memo } from 'react';
/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { motion, AnimatePresence } from 'framer-motion';
import { useParams, useHistory } from 'react-router-dom';

import SidebarItem from './SidebarItem';

import useDataModel from '../../models/useDataModel';
import useThemeModel from '../../models/useThemeModel';

const Sidebar = ({ show, category }) => {
	const { theme } = useThemeModel();
	const { data, deleteByContentId } = useDataModel();
	const params = useParams();
	const history = useHistory();

	// 动画
	const variants = {
		show: {
			width: '168px',
			x: '0',
			transition: {
				ease: 'easeOut',
				duration: 0.3
			}
		},
		hide: {
			width: 0,
			x: '0',
			transition: {
				ease: 'circOut',
				duration: 0.4
			}
		}
	};

	const handleClickDelBtn = (contentId, i) => {
		deleteByContentId(contentId);
		const nextIndex = i + 1;
		if (nextIndex < data.length) {
			history.push(`${data[i + 1].contentId}`);
		} else {
			history.push(`nocontent`);
		}
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
				{data.map((item, i) => {
					return (
						item.category === category && (
							<SidebarItem
								key={item.contentId}
								title={item.title}
								desription={item.description}
								updateTime={item.updateTime}
								active={item.contentId === params.contentId}
								onTap={() => history.push(`/${category}/${item.contentId}`)}
								onClickDelBtn={() => handleClickDelBtn(item.contentId, i)}
							/>
						)
					);
				})}
			</AnimatePresence>
		</motion.div>
	);
};

export default memo(Sidebar);
