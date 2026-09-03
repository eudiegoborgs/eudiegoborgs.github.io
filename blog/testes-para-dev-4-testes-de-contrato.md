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

Hoje vamos aprender **passo a passo (baby steps)** como instalar, configurar, escrever linha a linha, executar e ler os resultados (sucesso e falhas) de um teste de contrato com **Pact**, tanto do lado do **Consumidor (Frontend)** quanto do **Provedor (Backend)**.

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

### O papel do Backend no Teste de Contrato:
> **O Backend não escreve as expectativas do contrato nem gera o JSON.** O papel do Backend é usar a ferramenta `Verifier` do Pact para abrir o contrato gerado pelo Frontend e disparar requisições reais contra a sua API Express para confirmar se a API real responde exatamente o que o Frontend precisa.

---

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

### Dissecando o teste do Backend linha por linha:

* **`import { Verifier } from '@pact-foundation/pact'`**: O `Verifier` é a classe do Pact responsável por ler o arquivo `.json` de contrato e efetuar chamadas HTTP de teste.
* **`beforeAll` / `afterAll`**: Iniciam e encerram a aplicação Express na porta `3001` apenas durante a execução dos testes.
* **`providerBaseUrl: 'http://localhost:3001'`**: Informa ao Pact onde a sua API real está rodando para que ele envie as requisições.
* **`pactUrls`**: Indica onde está o arquivo `.json` do contrato. Em ambientes corporativos de CI/CD, em vez de um arquivo local, você passa a URL do **Pact Broker** (o servidor central de contratos).
* **`verifyProvider()`**: O Pact pega cada chamada registrada no JSON (ex: `GET /api/users/diego-123`), faz a requisição HTTP real contra `http://localhost:3001/api/users/diego-123` e valida se os campos `id`, `name` e `email` estão presentes e com os tipos corretos na resposta.

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

---

### Resultado Esperado no Backend quando a API está CORRETA 🟢

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

Test Suites: 1 passed, 1 total
Tests:       1 passed, 1 total
Time:        2.10 s
```

🎉 **O Backend passou 100%!** A API atende todas as exigências do Frontend sem quebrar nada.

---

### Exemplo de FALHA no Backend (Quando uma Breaking Change acontece) 🔴

Suponha que um desenvolvedor backend refatorou o Express alterando a propriedade `name` para `fullName`:

```javascript
// Alteração indevida no Express:
app.get('/api/users/:id', (req, res) => {
  res.json({
    id: req.params.id,
    fullName: 'Diego Borges', // ❌ Renomeou 'name' para 'fullName'!
    email: 'diego@email.com'
  });
});
```

Ao rodar `npm run test:contract:provider` no Backend, **o teste falha no CI na hora**:

```bash
 FAIL  src/provider.contract.spec.ts
  ● Validação do Provedor Express › deve garantir conformidade com o contrato

    Pact Verification Error:
    
    1) Verifying a pact between ReactFrontendApp and ExpressBackendAPI - GET /api/users/diego-123
       Body Mismatch:
       -$: String key 'name' is missing from response body
       +$: Extra key 'fullName' found in response body

      Expected key 'name' with type String, but got undefined.
```

### Por que isso é incrível? 🚀
O backend descobriu a quebra de contrato no ambiente dele **antes mesmo de fazer o merge da Pull Request ou subir para staging/produção**, sem precisar que o time de Frontend testasse manualmente ou reclamasse que a tela quebrou!

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
