import React from 'react';
import Icon from './icon';
import { faToggleOff, faToggleOn } from '@fortawesome/free-solid-svg-icons';

const SwitchButton = (props) => {
  if (props.on) return <Icon source={faToggleOn} bigger={1} />;
  return <Icon source={faToggleOff} bigger={1}  />
}

export default SwitchButton;
