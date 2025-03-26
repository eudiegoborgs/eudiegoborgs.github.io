import React from 'react';
import { css } from '@emotion/react';
import SwitchInput from './switch-input'
import Icon from './icon'
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons';
import { Helmet } from 'react-helmet';

const style = css`
  background: transparent;
  color: var(--white);
  border: none;
  display: flex;
  align-items: center;
  cursor: pointer;
  transition: all 0.5s linear;

  :focus {
    outline: 0;
  }
  :hover {
    color: var(--primary-light);
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
    <button css={style} onClick={() => change()} alt={title} title={title}>
      <Helmet>
        <body className={darkMode && "nightmode"} />
      </Helmet>
      <Icon source={faMoon} small={1} disabled={!darkMode} />
      <SwitchInput on={!darkMode ? 1 : 0} bigger={1} />
      <Icon source={faSun} small={1} disabled={darkMode} />
    </button>
  )
}

export default LightButton;
