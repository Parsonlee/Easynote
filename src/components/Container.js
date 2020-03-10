import React, { useState } from 'react'
/** @jsx jsx */
import { jsx, css } from '@emotion/core'
import { between } from 'polished'
import Header from './Header'
import Body from './Body'
import useThemeModel from '../models/useThemeModel'
import useZoomModal from '../models/useZoomModal'

const Container = () => {
  const [sideListOn, setSideListOn] = useState(true)
  const toggleSideListOn = React.useCallback(() => {
    setSideListOn(!sideListOn)
  }, [sideListOn])

  const { theme } = useThemeModel()

  const {zoom, toggleZoom} = useZoomModal()

  return (
    <div
      css={css`
        width: ${zoom?'100%':between('300px', '900px')};
        height: ${zoom?'100%':between('80vh', '80vh')};
        border-radius: 15px;
        transition: .4s;
        background: ${theme.background.base};
        box-shadow: 0 3px 40px ${theme.color.shadow};
        display: flex;
        flex-direction: column;
        color: ${theme.color.base};
        overflow: hidden;
      `}
    >
      <Header toggleSideListOn={toggleSideListOn} />
      <Body sideListOn={sideListOn} />
    </div>
  )
}

export default Container
