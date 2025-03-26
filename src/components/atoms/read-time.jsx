import React from 'react'
import Icon from './icon';
import { faClock } from '@fortawesome/free-solid-svg-icons';


const ReadTime = (props) => {
  return (
    <span role="contentinfo">
      <Icon {...props} source={faClock} />{`${Math.ceil(props.time)} minuto${props.time > 1 ? 's' : ''} de leitura`}
    </span>
  )
}

export default ReadTime;
