---
path: semanal-de-quarentena-5
date: 2020-05-19T21:55:30.292Z
title: '[Semanal de quarentena] - 6 Conceitos fundamentais para um bom desenvolvedor'
---
E ai galera, tudo bem? Eu espero que sim!

Dando sequencia aos meus posts semanais de quarentena para vocês, hoje resolvi seguir o conselho de alguns amigos no twitter que me pediram pra falar um pouco sobre alguns conceitos de desenvolvimento, além disso faz um tempinho que eu quero escrever alguma coisa sobre carreira. Então, eu vou fazer uma abstração e reaproveitar esse código... ops, quero dizer post para fazer uma listinha com os conceitos que eu considero fundamentais para bons desenvolvedores.

Apesar de ter feito minhas primeiras linhas de HTML em 2011, e de lá pra cá já são 9 anos em que tive a oportunidade de trabalhar em muitos projetos com desafios diferentes e em times com muita gente boa, confesso que as vezes eu não acredito que minha carreira é tão longa assim para falar como outra pessoa deve lidar com a dela. O que eu vou deixar para vocês aqui são alguns conceitos que, depois que comecei a entender, me tornaram um desenvolvedor melhor, mas deixo com vocês a responsabilidade de decidir aplicar ou não eles em suas vidas profissionais.

_PS: Pra ser sincero, eu não vou me aprofundar em nenhum dos conceitos que vou citar nesse artigo, existem milhares de artigos técnicos sobre cada um dos assuntos na internet, a ideia é que seja um roadmap para vocês complementarem seus estudos depois, mas vou dar uma pincelada em cada um deles e indicar algum artigo que complemente o que eu falar no fim de cada tópico._

__

## 1. Princípios S.O.L.I.D.

Eu resolvi dedicar um tempo de estudo para este conceito depois de ser cobrado sobre ele em uma entrevista de emprego. Eu já até conhecia e aplicava alguns dos princípios em parte mesmo sem saber depois de ouvir algumas recomendações de melhorias em uma code review. 

