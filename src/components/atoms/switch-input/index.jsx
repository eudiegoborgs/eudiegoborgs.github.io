import React from 'react';
import Icon from '../icon';

const SwitchButton = (props) => {
  return <Icon {...props} source={props.on ? "toggle-on": "toggle-off"} />
}

export default SwitchButton;