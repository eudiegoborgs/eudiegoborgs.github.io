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
  const {className, source, small, bigger, disabled} = props;
  return (
    <i 
      {...props}
      className={
        `${className} ${style} fa fa-${source} ${small ? 'small' : ''} ${bigger ? 'bigger' : ''} ${disabled ? 'disabled' : ''}`
      }
    />
  )
}

export default Icon;