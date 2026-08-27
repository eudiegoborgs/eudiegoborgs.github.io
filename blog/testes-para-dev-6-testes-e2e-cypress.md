---
path: testes-para-dev-6-testes-e2e-cypress
date: 2026-09-05T09:00:00.000Z
title: "Testes para Dev #6: Testes End-to-End com Cypress — Garantindo a Jornada do Usuário"
---

Fala, dev! Chegamos ao sexto capítulo da nossa série **Testes para Dev**! 🚀

Nos artigos anteriores falamos de [Unidade](https://diegoborgs.com.br/blog/testes-para-dev-1-testes-de-unidade), [Integração](https://diegoborgs.com.br/blog/testes-para-dev-2-testes-de-integracao), [CI/CD](https://diegoborgs.com.br/blog/testes-para-dev-3-continuous-integration), [Contratos](https://diegoborgs.com.br/blog/testes-para-dev-4-testes-de-contrato) e [Mutação](https://diegoborgs.com.br/blog/testes-para-dev-5-testes-de-mutacao).

Agora é a hora de colocar a perspectiva do nosso usuário real no centro de tudo! Vamos falar de **Testes End-to-End (E2E)** com a ferramenta queridinha da comunidade: o **Cypress**.

---

## O que é um Teste End-to-End (E2E)?

> **Teste End-to-End (Ponta a Ponta)** é a modalidade de teste que simula o comportamento de um usuário real interagindo com a aplicação através da interface gráfica (browser ou mobile), validando todo o fluxo desde a interface até o banco de dados e APIs integradas.

Diferente dos testes unitários que testam funções isoladas, o teste E2E responde à pergunta: *Se o cliente entrar no site, preencher o cadastro e clicar em pagar, a conta vai ser criada e o pedido vai ser concluído com sucesso?*

---

## Por que usar o Cypress? 🌲

O Cypress revolucionou a forma como escrevemos testes E2E para a Web:

- **Tudo em um só lugar**: Test runner visual, asserções, mocks e relatórios integrados.
- **Auto-Waiting**: Ele espera automaticamente os elementos aparecerem no DOM e as requisições AJAX responderem antes de falhar (chega de `sleep(5000)` picareta!).
- **Time Travel**: Você consegue passar o mouse por cada passo executado e ver o estado exato da tela naquele instante.
- **Roda no mesmo loop do navegador**: Mais rápido e mais estável que os Seleniums/WebDrivers antigos.

---

## Estrutura Moderna do Cypress (v10+)

Nas versões modernas do Cypress, a estrutura de pastas do seu projeto fica organizada assim:

```text
[./cypress]
  [./e2e] Arquivos de especificação de testes (*.cy.ts).
  [./fixtures] Dados estáticos e payloads em JSON para mocks.
  [./support] Comandos customizados e configurações globais (e2e.ts).
[./cypress.config.js] Arquivo central de configuração.
[./package.json] Dependências do projeto.
```

---

## Boas Práticas: Prioridade de Seletores HTML

Quando for buscar elementos na tela com `cy.get()`, evite usar classes CSS ou IDs que mudam a toda hora no refactor. Siga essa ordem de prioridade:

1. **`data-cy="input-nome"`** 🟢 *(Recomendado: Atributo exclusivo de teste)*
2. **`data-test`** ou **`data-testid`**
3. `id`
4. `class`
5. `tag`

---

## Exemplos Práticos de Código

### 1. Teste de Fluxo de Cadastro (`cypress/e2e/cadastro.cy.ts`)

```typescript
describe('Fluxo de Cadastro de Cliente', () => {
  it('deve cadastrar um novo cliente com sucesso', () => {
    cy.visit('/cadastro');

    cy.get('[data-cy="input-nome"]').type('Joaquim Silva');
    cy.get('[data-cy="input-cpf"]').type('123.456.789-00');
    cy.get('[data-cy="btn-submeter"]').click();

    cy.get('[data-cy="mensagem-sucesso"]')
      .should('contain', 'Conta criada com sucesso');
  });
});
```

### 2. Mockando APIs Backend com `cy.intercept`

Você também pode usar o Cypress para simular falhas de API ou respostas específicas do servidor sem precisar alterar o banco de dados de dev:

```typescript
describe('Fluxo com Mock de API', () => {
  it('deve exibir mensagem de erro se o cliente já for cadastrado', () => {
    // Intercepta a requisição POST e força erro 400
    cy.intercept('POST', '/api/clientes', {
      statusCode: 400,
      body: { error: 'Cliente já cadastrado na base' }
    }).as('postCliente');

    cy.visit('/cadastro');
    cy.get('[data-cy="input-cpf"]').type('123.456.789-00');
    cy.get('[data-cy="btn-submeter"]').click();

    cy.wait('@postCliente');
    cy.get('[data-cy="mensagem-erro"]')
      .should('contain', 'Não foi possível abrir uma nova conta');
  });
});
```

---

## Rodando o Cypress no CI com GitHub Actions

Para rodar seus testes E2E no GitHub Actions, a ação oficial `cypress-io/github-action` simplifica tudo:

```yaml
name: E2E - Cypress Tests

on: [push, pull_request]

jobs:
  cypress-run:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: cypress-io/github-action@v6
        with:
          build: npm run build
          start: npm start
          wait-on: 'http://localhost:3000'
```

---

## O que vem por aí na série "Testes para Dev"? 🪝

Cobrimos toda a pirâmide de testes funcionais, do código isolado ao navegador. Mas me responde: **o seu sistema aguenta 50, 500 ou 5.000 usuários simultâneos no dia do lançamento ou na Black Friday sem cair?**

No **último capítulo (#7)** da nossa série, vamos fechar com chave de ouro falando de **Testes de Carga e Estresse com Artillery**!

Prepara a pipoca e nos vemos no próximo post! 🚀
