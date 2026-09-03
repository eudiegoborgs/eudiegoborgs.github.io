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

Hoje vamos aprender **passo a passo (baby steps)** como instalar, configurar, escrever linha a linha, executar e ler os resultados (sucesso e falhas) de um teste de contrato com **Pact**.

---

## O que é um Teste de Contrato?

Em termos simples: **é um acordo formal em arquivo JSON entre dois sistemas**.

* **Consumidor (Consumer)**: A aplicação que faz a chamada (ex: Frontend, App Mobile).
* **Provedor (Provider)**: A aplicação que responde com os dados (ex: Backend API).

No modelo **Consumer-Driven Contracts (CDC)**, o Consumidor diz exatamente o que precisa consumir e gera o contrato. O Provedor pega esse contrato e valida se sua API responde de acordo.

---

## Passo 1: Instalação das Dependências

No projeto do seu Consumidor (ex: seu projeto Frontend ou cliente TypeScript), abra o terminal e instale a biblioteca do **Pact**:

```bash
npm install --save-dev @pact-foundation/pact
```

> **Por que `--save-dev`?**  
> O Pact é uma ferramenta de teste e verificação de contratos. Ele não precisa ir para o pacote final de produção do seu app.

---

## Passo 2: Configurando os Scripts no `package.json`

Abra o arquivo `package.json` do seu projeto e adicione um script dedicado para rodar os testes de contrato:

```json
{
  "name": "meu-frontend-app",
  "version": "1.0.0",
  "scripts": {
    "test": "jest",
    "test:contract": "jest --testMatch='**/*.contract.spec.ts'"
  }
}
```

### Entendendo a linha do script:
* `"test:contract"`: O nome do comando que você vai digitar no terminal (`npm run test:contract`).
* `"jest"`: O executor de testes que estamos utilizando.
* `--testMatch='**/*.contract.spec.ts'`: Diz ao Jest para executar **apenas** os arquivos de teste que terminem com `.contract.spec.ts`, separando os testes de contrato dos testes unitários comuns.

---

## Passo 3: Escrevendo o Teste do Consumidor (`consumer.contract.spec.ts`)

Crie o arquivo `src/consumer.contract.spec.ts`. Vamos colocar o código completo primeiro e depois dissecar linha por linha:

```typescript
import { PactV3, MatchersV3 } from '@pact-foundation/pact';

// 1. Instanciamos o Pact definindo quem é o Consumidor e quem é o Provedor
const provider = new PactV3({
  consumer: 'FrontendApp',
  provider: 'UserService',
  dir: './pacts'
});

describe('Contrato com a API de Usuários', () => {
  it('deve retornar os dados do usuário 123 com sucesso', async () => {
    // 2. Definimos a expectativa do contrato (Interação)
    provider
      .given('Usuário 123 existe na base')
      .uponReceiving('Uma requisição GET para buscar o usuário 123')
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

    // 3. Executamos o teste usando o servidor mock fornecido pelo Pact
    await provider.executeTest(async (mockServer) => {
      const response = await fetch(`${mockServer.url}/users/123`);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.name).toBe('Diego Borges');
    });
  });
});
```

---

### Dissecando cada linha do código:

* **Linha 1 (`import { PactV3, MatchersV3 }...`)**: Importamos o `PactV3` (versão mais recente e simplificada da API do Pact) e o `MatchersV3` (auxiliar para definir tipos flexíveis).
* **Linhas 4-8 (`new PactV3(...)`)**: 
  * `consumer: 'FrontendApp'`: O nome da nossa aplicação cliente.
  * `provider: 'UserService'`: O nome do serviço backend com o qual conversamos.
  * `dir: './pacts'`: A pasta onde o Pact salvará o arquivo `.json` do contrato gerado.
