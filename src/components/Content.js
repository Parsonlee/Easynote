import React, { useState } from 'react'
/** @jsx jsx */
import { jsx, css } from '@emotion/core'
import useThemeModel from '../models/useThemeModel'
import styled from '@emotion/styled'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMoon, faSun, faFont } from '@fortawesome/free-solid-svg-icons'
import ToolButton from './Toolbar/ToolButton'
import Toolbar from './Toolbar'
import EditBar from './EditBar'

const Content = () => {
  const { theme, setThemeMode } = useThemeModel()
  const [showEditBar, setShowEditBar] = useState(false)
  
  const toggleShoweditBar = ()=>{
    setShowEditBar(!showEditBar)
  }

  return (
    <div
      css={css`
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: center;
        flex: 1;

        h1 {
          margin: 10px;
        }
        p.time {
          margin: 0;
          padding: 0;
          font-size: 12px;
          color: ${theme.color.hint};
        }
      `}
    >
      <h1>今天吃水果</h1>
      <p className='time'>2020-03-10 3小时前</p>
      <StyledButton
        theme={theme}
        onClick={() => {
          theme.mode==='dark'?setThemeMode('default'):setThemeMode('dark')
        }}
      >
        <FontAwesomeIcon style={{marginRight: '10px'}} size='lg' icon={theme.mode==='dark'?faSun:faMoon} />
        {theme.mode==='dark' ? '切换亮色模式' : '切换暗色模式'}
      </StyledButton>
      <Toolbar css={css`
        position: absolute;
        right: 20px;
        bottom: 40px;
      `} toggleEditBar={toggleShoweditBar} />
      <EditBar showEditBar={showEditBar} />
    </div>
  )
}

const StyledButton = styled.button`
  margin: 20px;
  padding: 10px 20px;
  border: none;
  border-radius: 8px;
  background: ${props => props.theme.button.background};
  color: ${props => props.theme.button.color};
  outline: none;
  cursor: pointer;
`

export default React.memo(Content)
