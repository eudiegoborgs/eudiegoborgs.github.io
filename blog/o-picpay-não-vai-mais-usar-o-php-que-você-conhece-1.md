---
path: o-futuro-do-php
date: 2023-09-11T12:22:21.524Z
title: O PicPay não vai mais usar o PHP... Que você conhece!
---
Sim, isto é um click bait, não vou te iludir. Mas talvez essa leitura possa valer a pena.

Desde quando comecei a trabalhar com tecnologia em 2011, ouço falar que o PHP é uma linguagem ruim, todo ano vejo uma série de artigos e postagens falando que o PHP vai morrer, por algum tempo até acreditei nisso e acabei migrando a linguagem, mas trabalhar com outras linguagens me levaram a seguinte conclusão: **O maior problema do PHP nunca foi o PHP**.

O grande problema é que essas postagens desencorajam pessoas que querem aprender a escrever softwares modernos e com qualidade a continuarem escrevendo códigos em PHP, e direciona elas a buscar refugio em outras linguagens.

Calma, calma! Já sei o que você está pensando... "Ah, mas o PHP tem vários defeitos". Verdade, tem mesmo! E outras linguagens também, o que vou te mostrar aqui é que o PHP pode ser uma boa opção pra você. E ainda que apresente vários problemas é uma das linguagens mais usadas da web, além do fato de ter uma comunidade forte, documentação muito completa e detalhada, um bom ecossistema de frameworks, é muito inovadora e ninguém pode dizer que não performática (leia mais que vou te provar), além de contar com uma um grande numero de profissionais que já conhecem sua sintaxe.

## Tá! Mas o que isso tem haver com o PicPay acabar com o PHP que eu conheço?

Como disse acima, o maior problema das pessoas com o PHP não é a linguagem em si, mas a experiência que os desenvolvedores tiveram com a linguagem. O primeiro programador que conheci tomou trauma do PHP porque trabalhou em um projeto onde cada variável tinha nome de um pokémon diferente e ele era incapaz de entender o que aquele código fazia. Já ouvi gente dizendo que código em PHP é feio e muito acoplado, sempre tem um controller de 10000 linhas e não dá pra entender o que faz, mas o que a pessoa teve de experiencia com o PHP foi um código mal escrito ou algo feito em WordPress (convenhamos que apesar da grande adoção, não é um bom exemplo de qualidade de código). Tudo isso acontece porque algumas pessoas tem escrito código em PHP sem se preocupar com a qualidade do que estão entregando.

A revolução faz parte do DNA do PicPay, nós queremos mudar isso! Temos construído um PHP com qualidade e queremos dividir isso com vocês. Queremos transformar o ecossistema de PHP do Brasil e sendo um pouco mais ambiciosos, queremos revolucionar o mundo. Mas preciso deixar claro, saber só PHP ou qualquer outra linguagem não vai te ajudar a entregar com qualidade, para isso precisamos conhecer temas que são comuns a todas as linguagens e que estão sendo ignorado por desenvolvedores a algum tempo. Quem nunca pensou que framework resolve tudo?

Não vamos nos aprofundar em nenhum dos tópicos, mas acreditamos que os assuntos abaixo são necessários para a construção de um software com qualidade em qualquer linguagem.

## Código limpo

O que diabos é o código limpo? Alguns vão dizer que é a fantástica obra de Uncle Bob feita em 2009, mas arrisco dizer com certeza que não. Não me entenda mal, o livro é muito bom e sempre recomendarei sua leitura, mas Uncle Bob não criou o código limpo (estou me referindo ao estado da arte e não ao livro), ele juntou uma série de problemas de códigos mal escritos e soluções que encontrou ao longo de sua carreira em um livro com esse nome. É possível tornar seu código mais limpo sem ter lido a obra, mas é impossível que apenas a leitura dela torne seu código mais limpo.

