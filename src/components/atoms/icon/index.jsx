import React from 'react'
import { css } from 'emotion'

const style = css`
  padding: 0 3px;
  &.small {
    font-size: 0.85em;
    font-weight: normal;
  }
  &.bigger {
    font-size: 1.5em;
    font-weight: bold;
  }
  &.disabled {
    opacity: .3;
  }
`;


const Icon = (props) => {
  return (
    <i 
      {...props}
      className={
        `${props.className} ${style} fa fa-${props.source} ${props.small ? 'small' : ''} ${props.bigger ? 'bigger' : ''} ${props.disabled ? 'disabled' : ''}`
      }
    />
  )
}

export default Icon;