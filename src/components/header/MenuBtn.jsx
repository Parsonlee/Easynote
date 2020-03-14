import { useState, useEffect, memo } from 'react';
/** @jsx jsx */
import { jsx } from '@emotion/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import styled from '@emotion/styled';
import { motion, AnimatePresence } from 'framer-motion';
import { cover } from 'polished';

import useThemeModel from '../../models/useThemeModel';

// 定义样式和动画
const MenuBtnVariants = {
	hoverStyle: {
		backgroundColor: 'rgba(0,0,0,.04)',
		opacity: 1,
		transition: {
			ease: 'linear'
		}
	}
};
const RippleVariants = {
	initial: {
		scale: 0,
		opacity: 1
	},
	animate: {
		scale: 0,
		opacity: 1
	},
	exit: {
		scale: 5,
		opacity: 0
	}
};

const MenuBtn = ({ initial = true, onSwitch }) => {
	const { theme } = useThemeModel();
	const [onOff, setOnOff] = useState(initial);
	const [rippleCount, setRippleCount] = useState(0);

	useEffect(() => {
		onSwitch && onSwitch(onOff);
	}, [onOff, onSwitch]);

	const switchOnOff = () => [setOnOff(!onOff)];

	const handleTap = () => {
		setRippleCount(rippleCount + 1);
	};

	return (
		<motion.div onTap={switchOnOff}>
			<StyledMenuBtn
				variants={MenuBtnVariants}
				whileHover='hoverStyle'
				whileTap={{ backgroundColor: 'rgba(0,0,0,.18)', scale: 0.8 }}
				onTap={handleTap}
			>
				<AnimatePresence>
					<StyledRipple
						key={rippleCount}
						theme={theme}
						variants={RippleVariants}
						initial='initial'
						animate='animate'
						exit='exit'
						transition={{
							ease: 'easeOut',
							duration: 0.4
						}}
					/>
				</AnimatePresence>
				<FontAwesomeIcon icon={faBars} color='gray' />
			</StyledMenuBtn>
		</motion.div>
	);
};

const StyledRipple = styled(motion.div)`
	${cover()};
	border-radius: 50%;
	background: ${({ theme }) => theme.color.disabled};
`;

const StyledMenuBtn = styled(motion.div)`
	position: relative;
	width: 40px;
	height: 40px;
	display: flex;
	justify-content: center;
	align-items: center;
	border-radius: 20px;
	cursor: pointer;
	opacity: 0.6;
	user-select: none;
`;

export default memo(MenuBtn);
