import React from 'react'
import Icon from '../icon';


const ReadTime = (props) => {
  return (
    <span role="contentinfo">
      <Icon {...props} source="clock-o" />{`${Math.ceil(props.time)} minuto${props.time > 1 ? 's' : ''} de leitura`}
    </span>
  )
}

export default ReadTime;