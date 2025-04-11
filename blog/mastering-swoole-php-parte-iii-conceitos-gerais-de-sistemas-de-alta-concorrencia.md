---
path: general-concepts-on-high-concurrency-systems
date: 2021-07-01T12:32:10.334Z
title: "[Mastering Swoole PHP] Parte III - Conceitos gerais de sistemas de alta
  concorrência"
---
Olá mundo!

Nesse artigo vou dar continuidade a série do Mastering Swoole, se você ainda não leu o primeiro artigo dá uma conferida [aqui](https://diegoborgs.com.br/blog/mastering-swoole-php-parte-i-introdu%C3%A7%C3%A3o). 

Agora estamos entrando na parte mais conceitual do livro, por isso esse artigo talvez fique um pouco longo. A ideia é introduzir os conceitos vinculados a aplicações de alta performance e concorrência. Os conceitos que foram apresentados no livro são agnósticos e podem ser usados em qualquer linguagem, ferramenta ou framework.

### Executor e a execução em containers

Chamamos uma unidade de execução independente que executa uma sequência de comandos como um *executor*. Essa unidade de execução pode estar rodando em um determinado ambiente. Chamamos o ambiente em que a unidade de execução trabalha de *contexto*.

O executor trabalha de maneira isolada e tem os dados internos independentes. Ele pode se comunicar com o outro executor através de alguns *channels* (soquetes, canais, arquivos, memória compartilhada, etc.) ou fazendo alterações no ambiente global. Cada tipo de executor tem finalidades e custos diferentes e cada estrutura deve escolher aquele que entrega uma melhor relação **custo x performance**.

### Gerenciamento de ciclo de vida

### Desacoplamento e camadas

### Queue, buffers, buffering and batching

### Pipe and channel

### Context, stack and context switch

### Singleplex vs Multiplexing

### Asynchronous

### State, stateless, stateful and pooling

### File descriptor, I/O stream

### Excessões e timeouts

### Protocolos

### Concorrência e modelo I/O

### Eventos e callbacks

### Custos e limitações