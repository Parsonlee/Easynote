import { memo } from 'react';
/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { motion } from 'framer-motion';
import jwtDecode from 'jwt-decode';

import useThemeModel from '../../models/useThemeModel';
import useDataModel from '../../models/useDataModel';
import useAuthModel from '../../models/useAuthModel';
import { newNote, getNote } from '../../utils/requests';

const CreateBtn = ({ children = '+写文章' }) => {
	const { theme } = useThemeModel();
	const { setNote } = useDataModel();
	const { auth } = useAuthModel();

	const createNote = () => {
		if (auth) {
			const { userid } = jwtDecode(localStorage.getItem('jwtToken'));
			const request = { userId: userid };
			newNote(request).then((res) => {
				getNote(request).then((response) => setNote(response.data));
			});
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
			`}
			whileHover={{ scale: 1.1 }}
			whileTap={{ scale: 0.9 }}
		>
			<motion.div
				whileHover={{ scale: 0.9 }}
				whileTap={{ scale: 1.1 }}
				css={css`
					padding: 10px 10px;
				`}
			>
				{children}
			</motion.div>
		</motion.div>
	);
};

export default memo(CreateBtn);
