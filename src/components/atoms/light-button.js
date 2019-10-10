import React from 'react';
import { Helmet } from 'react-helmet';
import { css } from 'emotion'

const style = css`
  background: transparent;
  color: white;
  border: none;

  :focus {
    outline: 0;
  }
  i {
    line-height: 1;
  }
`;

const LightButton = () => {
  const [theme, setTheme] = React.useState(null)
  const darkMode = theme === 'dark'
  const buttonClass = darkMode ? "fa-toggle-off": "fa-toggle-on";
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
    <button className={style} onClick={change}>
      <Helmet>
        <body className={darkMode && "nightmode"} />
      </Helmet>
      <i className={`fa ${buttonClass}`} alt={title} title={title}/>
    </button>
  )
}

export default LightButton;