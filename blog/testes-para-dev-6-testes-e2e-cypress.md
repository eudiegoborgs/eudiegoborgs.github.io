---
path: testes-para-dev-6-testes-e2e-cypress
date: 2026-09-05T09:00:00.000Z
title: "Testes para Dev #6: Testes End-to-End com Cypress — Garantindo a Jornada do Usuário do Zero"
---

Fala, dev! Tudo certo? 🚀

Chegamos ao sexto capítulo da nossa série **Testes para Dev**! 

Nos artigos anteriores aprendemos sobre [Testes de Unidade](https://diegoborgs.com.br/blog/testes-para-dev-1-testes-de-unidade), [Testes de Integração](https://diegoborgs.com.br/blog/testes-para-dev-2-testes-de-integracao), [Continuous Integration (CI/CD)](https://diegoborgs.com.br/blog/testes-para-dev-3-continuous-integration), [Testes de Contrato](https://diegoborgs.com.br/blog/testes-para-dev-4-testes-de-contrato) e [Testes de Mutação](https://diegoborgs.com.br/blog/testes-para-dev-5-testes-de-mutacao).

Agora, imagine o seguinte cenário no mundo real:

> Todos os testes de unidade passaram. O backend validou os testes de contrato. A esteira de CI deu check verde. Mas quando a sua empresa lança a campanha de Black Friday, um modal promocional com `z-index` errado aparece cobrindo o botão "Finalizar Compra", ou um duplo clique no formulário de pagamento dispara duas chamadas de API cobrando o cartão duas vezes! O cliente fica furioso, cancela o pedido e vai para o concorrente... **KABOOM! 💥 A experiência do usuário foi destruída em produção!**

Como evitar que falhas visuais ou de fluxo da interface estraguem o negócio mesmo quando o código interno parece estar perfeito?

Para colocar a perspectiva do usuário final no centro da garantia de qualidade, surgem os **Testes End-to-End (E2E) ou Ponta a Ponta**.

Hoje vamos aprender **passo a passo (baby steps)** como instalar, estruturar, configurar e escrever testes E2E com **Cypress**, entender boas práticas de seletores HTML, utilizar o `cy.intercept` para espionar/mockar chamadas HTTP e rodar os testes no CI/CD com GitHub Actions.

---

## O que é um Teste End-to-End (E2E)? 🌐

Em termos simples: **é a simulação automatizada das ações de um ser humano navegando na sua aplicação em um browser de verdade.**

Diferente dos testes unitários que testam funções isoladas, o teste E2E responde à pergunta:  
*"Se um cliente real abrir o navegador, digitar o e-mail, preencher a senha e clicar em Entrar, ele realmente chegará no painel da conta com os dados carregados?"*

### Glossário de Termos dos Testes E2E 📖

Guarde este pequeno dicionário para acompanhar o tutorial sem dúvidas:

* **End-to-End (E2E / Ponta a Ponta)**: Teste que cobre todo o caminho percorrido pelo usuário, desde a interface gráfica (HTML/CSS/JS) até o banco de dados e APIs integradas.
* **Cypress Test Runner**: A interface gráfica interativa do Cypress onde você vê o navegador abrindo e executando os testes em tempo real.
* **Headless Browser**: A execução do navegador em segundo plano (sem janela visual) utilizada nos servidores de CI/CD para ser ultrarrápida.
* **Time Travel**: Recurso do Cypress que permite passar o mouse em cada comando executado e visualizar exatamente como a tela estava naquele milissegundo.
* **Auto-Waiting**: Mecanismo inteligente do Cypress que aguarda elementos aparecerem na DOM e requisições HTTP terminarem antes de falhar (dizendo adeus aos `sleep(5000)` picaretas!).
* **Fixture**: Arquivos estáticos em formato JSON (`.json`) usados para simular dados de teste ou mocks de respostas de API.
* **Seletor HTML (`data-cy`)**: Atributo reservado no HTML para localizar elementos na tela de forma estável, sem depender de CSS ou IDs que mudam na refatoração.

---

## Ponto fundamental: Cypress vs. Jest / React Testing Library (Quem faz o quê?) 🤝

Antes de abrir o terminal, vale alinhar a diferença entre essas ferramentas:

> **O Jest / React Testing Library roda no simulador de DOM (`jsdom`). O Cypress roda dentro de um NAVEGADOR REAL (Chrome, Firefox, Edge, Electron)!**

* **Jest + React Testing Library**: Testam a renderização de componentes isolados em memória. Não testam navegação real entre páginas, layout CSS real nem comportamentos de rede reais do browser.
* **Cypress**: Sobe o site real compilado, abre o navegador, executa cliques de mouse, digitação de teclado, navega entre páginas e valida a experiência visual real do cliente.

---

## Quando USAR (e quando NÃO usar) Testes E2E? 🎯

### ✅ Quando USAR:
1. **Jornadas Críticas de Negócio**: Autenticação/Login, Cadastro de Clientes, Checkout/Carrinho de Compras, Redefinição de Senha e Alteração de Assinatura.
2. **Smoke Tests no CI/CD**: Uma suíte enxuta de 5 a 10 testes essenciais para autorizar o deploy em produção.
3. **Validação Visual de Fluxos Complexos**: Garantir que formulários multi-etapas salvam os dados corretamente ao avançar e voltar telas.

### 🛑 Quando NÃO usar:
1. **Para testar cada pequena regra de validação ou cálculo matemático**: Testar 50 variações de validação de CPF via Cypress torna a suíte lenta. Deixe validações matemáticas para os testes de unidade!
2. **Substituir testes de unidade/integração**: Testes E2E são no topo da pirâmide (mais lentos e mais caros). Tenha menos testes E2E e mais testes de unidade/integração.

---

## Como o Cypress funciona por baixo dos panos? 🔍

Abaixo está o fluxo visual de como o Cypress orquestra a execução:

```
┌─────────────────┐       ┌────────────────────┐       ┌──────────────────────┐
│  1. Inicializa  │ ────► │  2. Sobe o Browser │ ────► │  3. Intercepta a     │
│  o Cypress CLI  │       │  Real (Chromium)   │       │  Rede (`cy.intercept`)│
└─────────────────┘       └────────────────────┘       └──────────┬───────────┘
                                                                  │
┌─────────────────┐       ┌────────────────────┐                  │
│  5. Relatório e │ ◄──── │  4. Simula Cliques │ ◄────────────────┘
│  Screenshots    │       │  e Valida a DOM    │
└─────────────────┘       └────────────────────┘
```

1. **Injeção no Browser**: O Cypress é executado dentro do mesmo loop de eventos do navegador, o que evita problemas de dessincronização comuns em ferramentas baseadas em Selenium.
2. **Auto-Waiting**: Ao dar `cy.get('[data-cy="btn"]'),` ele tenta encontrar o elemento por até 4 segundos (configurável) antes de falhar, aguardando animações terminarem.
3. **Snapshot de DOM**: A cada comando, ele tira um snapshot da árvore DOM para permitir o *Time Travel* no depurador.

---

## PARTE PRÁTICA: Passo a Passo do Zero (Baby Steps) 🛠️

Vamos criar e configurar uma suíte E2E do zero para uma aplicação Web.

### Passo 1: Instalação das Dependências no Projeto Web

No terminal do seu projeto Frontend, instale o Cypress e o TypeScript:

```bash
npm install --save-dev cypress typescript
```

---

### Passo 2: Inicialização da Estrutura do Cypress

Execute o comando de inicialização:

```bash
npx cypress open
```

O Cypress criará a seguinte estrutura no seu projeto:

```text
[./cypress]
  ├── [./e2e]              # Seus arquivos de teste (*.cy.ts)
  ├── [./fixtures]         # Arquivos JSON de dados e mocks
  └── [./support]          # Comandos customizados (e2e.ts)
[./cypress.config.ts]      # Arquivo central de configuração
```

---

### Passo 3: Criando o Arquivo de Configuração (`cypress.config.ts`)

Edite o arquivo `cypress.config.ts` na raiz do projeto:

```typescript
import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000', // URL da sua aplicação local ou de staging
    viewportWidth: 1280,
    viewportHeight: 720,
    video: false,                      # Salva vídeo em falhas no CI (opcional)
    screenshotOnRunFailure: true,
    defaultCommandTimeout: 5000,       # Timeout de espera dos elementos
    setupNodeEvents(on, config) {
      // Configurações de eventos do Node
    },
  },
});
```

---

### Passo 4: Configurando os Scripts no `package.json`

Adicione os scripts no seu `package.json`:

```json
{
  "scripts": {
    "dev": "react-scripts start",
    "cypress:open": "cypress open",
    "cypress:run": "cypress run --browser chrome"
  }
}
```

---

### Passo 5: Regra de Ouro — Prioridade de Seletores HTML 🎯

Quando for selecionar elementos para interagir no teste, **NUNCA** use classes CSS (`.btn-primary`) ou tags (`button`), pois elas mudam a toda hora quando o time de design refatora os estilos.

Adicione o atributo `data-cy` nos seus componentes React/HTML:

```html
<!-- 🛑 RUIM: Mudar o CSS vai quebrar o teste -->
<button class="btn-primary flex-item">Finalizar</button>

<!-- 🟢 RECOMENDADO: Atributo exclusivo para teste -->
<button data-cy="btn-finalizar-compra">Finalizar</button>
```

---

### Passo 6: Escrevendo o Teste E2E de Checkout (`cypress/e2e/checkout.cy.ts`)

Vamos escrever um teste simulando uma jornada completa de login e checkout com interceptação de API:

```typescript
describe('Jornada de Checkout de Compras', () => {

  beforeEach(() => {
    // 1. Interceptamos a chamada de API de autenticação para retornar um token falso (Mock)
    cy.intercept('POST', '/api/auth/login', {
      statusCode: 200,
      body: { token: 'jwt-falso-de-teste', user: { name: 'Diego Borges' } }
    }).as('loginRequest');

    // 2. Interceptamos o endpoint do carrinho
    cy.intercept('POST', '/api/checkout', {
      statusCode: 201,
      body: { orderId: 'PEDIDO-9988', status: 'PAID' }
    }).as('checkoutRequest');
  });

  it('deve realizar login, preencher os dados de entrega e finalizar o pedido com sucesso', () => {
    // 1. Visita a página inicial
    cy.visit('/login');

    // 2. Preenche os campos do formulário usando os seletores data-cy
    cy.get('[data-cy="input-email"]').type('diego@email.com');
    cy.get('[data-cy="input-senha"]').type('SenhaSegura123');
    cy.get('[data-cy="btn-entrar"]').click();

    // 3. Aguarda a requisição de login e valida o redirecionamento
    cy.wait('@loginRequest');
    cy.url().should('include', '/dashboard');

    // 4. Navega para a página de checkout
    cy.visit('/checkout');

    // 5. Preenche os dados de pagamento
    cy.get('[data-cy="input-cupom"]').type('CUPOM10');
    cy.get('[data-cy="btn-aplicar-cupom"]').click();

    // 6. Clica em finalizar compra
    cy.get('[data-cy="btn-finalizar-compra"]').click();

    // 7. Valida a requisição e a mensagem de confirmação final na tela
    cy.wait('@checkoutRequest');
    cy.get('[data-cy="mensagem-sucesso"]')
      .should('be.visible')
      .and('contain', 'Pedido PEDIDO-9988 concluído com sucesso!');
  });
});
```

---

### Passo 7: Executando o Cypress no Terminal e no Modo Gráfico

#### 1. Modo Interativo (Interface Gráfica):
No seu terminal, execute:

```bash
npm run cypress:open
```

A tela do Cypress abrirá. Clique em **E2E Testing** -> escolha o navegador **Chrome** -> clique em `checkout.cy.ts`. Você verá o navegador abrindo e executando a digitação e os cliques em tempo real!

#### 2. Modo Headless (Automático para CI/CD):
Execute no terminal:

```bash
npm run cypress:run
```

#### Saída de Sucesso no Terminal 🟢:

```bash
Running:  checkout.cy.ts                                                                  (1 of 1)

  Jornada de Checkout de Compras
    ✓ deve realizar login, preencher os dados de entrega e finalizar o pedido com sucesso (2450ms)

  1 passing (3s)

  (Screenshots)
  - Generated: /cypress/screenshots/checkout.cy.ts/checkout.png

  (Video)
  - Saved to: /cypress/videos/checkout.mp4
```

🎉 **Teste E2E aprovado com 100% de sucesso!**

---

## Como Rodar o Cypress no CI/CD com GitHub Actions 🚀

Para garantir que nenhum PR quebre a jornada do usuário, adicione a Action oficial do Cypress no seu repositório em `.github/workflows/e2e.yml`:

```yaml
name: E2E Tests - Cypress

on:
  push:
    branches: [main, master]
  pull_request:

jobs:
  cypress-run:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Cypress run
        uses: cypress-io/github-action@v6
        with:
          build: npm run build
          start: npm start
          wait-on: 'http://localhost:3000'
          wait-on-timeout: 120
          browser: chrome
```

Dessa forma, o GitHub Actions sobe o servidor da aplicação, aguarda a porta 3000 responder e executa os testes de navegador automaticamente a cada Pull Request!

---

## Resumo dos Benefícios 🎯

1. **Segurança total para o usuário final**: Garante que os botões, rotas e formulários funcionam no navegador real.
2. **Substituição de testes manuais exaustivos**: Esqueça a necessidade de testar manualmente 20 formulários a cada release.
3. **Facilidade de depuração com Time Travel**: Visualize a imagem exata da tela no instante em que o erro aconteceu.

---

## O que vem por aí na série "Testes para Dev"? 🪝

Cobrimos toda a pirâmide de testes funcionais (Unidade, Integração, CI, Contratos, Mutação e E2E). Mas me responde: **o seu sistema aguenta 500 ou 5.000 usuários acessando a API ao mesmo tempo no dia do lançamento ou na Black Friday sem cair?**

No **sétimo e último capítulo (#7)** da nossa série, vamos fechar com chave de ouro falando sobre **Testes de Carga e Estresse com Artillery**!

Deixe seu comentário e até o próximo post! 🚀