No próprio livro o autor diz que o código limpo não é só algo desejável, mas também necessário e divide o que pode ser feito para tornar um código mais limpo com uma serie de sugestões, desde pequenos detalhes como bons nomes para variáveis, métodos e classes, funções elegantes e curtas que facilitem a compreensão e o uso da estrutura de dados ou design pattern correto para cada cenário, até boas práticas de alto nível como boa manipulação de erros, construção de testes, desempenho e etc. Este livro mudou até a maneira como eu lidava com comentários em códigos, afinal de contas se você precisa de um comentário pra dizer o que o seu código faz, talvez ele não esteja claro o suficiente.

A busca por tornar o código cada vez mais limpo é uma arte e deve ser aplicada por todos os desenvolvedores, elas melhoram o comportamento e a capacidade de manutenção do seu software, mas sinceramente, vejo como algo impossível de ser alcançado sozinho, a ideia do código limpo é que ele seja de fácil compreensão para outras pessoas e convenhamos que nem o mais experiente de nós está livre de ser levado a escrever códigos mais complexos que o necessário. Por esse motivo, recomendo que você leia e busque sua compreensão sobre o que é um código limpo, mas converse com outras pessoas sobre isso, compartilhe, troque pontos de vista, fale sobre isso em seus code reviews, tenho certeza que isso também te fará amadurecer muito nesse conceito.

## Principios e boas práticas em Orientação a Objetos

O paradigma orientado a objetos é a base do código que a maior parte das pessoas escrevem hoje, usamos classe e objetos o tempo inteiro e alguns de nós não tem ideia de como funciona isso, ou em como aproveitar melhor o que podem nos oferecer, acabamos usando uma mistura de estrutural com POO, eu já conversei com alguns desenvolvedores experientes que mal conhecem conceitos como acoplamento, coesão, encapsulamento, herança, interfaces e polimorfismo e não conseguimos enxergar de forma prática como eles podem tornar nossos códigos melhores, estão preocupados em escrever o código cheio de magia do framework que dominam e quando as coisas fogem um pouco da documentação do framework, ficam totalmente perdidos.

### SOLID

Já ouvi dizer que o SOLID é um design pattern, suei frio na hora, mas contive minha resposta. O SOLID é a base da orientação a objetos, cada um dos princípios, se bem usado, irão dar a você um código bem encapsulado, muito coeso e pouco acoplado, usando herança, interfaces e polimorfismo para alcançar isto. Todos estes recursos tem como objetivo, melhorar a qualidade do código escrito e aumentar a facilidade de manutenção, apesar de no começo causar alguma confusão.

Dos códigos abaixo, para você qual é o mais simples de manter e evoluir?

```
<?php
  namespace App\NotSolid;

  class ServiceOne
  {
    public function handle(): boolean
    {
      $repository = new MySQLRepository();
      $data = $repository->first();
      if (!$data->active) {
        throw new Exception();
      }
      if (!$data->value > 0) {
        throw new Exception();
      }
      if (!$data->type === 'good_type_for_this') {
        throw new Exception();
      }
      $http_client = new LibraryClient();
      $http_client->post('path/to/destiny', $data->toJson());
      return true;
    }
  }

  class ServiceTwo
  {
    public function handle(): boolean
    {
      $repository = new MongoRepository();
      $data = $repository->first();
      if (!$data->active) {
        throw new Exception();
      }
      if (!$data->value > 0) {
        throw new Exception();
      }
      if (!$data->type === 'good_type_for_this') {
        throw new Exception();
      }
      $http_client = new LibraryClient();
      $http_client->post('other/path/to/destiny', $data->toJson());
      return true;
    }
  }
>
```

```
<?php
  namespace App\Solid;

  class Service
  {
    public function __construct(
      private DataRepositoryInterface $repository,
      private DataValidator $validator,
      private ClientInterface $client,
    )
    public function handle(): boolean
    {
      $repository = new MySQLRepository();
      $data = $this->repository->first();
      if (!$this->validator->check($data)) {
        throw new Exception();
      }
      $client->send($data);
      return true;
    }
  }

  $case_one = new Service(
    new MySQLRepository(),
    new DataValidator(),
    new Client()
  );

  $case_two = new Service(
    new MongoRepository(),
    new DataValidator(),
    new OtherClient()
  );
>
```

