import React, { useEffect } from 'react'
/** @jsx jsx */
import { jsx, css } from '@emotion/core'
import MenuBar from './MenuBar'
import useThemeModel from '../models/useThemeModel'

const Header = ({toggleSideListOn}) => {
  const {theme} = useThemeModel()

  return(
    <div css={css`
      padding: 0 17px;
      height: 68px;
      border-bottom: 1px solid ${theme.color.divider};
      display: flex;
      align-items: center;
    `}>
      <MenuBar toggleSideListOn={toggleSideListOn} />
    </div>
  )
}

export default React.memo(Header)