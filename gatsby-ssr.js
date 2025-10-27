const React = require("react")

// Script inline para evitar o flash de conteúdo não estilizado (FOUC)
const ThemeScriptTag = () => {
  const codeToRunOnClient = `
(function() {
  function setTheme() {
    try {
      var theme = localStorage.getItem('theme');
      if (theme === 'dark') {
        document.body.classList.add('nightmode');
      } else {
        document.body.classList.remove('nightmode');
      }
    } catch (e) {
      // Se localStorage não estiver disponível, mantém o tema claro como padrão
    }
  }
  
  // Executa imediatamente
  setTheme();
  
  // Também executa quando o DOM estiver carregado (fallback)
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setTheme);
  }
})()
  `

  return React.createElement("script", {
    key: "theme-script",
    dangerouslySetInnerHTML: {
      __html: codeToRunOnClient,
    },
  })
}

exports.onRenderBody = ({ setPreBodyComponents }) => {
  setPreBodyComponents([ThemeScriptTag()])
}