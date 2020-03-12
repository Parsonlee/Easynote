import React from 'react';
/** @jsx jsx */
import { css, jsx, Global } from '@emotion/core';
import { AnimatePresence } from 'framer-motion';

// 组件
import Container from './components/Container';
import Modal from './components/Modal';

// 控制模型
import useThemeModel from './models/useThemeModel';
import useModalModel from './models/useModalModel';

const App = () => {
	const { theme } = useThemeModel();
	const { modal } = useModalModel();

	return (
		<div
			css={css`
				height: 100vh;
				display: grid;
				place-items: center;
				background: ${theme.mode === 'dark'
					? '#111B1F'
					: theme.background.base};
			`}
		>
			<Global
				styles={css`
					* {
						box-sizing: border-box;
					}
					html,
					body {
						height: 100%;
						margin: 0;
						padding: 0;
					}
				`}
			/>

			<Container />

			<AnimatePresence>
				{modal.onOff && (
					<Modal
						exit={{
							scale: 0,
							opacity: 0
						}}
						initial={{
							scale: 0,
							opacity: 0
						}}
						animate={{
							scale: 1,
							opacity: 1
						}}
					/>
				)}
			</AnimatePresence>
		</div>
	);
};

export default App;
