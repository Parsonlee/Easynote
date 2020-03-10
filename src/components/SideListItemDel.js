import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'
/** @jsx jsx */
import { jsx, css } from '@emotion/core'
import useThemeModel from '../models/useThemeModel'

const SideListItemDel = ({ deleteItem, id, ...props }) => {
  const { theme } = useThemeModel()

  return (
    <div
      onClick={() => deleteItem(id)}
      css={css`
        padding: 2px 8px;
        background: ${theme.background.backdrop};
        color: #eb5757;
        box-shadow: 0 2px 10px ${theme.color.shadow};
        border-radius: 4px;
      `}
      {...props}
    >
      <FontAwesomeIcon icon={faTrashAlt} />
    </div>
  )
}

export default SideListItemDel
