import { useState } from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMouse } from '@fortawesome/free-solid-svg-icons';
/** @jsx jsx */
import { css, jsx } from '@emotion/core';

import useThemeModel from '../../../models/useThemeModel';

const EditBar = ({ children, showEditBar }) => {
	const { theme } = useThemeModel();
	const [ifDrag, setIfDrag] = useState(false);

	const toggleDragable = () => {
		setIfDrag(!ifDrag);
	};

	return (
		<motion.div
			drag={ifDrag}
			dragMomentum={false}
			css={css`
				display: ${showEditBar ? 'block' : 'none'};
				position: absolute;
				right: 20px;
				bottom: 160px;
				background: ${theme.mode === 'dark'
					? '#344146'
					: theme.background.base};
				box-shadow: 0 3px 20px ${theme.color.shadow};
				border-radius: 10px;
				padding: 13px;
				padding-left: 20px;
				z-index: 999;
				.heading-one {
					font-size: 2em;
					font-weight: bold;
				}
				.heading-two {
					font-size: 1.5em;
					font-weight: bold;
				}
				.bold {
					font-size: 1rem;
					font-weight: bold;
				}
				.italic {
					font-size: 1rem;
					font-style: italic;
					color: ${theme.color.base};
				}
				.underline {
					font-size: 1rem;
					text-decoration: underline;
					color: ${theme.color.base};
				}
			`}
		>
			<FontAwesomeIcon
				css={css`
					display: block;
					margin-left: auto;
					margin-bottom: 4px;
					cursor: pointer;
				`}
				color={ifDrag ? theme.color.body : theme.color.hint}
				size='xs'
				icon={faMouse}
				onClick={toggleDragable}
			/>
			{children}
		</motion.div>
	);
};

export default EditBar;
