---
path: testes-para-dev-5-testes-de-mutacao
date: 2026-09-04T09:00:00.000Z
title: "Testes para Dev #5: Testes de Mutação — Destruindo a Falsa Segurança dos 100% de Cobertura"
---

Fala, dev! Beleza? 🚀

Chegamos ao quinto capítulo da nossa série **Testes para Dev**!

Já passamos por [Unidade](https://diegoborgs.com.br/blog/testes-para-dev-1-testes-de-unidade), [Integração](https://diegoborgs.com.br/blog/testes-para-dev-2-testes-de-integracao), [CI/CD](https://diegoborgs.com.br/blog/testes-para-dev-3-continuous-integration) e [Contratos](https://diegoborgs.com.br/blog/testes-para-dev-4-testes-de-contrato).

Hoje vamos tocar em uma ferida que atinge 9 em cada 10 times de desenvolvimento: **a ilusão da cobertura de código**.

> *"Já tenho 100% de cobertura de código no relatório do Jest... Agora não preciso me preocupar com mais nada porque meu código está protegido!"*

Sera mesmo??? 🤔

---

## A Ilusão da Cobertura de Código (Code Coverage)

Olha esse exemplo de código e teste:

```javascript
const isAdult = age => {
  return age >= 18;
};

it('Testa se a função isAdult roda', () => {
  expect(isAdult(27)).toBe(true);
  expect(isAdult(10)).toBe(false);
});
```

Se você rodar a cobertura de código com o Jest, o relatório vai gritar: **100% COVERAGE!** 🎉

Mas pergunto a você: **essa função está realmente protegida de mudanças acidentais?**

Se alguém no futuro for refatorar e alterar a regra para `age > 18` (substituindo `>=` por `>`), o que acontece com a idade exata de `18` anos? Os testes existentes **não cobriram o valor limite (boundary value)**, mas o relatório de cobertura tradicional diz que 100% do código foi executado!

---

## Quem Guardará os Guardas? Entram os Testes de Mutação! 🦸‍♂️

É exatamente para responder a essa pergunta que surgiram os **Testes de Mutação**.

A ideia é invertida: em vez de testar o seu código, a ferramenta vai **testar a qualidade dos seus testes!**

### Como funciona o Teste de Mutação?

1. A ferramenta (como o **Stryker**) lê o seu código-fonte.
2. Ela cria pequenas modificações propositais no código chamadas de **Mutantes** (ex: troca `>=` por `>`, troca `+` por `-`, remove chamadas de função, etc.).
3. Para cada mutante criado, ela executa a sua suíte de testes.

### Os 2 Resultados Possíveis:

- ❌ **Mutante Sobreviveu (Survived)**: O código foi alterado, mas nenhum teste falhou. **Ruim!** Significa que seus testes não pegaram a regressão.
- 🟢 **Mutante Morto (Killed)**: O código foi alterado e pelo menos um teste falhou. **Excelente!** Significa que seus testes estão atentos.

---

## Conhecendo o Stryker Mutator

O **Stryker** (https://stryker-mutator.io/) é a biblioteca padrão de mercado para testes de mutação no ecossistema JavaScript/TypeScript.

### 1. Instalação (Node.js 18+)
```bash
npm i --save-dev @stryker-mutator/core @stryker-mutator/jest-runner
```

### 2. Inicialização
```bash
npx stryker init
```

### 3. Configuração (`stryker.conf.json`)
Nas versões modernas do Stryker (v6+), a configuração é super limpa:

```json
{
  "$schema": "./node_modules/@stryker-mutator/core/schema/stryker-schema.json",
  "packageManager": "npm",
  "reporters": [
    "html",
    "clear-text",
    "progress"
  ],
  "testRunner": "jest",
  "coverageAnalysis": "perTest"
}
```

### 4. Executando o Stryker
```bash
npx stryker run
```

O Stryker vai gerar um relatório visual HTML incrível mostrando exatamente em quais linhas os mutantes sobreviveram e quais cenários de teste faltam no seu projeto.

---

## Atenção: Testes de Mutação são Lentos e Caros! ⚠️

Como o Stryker precisa re-executar os testes para cada mutação gerada, rodar testes de mutação em projetos gigantes pode levar vários minutos.

**Dica de ouro**: Não rode o Stryker em cada commit local. Rode no pipeline de CI semanal, noturno ou restrito apenas aos arquivos modificados no Pull Request!

---

## O que vem por aí na série "Testes para Dev"? 🪝

Cobrimos a fundo a qualidade da nossa lógica de backend e unidade. Mas e o usuário final clicando na tela, preenchendo formulários e navegando nas rotas do sistema?

No **Capítulo #6**, vamos falar de **Testes End-to-End (E2E) com Cypress**! Vamos ver como simular jornadas reais de navegação automatizando o browser de ponta a ponta.

Até o próximo artigo! 🚀
