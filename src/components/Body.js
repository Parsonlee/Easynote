import React from 'react'
/** @jsx jsx */
import { jsx, css } from '@emotion/core'
import SideList from './SideList'
import Content from './Content'

const Body = ({sideListOn}) => {

  return(
    <div css={css`
      width: 100%;
      display: flex;
      height: calc(100% - 68px);
      /* flex: 1; */
    `}>
      <SideList sideListOn={sideListOn} />
      <Content />
    </div>
  )
}

export default React.memo(Body)