---
path: testes-para-dev-5-testes-de-mutacao
date: 2026-09-04T09:00:00.000Z
title: "Testes para Dev #5: Testes de Mutação com Stryker — Destruindo a Falsa Segurança dos 100% de Cobertura"
---

Fala, dev! Tudo certo? 🚀

Chegamos ao quinto capítulo da nossa série **Testes para Dev**! 

Nos artigos anteriores aprendemos sobre [Testes de Unidade](https://diegoborgs.com.br/blog/testes-para-dev-1-testes-de-unidade), [Testes de Integração](https://diegoborgs.com.br/blog/testes-para-dev-2-testes-de-integracao), [Continuous Integration (CI/CD)](https://diegoborgs.com.br/blog/testes-para-dev-3-continuous-integration) e [Testes de Contrato](https://diegoborgs.com.br/blog/testes-para-dev-4-testes-de-contrato).

Agora, imagine o seguinte cenário no mundo real:

> Um desenvolvedor orgulhoso abre o relatório de cobertura do Jest/Istanbul e mostra para a equipe: **"Consegui 100% de Code Coverage! Nenhuma linha de código ficou sem testar!"**. O Tech Lead aprova o Pull Request. No dia seguinte em produção, uma regra de desconto dá abatimento total para uma compra de valor exatamente igual a R$ 100, quando deveria conceder desconto apenas em valores estritamente superiores a R$ 100. A empresa perde milhares de reais em minutos por conta de um erro de limite (`>=` em vez de `>`). O relatório de cobertura marcou a linha como 100% executada... **KABOOM! 💥 A empresa perdeu dinheiro com 100% de cobertura verde!**

Como um teste pode passar por 100% das linhas e mesmo assim não pegar um erro crítico desses? 

Para resolver essa falsa sensação de segurança e responder à clássica pergunta *"Quem testa os testes?"*, surgem os **Testes de Mutação**.

Hoje vamos aprender **passo a passo (baby steps)** como instalar, configurar o **Stryker Mutator**, entender cada termo técnico, criar testes que realmente protegem a aplicação, ler o relatório HTML de mutantes e integrar os testes de mutação no pipeline de CI/CD sem travar a velocidade do time.

---

## O que é um Teste de Mutação? 🧬

Em termos simples: **é um teste que inspeciona a qualidade dos seus testes automatizados injetando pequenos bugs (mutações) propositais no código-fonte.**

Em vez de verificar se o seu código funciona, a ferramenta de mutação (como o **Stryker**) altera o seu código de propósito e roda os seus testes para ver se eles são capazes de notar a alteração e **falhar**.

### Glossário de Termos dos Testes de Mutação 📖

Para não ficar perdido durante a leitura, guarde este pequeno dicionário de termos:

* **Mutante (Mutant)**: Uma versão levemente modificada do seu código-fonte gerada pela ferramenta.
* **Operador de Mutação (Mutation Operator)**: A regra lógica usada para alterar o código (ex: trocar `>=` por `>`, trocar `+` por `-`, trocar `true` por `false`, remover o conteúdo de um `return`).
* **Mutante Morto (Killed Mutant)** 🟢: A ferramenta alterou o código, seus testes rodaram e **pelo menos um teste falhou**. Isso é **excelente**! Significa que seu teste percebeu o erro e está atento.
* **Mutante Sobrevivente (Survived Mutant)** 🛑: A ferramenta alterou o código, mas **todos os seus testes continuaram passando**. Isso é **péssimo**! Revela uma brecha na sua suíte de testes (cobertura cosmética).
* **Timeout / Error**: A mutação gerou um loop infinito ou erro de compilação.
* **Mutation Score (Pontuação de Mutação)**: O percentual real de mutantes exterminados em relação ao total gerado. É o verdadeiro indicador de qualidade da suíte de testes.

---

## A Ilusão do Code Coverage vs. Mutation Score 💡

A cobertura de código tradicional (**Code Coverage**) mede apenas **se a linha foi executada pelo interpretador durante a suíte de testes**. Ela **NÃO** garante que você fez as asserções (`expect`) corretas para pegar regressões.

Olha só este exemplo clássico de "cobertura cosmética":

```typescript
// Código da aplicação
export function calcularDesconto(valorTotal: number): number {
  if (valorTotal >= 100) {
    return valorTotal * 0.1; // 10% de desconto
  }
  return 0;
}
```

E veja este teste ingênuo:

```typescript
describe('calcularDesconto', () => {
  it('deve executar o cálculo de desconto', () => {
    // Executa a função passando 150
    calcularDesconto(150);
    // Reparou que NÃO EXISTE expect() validando o retorno???
  });
});
```

Se você rodar o relatório do Jest, ele dirá: **100% COVERAGE!**  
Mas se alguém alterar o código para retornar `valorTotal * 0.5` (50% de desconto), o teste continuará passando! O relatório de cobertura mentiu para você.

O **Stryker** entra exatamente para destruir essa ilusão: ele troca `valorTotal * 0.1` por `valorTotal / 0.1`, roda o teste, descobre que o teste continuou passando e grita: **MUTANTE SOBREVIVEU! 🛑**.

---

## Quando USAR (e quando NÃO usar) Testes de Mutação? 🎯

### ✅ Quando USAR:
1. **Regras de Negócio Críticas**: Cálculos financeiros, motores de crédito, regras fiscais, algoritmos de desconto e permissões de segurança.
2. **Bibliotecas Core e Pacotes Reutilizáveis**: Códigos compartilhados por toda a empresa onde um bug impacta dezenas de microsserviços.
3. **Validar a Efetividade da Suíte de Testes**: Quando o time atinge 80% ou 90% de cobertura tradicional e quer garantir que essa cobertura é real e não apenas cosmética.

### 🛑 Quando NÃO usar:
1. **Em cada `git commit` local sem filtro**: Como o Stryker roda a suíte de testes dezenas de vezes (uma para cada mutante), ele pode ser lento se executado em projetos inteiros de uma só vez.
2. **Arquivos de Configuração ou DTOs sem Lógica**: Interfaces TypeScript, arquivos de rotas puras ou schemas sem regras condicionais.

---

## Ponto fundamental: Stryker vs Jest (Quem faz o quê?) 🤝

Antes de colocar a mão no código, vale esclarecer a relação entre as ferramentas:

> **O Stryker NÃO substitui o Jest. Ele precisa do Jest para funcionar!**

* **O Jest (Test Runner)**: Executa os arquivos de teste e verifica as asserções (`expect`).
* **O Stryker (Mutation Framework)**: Cria mutantes do seu código na memória, chama o Jest para rodar a cada mutação e compila o relatório de sobrevivência dos mutantes.

---

## Como o Stryker funciona por baixo dos panos? 🔍

Abaixo está o fluxo completo de 5 etapas realizado pelo Stryker durante a execução:

```
┌─────────────────┐       ┌────────────────────┐       ┌──────────────────────┐
│  1. Análise do  │ ────► │  2. Injeção de     │ ────► │  3. Execução do      │
│  Código-Fonte   │       │  Mutantes no Código│       │  Jest p/ Cada Mutante│
└─────────────────┘       └────────────────────┘       └──────────┬───────────┘
                                                                  │
┌─────────────────┐       ┌────────────────────┐                  │
│  5. Relatório   │ ◄──── │  4. Cálculo do     │ ◄────────────────┘
│  HTML Final     │       │  Mutation Score    │
└─────────────────┘       └────────────────────┘
```

1. **Análise de AST (Abstract Syntax Tree)**: O Stryker lê o seu código TypeScript/JavaScript e identifica pontos mutáveis (operadores lógicos, numéricos, strings e condicionais).
2. **Criação dos Mutantes**: Ele gera cópias em memória aplicando alterações lógicas (ex: alterando `>` para `>=`).
3. **Execução Direcionada**: Para cada mutante, ele roda **apenas os testes cobrindo aquela linha específica** (otimização de performance).
4. **Verificação de Status**: Se o Jest falhar, o mutante é marcado como **Killed** 🟢. Se o Jest passar, o mutante é marcado como **Survived** 🛑.
5. **Relatório Visual**: Gera um painel interativo em HTML destacando em vermelho as linhas exatas onde faltam asserções.

---

## PARTE PRÁTICA: Passo a Passo do Zero (Baby Steps) 🛠️

Vamos construir juntos um exemplo do mundo real do zero.

### Passo 1: Instalação das Dependências no Node.js

No terminal do seu projeto Node.js / TypeScript, instale o Stryker e o executador do Jest:

```bash
npm install --save-dev @stryker-mutator/core @stryker-mutator/jest-runner
```

---

### Passo 2: Configurando o Stryker (`stryker.config.mjs`)

Crie o arquivo de configuração `stryker.config.mjs` na raiz do seu projeto:

```javascript
// @ts-check
/** @type {import('@stryker-mutator/api/core').PartialStrykerOptions} */
const config = {
  packageManager: 'npm',
  reporters: ['html', 'clear-text', 'progress'],
  testRunner: 'jest',
  coverageAnalysis: 'perTest',
  mutate: [
    'src/services/**/*.ts',
    '!src/services/**/*.spec.ts' // Ignora os arquivos de teste na mutação
  ],
  thresholds: {
    high: 80,
    low: 60,
    break: 70 // Se o Mutation Score for menor que 70%, o Stryker falha com erro!
  }
};

export default config;
```

---

### Passo 3: Configurando os Scripts no `package.json`

Adicione os scripts no `package.json`:

```json
{
  "scripts": {
    "test": "jest",
    "test:mutation": "stryker run"
  }
}
```

---

### Passo 4: O Código de Negócio (`src/services/discountService.ts`)

Vamos criar um serviço de cálculo de frete e desconto com regras de limite:

```typescript
export interface Order {
  value: number;
  isVipCustomer: boolean;
}

export function calculateShipping(order: Order): number {
  // Clientes VIP têm frete grátis em pedidos a partir de R$ 100
  if (order.isVipCustomer && order.value >= 100) {
    return 0;
  }

  // Pedidos comuns acima de R$ 200 ganham frete grátis
  if (order.value > 200) {
    return 0;
  }

  // Frete padrão de R$ 20
  return 20;
}
```

---

### Passo 5: O Teste Incompleto (`src/services/discountService.spec.ts`)

Agora criamos um teste que atinge **100% de Cobertura Tradicional**, mas possui furos graves:

```typescript
import { calculateShipping } from './discountService';

describe('calculateShipping', () => {
  it('deve calcular o frete para cliente VIP e cliente comum', () => {
    // Teste 1: VIP com valor 150 -> frete 0
    expect(calculateShipping({ value: 150, isVipCustomer: true })).toBe(0);

    // Teste 2: Comum com valor 250 -> frete 0
    expect(calculateShipping({ value: 250, isVipCustomer: false })).toBe(0);

    // Teste 3: Comum com valor 50 -> frete 20
    expect(calculateShipping({ value: 50, isVipCustomer: false })).toBe(20);
  });
});
```

Se você rodar `npm test -- --coverage`, o Jest reportará: **100% de cobertura de código!** 🎉

---

### Passo 6: Executando o Stryker e Analisando a Sobrevivência dos Mutantes

No terminal, execute:

```bash
npm run test:mutation
```

#### Saída do Terminal do Stryker 🛑:

```bash
[INFO] MutationTestExecutor - Initial test run succeeded. Testing 6 mutants.
[INFO] ProgressReporter - Tested mutant 1/6: Survived (EqualityOperator: >= -> >)
[INFO] ProgressReporter - Tested mutant 2/6: Killed (BooleanLiteral: true -> false)
[INFO] ProgressReporter - Tested mutant 3/6: Survived (EqualityOperator: > -> >=)
[INFO] ProgressReporter - Tested mutant 4/6: Killed (ConditionalExpression: true -> false)

All tests passed for 2 mutants!
Mutation score: 66.67% (4 killed, 2 survived)
```

😱 **MUTATION SCORE: 66.67%! O Stryker pegou 2 mutantes sobreviventes!**

#### Por que os mutantes sobreviveram?
1. **Mutante 1 (`>=` para `>`)**: O Stryker alterou `order.value >= 100` para `order.value > 100`. Como nosso teste só passou o valor `150` para o cliente VIP, ele nunca testou o valor limite exato de **`100`**!
2. **Mutante 3 (`>` para `>=`)**: O Stryker alterou `order.value > 200` para `order.value >= 200`. Como nosso teste só passou o valor `250`, nunca testamos o valor exato de **`200`**!

---

### Passo 7: Matando os Mutantes! 🗡️🟢

Para elevar nossa pontuação para 100% e garantir proteção real, adicionamos os casos de teste nos valores de borda em `src/services/discountService.spec.ts`:

```typescript
import { calculateShipping } from './discountService';

describe('calculateShipping', () => {
  it('deve dar frete grátis para cliente VIP no valor exato de R$ 100 (limite)', () => {
    expect(calculateShipping({ value: 100, isVipCustomer: true })).toBe(0);
    expect(calculateShipping({ value: 99.99, isVipCustomer: true })).toBe(20);
  });

  it('deve aplicar frete grátis para pedido comum apenas ACIMA de R$ 200', () => {
    expect(calculateShipping({ value: 200, isVipCustomer: false })).toBe(20); // No valor 200 paga frete
    expect(calculateShipping({ value: 200.01, isVipCustomer: false })).toBe(0); // Acima de 200 frete grátis
  });

  it('deve aplicar frete padrão para valores baixos', () => {
    expect(calculateShipping({ value: 50, isVipCustomer: false })).toBe(20);
  });
});
```

Rode novamente no terminal:

```bash
npm run test:mutation
```

#### Nova Saída de Sucesso 🟢:

```bash
All tests failed for all 6 mutants!
Mutation score: 100.00% (6 killed, 0 survived)
```

🎉 **100% MUTATION SCORE! Todos os mutantes foram mortos com sucesso!**

---

## Como Rodar o Stryker no CI/CD (GitHub Actions) sem Travar a Esteira 🚀

Para não desacelerar os PRs, configure o GitHub Actions para rodar o Stryker **apenas nos arquivos modificados na branch**:

```yaml
name: Mutation Testing CI

on:
  pull_request:
    branches: [main, master]

jobs:
  stryker:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 0 # Necessário para comparar arquivos alterados

      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'npm'

      - run: npm ci
      - run: npm test

      # Executa a mutação apenas nos arquivos alterados no PR
      - name: Run Stryker on Changed Files
        run: npx stryker run --mutate "$(git diff --name-only origin/main...HEAD | grep 'src/' | tr '\n' ',')"
```

---

## Resumo dos Benefícios 🎯

1. **Fim da cobertura maquiada**: Descubra se os testes realmente testam o comportamento ou só passam pelas linhas.
2. **Proteção contra regressão em valores de borda**: Garante que alterações condicionais (`>`, `>=`, `<`, `<=`) não passem despercebidas.
3. **Confiança máxima no refactor**: Você pode mexer na lógica sabendo que qualquer desalinhamento fará um teste falhar de verdade.

---

## O que vem por aí na série "Testes para Dev"? 🪝

Seus testes cobrem unidades, integrações, CI, contratos e agora possuem mutação à prova de falhas. Mas me responde: **e quando o usuário real entra na aplicação, clica nos botões, preenche formulários e navega pelas telas do navegador?**

No **Capítulo #6**, vamos falar sobre **Testes End-to-End (E2E) com Cypress**! Vamos aprender a simular jornadas completas de navegação do usuário do zero!

Deixe seu comentário e até o próximo post! 🚀
