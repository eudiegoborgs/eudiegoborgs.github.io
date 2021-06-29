---
path: whats-is-swoole
date: 2021-06-29T01:06:12.826Z
title: "[Mastering Swoole PHP] Parte I e II - Introdução e Background"
---
Olá mundo! 

Estou lendo o livro [Matering Swoole PHP](https://www.amazon.com.br/Mastering-Swoole-PHP-performance-concurrent-ebook/dp/B0881B227S#:~:text=This%20book%20is%20for%20the,Swoole%20PHP%20system%20with%20confidence.) do Bruce Dou por indicação do [@SwooLeoCavalcante](https://twitter.com/leocavalcante). Como é um livro em inglês, estou tendo alguma dificuldade em assimilar os conteúdos que foram apresentados ali, por esse motivo resolvi escrever com minhas palavras um resumo de cada parte.

A ideia principal dessa série de artigos não é fazer uma tradução do livro ou reescrever com detalhes o que já está escrito lá, mas mostrar os pontos abordados em cada parte através da minha ótica. Recomendo a vocês a leitura deste livro para terem suas próprias ideias e opiniões.

Se você desenvolve com PHP a alguns anos, com certeza deve estar ciente que até a versão 8, o PHP é uma linguagem síncrona, e também deve estar ciente que isso algumas vezes acabam deixando nossas aplicações lentas, principalmente em aplicações que dependem de serviços externos que podem gerar alguma latência de resposta. 

Como a linguagem não trabalha com paralelismo, precisamos esperar a resposta de uma determinada instrução para avançar para outra, mesmo que não tenhamos dependência do resultado na instrução seguinte.

O livro apresenta para nós um novo modelo de construção de aplicações em PHP, como o [Swoole](https://www.swoole.co.uk/) funciona e quais os desafios que novos desenvolvedores podem encontrar ao iniciar sua aventura no mundo do [Swoole](https://www.swoole.co.uk/) PHP.

### O que é o Swoole?

Para aqueles que não sabem, o [Swoole](https://www.swoole.co.uk/) é uma extensão para o core do PHP **Open Source** que traz funcionalidades para o desenvolvimento de aplicações com concorrência e assim aumentar a performance através do uso de corrotinas e I/O assíncrono.

A proposta do [Swoole](https://www.swoole.co.uk/) é permitir que você consiga ter paralelismo que existe em outras linguagens como o GO ou Node.js com a mesma sintaxe de PHP que você já está acostumado. Ele permite que seu código processe muitas requisições ou execute várias tarefas de maneira concorrente e independente. Todo o I/O da aplicação é automaticamente gerenciado por um Event Loop, isso é similar ao que acontece no Node.js ou Python. Apenas o código sem bloqueio deve ser adicionado ao loop de eventos, por esse motivo algumas bibliotecas comuns (MySQL PDO, Redis CURL, etc) tiveram que ser adaptadas para se tornarem mais amigaveis ao [Swoole](https://www.swoole.co.uk/). No entanto, o [Swoole](https://www.swoole.co.uk/) também fornece um loop de eventos para diferentes casos de uso, como o servidor HTTP ou o servidor WebSocket.