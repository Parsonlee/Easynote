import { useState, memo } from 'react';
/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { ellipsis } from 'polished';
import { motion } from 'framer-motion';

import SidebarDelBtn from './SidebarDelBtn';

import useThemeModel from '../../models/useThemeModel';

const SideListItem = ({ title,desription,updateTime,active,onTap,onClickDelBtn }) => {
	const { theme } = useThemeModel();
	const [showDel, setShowDel] = useState(false);

	const handleHoverStart = () => {
		setShowDel(true);
	};
	const handleHoverEnd = () => {
		setShowDel(false);
	};

	// 挂载动画
	const variants = {
		initial: {
			x: '-100%',
			opacity: 0
		},
		animate: {
			x: 0,
			opacity: 1
		},
		exit: {
			x: '-100%',
			opacity: 0
		},
		hover: {
			scale: 1.03
		}
	};

	return (
		<motion.div
			variants={variants}
			initial='initial'
			animate='animate'
			exit='exit'
			onTap={onTap}
			onHoverStart={handleHoverStart}
			onHoverEnd={handleHoverEnd}
			css={css`
				position: relative;
				padding: 12px 10px;
				background: ${active
					? theme.background.base
					: theme.background.backdrop};
				cursor: pointer;
				border-bottom: 1px solid #f1f1f1;
				&:hover {
					background: ${theme.background.base};
				}
				&::after {
					content: '';
					display: ${active ? 'block' : 'none'};
					position: absolute;
					left: 0;
					top: 0;
					bottom: 0;
					width: 3px;
					background: ${theme.primary.base};
					transition: 0.1s;
				}
				box-shadow: ${active ? `0 0 30px ${theme.color.shadow}` : 'none'};
				z-index: ${active ? 1 : 0};
				h4 {
					font-size: 14px;
					margin: 0;
					${ellipsis('100%')};
					width: 100%;
					white-space: nowrap;
				}
				p {
					font-size: 12px;
					margin: 0;
					margin-bottom: 6px;
					color: ${theme.color.caption};
					${ellipsis('100%')};
					white-space: nowrap;
				}
				.time {
					display: flex;
					justify-content: space-between;
					white-space: nowrap;
				}
				.time-date{
					font-size: 12px;
					color: ${theme.color.hint};
					white-space: nowrap;
				}
			`}
		>
			<h4>{title}</h4>
			<p>{desription}</p>
			<div className='time'>
				<span className='time-date'>{updateTime}</span>
			</div>
			<SidebarDelBtn
				css={css`
					position: absolute;
					right: 6px;
					top: 6px;
					display: ${showDel ? 'block' : 'none'};
				`}
				onClickDelBtn={onClickDelBtn}
			/>
		</motion.div>
	);
};

export default memo(SideListItem);
