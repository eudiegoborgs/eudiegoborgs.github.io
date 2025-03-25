import React, { lazy, Suspense } from 'react';
import { css } from 'emotion'
import AnalyticsService from '../../../services/analitycs';
import SwitchInput from '../../atoms/switch-input'
import Icon from '../../atoms/icon'

const Helmet = lazy(() => import('react-helmet'))

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
    color: var(--primary);
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
    AnalyticsService.event({
      category: 'User',
      action: `click`,
      label: `Change site theme to ${newTheme}`
    });
    setTheme(newTheme)
  }

  return (
    <button className={style} onClick={change} alt={title} title={title}>
      <Suspense
        fallback={<div />}
      >
        <Helmet>
          <body className={darkMode && "nightmode"} />
        </Helmet>
      </Suspense>
      <Icon source="moon-o" small={1} disabled={!darkMode} />
      <SwitchInput on={!darkMode ? 1 : 0} bigger={1} />
      <Icon source="sun-o" small={1} disabled={darkMode} />
    </button>
  )
}

export default LightButton;
