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
  // Inicializa com o estado correto para evitar flash
  const [theme, setTheme] = React.useState(() => {
    // Durante SSR, retorna null
    if (typeof window === 'undefined') return null
    
    // No cliente, tenta ler o tema do localStorage
    try {
      return localStorage.getItem('theme') || 'light'
    } catch {
      return 'light'
    }
  })
  
  const [isHydrated, setIsHydrated] = React.useState(false)
  const darkMode = theme === 'dark'
  const title = darkMode ? "Acender a luz": "Apagar a luz";

  React.useEffect(() => {
    // Marca como hidratado após o primeiro render no cliente
    setIsHydrated(true)
    
    // Sincroniza o estado com localStorage se necessário
    if (typeof localStorage !== 'undefined') {
      const savedTheme = localStorage.getItem('theme')
      if (savedTheme && savedTheme !== theme) {
        setTheme(savedTheme)
      } else if (!savedTheme) {
        // Se não há tema salvo, define como light e salva
        localStorage.setItem('theme', 'light')
        if (theme !== 'light') {
          setTheme('light')
        }
      }
    }
  }, [theme])

  const change = () => {
    const newTheme = darkMode ? 'light' : 'dark'
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('theme', newTheme);
    }
    setTheme(newTheme)
  }

  // Não renderiza até estar hidratado para evitar mismatch entre SSR e cliente
  if (!isHydrated) {
    return (
      <button css={style} alt="Carregando tema..." title="Carregando tema..." disabled>
        <Icon source={faMoon} small={1} disabled />
        <SwitchInput on={0} bigger={1} />
        <Icon source={faSun} small={1} disabled />
      </button>
    )
  }

  return (
    <button css={style} onClick={() => change()} alt={title} title={title}>
      <Helmet>
        <body className={darkMode ? "nightmode" : ""} />
      </Helmet>
      <Icon source={faMoon} small={1} disabled={!darkMode} />
      <SwitchInput on={!darkMode ? 1 : 0} bigger={1} />
      <Icon source={faSun} small={1} disabled={darkMode} />
    </button>
  )
}

export default LightButton;
