---
path: php-do-futuro
date: 2022-01-21T18:17:38.529Z
title: O PicPay não vai mais usar o PHP... Que você conhece!
---
Sim, isto é um click bait, não vou te iludir. Mas talvez essa leitura possa valer a pena.

Desde quando comecei a trabalhar com tecnologia em 2011, ouço falar que o PHP é uma linguagem ruim, e depois todo ano vejo uma série de artigos e postagens falando que o PHP vai morrer, por algum tempo até entrei nessa onda e acabei migrando a linguagem de trabalho e por fim descobri algo libertador. O maior problema do PHP nunca foi o PHP.

O grande problema é que essas postagens desencorajam pessoas que querem aprender a escrever softwares modernos e com qualidade a continuarem escrevendo códigos em PHP, que acabam buscando refugio em outras linguagens e quando percebem que o problema não era o PHP já estão muito consolidadas em outras linguagens para fazer o caminho reverso.

Calma, calma! Já sei o que você está pensando... "Ah, mas o PHP tem vários defeitos". Verdade, tem mesmo! E outras linguagens também, o que vou te mostrar aqui é que o PHP pode ser uma boa opção pra você. E ainda que apresente vários problemas é uma das linguagens mais usadas da web, além do fato de ter uma comunidade forte, documentação muito completa e detalhada, um bom ecossistema de frameworks, é muito inovadora e ninguém pode dizer que não performática (leia mais que vou te provar), além de contar com uma um grande numero de profissionais que já conhecem sua sintaxe.

## Tá! Mas o que isso tem haver com o PicPay acabar com o PHP que eu conheço? 

Como disse acima, o maior problema das pessoas com o PHP não é a linguagem em si, mas a experiência que os desenvolvedores tiveram com a linguagem. O primeiro programador que conheci tomou trauma da linguagem porque trabalhou em um projeto onde cada váriavel tinha nome de um pokémon diferente e ele era incapaz de entender o que aquele código fazia. Já ouvi gente dizendo que código em PHP é feio e muito acoplado, sempre tem um controller de 10000 linhas e não dá pra entender o que faz, mas o que a pessoa teve de experiencia com o PHP foi um código mal escrito ou algo feito em WordPress (convenhamos que apesar da grande adoção, não é um bom exemplo). Tudo isso acontece porque as pessoas tem escrito código em PHP sem se preocupar com a qualidade do que estão entregando.

A revolução faz parte do DNA do PicPay, nós queremos mudar isso! Temos construído um PHP com qualidade e queremos dividir isso com vocês. Queremos transformar o ecossistema de PHP do Brasil e sendo um pouco mais ambiciosos, queremos revolucionar o mundo. Mas preciso deixar claro, saber só PHP ou qualquer outra linguagem não vai te ajudar a entregar com qualidade, para isso precisamos conhecer temas que são comuns a todas as linguagens e que estão sendo ignorado por nossos desenvolvedores a algum tempo, quem nunca pensou que framework resolve tudo?

Não vamos nos aprofundar em nenhum dos tópicos, mas acreditamos que os assuntos abaixo são necessários para a construção de um software com qualidade em qualquer linguagem.

## Código limpo

O que diabos é o código limpo? Alguns vão dizer que é a fantástica obra de Uncle Bob feita em 2009, mas arrisco dizer com certeza que não. Não me entenda mal, o livro é muito bom e sempre recomendarei sua leitura, mas Uncle Bob não criou o código limpo (o estado e não o livro), ele juntou uma série de problemas de códigos mal escritos e soluções que encontrou ao longo de sua carreira em um livro com esse nome. É possível tornar seu código mais limpo sem ter lido a obra, mas é impossível que apenas a leitura dela torne seu código mais limpo.

No próprio livro o autor diz que o código limpo não é só algo desejável, mas também necessário e divide o que pode ser feito para tornar um código mais limpo com uma serie de sugestões, desde pequenos detalhes como bons nomes para variáveis, métodos e classes, funções elegantes e curtas que facilitem a compreensão e o uso da estrutura de dados ou design pattern correto para cada cenário, até boas práticas de alto nível como boa manipulação de erros, construção de testes, desempenho e etc. Este livro mudou até a maneira como eu lidava com comentários em códigos, afinal de contas se você precisa de um comentário pra dizer o que o seu código faz, talvez ele não esteja claro o suficiente.

A busca por tornar o código cada vez mais limpo é uma arte e deve ser aplicada por todos os desenvolvedores, elas melhoram o comportamento e a capacidade de manutenção do seu software, mas sinceramente, vejo como algo impossível de ser alcançado sozinho, a ideia do código limpo é que ele seja de fácil compreensão para outras pessoas e convenhamos que nem o mais experiente de nós está livre de ser levado a escrever códigos mais complexos que o necessário. Por esse motivo, recomendo que você leia e busque sua compreensão sobre o que é um código limpo, mas converse com outras pessoas sobre isso, compartilhe, troque pontos de vista, fale sobre isso em seus code reviews, tenho certeza que isso também te fará amadurecer muito nesse conceito.

## Principios e boas práticas em Orientação a Objetos

