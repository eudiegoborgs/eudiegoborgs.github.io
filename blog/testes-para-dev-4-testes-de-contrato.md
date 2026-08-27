---
path: testes-para-dev-4-testes-de-contrato
date: 2026-09-03T09:00:00.000Z
title: "Testes para Dev #4: Testes de Contrato com Pact — Chega de Ambientes Integrados Quebrados"
---

Fala, dev! Tudo certo? 🚀

Chegamos ao quarto artigo da série **Testes para Dev**! 

Nos artigos anteriores passamos por [Testes de Unidade](https://diegoborgs.com.br/blog/testes-para-dev-1-testes-de-unidade), [Testes de Integração](https://diegoborgs.com.br/blog/testes-para-dev-2-testes-de-integracao) e [Continuous Integration (CI/CD)](https://diegoborgs.com.br/blog/testes-para-dev-3-continuous-integration).

Agora imagina o seguinte cenário (bem comum em arquiteturas de microsserviços):

> O time de backend altera o nome de um campo na resposta da API de `user_id` para `id`. O backend passa em todos os testes unitários dele. O frontend passa em todos os testes dele. Mas quando junta os dois na produção... **KABOOM! 💥 A aplicação quebra!**

Para resolver isso sem precisar montar aqueles ambientes de homologação integrados super lentos e caros, surgem os **Testes de Contrato**.

---

## O que é um Teste de Contrato?

> **Teste de Contrato** é a técnica que valida se a comunicação e a interface de API entre dois sistemas (**Consumidor** e **Provedor**) respeitam um acordo pré-definido, **sem precisar executar as duas aplicações juntas ao mesmo tempo**.

- **Consumidor (Consumer)**: A aplicação que faz as requisições (ex: Frontend Web, App Mobile ou Microsserviço A).
- **Provedor (Provider)**: A aplicação que responde às requisições e fornece os dados (ex: Backend REST / GraphQL / Microsserviço B).

---

## Consumer-Driven Contract Testing (CDC)

O padrão mais eficiente da indústria é o **CDC (Testes de Contrato Orientados pelo Consumidor)**.

A ideia aqui é simples e genial: **quem dita os requisitos do contrato é quem consome a API!**

1. **O Consumidor** escreve o teste definindo o que espera enviar (`GET /users/123`) e o que espera receber (Status `200`, JSON com `id` e `name`).
2. Ao rodar o teste, a ferramenta (como o **Pact**) gera automaticamente um contrato formal em arquivo `.json`.
3. **O Provedor** pega esse arquivo `.json` no pipeline de CI e executa a validação contra a sua API para garantir que não quebrou nenhuma expectativa.

---

## Exemplo Prático com Pact no TypeScript

### 1. Definindo o Contrato no Consumidor (`consumer.spec.ts`)

```typescript
import { PactV3, MatchersV3 } from '@pact-foundation/pact';

const provider = new PactV3({
  consumer: 'FrontendApp',
  provider: 'UserService'
});

describe('Contrato com o UserService', () => {
  it('deve retornar os dados do usuário corretamente', async () => {
    provider
      .given('Usuário 123 existe na base')
      .uponReceiving('Uma requisição GET para buscar dados do usuário 123')
      .withRequest({
        method: 'GET',
        path: '/users/123'
      })
      .willRespondWith({
        status: 200,
        headers: { 'Content-Type': 'application/json' },
        body: {
          id: MatchersV3.like('123'),
          name: MatchersV3.like('Diego Borges')
        }
      });

    await provider.executeTest(async (mockServer) => {
      // Faz a chamada contra o servidor mock mantido pelo Pact
      const response = await fetch(`${mockServer.url}/users/123`);
      const data = await response.json();
      expect(data.name).toBe('Diego Borges');
    });
  });
});
```

---

### 2. Validando no Provedor Backend (`provider.spec.ts`)

```typescript
import { Verifier } from '@pact-foundation/pact';

describe('Validação do Provedor de Contrato', () => {
  it('deve garantir conformidade com os contratos publicados no Pact Broker', () => {
    return new Verifier({
      providerBaseUrl: 'http://localhost:3000',
      pactBrokerUrl: 'https://nosso-pact-broker.com',
      pactBrokerToken: process.env.PACT_BROKER_TOKEN
    }).verifyProvider();
  });
});
```

---

## Por que usar Testes de Contrato? 🎯

- **Desacoplamento de Ambientes**: Você não precisa subir 10 microsserviços locais com Docker Compose para saber se a API funciona.
- **Feedback Rápido no CI**: Se o backend fizer uma alteração incompatível (*breaking change*), o CI dele falha em segundos antes mesmo de fazer o merge do PR.
- **Documentação Viva**: O **Pact Broker** funciona como um mapa visual interativo e sempre atualizado de todas as conexões do seu ecossistema.

---

## O que vem por aí na série "Testes para Dev"? 🪝

Seus testes cobrem unidades, integrações, CI e contratos de API. Mas me responde: **como ter certeza de que seus testes realmente testam o código e não são apenas "cobertura cosmética" para enganar relatório?**

No **Capítulo #5**, vamos falar sobre **Testes de Mutação com Stryker**! Vamos aprender a soltar "mutantes" no nosso código para ver se a suíte de testes é forte o suficiente para exterminá-los.

Nos vemos no próximo post! 🚀
