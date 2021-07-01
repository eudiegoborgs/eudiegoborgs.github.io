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