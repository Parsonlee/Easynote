import React, { useState } from 'react';
/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import { between } from 'polished';
import { motion, AnimatePresence } from 'framer-motion';
import { uuid } from 'uuidv4';

import SideListItem from './SideListItem';

import useThemeModel from '../../../models/useThemeModel';

const initData = [
	{
		id: uuid()
	},
	{
		id: uuid()
	},
	{
		id: uuid()
	},
	{
		id: uuid()
	},
	{
		id: uuid()
	},
	{
		id: uuid()
	}
];

const SideList = ({ sideListOn }) => {
	const { theme } = useThemeModel();
	const [list, setList] = useState(initData);

	const handleDeleteItem = id => {
		setList(state => state.filter(item => (item.id === id ? false : true)));
	};
	return (
		<motion.div
			css={css`
      height: 100%;
      width: ${between('150px', '240px')};
      border-right: 1px solid ${theme.color.divider};
      background: ${theme.background.backdrop};
      overflow-y: auto;
      overflow-x: hidden;
      &::-webkit-scrollbar {
        width: 2px;
        z-index: 999;
        display: ${sideListOn ? 'block' : 'none'};
        /* background: ${theme.color.shadow}; */
      }
      &::-webkit-scrollbar-thumb {
        z-index: 999;
        border-radius: 10px;
        background: ${theme.color.shadow};
      }
    `}
			animate={{
				width: sideListOn ? between('80px', '168px') : 0,
				borderRightWidth: sideListOn ? 1 : 0
			}}
		>
			<AnimatePresence>
				{list.map((data, i) => (
					<SideListItem
						key={data.id}
						sideListOn={sideListOn}
						exit={{ x: '-100%', opacity: '0' }}
						animate={{ x: 0, opacity: '1' }}
						initial={{ x: '-100%', opacity: 0 }}
						transition={{ duration: 0.2, delay: 0.06 * i }}
						id={data.id}
						deleteItem={handleDeleteItem}
						positionTransition
					/>
				))}
			</AnimatePresence>
		</motion.div>
	);
};

export default SideList;
