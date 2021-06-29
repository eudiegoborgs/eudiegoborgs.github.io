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

Para aqueles que não sabem, o [Swoole](https://www.swoole.co.uk/) é uma extensão para o core do PHP, **Open Source,** que traz funcionalidades para o desenvolvimento de aplicações com concorrência e assim aumentar a performance através do uso de corrotinas e I/O assíncrono.

A proposta do [Swoole](https://www.swoole.co.uk/) é permitir que você consiga ter paralelismo que existe em outras linguagens como o GO ou Node.js com a mesma sintaxe de PHP que você já está acostumado. Ele permite que seu código processe muitas requisições ou execute várias tarefas de maneira concorrente e independente. Todo o I/O da aplicação é automaticamente gerenciado por um Event Loop, isso é similar ao que acontece no Node.js ou Python. Apenas o código sem bloqueio deve ser adicionado ao loop de eventos, por esse motivo algumas bibliotecas comuns (MySQL PDO, Redis CURL, etc) tiveram que ser adaptadas para se tornarem mais amigáveis ao [Swoole](https://www.swoole.co.uk/). No entanto, o [Swoole](https://www.swoole.co.uk/) também fornece um loop de eventos para diferentes casos de uso, como o servidor HTTP ou o servidor WebSocket.

### Porque o Swoole foi criado?

#### Stateless x Stateful

Antes do PHP-FPM existia o Apache httpd com o mod_php, ambos executam seus processos de modo stateless. A arquitetura stateless foi amplamente utilizada na web nos últimos 10 anos, se tornando muito popular. No stateless, nenhum estado da aplicação é armazenado ou persistido e toda transação ou requisição recria todos os seus estados e variaveis e destrói elas no fim de sua execução. 

As pessoas preferem usar o stateless, porque não precisam se preocupar com o gerenciamento do estado de uma transação e podem escalar o serviço horizontalmente, aumentando a quantidade de servidores conforme o aumento de uso da aplicação. O stateless não resolve tudo e tem alguns efeitos colaterais que devem ser avaliados. 

Já o [Swoole](https://www.swoole.co.uk/) PHP executa seus processos de modo stateful, dessa maneira consegue armazenar o estado na aplicação e compartilhar ele entre transações e requisições economizando o uso e dependência de recursos externos (ex: conexões com o banco de dados).

#### Blocking I/O

O PHP bloqueia o I/O por padrão, deixando os recursos reservados até que o processo termine e impedindo que outros processos assumam aqueles recursos.

![blocking i/o](/assets/fireshot-capture-004-kindle-cloud-reader-ler.amazon.com.br.png)

Podemos melhorar a performance de um sistema usando I/O não blocante. Quando um processo estiver aguardando algo, outro processo pode iniciar a sua execução.

![non blocking i/o](/assets/fireshot-capture-005-kindle-cloud-reader-ler.amazon.com.br.png)

#### Problema de desempenho

A performance é um problema que vai sempre existir em nossas aplicações, fazer com que respondam o mais rápido possível é o trabalho principal da maioria dos desenvolvedores. Um problema da arquitetura stateless é o fato de recriar todo o contexto do zero em cada requisição ao servidor sem reaproveitar aquilo que é compartilhável e já foi criado anteriormente. Isso com certeza pode prejudicar a performance, afinal de contas, não existe otimização melhor que deixar de se esforçar para fazer algo. 

Se o seu sistema em PHP depende apenas da CPU, você provavelmente não vai ter muitos problemas com concorrência usando o PHP-FPM, mas se você precisa estabelecer conexões com bancos de dados, para cada nova requisição será criada uma conexão com o banco de dados e se você escala isso para um número grande, você poderá ter dificuldades para encontrar conexões disponíveis.

Somente movendo parte da aplicação para um modelo stateful, o [Swoole](https://www.swoole.co.uk/) promete aumentar o desempenho de 2x a 5x, algumas pessoas conseguiram reduzir em até 100x o uso de recursos de um servidor usando abordagens mais específicas apresentadas no livro. O compartilhamento dos estados pode causar grandes melhorias de performance no seu sistema, mas ainda assim não é o maior problema que o [Swoole](https://www.swoole.co.uk/) resolve.

#### Problema de concorrência

Na atualidade a maior parte das aplicações web fazem várias operações de I/O (chamar banco de dados, HTTP API's, escrever em um tópico, etc). Você raramente vai conseguir controlar o tempo gasto esperando a resposta do I/O, e os processos seguintes vão aguardar essa resposta mesmo se depender dela.

A maior magia do [Swoole](https://www.swoole.co.uk/) está na resolução deste problema, tornando o processo assíncrono você passa a realizar outras tarefas de modo concorrente, enquanto espera o retorno de respostas de dependências externas, diminuindo a latência do seu sistema. 

Antes do [Swoole](https://www.swoole.co.uk/) outras libs de PHP tentavam solucionar esse problema usando filas para execução do processo em outra requisição, mas o ponto fraco dessa estratégia é a falta de controle sobre a sua execução e resposta.

O [Swoole](https://www.swoole.co.uk/) usa de corrotinas para resolver esse problema, mantendo o controle no processo principal e compartilhando os estados entre cada uma delas.



*Continua nos próximos capítulos...*