No exemplo acima aplicamos na mesma classe alguns dos principios (Single Responsability, Denpendancy Injection, Liskov Substituition) e ele já facilitou a manutenção do código acima, agora, caso eu precise de mais alguma validação eu irei inseri-la em um ponto central `DataValidator`, se eu quiser recuperar os dados de outro repositório de dados (ex: um cliente HTTP), só preciso implementar um repositório que respeite a interface declarada no `DataRepositoryInterface`. Nesse caso diminuimos o acoplamento, o código do service não depende mais da biblioteca X de HTTP Client, nem do MySQL ou Mongo e aumentamos a coesão, ele só conhece aquilo que é necessário para atender a sua regra.

Não parece muita coisa, mas agora imagine classes com problemas como os do primeiro exemplo espalhados por todo um sistema? A manutenção desse sistema vai sendo prejudicada até que cada feature tenha um custo enorme para ser feita.

### Design Patterns

Design Patterns são padrões para resolver problemas comuns que todos os desenvolvedores enfrentam, como por exemplo desacoplar a fabricação de um objeto, diminuir o número de parametros enviados a uma função, migrar soluções, etc. Geralmente, quando somos apresentados aos design patterns, somos levados ao livro dos GOF sobre o assunto, que trazem para nós um catalogo com vários design patterns, dividindo os entre padrões criacionais, estruturais e comportamentais. Esses padrões são usados largamente em diversas soluções, mas além dos padrões descritos neste livros, outros padrões foram criados para resolver problemas especificos (ex: Services, Repositories, Circuit Breaker, DTO, Value Objects, etc).

É extremamente necessário que um desenvolvedor seja capaz de encontrar padrões necessários para o apoiar na resolução do problema que enfrenta. Existe um ponto de cuidado quanto ao uso destes padrões, um bom desenvolvedor precisa ser capaz de entender quando um padrão faz sentido ou não, a adoção de padrões sem um motivo prático pode piorar muito a qualidade do seu código.

## Design de software

Na construção de um software encontramos dois tipos diferentes de arquitetura, o Uncle Bob diz no livro "Arquitetura Limpa" que ambas são arquiteturas, concordo com essa visão, mas na prática dividimos em design de software (a parte que define como os componentes de um serviço se comunicam entre si) e arquitetura de software (a parte que define como esse serviço se comunica com o restante do mundo/infra). Essa separação tem certo valor, serve muito bem pra deixar claro sobre o que estamos falando.

Dentro dessa disciplina encontramos temas como MVC, MVVM, DDD, Onio Architecture (Clean Architeture), Hexagonal Architecture, etc.

### Qual a importância do design de software?

Todo software vai ter um design, você tendo optado por ele ou não, na falta de escolha você terá um design despreparado para evolução.

Uma boa arquitetura e um bom design de software será capaz de auxiliar você e sua equipe na evolução do software e aumentará a capacidade de reversibilidade do que está construído, minimizando os pontos imutáveis do seu sistema.

### Além do MVC

O padrão mais comum usado por frameworks é o MVC, que separa um software em 3 camadas:

* Model: Representação do dado e comunicação com o repositório
* View: Interface de usuário
* Controller: Unidade que controla a execução das regras Esse modelo ainda é amplamente utilizado e muitos ainda acreditam ser um coringa, uma bala de prata que resolva todos os problemas, esse design surgiu em 1970 e tinha como propósito resolver os problemas que existiam naquela época, ainda é útil para alguns cenários, mas não para todos. Faz algum tempo que passamos ter mais que um tipo de interface de usuário, mais que e mais que um repositório de dados, para soluções modernas esse modelo se tornou defasado.

