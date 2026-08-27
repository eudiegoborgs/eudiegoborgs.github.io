---
path: testes-para-dev-1-testes-de-unidade
date: 2026-08-27T09:00:00.000Z
title: "Testes para Dev #1: Introdução aos Testes de Unidade"
---

Boas-vindas ao primeiro capítulo da nova série **Testes para Dev**! 🚀

---

## Por que uma série sobre testes agora?

Estamos vivendo um momento de transformação acelerada no desenvolvimento de software. Com assistentes de código e agentes autônomos de IA gerando arquivos inteiros e refatorando sistemas em segundos, é natural surgir o questionamento: *qual é o real papel do desenvolvedor hoje?*

Digitar mecanicamente sintaxe de código ou *boilerplates* repetitivos de testes tornou-se uma tarefa automatizável. **Porém, pensar o problema, compreender as regras do negócio e estruturar a estratégia de testes nunca foi tão valioso.** 😉

Na era do código gerado por IA, saber criar um *Harness* sólido — como discuti no artigo [Arquitetura Evolutiva com IA](https://diegoborgs.com.br/blog/arquitetura-evolutiva-com-ia) — é a garantia de que seu software continuará evoluindo rápido e de forma segura.

Ao longo desta série, vamos passar por todas as camadas de testes (Unidade, Integração, Mutação e End-to-End). E hoje, vamos começar pelo pilar fundamental: **Testes de Unidade**.

---

## O que é um Teste de Unidade?

Muitas pessoas confundem testes unitários com "rodar uma função para ver se ela lança exceção". Mas o conceito de unidade possui uma premissa clara:

> **Teste de Unidade** é a fase do teste de software em que funções, métodos ou classes são validados de maneira **atômica** e **isolada**, garantindo que a menor fração de regra de negócio funcione estritamente conforme o especificado, sem qualquer interferência externa.

O grande segredo do teste de unidade é o **isolamento**. E para conseguir isolar uma unidade, antecipamos um conceito essencial: o **Mock**. 

Um *Mock* é um substituto controlado para uma dependência da sua aplicação, permitindo simular cenários de retorno e verificar se o seu código interagi com essa dependência da forma esperada.

Se para testar um cálculo ou regra de negócio você precisa se conectar a um banco de dados real, disparar uma requisição de rede ou subir um serviço externo, **você não está fazendo um teste de unidade** (e sim um teste de integração).

---

## O Desafio da Unidade: Isolando o Comportamento Puro

Vamos analisar um exemplo clássico de função em TypeScript:

```typescript
const addCharge = (value: number): number => {
  const databaseValue = await this.repo.getDatabaseValue({ value });
  const apiValue = await this.client.getClientValue(value);
  
  return value + apiValue + databaseValue;
};
```

Nesta função:
- O banco de dados é consultado (`repo.getDatabaseValue`).
- Uma API externa é chamada (`client.getClientValue`).
- A soma final é realizada e retornada.

### O que a unidade deve validar?
O objetivo do teste de unidade para `addCharge` não é checar se a rede caiu ou se o banco de dados falhou. O objetivo é garantir que, **dadas entradas previsíveis das dependências**, a lógica de composição e os parâmetros passados para os colaboradores funcionam exatamente como esperado.

---

## Escrevendo um Teste de Unidade com Mocks no Jest

Para testar essa função de forma isolada no **Jest**, substituímos as dependências por *Mocks*:

```typescript
describe('addCharge', () => {
  it('deve calcular o valor total e validar os argumentos das dependências', async () => {
    // 1. ARRANGE: Mock das dependências externas
    const getDatabaseValue = jest.fn().mockResolvedValue(10);
    const getClientValue = jest.fn().mockResolvedValue(5);

    const context = {
      repo: { getDatabaseValue },
      client: { getClientValue },
      addCharge
    };

    const initialValue = 100;

    // 2. ACT: Executa a unidade sob teste
    const total = await context.addCharge(initialValue);

    // 3. ASSERT: Valida os parâmetros de chamada e o resultado
    expect(getDatabaseValue).toHaveBeenCalledWith({ value: initialValue });
    expect(getClientValue).toHaveBeenCalledWith(initialValue);
    expect(total).toBe(115); // 100 + 10 + 5
  });
});
```

---

## A Regra de Ouro: Não mocke o que você não é dono! 🛑

Existe uma diretriz clássica no TDD e no design de software (*"Don't mock what you don't own"*):

> **Nunca faça mock direto de código, SDKs ou bibliotecas de terceiros que você não possui.**

### O que significa "possuir" um código?
- **Código que você POSSUI**: Suas interfaces, seus serviços de domínio, seus módulos internos. Você controla a assinatura e o ciclo de vida.
- **Código que você NÃO POSSUI**: SDK da AWS, Axios, Prisma, Stripe, pacotes do NPM. Você não controla o código-fonte nem como os mantenedores atualizarão a biblioteca.

### O risco de mockar bibliotecas de terceiros direto
Quando você faz `jest.mock('axios')` ou mocka métodos internos de um SDK externo:
1. **Falsos Positivos**: Se a biblioteca de terceiros atualizar e mudar um método, seu teste continuará passando (verde), mas a aplicação quebrará em produção.
2. **Testes Frágeis**: Seu teste fica acoplado a detalhes de implementação de um pacote externo.

### A Solução: Crie uma Abstração (Wrapper/Adapter)
Em vez de mockar o SDK externo na sua regra de negócio, crie uma **interface sua** (que seu sistema possui) e mocke apenas a sua interface no teste unitário:

```typescript
// ❌ ERRADO: Mockando SDK da AWS direto no teste unitário de negócio
const snsMock = jest.spyOn(SNSClient.prototype, 'send');

// ✅ CERTO: Mockando a SUA interface no teste de unidade
interface NotificationService {
  sendWelcome(email: string): Promise<void>;
}
const notificationServiceMock: NotificationService = {
  sendWelcome: jest.fn().mockResolvedValue(undefined)
};
```

---

## O Princípio F.I.R.S.T: As 5 Regras de Ouro

Para manter uma suíte de testes de unidade saudável e útil ao longo do tempo, siga o princípio **F.I.R.S.T**:

- **F - Fast (Rápidos)**: Devem rodar em milissegundos para fornecer feedback instantâneo.
- **I - Independent (Independentes)**: Um teste nunca deve depender do resultado de outro teste anterior.
- **R - Repeatable (Repetíveis)**: Devem produzir exatamente o mesmo resultado em qualquer ambiente (local, Docker ou CI).
- **S - Self-validating (Auto-validáveis)**: O resultado deve ser claramente `Pass` ou `Fail`, sem exigir interpretação manual de logs.
- **T - Timely (Oportunos)**: Devem ser escritos junto ou antes do desenvolvimento do código (TDD / oportunos).

---

## Não Se Pode Simplesmente Refatorar Sem Testes 🛡️

Existe uma frase clássica na engenharia de software que precisa estar no radar de todo time:

> **"Não se pode simplesmente refatorar sem testes."**

Seja ao reescrever um trecho complexo manualmente ou ao solicitar uma refatoração assistida por IA, **ter uma suíte de testes de unidade confiável é o único caminho para garantir que o comportamento do sistema não foi alterado.**

---

## O que vem por aí: E como testar a integração real com terceiros? 🪝

Se no teste de unidade não devemos mockar bibliotecas de terceiros e precisamos criar abstrações... **como e onde testamos se o SDK da AWS ou a consulta ao banco de dados funcionam de verdade?**

Esse é o gancho perfeito para o nosso próximo artigo!

No **Capítulo #2 da série Testes para Dev**, daremos o próximo passo e exploraremos os **Testes de Integração**: como testar os *Adapters* reais, o aprofundamento sobre os tipos de *Test Doubles* (Mock vs Stub vs Spy), a regra do SUT (*System Under Test*) e como garantir 100% de confiança na integração do seu sistema.

Deixe seus comentários e nos vemos no próximo artigo! 🚀
