import React from 'react';
import Icon from '../icon';

const SwitchButton = (props) => {
  return <Icon {...props} source={props.on ? "toggle-off": "toggle-on"} />
}

export default SwitchButton;