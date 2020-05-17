import React from 'react';
import { Helmet } from 'react-helmet';
import { css } from 'emotion'

const style = css`
  background: transparent;
  color: white;
  border: none;
  display: flex;
  align-items: center;

  :focus {
    outline: 0;
  }
  i {
    line-height: 1;
    padding: 0 3px;
    font-size: 1.4rem;
    font-weight: bold;
    @media (max-width: 780px) {
      padding: 0;
    }
  }
  .small {
    font-size: 0.85rem;
    font-weight: normal;
    @media (max-width: 780px) {
      display: none;
    }
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
      <i className={`fa fa-moon-o small`} />
      <i className={`fa ${buttonClass}`} alt={title} title={title}/>
      <i className={`fa fa-sun-o small`} />
    </button>
  )
}

export default LightButton;