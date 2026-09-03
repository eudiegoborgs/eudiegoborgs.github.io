---
path: testes-para-dev-4-testes-de-contrato
date: 2026-09-03T09:00:00.000Z
title: "Testes para Dev #4: Testes de Contrato com Pact — Guia Passo a Passo do Zero"
---

Fala, dev! Tudo certo? 🚀

Chegamos ao quarto artigo da série **Testes para Dev**! 

Nos artigos anteriores aprendemos sobre [Testes de Unidade](https://diegoborgs.com.br/blog/testes-para-dev-1-testes-de-unidade), [Testes de Integração](https://diegoborgs.com.br/blog/testes-para-dev-2-testes-de-integracao) e [Continuous Integration (CI/CD)](https://diegoborgs.com.br/blog/testes-para-dev-3-continuous-integration).

Agora, imagine o seguinte cenário no mundo real:

> O time de backend altera o nome de um campo na resposta da API de `user_id` para `id`. O backend roda os testes dele e passa. O frontend roda os testes dele e passa. Mas quando sobem para produção... **KABOOM! 💥 A tela do usuário fica em branco!**

Para resolver esse pesadelo sem precisar montar ambientes integrados ultra lentos e caros, surgem os **Testes de Contrato**.

Hoje vamos aprender **passo a passo (baby steps)** como instalar, configurar, escrever linha a linha, executar e ler os resultados de um teste de contrato com **Pact**, entender o fluxo de verificação do backend e aprender **como hospedar o Pact Broker**.

---

## O que é um Teste de Contrato?

Em termos simples: **é um acordo formal em arquivo JSON entre dois sistemas**.

* **Consumidor (Consumer)**: A aplicação que faz a chamada (ex: Frontend React, App Mobile).
* **Provedor (Provider)**: A aplicação que responde com os dados (ex: Backend API Express/Java).

No modelo **Consumer-Driven Contracts (CDC)**, o Consumidor diz exatamente o que precisa consumir e gera o contrato. O Provedor pega esse contrato e valida se sua API responde de acordo.

---

## Quando USAR (e quando NÃO usar) Testes de Contrato? 🎯

Nem todo projeto precisa de teste de contrato. Saber a hora certa de adotar essa ferramenta economiza tempo de arquitetura:

### ✅ Quando USAR:
1. **Microsserviços e APIs distribuídas**: Quando múltiplos serviços dependem de endpoints mantidos por equipes diferentes.
2. **Frontend e Backend desacoplados (React / Mobile vs. Node / Java / Go)**: Quando o time de Frontend consome APIs e precisa ter certeza de que o backend não quebrou contratos no deploy.
3. **Desenvolvimento em Paralelo**: O time de Frontend pode gerar o contrato e continuar construindo a UI antes mesmo do Backend terminar a API real.
4. **Substituição de Ambientes Integrados Pesados**: Quando o ambiente de staging/homologação é instável, caro de manter e lento.

### 🛑 Quando NÃO usar:
1. **Monólitos no mesmo repositório**: Se o Frontend e o Backend rodam na mesma base de código em memória, testes de unidade e integração simples resolvem com menos complexidade.
2. **APIs Públicas de Terceiros sem controle (ex: Stripe, Twitter, GitHub)**: Você não controla o servidor do Stripe para rodar a validação do contrato. Nesses casos, crie *adapters/wrappers* locais no seu código e use testes de integração com Stubs.

---

## Ponto fundamental: Pact vs Jest (Quem faz o quê?) 🤝

Antes de instalar as bibliotecas, precisamos deixar uma coisa muito clara:

> **O Pact NÃO é um executor de testes (test runner). Ele precisa do Jest para rodar!**

* **O Jest (Test Runner)**: É o motor do teste. Ele organiza os blocos de código (`describe`, `it`), executa as validações (`expect`) e avisa o terminal/CI se o teste passou ou falhou.
* **O Pact (Contract Framework)**: É a ferramenta que sobe um servidor HTTP mock temporário, intercepta as chamadas do cliente, valida a estrutura do JSON e **gera o arquivo do contrato `.json`** no disco.

Você também poderia usar o Vitest ou Mocha no lugar do Jest, mas neste tutorial usaremos a combinação mais popular do mercado: **Jest + Pact**.

---

## PARTE 1: O Lado do Consumidor (Frontend React) ⚛️

### Passo 1: Instalação das Dependências no Frontend via NPM

No terminal do seu projeto Frontend/Consumidor, instale as dependências de desenvolvimento:

```bash
npm install --save-dev @pact-foundation/pact jest ts-jest @types/jest
```

### Passo 2: Configurando o Jest para TypeScript (`jest.config.js`)

Se você rodar o Jest diretamente em um arquivo `.ts` contendo sintaxe de ESM (`import/export`), o Node lançará erro. Crie o arquivo `jest.config.js` na raiz:

```javascript
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
};
```

E no seu `tsconfig.json`:

```json
{
  "compilerOptions": {
    "target": "es2022",
    "module": "commonjs",
    "moduleResolution": "node",
    "esModuleInterop": true,
    "types": ["jest", "node"]
  }
}
```

---

### Passo 3: Configurando os Scripts no `package.json`

Adicione o script no `package.json`:

```json
{
  "name": "meu-frontend-react",
  "version": "1.0.0",
  "scripts": {
    "test": "jest",
    "test:contract": "jest --testMatch='**/*.contract.spec.ts'"
  }
}
```

---

### Passo 4: Escrevendo o Teste do Consumidor (`userApi.contract.spec.ts`)

No Frontend, temos a função que chama a API (`src/services/userApi.ts`):

```typescript
export interface UserProfile {
  id: string;
  name: string;
  email: string;
}

export async function getUserProfile(baseUrl: string, id: string): Promise<UserProfile> {
  const response = await fetch(`${baseUrl}/api/users/${id}`);
  if (!response.ok) {
    throw new Error('Falha ao buscar usuário');
  }
  return response.json();
}
```

Agora escrevemos o teste de contrato (`src/services/userApi.contract.spec.ts`):

```typescript
import { PactV3, MatchersV3 } from '@pact-foundation/pact';
import { getUserProfile } from './userApi';

// 1. Instanciamos o Pact definindo quem é o Consumidor e quem é o Provedor
const provider = new PactV3({
  consumer: 'ReactFrontendApp',
  provider: 'ExpressBackendAPI',
  dir: './pacts'
});

describe('Contrato: React App -> Express API', () => {
  it('deve retornar o perfil do usuário no formato esperado pelo React', async () => {
    // 2. Definimos a expectativa do contrato
    provider
      .given('Usuário diego-123 cadastrado')
      .uponReceiving('Requisição de busca de perfil GET /api/users/diego-123')
      .withRequest({
        method: 'GET',
        path: '/api/users/diego-123'
      })
      .willRespondWith({
        status: 200,
        headers: { 'Content-Type': 'application/json' },
        body: {
          id: MatchersV3.like('diego-123'),
          name: MatchersV3.like('Diego Borges'),
          email: MatchersV3.like('diego@email.com')
        }
      });

    // 3. Executamos a chamada contra o servidor mock temporário do Pact
    await provider.executeTest(async (mockServer) => {
      const user = await getUserProfile(mockServer.url, 'diego-123');
      expect(user.name).toBe('Diego Borges');
      expect(user.email).toBe('diego@email.com');
    });
  });
});
```

---

### Passo 5: Executando o Teste do Consumidor e Gerando o Contrato

No terminal do Frontend, execute:

```bash
npm run test:contract
```

#### Resultado de Sucesso no Frontend 🟢:

```bash
 PASS  src/services/userApi.contract.spec.ts
  Contrato: React App -> Express API
    ✓ deve retornar o perfil do usuário no formato esperado pelo React (180 ms)

[Pact] Pact file written to ./pacts/ReactFrontendApp-ExpressBackendAPI.json
```

🎉 **O contrato JSON foi gerado em `./pacts/ReactFrontendApp-ExpressBackendAPI.json`!**

---

## PARTE 2: O Lado do Backend (Provedor Express.js) 🟢

Agora vamos ver **passo a passo como construir e rodar o teste de contrato no repositório do Backend**.

### Passo 1: Instalação no Repositório do Backend

No terminal do seu projeto Backend (ex: sua API em Node/Express), instale as ferramentas de teste:

```bash
npm install --save-dev @pact-foundation/pact jest ts-jest @types/jest
```

---

### Passo 2: A API Express (`src/server.js`)

Imagine que a sua API Express tem a rota de busca de usuários:

```javascript
const express = require('express');
const app = express();

app.get('/api/users/:id', (req, res) => {
  res.json({
    id: req.params.id,
    name: 'Diego Borges',
    email: 'diego@email.com'
  });
});

module.exports = app;
```

---

### Passo 3: Escrevendo o Teste de Verificação do Provedor (`src/provider.contract.spec.ts`)

Crie o arquivo de verificação no projeto Backend:

```typescript
import { Verifier } from '@pact-foundation/pact';
import app from './server';
import http from 'http';

describe('Validação do Provedor Express contra os Contratos dos Consumidores', () => {
  let server: http.Server;

  // 1. Antes dos testes, subimos o servidor Express real numa porta local de teste (ex: 3001)
  beforeAll((done) => {
    server = app.listen(3001, () => done());
  });

  // 2. Após os testes, encerramos o servidor
  afterAll((done) => {
    server.close(() => done());
  });

  it('deve garantir conformidade com o contrato do ReactFrontendApp', async () => {
    // 3. O Verifier lê o contrato JSON e dispara requisições HTTP reais contra localhost:3001
    const output = await new Verifier({
      provider: 'ExpressBackendAPI',
      providerBaseUrl: 'http://localhost:3001',
      // Apontamos para o arquivo gerado pelo Frontend (ou URL do Pact Broker)
      pactUrls: ['./pacts/ReactFrontendApp-ExpressBackendAPI.json']
    }).verifyProvider();

    console.log('Resultado da verificação do contrato:', output);
  });
});
```

---

## Como o Provedor (Backend) Interage com o Contrato Gerado? 🔍

É comum surgir a dúvida: *Como o backend lê o arquivo `.json` e como a mágica acontece por baixo dos panos?*

O teste no Backend funciona através de um fluxo em 5 etapas executado pelo `Verifier`:

```
┌─────────────────┐       ┌────────────────────┐       ┌──────────────────────┐
│  1. Leitura do  │ ────► │  2. Subida do App  │ ────► │  3. Requisição HTTP  │
│  Contrato JSON  │       │  Express (Porta)   │       │   Real no Endpoint   │
└─────────────────┘       └────────────────────┘       └──────────┬───────────┘
                                                                  │
┌─────────────────┐       ┌────────────────────┐                  │
│  5. Resultado   │ ◄──── │  4. Comparação de  │ ◄────────────────┘
│  PASS ou FAIL   │       │ Resposta com JSON  │
└─────────────────┘       └────────────────────┘
```

1. **Leitura e Parse do JSON**: O `Verifier` abre o arquivo `ReactFrontendApp-ExpressBackendAPI.json` (localmente ou via Pact Broker) e extrai a lista de interações esperadas (ex: `GET /api/users/diego-123`).
2. **Subida do Servidor Real**: O bloco `beforeAll` inicia a sua aplicação Express real na porta local de teste (`http://localhost:3001`).
3. **Disparo da Requisição HTTP Real**: O `Verifier` atua como um cliente HTTP cliente real e envia a requisição `GET http://localhost:3001/api/users/diego-123` diretamente para a sua API Express.
4. **Comparação Campo a Campo**: O `Verifier` captura a resposta devolvida pelo Express e compara com o contrato:
   * O código de status foi `200`?
   * O header `Content-Type` é `application/json`?
   * Os campos `id`, `name` e `email` estão presentes no corpo do JSON e têm os tipos esperados?
5. **Report de Verificação**: Se todos os campos baterem, o teste passa 🟢. Se algum campo foi alterado ou removido pelo backend, o `Verifier` aponta o erro exato e falha a execução com código de saída 1 (interrompendo a pipeline de CI).

---

### Passo 4: Executando a Verificação no Backend

Adicione o script no `package.json` do Backend:

```json
{
  "scripts": {
    "test:contract:provider": "jest --testMatch='**/*.provider.contract.spec.ts'"
  }
}
```

No terminal do Backend, rode:

```bash
npm run test:contract:provider
```

#### Resultado de Sucesso no Backend 🟢:

```bash
 PASS  src/provider.contract.spec.ts
  Validação do Provedor Express contra os Contratos dos Consumidores
    ✓ deve garantir conformidade com o contrato do ReactFrontendApp (450 ms)

  Verifying a pact between ReactFrontendApp and ExpressBackendAPI
    Given Usuário diego-123 cadastrado
      GET /api/users/diego-123
        returns a response which
          has status code 200 (OK)
          includes headers "Content-Type" with value "application/json"
          has a matching body (OK)
```

---

## Como Hospedar e Compartilhar os Contratos (Pact Broker) 🌐

Em projetos do mundo real com repositórios Git e times de desenvolvimento separados, **não compartilhamos o arquivo `.json` copiando manualmente para a máquina do colega ou enviando via Slack**.

Para resolver o compartilhamento de contratos, existe o **Pact Broker**.

---

### O que é o Pact Broker?

O **Pact Broker** é um servidor central (hub de contratos) open-source que armazena, versiona e serve os arquivos de contrato em uma API REST com painel visual interativo.

Existem duas formas principais de utilizar:

1. **PactFlow (Gerenciado / Cloud SaaS)**: A versão cloud pronta para uso mantida pelos criadores do Pact (com plano gratuito para times pequenos).
2. **Pact Broker Self-Hosted (Docker / Grátis)**: Subir o Pact Broker na sua própria infraestrutura em nuvem usando Docker Compose.

---

### Como subir o Pact Broker Self-Hosted via Docker Compose 🐳

Para rodar o seu próprio Pact Broker localmente ou no servidor da empresa, crie o arquivo `docker-compose.yml`:

```yaml
version: '3'

services:
  postgres:
    image: postgres:15-alpine
    environment:
      POSTGRES_USER: pactbroker
      POSTGRES_PASSWORD: pactbrokerpassword
      POSTGRES_DB: pactbroker
    ports:
      - "5432:5432"

  pact-broker:
    image: pactfoundation/pact-broker:latest
    ports:
      - "9292:9292"
    environment:
      PACT_BROKER_DATABASE_USERNAME: pactbroker
      PACT_BROKER_DATABASE_PASSWORD: pactbrokerpassword
      PACT_BROKER_DATABASE_HOST: postgres
      PACT_BROKER_DATABASE_NAME: pactbroker
      PACT_BROKER_BASE_URL: "http://localhost:9292"
    depends_on:
      - postgres
```

Suba os contêineres executando:

```bash
docker compose up -d
```

Acesse no seu navegador: `http://localhost:9292`. Você verá a interface visual do seu **Pact Broker**!

---

### Como publicar contratos do Frontend no Pact Broker (no CI/CD)

No pipeline de CI do Frontend (ex: GitHub Actions), após os testes passarem e o `.json` ser gerado, publicamos o contrato no Pact Broker usando o CLI oficial `@pact-foundation/pact-cli`:

```bash
npx @pact-foundation/pact-cli pact-broker publish ./pacts \
  --consumer-app-version=$GITHUB_SHA \
  --branch=$GITHUB_REF_NAME \
  --broker-base-url=http://localhost:9292
```

---

### Como o Backend consome do Pact Broker em vez do arquivo local

No repositório do Backend, basta atualizar a propriedade `pactUrls` para `pactBrokerUrl` no `Verifier`:

```typescript
import { Verifier } from '@pact-foundation/pact';

describe('Validação via Pact Broker', () => {
  it('deve validar o contrato baixado do Pact Broker', () => {
    return new Verifier({
      provider: 'ExpressBackendAPI',
      providerBaseUrl: 'http://localhost:3001',
      pactBrokerUrl: process.env.PACT_BROKER_URL || 'http://localhost:9292',
      // Em produção, passe o token de autenticação:
      // pactBrokerToken: process.env.PACT_BROKER_TOKEN
    }).verifyProvider();
  });
});
```

Dessa forma, sempre que o Frontend publica uma nova versão de contrato no Broker, a próxima execução do CI do Backend vai buscar automaticamente o contrato atualizado e validar a API antes de autorizar o deploy!

---

## Resumo dos Benefícios 🎯

1. **Feedback instantâneo**: Descubra quebras de contrato no CI em segundos.
2. **Chega de ambientes pesados**: Não precisa subir Docker com 10 microsserviços integrados para validar APIs.
3. **Confiança para refatorar**: O backend pode refatorar com segurança desde que respeite os contratos ativos.

---

## O que vem por aí na série "Testes para Dev"? 🪝

Seus testes cobrem unidades, integrações, CI e contratos de API. Mas me responde: **como ter certeza de que seus testes realmente testam o código e não são apenas "cobertura cosmética" para bater meta?**

No **Capítulo #5**, vamos falar sobre **Testes de Mutação com Stryker**! Vamos aprender a soltar "mutantes" no nosso código para ver se a suíte de testes é forte o suficiente para exterminá-los.

Deixe seu comentário e até o próximo post! 🚀