Como citado acima existem outros modelos, alguns são mais modernos e já contemplam esse novo universo dos softwares mais modernos, modelos como a Arquitetura Hexagonal, ou a Clean Architecture, tem como objetivo isolar regras de negocio das entradas e infraestrutura, deixando o software menos acoplado e mais aberto a mudanças. Vale a pena avaliar e entender a aplicabilidade desses modelos para cada problema que iremos resolver com software.

## Arquitetura de software

Iremos chamar de arquitetura de software nesse artigo, a definição de como um software se comunica com o mundo ok? Temos que lembrar que a arquitetura de um software, diferente de uma arquitetura civil, é uma arquitetura viva, movimentando-se para atender as mais diversas mudanças que pode acontecer, sendo elas técnicas ou de negócio.

Segundo Martin Fowler, a arquitetura de um software é um conjunto de decisões difíceis de serem mudadas no futuro, por esse motivo é importante pensar em uma arquitetura que consiga abraçar essas mudanças.

Na minha opinião uma boa arquitetura deve mirar em 3 pilares (performance, escalabilidade do produto e capacidade de ser mantida pelo time responsável).

### Microsserviços x Monolito

Nos últimos anos temos ouvido falar muito sobre a arquitetura distribuída baseada em microsserviços, onde domínios diferentes são construídos em serviços diferentes que estão disponíveis em outros servidores e que acessam recursos diferentes. Está sendo vendida uma ideia de que essa é a melhor solução para tudo, mas como tudo na computação, esse modelo resolve alguns problemas e tem alguns efeitos colaterais.

A abordagem monolítica, trás algumas vantagens como menor latência para obtenção de dados e maior facilidade de construção de infraestrutura apropriada, tendo em vista que isso só é feito uma vez. Porém tem como desvantagem o alta vulnerabilidade, tendo partes não dependentes do sistema altamente acopladas, toda vez que uma parte necessitar que seus recursos sejam escalados, todas outras serão escaladas juntas, além de que se em algum momento for necessário trocar de tecnologia para atender a algum requisito a reescrita de todo o monolíto trará um alto custo.

Já a abordagem com microsserviços, apesar de aumentar a latência para obtenção de dados e também perder não oferecer um ciclo de vida completo de um comportamento, tem menor vulnerabilidade, fazendo com que o mal funcionamento de uma parte não afete o sistema como um todo, cada parte poderá ser escalada de maneira independente economizando recursos, e cada parte poderá operar com a tecnologia mais adequada para a solução do seu problema.

Martin Fowler, sugere em um artigo que apesar das vantagens, a arquitetura baseada em microsserviços não é recomendada para softwares em fase inicial por tornar as coisas mais complexas que o necessário para essa fase, a maioria dos casos de sucesso com micresserviços acontece, quando um monolíto maduro é quebrado em serviços menores no momento correto e com a maturidade correta.

## Modelagem de dados

Grande parte dos problemas em softwares legados é a maneira como um dados está construído, o acoplamento de informações diferentes e distribuição incorreta de informações pertencentes ao mesmo contexto acabam por dificultar a vida de nós desenvolvedores e na maioria das vezes isso acontece por falta de atenção e planejamento. Adicionamos novas colunas a tabelas existentes, mesmo que fora do contexto só pra facilitar a conclusão da nossa tarefa atual e depois nos tornamos reféns dos efeitos colaterais disso.

Uma boa modelagem de dados exigem analise e organização, cada modelo é aplicável para um cenário e o nosso maior erro é querer criar apenas um modelo de dados para a resolução de todos os problemas em torno do nosso software, não é prático. Existem modelos práticos para a analise e modelos práticos para alimentar serviços.

## Protocolos de comunicação

Todos os serviços dependem de um protocolo para se comunicar, nos últimos anos criando aplicações monolíticas com nossos frameworks, deixamos de dar atenção a estes protocolos, afinal de contas o nosso front e back eram unificados e entendiam bem um ao outro, porém, com o advento dos smartphones, aplicativos e IoT. Nossas aplicações precisaram se separar e se adaptar para interfaces diferentes e ai voltamos a falar sobre eles.

### HTTP: RESTful não é só usar um framework

