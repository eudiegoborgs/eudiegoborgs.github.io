import React from 'react'
import { css } from '@emotion/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const style = css`
  padding: 0 3px;
  min-width: 1.2em;
  text-align: center;
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
    <FontAwesomeIcon icon={source} css={style} className={`${className} ${small ? 'small' : ''} ${bigger ? 'bigger' : ''} ${disabled ? 'disabled' : ''}`} />
  )
}

export default Icon;
