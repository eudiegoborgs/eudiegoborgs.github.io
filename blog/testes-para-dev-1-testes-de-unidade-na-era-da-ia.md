---
path: testes-para-dev-1-testes-de-unidade
date: 2026-08-29T09:00:00.000Z
title: "Testes para Dev #1: Introdução aos Testes de Unidade"
---

Fala, dev! Beleza? 🚀

Boas-vindas ao primeiro post da nossa nova série **Testes para Dev**! 

Bora bater um papo direto ao ponto sobre o que realmente importa quando o assunto é testar código de verdade.

---

## Por que falar de testes justo agora?

Se você desenvolve software hoje, com certeza já tá usando (ou pelo menos vendo) IAs e assistentes gerando arquivos inteiros e refatorando código em segundos.

Aí sempre vem aquela pergunta no café do time: *"Pô Diego, se a IA escreve código e teste na hora, pra que eu vou perder tempo digitando teste na mão?"*

E aqui tá o pulo do gato: **digitar boilerplate repetitivo de teste na mão virou perda de tempo mesmo**. A IA faz isso em 2 segundos.

**Mas pensar o problema, entender o domínio da sua aplicação e estruturar a estratégia de testes nunca foi tão valioso.** 😉

Na era do código gerado por IA, saber montar um *Harness* de testes bem feito — como troquei uma ideia no post sobre [Arquitetura Evolutiva com IA](https://diegoborgs.com.br/blog/arquitetura-evolutiva-com-ia) — é o que garante que você pode acelerar sem ver a aplicação desmoronar em produção.

Nesta série, vamos passar por toda a jornada de testes: Unidade, Integração, Mutação e E2E. E pra começar com o pé direito, bora focar na base de tudo: **Testes de Unidade**.

---

## O que é (de verdade) um Teste de Unidade?

Muita gente confunde teste unitário com "rodar uma função pra ver se não estoura um `try/catch`". Mas a ideia aqui é bem mais simples e direta:

> **Teste de Unidade** é quando você pega uma função, método ou classe e testa a lógica interna dela de forma **atômica e isolada**, sem deixar nada de fora atrapalhar.

O grande segredo do teste de unidade tem um nome: **isolamento**. 

E pra conseguir isolar uma unidade de verdade, a gente usa um cara essencial: o **Mock**. 

Um *Mock* nada mais é do que um "dublê" controlado que você coloca no lugar de uma dependência (como um banco de dados ou uma API externa), só pra simular respostas e ver se a sua função conversa com ela do jeito certo.

Se pra testar uma continha ou regra de negócio você precisa subir o Postgres, bater na API da empresa do lado ou conectar no Redis, **você não tá fazendo teste de unidade** — tá fazendo teste de integração (que é o tema do próximo post!).

---

## O Desafio da Unidade: Isolando a Lógica Pura

Dá uma olhada nessa função em TypeScript:

```typescript
const addCharge = (value: number): number => {
  const databaseValue = await this.repo.getDatabaseValue({ value });
  const apiValue = await this.client.getClientValue(value);
  
  return value + apiValue + databaseValue;
};
```

O que tá acontecendo aqui?
- Ela busca um valor no banco (`repo.getDatabaseValue`).
- Busca outro valor numa API externa (`client.getClientValue`).
- Soma tudo e retorna.

### O que o teste de unidade precisa testar de verdade?
No teste de unidade dessa função, você **não quer saber se o banco tá fora do ar ou se a internet caiu**. O seu foco é: *se o banco me mandar X e a API me mandar Y, a minha função faz a conta certa e chama os métodos com os parâmetros corretos?*

---

## Mão na massa: Escrevendo o teste com Mocks no Jest

Pra testar essa função de forma 100% isolada usando o **Jest**, a gente substitui o banco e a API por *Mocks*:

```typescript
describe('addCharge', () => {
  it('deve calcular o valor total e chamar as dependências certinho', async () => {
    // 1. ARRANGE (Preparação): Criamos os mocks do banco e da API
    const getDatabaseValue = jest.fn().mockResolvedValue(10);
    const getClientValue = jest.fn().mockResolvedValue(5);

    const context = {
      repo: { getDatabaseValue },
      client: { getClientValue },
      addCharge
    };

    const initialValue = 100;

    // 2. ACT (Ação): Executamos a função sob teste
    const total = await context.addCharge(initialValue);

    // 3. ASSERT (Checagem): Garantimos os argumentos e a conta final
    expect(getDatabaseValue).toHaveBeenCalledWith({ value: initialValue });
    expect(getClientValue).toHaveBeenCalledWith(initialValue);
    expect(total).toBe(115); // 100 + 10 + 5
  });
});
```

---

## Regra de Ouro: Não mocke o que você não é dono! 🛑

Guarda esse conselho no seu coração de dev (*"Don't mock what you don't own"*):

> **Nunca faça mock direto de código, SDKs ou bibliotecas de terceiros que você não possui.**

### Como assim "não sou dono"?
- **Código seu**: Suas interfaces, suas classes de domínio, seus serviços internos. Você é o dono, você muda a hora que quiser.
- **Código que NÃO é seu**: SDK da AWS, Axios, Prisma, SDK do Stripe, pacotes do NPM. Você não manda no código dos caras.

### Por que mockar lib de terceiros é furada?
Se você meter um `jest.mock('axios')` ou mockar um método interno da AWS direto na sua regra de negócio:
1. **O teste vai mentir pra você**: Se a lib de terceiros atualizar e mudar uma resposta em produção, seu teste vai continuar passando verde no CI, mas a aplicação vai dar pau na mão do usuário.
2. **Seu teste fica frágil**: Qualquer mudancinha boba na lib quebra seu teste de bobeira.

### A Solução Prática: Crie a sua própria abstração!
Em vez de usar a lib de terceiros direto na sua classe de negócio, crie uma **interface sua** e faça mock apenas da sua interface no teste unitário:

```typescript
// ❌ FURADA: Mockando o SDK da AWS direto no teste de negócio
const snsMock = jest.spyOn(SNSClient.prototype, 'send');

// ✅ MANDOU BEM: Mockando a SUA interface no teste de unidade
interface NotificationService {
  sendWelcome(email: string): Promise<void>;
}

const notificationServiceMock: NotificationService = {
  sendWelcome: jest.fn().mockResolvedValue(undefined)
};
```

---

## O Princípio F.I.R.S.T: O Checklist do Teste Bom

Pra sua suíte de testes não virar um pesadelo lento e chato de manter, lembra sempre da sigla **F.I.R.S.T**:

- **F - Fast (Rápido)**: Rodou, passou. Tem que ser em milissegundos.
- **I - Independent (Independente)**: Um teste não pode depender de outro rodar antes. Zero estado compartilhado!
- **R - Repeatable (Repetível)**: Tem que dar o mesmo resultado no seu Mac, no Windows do colega ou no CI da empresa.
- **S - Self-validating (Auto-validável)**: É verde ou vermelho. Ninguém merece ter que ler `console.log` pra saber se o teste passou.
- **T - Timely (Oportuno)**: Escreva o teste junto ou antes de criar o código de verdade (alô TDD!).

---

## Não Se Pode Simplesmente Refatorar Sem Testes 🛡️

Sabe aquele ditado clássico que todo dev já ouviu numa segunda-feira de manhã?

> **"Não se pode simplesmente refatorar sem testes."**

Seja refatorando na mão ou pedindo pra IA dar um tapa naquele código legado medonho, **ter testes de unidade cobrindo os cantos da sua regra é a única garantia de que você não vai quebrar nada sem querer.**

---

## E como testar a integração real com terceiros? 🪝

Se no teste unitário a gente não deve mockar libs de terceiros e precisa criar abstrações... **onde a gente testa se o banco de dados de verdade ou a API do fornecedor tão funcionando redondinho?**

Aí é que entra o próximo papo!

No **Capítulo #2 da série Testes para Dev**, vamos subir um degrau na pirâmide e falar de **Testes de Integração**: como testar suas implementações reais, entender a diferença entre Mock, Stub e Spy sem nó na cabeça, a regra do SUT (*System Under Test*) e como ter 100% de confiança na integração do seu sistema.

Fechou? Deixa sua opinião nos comentários e bora trocar essa ideia. Até o próximo post! 🚀
