import React from 'react'
/** @jsx jsx */
import { jsx, css } from '@emotion/core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import styled from '@emotion/styled'
import { motion } from 'framer-motion'

const variants = {
  hoverStyle: {
    backgroundColor: 'rgba(0,0,0,.08)',
    opacity: 1,
    transition: {
      ease: 'linear'
    }
  }
}

const MenuBar = ({toggleSideListOn}) => {
  return (
    <motion.div onTap={()=>toggleSideListOn()}>
      <StyledMenuBar variants={variants} whileHover='hoverStyle' whileTap={{backgroundColor: 'rgba(0,0,0,.18)', scale: .8}}>
        <FontAwesomeIcon icon={faBars} color='gray' />
      </StyledMenuBar>
    </motion.div>
  )
}

const StyledMenuBar = styled(motion.div)`
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0,0,0,0);
  border-radius: 20px;
  cursor: pointer;
  opacity: .6;
`

export default MenuBar
