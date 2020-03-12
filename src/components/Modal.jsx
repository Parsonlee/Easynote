// import React from 'react';
/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import { position } from 'polished';
import { motion } from 'framer-motion';

import useThemeModel from '../models/useThemeModel';
import useModalModel from '../models/useModalModel';

const Modal = ({ ...props }) => {
	const { theme } = useThemeModel();
	const { modal, closeModal } = useModalModel();

	const handleThinkTap = () => {
		closeModal();
	};
	const handleDelTap = () => {
		closeModal();
	};
	const handleBgClick = () => {
		closeModal();
	};

	return (
		<div
			css={css`
				${position('fixed', 0, 0, 0, 0)};
				display: grid;
				place-items: center;
			`}
			onClick={handleBgClick}
		>
			<motion.div
				css={css`
					background: ${theme.mode === 'dark' ? '#344146' : 'white'};
					box-shadow: 0 4px 4px ${theme.color.shadow};
					border-radius: 18px;
					padding: 18px 40px;
					padding-bottom: 25px;
					h3 {
						color: ${theme.color.base};
					}
					p {
						font-size: 15px;
						color: ${theme.color.caption};
					}
					button {
						border: none;
						border-radius: 8px;
						padding: 8px 16px;
						outline: none;
						cursor: pointer;
						font-size: 16px;
					}
					button:nth-of-type(1) {
						background: ${theme.background.backdrop};
						color: ${theme.color.base};
					}
					button:nth-of-type(2) {
						margin-left: 20px;
						background: #eb5757;
						color: ${theme.button.color};
					}
				`}
				onClick={e => e.stopPropagation()}	// 阻止事件冒泡
				{...props}
			>
				<h3>{modal.title}</h3>
				<p>{modal.description}</p>
				<div>
					<motion.button
						onTap={handleThinkTap}
						whileHover={{ scale: 1.1 }}
						whileTap={{ scale: 0.9 }}
					>
						我再想想
					</motion.button>
					<motion.button
						onTap={handleDelTap}
						whileHover={{ scale: 1.1 }}
						whileTap={{ scale: 0.9 }}
					>
						删除
					</motion.button>
				</div>
			</motion.div>
		</div>
	);
};

export default Modal;