* **Linha 14 (`provider.given(...)`)**: O *Provider State* (Estado do Provedor). Informa ao backend qual cenário de dados ele deve preparar para o teste (ex: garantir que o usuário 123 exista).
* **Linha 15 (`uponReceiving(...)`)**: Descrição amigável da requisição para documentação no relatório.
* **Linhas 16-19 (`withRequest(...)`)**: Especifica exatamente qual método (`GET`, `POST`, etc.) e caminho (`/users/123`) o cliente vai disparar.
* **Linhas 20-27 (`willRespondWith(...)`)**: Define o que o backend **DEVE** retornar para satisfazer o contrato:
  * `status: 200`: Código HTTP esperado.
  * `headers`: Cabeçalhos obrigatórios.
  * `MatchersV3.like('123')`: **Regra importante!** Em vez de travar no valor exato "123", o `like` diz: *"Espero uma string nesse campo"*. Isso evita testes frágeis!
* **Linha 30 (`await provider.executeTest(...)`)**: O Pact sobe um servidor HTTP temporário na sua máquina (`mockServer.url`), dispara a chamada do seu cliente contra ele, valida a estrutura e **gera o arquivo do contrato em `.json`**.

---

## Passo 4: Executando o Teste de Contrato

No seu terminal, execute o script que configuramos no Passo 2:

```bash
npm run test:contract
```

---

### Resultado Esperado quando dá SUCESSO 🟢

Se a chamada feita dentro de `executeTest` for exatamente igual ao que foi configurado no `willRespondWith`, você verá uma saída parecida com esta:

```bash
 PASS  src/consumer.contract.spec.ts
  Contrato com a API de Usuários
    ✓ deve retornar os dados do usuário 123 com sucesso (180 ms)

Test Suites: 1 passed, 1 total
Tests:       1 passed, 1 total
Snapshots:   0 total
Time:        1.45 s

[Pact] Pact file written to /meu-projeto/pacts/FrontendApp-UserService.json
```

🎉 **O que aconteceu aqui?**  
O teste passou e o arquivo `pacts/FrontendApp-UserService.json` foi gerado! Esse arquivo JSON é o contrato oficial que será enviado para o backend validar.

---

### Como Ler e Diagnosticar FALHAS 🔴

Agora vamos ver o que acontece quando algo dá errado. Suponha que no código do seu teste você tentou acessar um endpoint ou campo diferente do que registrou no contrato.

Exemplo de log de erro no terminal:

```bash
 FAIL  src/consumer.contract.spec.ts
  Contrato com a API de Usuários
    ✕ deve retornar os dados do usuário 123 com sucesso (215 ms)

  ● Contrato com a API de Usuários › deve retornar os dados do usuário 123 com sucesso

    Pact Mismatch Error:
    
    1) Actual request path '/users/999' did not match expected path '/users/123'
    
    2) Body mismatch:
       Expected key 'name' (type: String) but received undefined.

      31 |     await provider.executeTest(async (mockServer) => {
      32 |       const response = await fetch(`${mockServer.url}/users/999`);
    > 33 |       const data = await response.json();
```

### Como ler esse diagnóstico sem pânico:
1. **`Actual request path '/users/999' did not match expected path '/users/123'`**: O Pact avisa claramente que a chamada disparada (`/users/999`) não coincide com o caminho registrado na expectativa (`/users/123`).
2. **`Expected key 'name' but received undefined`**: Significa que o código consumiu um objeto onde o campo `name` não veio na resposta do mock.

---

## Passo 5: Validando o Contrato no Backend (Provedor)

No repositório do Backend (`UserService`), instalamos o Pact e criamos o arquivo de teste `provider.contract.spec.ts`:

```typescript
import { Verifier } from '@pact-foundation/pact';

describe('Validação do Provedor de Contrato', () => {
  it('deve validar o contrato gerado pelo FrontendApp', async () => {
    return new Verifier({
      providerBaseUrl: 'http://localhost:3000', // URL da API local do backend rodando
      pactUrls: ['./pacts/FrontendApp-UserService.json'] // Arquivo gerado pelo consumidor
    }).verifyProvider();
  });
});
```

Ao executar esse teste no Backend, o Pact faz requisições reais contra a API do backend (`localhost:3000`) e confirma se ela retorna o status `200` e o JSON no formato exigido pelo Frontend.

Se o Backend renomear um campo ou remover uma propriedade que o Frontend espera, **o CI do Backend falha na hora!**

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
