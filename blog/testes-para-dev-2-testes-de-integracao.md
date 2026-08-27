---
path: testes-para-dev-2-testes-de-integracao
date: 2026-09-01T09:00:00.000Z
title: "Testes para Dev #2: Testes de Integração e o Mito do Mock Absoluto"
---

Fala, dev! Beleza? 🚀

Seja bem-vindo ao segundo capítulo da nossa série **Testes para Dev**! 

No [primeiro artigo](https://diegoborgs.com.br/blog/testes-para-dev-1-testes-de-unidade), trocamos uma ideia sobre os **Testes de Unidade** — a base atômica e isolada que valida as regras puras do nosso sistema.

Mas vamos ser sinceros: nenhuma aplicação no mundo real vive isolada numa bolha. Nossos sistemas precisam salvar dados no banco, consultar microsserviços, enviar e-mails e integrar com APIs de pagamento. 

É aí que entra o tema de hoje: **Testes de Integração**. Bora entender como validar a comunicação entre os módulos sem cair na armadilha de mockar tudo!

---

## O que é (de verdade) um Teste de Integração?

Se o teste de unidade foca em garantir que a menor fração da lógica funciona isoladamente, o teste de integração tem outro objetivo claro:

> **Teste de Integração** é a fase do teste de software em que dois ou mais módulos, componentes ou serviços são combinados e testados em conjunto para encontrar falhas na **comunicação e interface** entre eles.

Aqui não estamos mais preocupados em saber se a matemática do cálculo interno tá certa (isso a unidade já garantiu). O foco é responder: *quando o módulo A chama o módulo B, a integração funciona sem quebrar contratos ou contratos de banco?*

---

## A Pirâmide de Testes

Para não perder a visão do todo, lembre-se sempre da Pirâmide de Testes:

- **E2E (Topo)**: Mais lentos, mais caros, cobrem a jornada completa do usuário no navegador.
- **Integração (Meio)**: Validam a comunicação entre serviços, banco de dados e APIs externas.
- **Unidade (Base)**: Ultra-rápidos, isolados e em maior quantidade.

---

## Desmistificando os Test Doubles: Nem todo Mock é um Mock! 🎭

No dia a dia dos times de dev, é super comum chamar qualquer dublê de teste de "mock". Mas entender a diferença entre eles faz toda a diferença para criar testes de integração limpos:

### 1. STUB
Prove respostas pré-determinadas para quem chama ou simula falhas conhecidas (como lançar uma exceção de rede).
- **Caso de uso**: Forçar o retorno de uma cotação de dólar ou simular uma falha de conexão de rede sem disparar I/O real.
```typescript
// Stub de valor fixo
const getDolarRateStub = jest.fn().mockResolvedValue(5.25);

// Stub de exceção
const failingPaymentStub = jest.fn().mockRejectedValue(new Error('Gateway Indisponível'));
```

### 2. SPY
Observa e grava a execução de um método real (ou mockado) para conferir quantas vezes ele foi chamado e com quais parâmetros, sem alterar o comportamento original.
- **Caso de uso**: Espionar o serviço de auditoria/log do sistema para garantir que a mensagem foi gravada.
```typescript
const loggerSpy = jest.spyOn(logger, 'info');
await userService.registerUser({ email: 'diego@email.com' });

expect(loggerSpy).toHaveBeenCalledWith('Usuário criado: diego@email.com');
loggerSpy.mockRestore();
```

### 3. MOCK
Um dublê completo pré-programado com expectativas de retorno e validações rígidas de contrato.
- **Caso de uso**: Substituir o serviço de e-mail e validar se a chamada ocorreu com o template e o destinatário corretos.
```typescript
const emailServiceMock = {
  sendWelcomeEmail: jest.fn().mockResolvedValue({ status: 'SENT' })
};

await registerService.execute({ email: 'diego@email.com' });
expect(emailServiceMock.sendWelcomeEmail).toHaveBeenCalledWith({
  to: 'diego@email.com',
  template: 'welcome-user'
});
```

---

## A Regra do SUT: Quando NÃO usar Test Double! 🛑

Guarde essa regra na cabeça: **System Under Test (SUT)**.

> **Nunca faça mock ou spy do próprio objeto/classe que você está testando e asserindo!**

Se você está testando a classe `OrderService`, ela é o seu SUT. Mockar métodos internos do `OrderService` para testar o próprio `OrderService` gera testes viciados que apenas validam o que você forçou o mock a retornar.

E lembre-se da regra de ouro que vimos no post anterior: **"Não faça mock do que você não é dono"**.

---

## Mocks de Banco de Dados e APIs: Prós e Contras

Em testes de integração, você frequentemente precisará decidir entre mockar o banco/API ou subir um ambiente real (com Docker/Testcontainers):

### Prós dos Mocks:
- Testes extremamente rápidos e determinísticos.
- Execução 100% offline.

### Contras dos Mocks:
- Risco de ignorar comportamentos reais de banco (como constraints de chave estrangeira, conexões e migrações).
- O teste não garante 100% que a integração física vai funcionar em produção.

---

## O que vem por aí na série "Testes para Dev"? 🪝

Agora que entendemos como funcionam os testes de unidade e de integração, a pergunta que fica é: **como garantir que toda essa suíte rode automaticamente a cada Pull Request sem dependermos de lembrar de rodar os testes na máquina local?**

No **Capítulo #3**, vamos falar de **Continuous Integration (CI/CD)**! Vamos ver na prática como configurar workflows no GitHub Actions para rodar Linter, Jest e controlar a qualidade do código com pipelines automatizados.

Deixa seu comentário e bora trocar essa ideia. Até o próximo post! 🚀