Até hoje consigo ouvir a voz do grão mestre [Danton](https://www.linkedin.com/in/danton-dietze/) fazendo um code review comigo e falando indiretamente sobre o princípio de responsabilidade única **(S - Single Responsability.** Coisas como... _Diego, essa função tá fazendo mais de uma coisa_ ou _Diego, isso que você colocou aqui, não deveria estar aqui porque não é responsabilidade dessa classe._

Os S.O.L.I.D. são princípios da programação orientada a objetos, é um acrônimo criado por Michael Feather, autor do _Working Effectively with Legacy Code,_ baseado em orientações encontradas no artigo [The Principles of OOD](http://butunclebob.com/ArticleS.UncleBob.PrinciplesOfOod) do Tio Bob. Sendo eles:

**S. Single Responsiblity Principle** (Princípio da responsabilidade única)\
**O. Open-Closed Principle** (Princípio Aberto-Fechado)\
**L. Liskov Substitution Principle** (Princípio da substituição de Liskov)\
**I. Interface Segregation Principle** (Princípio da Segregação da Interface)\
**D. Dependency Inversion Principle** (Princípio da inversão da dependência)

Para vocês aprofundarem seus estudos deixo com vocês o excelente artigo do João Roberto, [O que é SOLID: O guia completo para você entender os 5 princípios da POO.](https://medium.com/joaorobertopb/o-que-%C3%A9-solid-o-guia-completo-para-voc%C3%AA-entender-os-5-princ%C3%ADpios-da-poo-2b937b3fc530)

## 2. Design Patterns

Os design patterns ou padrões de projeto foram apresentados para mim ainda nos primeiros períodos da faculdade e eu confesso que eu não dei nenhuma bola, alguns anos mais tarde tive um reencontro com eles na minha vida profissional. Acredite, apesar de ter trabalhado em vários projetos diferentes, muitos problemas que enfrentei eram exatamente iguais.

Eu considero os Design Patterns um estudo essencial para um programador e também um manual para ser consultado com soluções generalistas para problemas recorrentes de durante o desenvolvimento de um software. Os padrões de projeto são divididos em Criacionais, Estruturais e Comportamentais, mas não tente decorar todos de uma vez, acredito que isso seja impossível, com o tempo alguns padrões que você usar mais vão ficar mais familiares para você.

Geralmente eu uso o [refactoring.guru](https://refactoring.guru/pt-br/design-patterns) para consulta sempre que necessário. Ele tem um material completo e em português sobre Design Patterns.

## 3. O protocolo HTTP

Talvez esse conceito se aplique apenas aos desenvolvedores que trabalham com aplicações web, seja na sua implementação ou consumo _(se você é um desenvolvedor mobile que consome uma API você se encaixa aqui)_. 

Com o surgimento e popularização dos frameworks, nós desenvolvedores, acabamos deixando um pouco de lado a obrigação de conhecer como funcionam os nossos protocolos de comunicação. Muito disso se deve ao fato de termos todo o funcionamento abstraído dentro dos frameworks que utilizamos.

A grande questão é que com isso começamos a ter algumas aplicações que esperavam parâmetros em lugares inesperados e/ou davam respostas HTTP erradas e acabavam por deixar as aplicações que consumiam elas loucas e cheias de gambiarras para contornar isso. Quer ver um exemplo? O clássico 404 quando na verdade é um 200 de uma lista vazia, o 401 no lugar de 403 ou a aplicação que espera um token de autorização no body ao invés do header da requisição.

Eu fiz essa [apresentação](https://eudiegoborgs.github.io/introducao-web-dev) em 2018 para dar uma introdução para alguns colegas de trabalho não desenvolvedores sobre o desenvolvimento para web, nela eu falo um pouquinho sobre o protocolo HTTP. Acho que é uma boa base para começar a entender sobre o assunto.

## 4. Testes

Eu percebo que nós desenvolvedores de software ainda discordamos completamente sobre esse assunto, mas vejo que é comum entre bons desenvolvedores a preocupação com testes, seja usando TDD ou não. 

Esse foi o conceito que eu mais estudei até hoje, me encantei com o assunto e comecei a praticar como forma de entregar mais qualidade no código que escrevia. E posso dizer com muita sinceridade para vocês... deu muito certo, meu código ficou melhor.

Saber escrever um bom código para teste te ajuda a escrever um bom código no geral.

Eu poderia escrever mais uns 32 parágrafos sobre isso, mas eu já escrevi bastante aqui no blog, então eu vou deixar aqui em baixo o link dos posts pra vocês na sequência:

* [A importância da cultura de TDD na vida dos desenvolvedores e dos não desenvolvedores​](https://diegoborgs.com.br/blog/a-import%C3%A2ncia-da-cultura-de-tdd-na-vida-dos-desenvolvedores-e-dos-n%C3%A3o-desenvolvedores%E2%80%8B)
* [05 coisas sobre o TDD que você pode estar pensando errado](https://diegoborgs.com.br/blog/05-coisas-sobre-o-tdd-que-voc%C3%AA-pode-estar-pensando-errado)
* [Utilizando o princípio First para escrever testes unitários melhores](https://diegoborgs.com.br/blog/utilizando-o-princ%C3%ADpio-first-para-escrever-testes-unit%C3%A1rios-melhores)

## 5. DevOps e Cloud

Algumas pessoas acham que DevOps é um profissional/carreira dentro da tecnologia e na verdade não é DevOps é um termo criado para descrever uma cultura de otimização e integração entre desenvolvimento, infra e qualidade. 

Apesar de não ter um estudo tão profundo neste conceito acho sensacional os resultados que conseguimos ao utilizar coisas como gerenciadores de tarefas (ex: gulp e webpack), ferramentas de CI (ex: Bitbucket Pipeline, Jenkins e CircleCi) e containers. Eu mesmo nunca mais precisei configurar o famoso LAMP (Linux, Apache, MySQL e PHP) desde que comecei usar o docker e o docker compose. 

Outra coisa que eu acho que um bom desenvolvedor deve ter é a capacidade de publicar o projeto no qual está trabalhando, para isso o conhecimento em algumas ferramentas de cloud, mesmo que seja básico, é extremamente necessário.

Cada uma das coisas que falei renderia um artigo separado e no futuro posso até escrever um pouco mais sobre as coisas que falei, acho que pra começar bem com estes conceitos o ideal é ter uma noção de docker e estes [artigo](https://woliveiras.com.br/posts/uma-rapida-introducao-ao-docker-e-instalacao-no-ubuntu/) do William Oliveira vai te ajudar, no restante pode ir com calma e aprendendo aos poucos que vai dar tudo certo.

## 6. Arquitetura de Software

Eu não acho que você tem que fazer uma pós em arquitetura de software para ser um bom desenvolvedor, mas ter uma noção de arquitetura ajuda demais. 

Eu sempre parto da prerrogativa que entender como funciona é muito melhor do que só saber fazer alguma coisa, quando você começa a estudar a arquitetura de um software você começa a ver exatamente como as coisas funcionam e porque elas fazem o que fazem.

Não existe um modelo de arquitetura melhor ou certo, existem alguns mais conhecidos e mais usados como Clean Architecture ou a Arquitetura Hexagonal, nestes modelos usa-se muito conceitos como interfaces de comunicação, separação em camadas e hierarquia de camadas. 

Particularmente falando, eu acredito que uma boa arquitetura de software adia tomadas de decisões até o momento necessário e evita over engineerings.

Para introduzir no assunto sugiro a leitura deste [artigo](https://www.devmedia.com.br/arquitetura-de-software-desenvolvimento-orientado-para-arquitetura/8033) do DevMedia e também pesquisas sobre Clean Architecture e Arquitetura Hexagonal.

## 7. Code Review

Por último e não menos importante vem o Code Review, acredito que este é o único conceito impossível de aprender sozinho, ter a capacidade de realizar uma boa code review, imparcial e sem ego no código dos coleguinhas é importante, mas entender que as criticas ao seu código não são pessoais e devem ser levadas em consideração é essencial.

Uma vez eu li que um bom Code Review é melhor que TDD, eu com certeza descordo plenamente. Acredito que são coisas complementares e diferentes. Geralmente um bom Code Review vai avaliar a sintaxe do código e os testes por outro lado tem uma avaliação mais comportamental. Hoje em dia existem ferramentas como o Sonarqube e o Scruntinizer que fazem uma analise automática, mas eu não dispensaria nunca a avaliação de um colega e a capacidade que ela vai ter de me ensinar.

Para se tornar um bom desenvolvedor é necessário aprender o tempo todo e as Code Review's são os melhores momentos pra isso. Uma vez escutei que é sempre bom escutar o que as pessoas tem a dizer, independente de quem seja, do mais sábio ao mais ignorante a todo momento alguém sempre vai ter algo a te acrescentar. Por esse motivo não seja arrogante ao receber uma review de alguém menos experiente que você, ele pode estar certo e se estiver errado é um bom momento pra ensinar.

Ao fazer uma code review de um colega, tenha empatia mas não tenha dó, aponte as falhas que encontrar no código sem implicâncias mesquinhas e também sugira soluções, fique atento as respostas, pois as vezes naquele contexto, apesar de não parecer aquela era a melhor solução.

## Para finalizar...

Sinceramente, não acredito que você deva ser um especialista em cada uma das coisas faladas para ser um bom desenvolvedor, mas acredito que ter uma noção do que se trata te ajudará a entregar projetos de softwares melhores e mais completos.

E ai? Gostou da lista? Tem alguma coisa que gostaria de acrescentar? Comente ai para não deixarmos nada de fora.
