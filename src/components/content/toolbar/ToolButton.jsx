import { useState } from 'react';
/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLaugh } from "@fortawesome/free-solid-svg-icons";
import { motion } from 'framer-motion';

import useThemeModel from '../../../models/useThemeModel';

const ToolButton = ({ icon, size, variant, ...props }) => {
	const { theme } = useThemeModel();
	const [onOff, setOnOff] = useState(false);

	const variants = {
		primary: {
			backgroundColor: theme.primary.base,
			hoverBgColor: theme.primary.lighten,
			tapBgColor: theme.primary.darken,
			fontColor: theme.button.color
		},
		default: {
			backgroundColor: theme.background.base,
			hoverBgColor: theme.background.backdrop,
			tapBgColor: theme.background.backdrop,
			fontColor: theme.color.base
		}
	};
	return (
		<motion.div
			css={css`
				width: 40px;
				height: 40px;
				display: flex;
				justify-content: center;
				align-items: center;
				border-radius: 50%;
				background: ${variants[variant].backgroundColor};
				color: ${variants[variant].fontColor};
				box-shadow: 0 3px 20px ${theme.color.shadow};
				cursor: pointer;
				&:hover {
					filter: brightness(1.1);
				}
			`}
			whileHover={{
				scale: 1.1
			}}
			whileTap={{
				scale: 0.9
      }}
      onTap={()=>{
        setOnOff(!onOff)
      }}
      {...props}
		>
      <FontAwesomeIcon icon={icon} size={size}/>
      {props.children(onOff)}
    </motion.div>
	);
};
ToolButton.defaultProps = {
  icon: faLaugh,
  variant: 'primary',
  children: function(){}
}

export default ToolButton;