O paradigma orientado a objetos é a base do código que a maior parte das pessoas escrevem hoje, usamos classe e objetos o tempo inteiro e alguns de nós não tem ideia de como funciona isso, ou em como aproveitar melhor o que podem nos oferecer, acabamos usando uma mistura de estrutural com POO, eu já conversei com alguns desenvolvedores experientes que mal conhecem conceitos como acoplamento, coesão, encapsulamento, herança, interfaces e polimorfismo e não conseguimos enxergar de forma prática como eles podem tornar nossos códigos melhores, estão preocupados em escrever o código cheio de magia do framework que dominam e quando as coisas fogem um pouco da documentação do framework, ficam totalmente perdidos.

### SOLID

Já ouvi dizer que o SOLID é um design pattern, suei frio na hora, mas contive minha resposta. O SOLID é a base da orientação a objetos, cada um dos princípios, se bem usado, irão dar a você um código bem encapsulado, muito coeso e pouco acoplado, usando herança, interfaces e polimorfismo para alcançar isto. Todos estes recursos tem como objetivo, melhorar a qualidade do código escrito e aumentar a facilidade de manutenção, apesar de no começo causar alguma confusão.

Dos códigos abaixo, para você qual é o mais simples de manter e evoluir?

```php
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


```php
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

No exemplo acima aplicamos na mesma classe alguns dos principios (Single Responsability, Denpendancy Injection, Liskov Substituition) e ele já facilitou a manutenção do código acima, agora, caso eu precise de mais alguma validação eu irei inseri-la em um ponto central `DataValidator`, se eu quiser recuperar os dados de outro repositório de dados (ex: um cliente HTTP), só preciso implementar um repositório que respeite a interface declarada no `DataRepositoryInterface`. Nesse caso diminuimos o acoplamento, o código do service não depende mais da biblioteca X de HTTP Client, nem do MySQL ou Mongo e aumentamos a coesão, ele só conhece aquilo que é necessário para atender a sua regra.

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
- Model: Representação do dado e comunicação com o repositório
- View: Interface de usuário
- Controller: Unidade que controla a execução das regras
Esse modelo ainda é amplamente utilizado e muitos ainda acreditam ser um coringa, uma bala de prata que resolva todos os problemas, esse design surgiu em 1970 e tinha como propósito resolver os problemas que existiam naquela época, ainda é útil para alguns cenários, mas não para todos. Faz algum tempo que passamos ter mais que um tipo de interface de usuário, mais que  e mais que um repositório de dados, para soluções modernas esse modelo se tornou defasado. 

Como citado acima existem outros modelos, alguns são mais modernos e já contemplam esse novo universo dos softwares mais modernos, modelos como a Arquitetura Hexagonal, ou a Clean Architecture, tem como objetivo isolar regras de negocio das entradas e infraestrutura, deixando o software menos acoplado e mais aberto a mudanças. Vale a pena avaliar e entender a aplicabilidade desses modelos para cada problema que iremos resolver com software.

## Arquitetura de software

Iremos chamar de arquitetura de software nesse artigo, a definição de como um software se comunica com o mundo ok? Temos que lembrar que a arquitetura de um software, diferente de uma arquitetura civil, é uma arquitetura viva, movimentando-se para atender as mais diversas mudanças que pode acontecer, sendo elas técnicas ou de negócio. 

Segundo Martin Fowler, a arquitetura de um software é um conjunto de decisões difíceis de serem mudadas no futuro, por esse motivo é importante pensar em uma arquitetura que consiga abraçar essas mudanças.

Na minha opinião uma boa arquitetura deve mirar em 3 pilares (performance, escalabilidade do produto e capacidade de ser mantida pelo time responsável).

### Microsserviços x Monolito

Nos últimos anos temos ouvido falar muito sobre a arquitetura distribuída baseada em microsserviços, onde domínios diferentes são construídos em serviços diferentes que estão disponíveis em outros servidores e que acessam recursos diferentes. Está sendo vendida uma ideia de que essa é a melhor solução para tudo, mas como tudo na computação, esse modelo resolve alguns problemas e tem alguns efeitos colaterais.

A abordagem monolítica, trás algumas vantagens como menor latência para obtenção de dados e maior facilidade de construção de infraestrutura apropriada, tendo em vista que isso só é feito uma vez. Porém tem como desvantagem o alta vulnerabilidade, tendo partes não dependentes do sistema altamente acopladas, toda vez que uma parte necessitar que seus recursos sejam escalados, todas outras serão escaladas juntas, além de que se em algum momento for necessário trocar de tecnologia para atender a algum requisito a reescrita de todo o monolíto trará um alto custo.

Já a abordagem com microsserviços, apesar de aumentar a latência para obtenção de dados e também perder não oferecer um ciclo de vida completo de um comportamento, tem menor vulnerabilidade, fazendo com que o mal funcionamento de uma parte não afete o sistema como um todo, cada parte poderá ser escalada de maneira independente economizando recursos, e cada parte poderá operar com a tecnologia mais adequada para a solução do seu problema.

Martin Fowler, sugere em um artigo que apesar das vantagens, a arquitetura baseada em microsserviços não é recomendada para softwares em fase inicial por tornar as coisas mais complexas que o necessário para essa fase, a maioria dos casos de sucesso com micresserviços acontece, quando um monolito maduro é quebrado em serviços menores no momento correto e com a maturidade correta.

## Modelagem de dados

## Protocolos de comunicação

### HTTP: RESTful não é só usar um framework

### RPC e gRPC

### AMQP: Quando usar filas e mensageirias?

## DevOps

### A cultura DevOps

### CI/CD

### Observabilidade (você coda, você cuida)

## Testes

## Segurança

## Conclusão