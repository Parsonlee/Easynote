<<<<<<< HEAD
import React, { Component } from 'react'

export default class App extends Component {
  render() {
    return (
      <div>
        Hi this is the initial project.
      </div>
    )
  }
}
=======
import React from 'react'
import Header from './components/Header'
/** @jsx jsx */
import { jsx, css, Global } from '@emotion/core'
import { between } from 'polished'
import Container from './components/Container'
import useThemeModel from './models/useThemeModel'
import Toolbar from './components/Toolbar'
import Modal from './components/Modal'
import { AnimatePresence } from 'framer-motion'
import useModalModel from './models/useModalModel'

const App = () => {
  const { theme } = useThemeModel()
  const { modal } = useModalModel()

  return (
    <div
      css={css`
        height: 100vh;
        display: grid;
        place-items: center;
        background: ${theme.mode === 'dark'
          ? '#111B1F'
          : theme.background.base};
      `}
    >
      <Global
        styles={css`
          * {
            box-sizing: border-box;
          }
          html,
          body {
            height: 100%;
            margin: 0;
            padding: 0;
          }
        `}
      />
      <Container />

      <AnimatePresence>
        {modal.onOff && (
          <Modal
            exit={{
              scale: 0,
              opacity: 0
            }}
            initial={{
              scale: 0,
              opacity: 0
            }}
            animate={{
              scale: 1,
              opacity: 1
            }}
          />
        )}
      </AnimatePresence>

      {/* <Toolbar
        css={css`
          position: fixed;
          right: 40px;
          bottom: 80px;
        `}
      /> */}
    </div>
  )
}

export default App
>>>>>>> 16e03088d2ced8a08a1bd946beb17d5366f6cef8
