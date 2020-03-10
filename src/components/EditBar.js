import React from 'react'
/** @jsx jsx */
import { jsx, css } from '@emotion/core'
import styled from '@emotion/styled'
import useThemeModel from '../models/useThemeModel'
import useEditbarModal from '../models/useEditbarModal'

const EditBar = ({showEditBar}) => {
  const { theme } = useThemeModel()
  const { editList, selectEdit } = useEditbarModal()

  return (
    <div
      css={css`
        display: ${showEditBar?'block':'none'};
        position: absolute;
        right: 20px;
        bottom: 200px;
        background: ${theme.mode === 'dark'
          ? '#344146'
          : theme.background.base};
        box-shadow: 0 3px 20px ${theme.color.shadow};
        border-radius: 10px;
        padding: 13px;
        padding-left: 20px;

        .h1 {
          font-size: 30px;
          font-weight: bolder;
        }
        .h2 {
          font-size: 24px;
          font-weight: bold;
        }
        .h3 {
          font-size: 16px;
          font-weight: bold;
        }
        .body {
          font-size: 14px;
          color: ${theme.color.base};
        }
        .link {
        }
      `}
    >
      {editList.map(item => (
        <div
          key={item.behave}
          className={item.behave}
          css={css`
            position: relative;
            cursor: pointer;
            opacity: ${item.active?1:.5};
          `}

          onClick={()=>selectEdit(item.behave)}
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
      ))}
    </div>
  )
}

export default EditBar
