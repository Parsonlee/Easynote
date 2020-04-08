/** @jsx jsx */
import { css, jsx } from '@emotion/core';

import useThemeModel from '../../../models/useThemeModel';
// import useEditbarModel from '../../../models/useEditbarModel';

const EditBar = ({ children,showEditBar }) => {
	const { theme } = useThemeModel();
	// const { editList, selectEdit } = useEditbarModel();

	return (
		<div
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
			{/* {editList.map((item) => (
				<div
					key={item.behave}
					className={item.behave}
					css={css`
						position: relative;
						cursor: pointer;
						opacity: ${item.active ? 1 : 0.5};
						margin: 3px 0;
					`}
					onClick={() => selectEdit(item.behave)}
				>
					<div
						css={css`
							position: absolute;
							top: 50%;
							left: -10px;
							transform: translateY(-50%);
							padding: 3px;
							background: ${theme.primary.base};
							border-radius: 50%;
							display: ${item.active ? 'block' : 'none'};
						`}
					></div>
					{item.content}
				</div>
			))} */}
			{children}
		</div>
	);
};

export default EditBar;
