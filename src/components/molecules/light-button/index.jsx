import React from 'react';
import { Helmet } from 'react-helmet'
import { css } from 'emotion'
import SwitchInput from '../../atoms/switch-input';
import Icon from '../../atoms/icon';

const style = css`
  background: transparent;
  color: white;
  border: none;
  display: flex;
  align-items: center;

  :focus {
    outline: 0;
  }
`;

const LightButton = () => {
  const [theme, setTheme] = React.useState(null)
  const darkMode = theme === 'dark'
  const title = darkMode ? "Acender a luz": "Apagar a luz";

  React.useEffect(() => {
    if (typeof localStorage !== 'undefined') {
      const defaultTheme = localStorage.getItem('theme')
      if (defaultTheme) {
        setTheme(defaultTheme)
      }
    }
  }, [])

  const change = () => {
    const newTheme = darkMode ? 'light' : 'dark'
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('theme', newTheme);
    }
    setTheme(newTheme)
  }

  return (
    <button className={style} onClick={change} alt={title} title={title}>
      <Helmet>
        <body className={darkMode && "nightmode"} />
      </Helmet>
      <Icon className="hide-on-mobile" source="sun-o" small disabled={darkMode} />
      <SwitchInput on={!darkMode} bigger />
      <Icon className="hide-on-mobile" source="moon-o" small disabled={!darkMode} />
    </button>
  )
}

export default LightButton;