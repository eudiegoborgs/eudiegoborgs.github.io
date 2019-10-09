import React from 'react';
import { Helmet } from 'react-helmet';
import { css } from 'emotion'

const style = css`
  position: fixed;
  right: 15px;
  bottom: 15px;
  background: #212121;
  color: white;
  border: solid 1px white;
  border-radius: 100%;
  padding: 5px 10px;
  line-height: 1;
  width: 45px;
  height: 45px;

  :focus {
    outline: 0;
  }

  :hover {
    background: white;
    border: solid 1px #212121;
    color: #212121;
  }

  i {
    line-height: 1;
  }
`;

const LightButton = () => {
  const [theme, setTheme] = React.useState(null)
  const darkMode = theme === 'dark'
  const buttonClass = darkMode ? "fa-sun-o": "fa-moon-o";
  const title = darkMode ? "Desativar modo noturno": "Ativar modo noturno";

  React.useEffect(() => {
    setTheme(theme)
  }, [])

  const change = () => {
    setTheme(darkMode ? 'light' : 'dark')
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