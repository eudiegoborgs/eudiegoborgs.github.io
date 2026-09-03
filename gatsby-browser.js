import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import "./src/components/themes/layout.css";

config.autoAddCss = false;

export const onRouteUpdate = () => {
  const codeBlocks = document.querySelectorAll("code[class*='language-']");

  codeBlocks.forEach(pre => {
    // Evita duplicação
    if (pre.parentNode.classList.contains("code-block")) return;

    const wrapper = document.createElement("pre");
    wrapper.className = "code-block";
    pre.parentNode.insertBefore(wrapper, pre);
    wrapper.appendChild(pre);

    const button = document.createElement("button");
    button.className = "copy-button";
    button.textContent = "📋 Copiar";

    wrapper.insertBefore(button, pre);

    button.addEventListener("click", () => {
        console.log("click");
      const code = wrapper.querySelector("code");
      if (!code) return;

      navigator.clipboard.writeText(code.innerText).then(() => {
        button.textContent = "✅ Copiado!";
        setTimeout(() => {
          button.textContent = "📋 Copiar";
        }, 2000);
      });
    });
  });
};