O principal protocolo usado na internet é o HTTP, além dele usamos o REST, um modelo arquitetural que especifica um contrato de boas práticas para as comunicações entre serviços usando o HTTP e RESTful é a adoção completa das regras do REST.

Dentro desse protocolo temos a divisão de responsabilidades entre cliente e servidor e a comunicação entre eles é baseada em mensagens enviadas pelo cliente usando caminhos e métodos específicos e o recebimento de respostas com mensagens e códigos de status. O contrato diz qual o método deve ser utilizado para cada tipo de mensagem, como deverá ser o caminho, onde deverá estar a mensagem, qual o melhor código para a resposta e como deverá ser a mensagem de resposta.

### AMQP: Quando usar filas e mensageirias?

Outro meio comum de comunicação entre serviços é o protocolo AMQP, mais conhecido como barramento, filas, mensageiria ou pub/sub. Nesse protocolo, mensagens são disparadas para uma fila que são consumidas por algum outro serviço que escuta essas mensagens. Para trabalhar com esse protocolo você pode usar algo próprio, mas recomendo o uso de ferramentas como RabbitMQ ou SQS.

Esse protocolo é muito utilizado para comunicação assíncrona entre serviços onde você não depende da resposta para continuar seu processo.

## DevOps

### A cultura DevOps

A cultura DevOps é uma abordagem que visa melhorar a colaboração e a integração entre equipes de desenvolvimento de software (Dev) e operações de TI (Ops). Ela promove a quebra de barreiras tradicionais entre essas equipes, enfatizando a automação de processos, o compartilhamento de responsabilidades, o feedback contínuo e a entrega rápida e confiável de software. Ao eliminar silos e promover a colaboração, a cultura DevOps busca acelerar o desenvolvimento de software, reduzir erros, melhorar a eficiência operacional e responder de forma mais ágil às demandas do mercado. Ela se baseia em práticas como integração contínua, entrega contínua, automação de infraestrutura e monitoramento constante para alcançar esses objetivos.

### Continuous Integration (CI)

A Integração Contínua (CI), em termos simples, é uma prática de desenvolvimento de software que envolve a integração frequente e automatizada de código produzido por diferentes membros da equipe de desenvolvimento. Isso significa que sempre que um desenvolvedor faz uma alteração no código-fonte, essa alteração é automaticamente incorporada ao projeto principal e passa por uma série de processos automatizados (testes, analise estática de código, build, etc) para garantir que não quebre o software existente. O objetivo da CI é detectar e corrigir problemas de integração o mais cedo possível, facilitando a identificação e resolução de bugs antes que eles se propaguem para ambientes de produção. Essa abordagem não apenas aumenta a qualidade do software, mas também acelera o ciclo de desenvolvimento, permitindo que as equipes entreguem atualizações de maneira mais rápida e confiável.

**\*\***Ferramentas de CI**\*\***

* Jenkins: Uma das ferramentas mais conhecidas e amplamente usadas para automação de CI/CD. Jenkins oferece uma ampla gama de plugins e integrações.
* CircleCI: Uma ferramenta de CI/CD que também funciona na nuvem e suporta a automação de pipelines de construção e implantação.
* GitLab CI/CD: Integrado ao GitLab, esta ferramenta oferece recursos de CI/CD diretamente em um repositório GitLab, simplificando o fluxo de trabalho de desenvolvimento.
* TeamCity: Uma ferramenta da JetBrains que oferece integração contínua e recursos de entrega contínua para equipes de desenvolvimento.
* Travis CI: Uma ferramenta de CI/CD hospedada na nuvem que é popular entre os projetos de código aberto. Ela suporta integração com GitHub e GitLab
* Bamboo: Uma solução de CI/CD da Atlassian, que pode ser integrada com outras ferramentas da Atlassian, como Jira e Bitbucket.
* Azure DevOps: Uma plataforma completa de gerenciamento de ciclo de vida de aplicativos oferecida pela Microsoft, que inclui recursos de CI/CD, rastreamento de problemas e gerenciamento de projetos.
* GitHub Actions: Integração contínua e entrega contínua nativas do GitHub, que permitem automatizar fluxos de trabalho diretamente em seu repositório GitHub.

