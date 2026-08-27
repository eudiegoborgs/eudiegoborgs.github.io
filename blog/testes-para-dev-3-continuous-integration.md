---
path: testes-para-dev-3-continuous-integration
date: 2026-09-02T09:00:00.000Z
title: "Testes para Dev #3: Continuous Integration (CI/CD) — Automação sem Desculpas"
---

Fala, dev! Chegamos ao terceiro capítulo da nossa série **Testes para Dev**! 🚀

Nos artigos anteriores conversamos sobre [Testes de Unidade](https://diegoborgs.com.br/blog/testes-para-dev-1-testes-de-unidade) e [Testes de Integração](https://diegoborgs.com.br/blog/testes-para-dev-2-testes-de-integracao). Mas me responde uma coisa com toda a honestidade do mundo:

> *"Na minha máquina funcionou! Na minha máquina os testes passam!"* 😅

Quem nunca ouviu essa frase? O problema de depender da execução manual de testes na máquina de cada dev é que a gente esquece, a máquina de um tem versão diferente do Node, a do outro tem dependências no cache... e o código quebrado vai parar direto na branch principal!

Hoje vamos resolver isso de uma vez por todas falando de **Continuous Integration (CI/CD)**!

---

## O que é CI (Continuous Integration)?

**Continuous Integration** é a prática de desenvolvimento de software onde alterações de código são integradas frequentemente no repositório central e validadas por uma **suíte automatizada de testes e checagens** a cada `push` ou `pull_request`.

---

## Principais Ferramentas do Mercado

Hoje temos diversas ferramentas excelentes no ecossistema:
- **GitHub Actions**: Integrado nativamente ao GitHub, baseado em workflows em YAML.
- **GitLab CI/CD**: Integrado ao ecossistema do GitLab com pipelines avançados.
- **CircleCI**: Focado em alta velocidade de execução e paralelismo de jobs.
- **Bitbucket Pipelines**: Integrado ao Jira e Bitbucket da Atlassian.

---

## Por que rodar seus testes no CI? 🎯

1. **Quality Gate (Portão de Qualidade)**: Bloqueia a aprovação e o merge de PRs automaticamente se algum teste falhar.
2. **Ambiente Neutro**: Roda dentro de um contêiner limpo e padronizado (Linux/Docker), eliminando o vício da máquina local.
3. **Feedback Rápido**: Notifica o time instantaneamente sobre regressões e erros de sintaxe ou lint.

---

## Exemplos Práticos com GitHub Actions

Vamos ver na prática como estruturar pipelines limpos usando o GitHub Actions!

### 1. Checagem de Lint (`.github/workflows/lint.yml`)
```yaml
name: CI - Lint

on: [push, pull_request]

jobs:
  lint:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'npm'

      - run: npm ci
      - run: npm run lint
```

### 2. Suíte de Testes com Jest (`.github/workflows/test.yml`)
```yaml
name: CI - Testes

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'npm'

      - run: npm ci
      - run: npm test
```

### 3. Fazer tudo no mesmo Job (Steps Sequenciais)
Se seu projeto é menor e você quer economizar minutos do CI evitando repetir o setup do Node/checkout, pode rodar o Lint e os Testes em steps sequenciais:

```yaml
    # ... mesmo setup inicial do job (checkout e setup-node) ...
    steps:
      - ...
      - run: npm ci
      - run: npm run lint  # Step 1: Checagem de Lint
      - run: npm test      # Step 2: Suíte de Testes
```

### 4. Rodar em Jobs Paralelos Diferentes
Em projetos grandes ou monorepos, a melhor decisão é separar em jobs distintos para que rodem ao mesmo tempo em runners diferentes:

```yaml
jobs:
  lint:
    # ... mesmo setup do runner/node ...
    steps:
      - ...
      - run: npm run lint

  test:
    # needs: lint  <-- Opcional: só roda após o lint passar
    steps:
      - ...
      - run: npm test
```

---

## Mesmo Job vs Jobs Diferentes: Como Decidir? 🤔

- **Mesmo Job (Steps Sequenciais)**: Ideal para projetos menores ou pipelines simples. A vantagem é reaproveitar o contexto (`npm ci`) e economizar minutos cobrados pelo CI.
- **Jobs Diferentes (Paralelismo)**: Ideal para suítes de testes grandes ou projetos complexos. A vantagem é a execução simultânea em múltiplos runners, diminuindo drasticamente o tempo total de espera do desenvolvedor no Pull Request.

---

## O que vem por aí na série "Testes para Dev"? 🪝

Seus testes unitários, de integração e pipelines de CI estão rodando liso. Mas em um mundo de **microsserviços e APIs**, como saber se uma alteração no backend não vai quebrar o contrato do frontend antes de subir os dois juntos?

No **Capítulo #4**, vamos mergulhar em **Testes de Contrato com Pact**! Vamos aprender como garantir a compatibilidade entre sistemas sem depender de subir ambientes integrados gigantescos.

Até o próximo post e bora testar tudo! 🚀
