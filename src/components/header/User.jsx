/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { motion } from 'framer-motion';

import useThemeModel from '../../models/useThemeModel';

const User = ({ children, onClick }) => {
  const {theme } = useThemeModel();
	return (
		<motion.div
			onClick={onClick}
			css={css`
				border-radius: 50%;
				cursor: pointer;
				display: flex;
				justify-content: center;
				align-items: center;
        box-shadow: 0 0 30px ${theme.color.shadow};
				margin-left: 20px;
				/* border: 1px solid; */
				overflow: hidden;
				img {
					width: 40px;
					height: 40px;
				}
			`}
			whileHover={{ scale: 1.1 }}
			whileTap={{ scale: 0.9 }}
		>
			{children}
		</motion.div>
	);
};

export default User;