Essas são apenas algumas das muitas ferramentas disponíveis para implementar a Integração Contínua. A escolha da ferramenta depende das necessidades específicas do projeto e da preferência da equipe de desenvolvimento.

### Continuous Delivery

É uma prática de desenvolvimento de software que complementa a Integração Contínua, permitindo que as alterações de código sejam automaticamente preparadas e implantadas em um ambiente de teste ou de produção após passarem por processos automatizados bem-sucedidos. Essa abordagem garante que o software esteja sempre pronto para ser entregue aos usuários finais, facilitando a liberação rápida e confiável de novas funcionalidades e correções de bugs, enquanto mantém um alto nível de qualidade e estabilidade.

### Observabilidade (você coda, você cuida)

A observabilidade é a capacidade de monitorar e entender o comportamento interno de sistemas complexos, como aplicações de software, redes ou infraestruturas, através da coleta, análise e visualização de dados relevantes, como logs, métricas e rastreamentos. Ela é essencial para identificar problemas, diagnosticar falhas e otimizar o desempenho em ambientes de tecnologia, permitindo que as equipes de operações e desenvolvimento ganhem insights valiosos para tomar decisões informadas e garantir a confiabilidade e eficácia contínuas desses sistemas.

* Prometheus: Uma ferramenta de monitoramento de código aberto.
* Grafana: Uma plataforma de análise e visualização de métricas.
* Elasticsearch, Logstash e Kibana (ELK Stack): Um conjunto de ferramentas para análise de logs.
* Splunk: Uma plataforma de análise de dados.
* Jaeger: Uma ferramenta de rastreamento distribuído.
* New Relic: Uma plataforma de monitoramento de desempenho de aplicativos.
* Dynatrace: Uma plataforma de monitoramento de desempenho de aplicativos.
* Datadog: Uma plataforma de monitoramento em nuvem.
* Zipkin: Uma ferramenta de rastreamento distribuído.
* Nagios: Uma ferramenta de monitoramento de rede e sistemas.

Essas ferramentas de observabilidade são amplamente utilizadas para monitorar e analisar sistemas de TI e aplicativos, ajudando as equipes a manter a confiabilidade e o desempenho. A escolha da ferramenta depende das necessidades específicas do projeto e das preferências da equipe.

## Testes

Dentro da disciplina de engenharia de software, existe uma area chamada de **Automação em testes** (ou apenas **Testes** como eu prefiro chamar). Essa disciplina consiste em inúmeras técnicas (*Testes unitários, de interface, de contrato, de integração, e2e, etc*) utilizadas para tornar o processo de testes automático e mais produtivo. Mesmo com a existência de algo tão relevante ainda existem muitas discussões sobre quando e como inserir essas técnicas em seu projeto. Perguntas como *“Qual a melhor técnica de testes?”*, *“Quando devo testar?”*, *“Tenho que testar tudo?”* ainda são muito recorrentes no dia a dia de uma equipe de desenvolvimento que está começando a trabalhar com testes.

Se quiser saber um pouco mais sobre cultura de testes, sugiro a leitura de [Blog - A importância da cultura de TDD na vida dos desenvolvedores e dos não desenvolvedores | <DiegoBorgs />](https://diegoborgs.com.br/blog/a-import%C3%A2ncia-da-cultura-de-tdd-na-vida-dos-desenvolvedores-e-dos-n%C3%A3o-desenvolvedores%E2%80%8B)

## Conclusão

Como o dito no inicio do artigo, apenas escrever código em uma linguagem de programação não é o suficiente para criar um software robusto e escalável, mesmo usando o PHP com o Swoole, usando apenas a escrita de código você não alcançará um software de alta disponibilidade se não aplicar outros conceitos que são agnósticos a sintaxe. É necessário ter conhecimento sobre outras técnicas e ferramentas para chegar a este resultado.