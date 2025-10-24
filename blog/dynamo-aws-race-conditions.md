---
path: dynamo-aws-race-conditions
date: 2025-10-23T18:45:44.059Z
title: Quando o sistema corre mais rápido que a lógica! entendendo e prevenindo Race Conditions
---

Em outubro de 2025, a AWS divulgou um incidente que afetou o **Amazon DynamoDB** na região **US-EAST-1**.  

A causa raiz? Uma **condição de corrida (*race condition*)** no sistema de gerenciamento de DNS do DynamoDB, que gerou **um registro DNS vazio incorreto** para o endpoint regional (`dynamodb.us-east-1.amazonaws.com`). Por causa dessa falha foram mais de 15 horas de instabilidade, afetando sistemas no mundo inteiro.

[📄 Leia o comunicado oficial da AWS](https://aws.amazon.com/pt/message/101925/)

Esse caso mostra que **mesmo empresas com a melhor infraestrutura e práticas do mundo estão sujeitas a falhas concorrenciais** — especialmente quando múltiplos sistemas tentam atualizar recursos compartilhados ao mesmo tempo.

E se um problema assim impacta uma gigante como a AWS, imagine o risco em sistemas que lidam com **transações financeiras, controle de estoque ou qualquer dado que exija alta integridade**.

---

## O que é uma Race Condition?

Uma *race condition* ocorre quando **duas ou mais operações concorrentes tentam acessar ou modificar o mesmo recurso simultaneamente**, e o resultado depende da ordem em que essas operações são executadas.

Em outras palavras, o comportamento do sistema **torna-se imprevisível** — o resultado final varia conforme “quem vence a corrida”.

### Exemplo simples em PHP

Imagine um sistema de carteira digital em que dois usuários tentam transferir dinheiro da mesma conta ao mesmo tempo:

```php
// saldo atual
$saldo = getSaldo($conta);

// transferência de R$100
if ($saldo >= 100) {
    $saldo -= 100;
    setSaldo($conta, $saldo);
}
```

Se dois processos executarem esse código simultaneamente, ambos podem ler o mesmo saldo inicial antes que o outro o atualize — e permitir duas saídas de R$100 mesmo havendo saldo para apenas uma.

Resultado: saldo negativo e dados inconsistentes.

### Onde isso acontece na prática

Race conditions são mais comuns do que parecem — especialmente em ambientes distribuídos, de alta escala ou sistemas orientados a eventos.

Alguns exemplos clássicos:

- Sistemas de pagamento: duas cobranças simultâneas no mesmo cartão ou conta.
- Sistemas de reserva: dois usuários reservando o mesmo ingresso, quarto ou assento.
- E-commerces: múltiplas compras afetando o mesmo item em estoque.
- Atualizações de cache ou banco: processos paralelos sobrescrevendo dados.
- Sistemas distribuídos: replicações assíncronas e inconsistências entre regiões.

## Como evitar Race Conditions

A escolha da estratégia depende do contexto: volume de concorrência, arquitetura, tolerância a latência e custo de sincronização.

A seguir, três abordagens práticas que ajudam a prevenir esse tipo de problema em aplicações PHP.

### 1. Transações com bloqueio no banco de dados

A forma mais tradicional é deixar o próprio banco garantir a consistência dos dados.
```php
try {
    $pdo->beginTransaction();

    // bloqueia a linha até o commit
    $stmt = $pdo->prepare("SELECT saldo FROM contas WHERE id = ? FOR UPDATE");
    $stmt->execute([$contaId]);
    $saldo = $stmt->fetchColumn();

    if ($saldo >= 100) {
        $stmt = $pdo->prepare("UPDATE contas SET saldo = saldo - 100 WHERE id = ?");
        $stmt->execute([$contaId]);
    }

    $pdo->commit();
} catch (Exception $e) {
    $pdo->rollBack();
}
```

O FOR UPDATE faz com que o banco de dados bloqueie a linha até o final da transação, impedindo leituras concorrentes e garantindo integridade.

### 2. Locks distribuídos com Redis

Para sistemas de alta concorrência, uma boa alternativa é aplicar locks distribuídos — por exemplo, usando Redis e o padrão Redlock.

```php
$lockKey = "lock:conta:$contaId";
if ($redis->set($lockKey, 1, ['nx', 'ex' => 5])) {
    // execução protegida
    processaTransferencia($contaId);
    $redis->del($lockKey);
} else {
    throw new Exception("Conta em uso, tente novamente");
}
```

- NX: cria o lock apenas se ele ainda não existir.
- EX: define o tempo de expiração, garantindo que o lock não fique “preso” se o processo falhar.

Esse modelo é amplamente usado em microserviços e operações críticas de API.


### 3. Filas de processamento (Message Queue)

Outra abordagem é eliminar a concorrência direta.

Em vez de processar requisições simultâneas, você pode enfileirá-las — garantindo ordem e isolamento lógico. Você pode fazer isso enviando as operações para uma fila (RabbitMQ, SQS, Kafka, etc.) para serem processadas em sequência.

```php
dispatchToQueue([
    'acao' => 'transferencia',
    'conta' => $contaId,
    'valor' => 100
]);
```

Dessa forma, as requisições são processadas uma por vez, mantendo a consistência lógica e a ordem das operações.

Boas práticas de arquitetura

- Identifique recursos compartilhados e pontos de concorrência desde o design.
- Evite operações dependentes de estado em sistemas distribuídos.
- Use idempotência em endpoints críticos (repetir a requisição deve gerar o mesmo resultado).
- Acompanhe métricas de concorrência e tempo de bloqueio.
- Simule condições de corrida em testes.


## Conclusão

O incidente da AWS é um lembrete poderoso de que race conditions podem causar impactos significativos até mesmo em infraestruturas robustas.

No dia a dia, essas condições são invisíveis, mas quando acontecem, os danos à integridade dos dados e à confiança do usuário são enormes.

A solução está em controlar o acesso concorrente e escolher a estratégia adequada para o seu contexto.
