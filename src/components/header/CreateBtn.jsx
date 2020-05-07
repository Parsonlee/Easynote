import { memo } from 'react';
/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { motion } from 'framer-motion';
import jwtDecode from 'jwt-decode';

import useThemeModel from '../../models/useThemeModel';
import useDataModel from '../../models/useDataModel';
import useAuthModel from '../../models/useAuthModel';
import { newNote, getNote, newTodo, getTodo } from '../../utils/requests';

const CreateBtn = ({ children = '+写文章', category }) => {
	const { theme } = useThemeModel();
	const { setNoteData, setTodoData } = useDataModel();
	const { auth } = useAuthModel();

	const createNote = () => {
		if (auth) {
			const { userid } = jwtDecode(localStorage.getItem('token'));
			const request = { userId: userid };
			if (category === 0) {
				newNote(request).then(() => {
					getNote(request).then((response) => setNoteData(response.data));
				});
			} else {
				newTodo(request).then(() => {
					getTodo(request).then((response) => setTodoData(response.data));
				});
			}
		}
	};

	return (
		<motion.div
			onClick={createNote}
			css={css`
				border-radius: 20px;
				background: ${theme.background.base};
				box-shadow: 0 0 30px ${theme.color.shadow};
				color: ${theme.button.background};
				cursor: pointer;
				display: flex;
				justify-content: center;
				align-items: center;
				user-select: none;
				-webkit-app-region: no-drag;
				white-space: nowrap;
				padding: 10px;
				@media only screen and (min-width: 320px) and (max-width: 768px) {
					padding: 0;
				}
			`}
			whileHover={{ scale: 1.1 }}
			whileTap={{ scale: 0.9 }}
		>
			<motion.div
				whileHover={{ scale: 0.9 }}
				whileTap={{ scale: 1.1 }}
				css={css`
					@media only screen and (min-width: 320px) and (max-width: 768px) {
						width: 40px;
						height: 40px;
						border-radius: 50%;
						overflow: hidden;
						padding: 0 0 0 0.74rem;
						font-size: 2rem;
					}
				`}
			>
				{children}
			</motion.div>
		</motion.div>
	);
};

export default memo(CreateBtn);
