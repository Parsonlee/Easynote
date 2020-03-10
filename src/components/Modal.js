import React from 'react'
/** @jsx jsx */
import { jsx, css } from '@emotion/core'
import { position } from 'polished'
import useThemeModel from '../models/useThemeModel'
import useModalModel from '../models/useModalModel'
import { motion } from 'framer-motion'

const Modal = ({ ...props }) => {
  const { theme } = useThemeModel()
  const { modal, openModal, closeModal } = useModalModel()

  const handleThinkTap = () => {
    closeModal()
  }

  const handleDelTap = () => {
    closeModal()
  }

  const handleBgClick = ev => {
    closeModal()
  }

  return (
    <div
      css={css`
        ${position('fixed', 0, 0, 0, 0)}
        display: grid;
        place-items: center;
      `}
      onClick={handleBgClick}
    >
      <motion.div
        css={css`
          /* display: ${modal.onOff ? 'block' : 'none'}; */
          /* position: fixed;
          margin: auto;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%); */
          background: ${
            theme.mode === 'dark' ? '#344146' : 'white'
          };
          box-shadow: 0 4px 4px ${theme.color.shadow};
          border-radius: 18px;
          padding: 18px 40px;
          padding-bottom: 25px;

          h3 {
            color: ${theme.color.base};
          }

          p {
            font-size: 15px;
            color: ${theme.color.caption};
          }

          button {
            border: none;
            border-radius: 8px;
            padding: 8px 16px;
            outline: none;
            cursor: pointer;
            font-size: 16px;
          }
          button:nth-of-type(1) {
            background: ${theme.background.backdrop};
            color: ${theme.color.base};
          }
          button:nth-of-type(2) {
            margin-left: 20px;
            background: #eb5757;
            color: ${theme.button.color};
          }
        `}
        onClick={ev => ev.stopPropagation()}
        {...props}
      >
        <h3>{modal.title}</h3>
        <p>{modal.description}</p>
        <div
          css={css`
            display: flex;
            justify-content: flex-end;
          `}
        >
          <motion.button
            onTap={handleThinkTap}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            容朕想想
          </motion.button>
          <motion.button
            onTap={handleDelTap}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            删除
          </motion.button>
        </div>
      </motion.div>
    </div>
  )
}

export default Modal
