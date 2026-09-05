const React = require("react")
const { config } = require("@fortawesome/fontawesome-svg-core")

config.autoAddCss = false

// Script inline para evitar o flash de conteúdo não estilizado (FOUC)
const ThemeScriptTag = () => {
  const codeToRunOnClient = `
(function() {
  function setTheme() {
    try {
      var theme = localStorage.getItem('theme');
      var root = document.documentElement;
      if (theme === 'dark') {
        root.classList.add('nightmode');
        if (document.body) document.body.classList.add('nightmode');
      } else {
        root.classList.remove('nightmode');
        if (document.body) document.body.classList.remove('nightmode');
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

// Script para carregar o Google Analytics (GA4) de forma diferida sem bloquear LCP e TBT
const GtagScriptTag = () => {
  const codeToRunOnClient = `
(function() {
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-YY9NNF1FKH', { 'anonymize_ip': true });

  function loadGtag() {
    if (window.__gtagLoaded) return;
    window.__gtagLoaded = true;
    var s = document.createElement('script');
    s.async = true;
    s.src = 'https://www.googletagmanager.com/gtag/js?id=G-YY9NNF1FKH';
    document.head.appendChild(s);
  }

  if (document.readyState === 'complete') {
    setTimeout(loadGtag, 2000);
  } else {
    window.addEventListener('load', function() {
      if ('requestIdleCallback' in window) {
        requestIdleCallback(loadGtag, { timeout: 4000 });
      } else {
        setTimeout(loadGtag, 2000);
      }
    });
  }
})()
  `

  return React.createElement("script", {
    key: "gtag-lazy-script",
    dangerouslySetInnerHTML: {
      __html: codeToRunOnClient,
    },
  })
}

exports.onRenderBody = ({ setPreBodyComponents, setPostBodyComponents }) => {
  setPreBodyComponents([ThemeScriptTag()])
  setPostBodyComponents([GtagScriptTag()])
}