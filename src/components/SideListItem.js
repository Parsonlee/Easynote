import React, { useState } from 'react'
/** @jsx jsx */
import { jsx, css } from '@emotion/core'
import useThemeModel from '../models/useThemeModel'
import { ellipsis } from 'polished'
import { motion } from 'framer-motion'
import SideListItemDel from './SideListItemDel'
import useModalModel from '../models/useModalModel'

const SideListItem = ({ sideListOn, deleteItem, id, ...props }) => {
  const { theme } = useThemeModel()
  const [showDel, setShowDel] = useState(false)
  const { openModal } = useModalModel()

  const handleMouseOver = () => {
    setShowDel(true)
  }

  const handleMouseOut = () => {
    setShowDel(false)
  }

  return (
    <motion.div
      onTap={()=>openModal({title: '请充值', description: '充值一万块钱好不好'})}
      onHoverStart={handleMouseOver}
      onHoverEnd={handleMouseOut}
      css={css`
        position: relative;
        border-bottom: 1px solid ${theme.color.divider};
        padding: 12px 10px;
        background: ${theme.background.backdrop};
        cursor: pointer;
        &:hover {
          background: ${theme.background.base};
        }

        h4 {
          font-size: 16px;
          margin: 0;
          ${ellipsis('100%')};
        }
        p {
          font-size: 14px;
          margin: 0;
          margin-bottom: 6px;
          color: ${theme.color.caption};
          ${ellipsis('100%')};
        }
        .time {
          display: flex;
          justify-content: space-between;
        }
        .time-date,
        .time-before {
          font-size: 12px;
          color: ${theme.color.hint};
        }
      `}
      whileHover={{ scale: 1.03 }}
      animate={{
        opacity: sideListOn ? 1 : 0,
        x: sideListOn ? '0' : '-100%'
      }}
      {...props}
    >
      <h4>🌈🌈Easynote真牛逼👍啊真牛逼</h4>
      <p>牛逼就牛逼在什么文章都可以写，强的一批</p>
      <div className='time'>
        <span className='time-date'>2020-03-10</span>
        <span className='time-before'>3小时前</span>
      </div>
      <SideListItemDel
        deleteItem={deleteItem}
        id={id}
        css={css`
          position: absolute;
          right: 6px;
          top: 6px;
          display: ${showDel ? 'block' : 'none'};
        `}
      />
    </motion.div>
  )
}

export default SideListItem
